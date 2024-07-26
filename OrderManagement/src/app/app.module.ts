import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridItemsComponent } from "./grid-items/grid-items.component";
import { UpdateItemsComponent } from "./update-items/update-items.component";
import { SuccessMessageComponent } from "./success-message/success-message.component";
import { DeleteItemComponent } from "./delete-item/delete-item.component";
import { PageItemsComponent } from "./page-items/page-items.component";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UploadComponent } from "./upload/upload.component";

@NgModule({
declarations:[AppComponent],
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
    UploadComponent
],
  bootstrap:[AppComponent]

})
export class AppModule{
  
}



