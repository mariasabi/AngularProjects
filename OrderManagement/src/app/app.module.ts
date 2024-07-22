import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridItemsComponent } from "./grid-items/grid-items.component";
import { UpdateItemsComponent } from "./update-items/update-items.component";
import { SuccessMessageComponent } from "./success-message/success-message.component";
import { DeleteItemComponent } from "./delete-item/delete-item.component";

@NgModule({
declarations:[AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    GridItemsComponent,
    UpdateItemsComponent,
    SuccessMessageComponent,
    DeleteItemComponent
],
  bootstrap:[AppComponent]

})
export class AppModule{
  
}



