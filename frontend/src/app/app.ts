import { Component } from '@angular/core';
import { UrlFormComponent } from './components/url-form/url-form';
import { UrlListComponent } from './components/url-list/url-list';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UrlFormComponent, UrlListComponent,MatToolbar],
  templateUrl: './app.html'
})
export class AppComponent {}