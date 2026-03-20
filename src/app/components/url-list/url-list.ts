import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { UrlService } from '../../services/url';

@Component({
  selector: 'app-url-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './url-list.html'
})
export class UrlListComponent implements OnInit {
  urls: any[] = [];
  searchTerm = '';
copiedMap: { [key: string]: boolean } = {};
filteredUrls: any[] = []
 
  constructor(private urlService: UrlService) {}

  ngOnInit() {
    this.loadUrls();
    this.urlService.refresh$.subscribe(() => {
      this.loadUrls();
    });
  }

  loadUrls() {
    this.urlService.getAll().subscribe(res => {
    this.urls = res;
    this.filteredUrls = res;
  });
  }

  delete(id: number) {
    this.urlService.delete(id).subscribe(() => this.loadUrls());
  }
    search() {
   const search = this.searchTerm.toLowerCase();

  this.filteredUrls = this.urls.filter(url =>
    this.getShortUrl(url.shortCode.toLowerCase()).includes(search) ||
    url.originalUrl.toLowerCase().includes(search)
  );
  }
   getShortUrl(shortCode: string) {
  return  this.urlService.getShortUrl(shortCode);
   }

 copy(shortCode: string) {
  const shortUrl = this.urlService.getShortUrl(shortCode);

  navigator.clipboard.writeText(shortUrl)
    .then(() => {
    this.copiedMap[shortCode] = true;

    setTimeout(() => {
      this.copiedMap[shortCode] = false;
    }, 3000);
  });

}

}