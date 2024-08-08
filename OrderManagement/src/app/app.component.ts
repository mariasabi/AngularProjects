import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ItemData } from './item.model';
import { ApiService } from './api.service';
import { AuthComponent } from './auth/auth.component';
import { ItemFunctionsComponent } from './item-functions/item-functions.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  constructor(private translate:TranslateService){
    this.translate.setDefaultLang('en');
  }
 
switchLanguage(language:string){
  this.translate.use(language).subscribe(() => {
    console.log(`Language switched to: ${language}`);
  }, (error) => {
    console.error('Error switching language:', error);
  });
}
}