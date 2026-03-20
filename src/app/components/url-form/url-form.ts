import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UrlService } from '../../services/url';

@Component({
  selector: 'app-url-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './url-form.html'
})
export class UrlFormComponent {
  longUrl = '';
  isPrivate = false;
  generatedShortUrl: string = '';
 copyText: string = 'Copy';
 errorMessage: string = '';
 
  @Output() refreshList = new EventEmitter<void>();

  constructor(private urlService: UrlService) {}

  createUrl() {

     if (this.longUrl.trim() === ''||!this.isValidUrl(this.longUrl)) {
    this.errorMessage = 'Please enter a valid URL (must start with http:// or https://)';
    return;
  }
    const payload = {
      originalUrl: this.longUrl,
      isPrivate: this.isPrivate
    };

    this.urlService.create(payload).subscribe((res: any) => {
      this.longUrl = '';
      this.isPrivate = false;
      this.generatedShortUrl = this.urlService.getShortUrl(res.shortCode);
      this.urlService.notifyRefresh();
    });
    this.errorMessage ='';
  }
  copyToClipboard() {
    navigator.clipboard.writeText(this.generatedShortUrl).then(() => {
    this.copyText = 'Copied!';

    setTimeout(() => {
      this.copyText = 'Copy';
    }, 3000);
  });
  }

  isValidUrl(url: string): boolean {
  return /^https?:\/\/.+/.test(url); 
  }
}