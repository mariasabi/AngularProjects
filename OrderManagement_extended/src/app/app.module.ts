import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridItemsComponent } from "./item-functions/grid-items/grid-items.component";
import { UpdateItemsComponent } from "./item-functions/update-items/update-items.component";
import { SuccessMessageComponent } from "./success-message/success-message.component";
import { DeleteItemComponent } from "./item-functions/delete-item/delete-item.component";
import { PageItemsComponent } from "./item-functions/page-items/page-items.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UploadComponent } from "./item-functions/upload/upload.component";
import { ItemFunctionsComponent } from "./item-functions/item-functions.component";
import { RouterModule, Route, provideRouter, RouterOutlet } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import {  provideAnimations } from '@angular/platform-browser/animations';

import { RoleSelectionComponent } from './role-selection/role-selection.component';
import { UserGuard } from './auth/user.guard';
import { AdminGuard } from './auth/admin.guard';

@NgModule({
declarations:[AppComponent,
  
],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    GridItemsComponent,
    UpdateItemsComponent,
    SuccessMessageComponent,
    DeleteItemComponent,
    PageItemsComponent,
    UploadComponent,
    ItemFunctionsComponent,
    RouterOutlet,
    RouterModule.forRoot(routes),
    AuthComponent,
    ReactiveFormsModule,
    RoleSelectionComponent,


  
],
  bootstrap:[AppComponent],
providers:[UserGuard,AdminGuard,
  provideAnimations(),
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }


]

})

export class AppModule{
  
}



