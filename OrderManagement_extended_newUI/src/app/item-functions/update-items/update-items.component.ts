import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemData } from '../../item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from "../../error-message/error-message.component";
import { SuccessMessageComponent } from "../../success-message/success-message.component";
import '@angular/localize/init'; 

@Component({
  selector: 'app-update-items',
  standalone: true,
  imports: [FormsModule, CommonModule, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './update-items.component.html',
  styleUrl: './update-items.component.css'
})
 export class UpdateItemsComponent{

@Output() update=new EventEmitter<FormData>();
@Input() buttonName!:string;
message!:string;
types: string[] = ['Snacks','Chocolates','Gum','Candy','Beverages','Stationery','Personal care'];

itemData:ItemData={
  id:0,
  name:'',
  type:'',
  quantity:0,
  price:0,
  image:null
};
displayError=false;
constructor(){
  this.itemData.type = this.types[0];
}
checkUndefined(): boolean{
  return this.itemData.name!='' && this.itemData.type!='' && this.itemData.quantity!=undefined && this.itemData.price!=undefined && this.itemData.image!=null
}
onImageSelected($event: Event) {
  const input = $event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.itemData.image = input.files[0];  // Capture the selected file
  }
  }
  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('id', this.itemData.id.toString());
    formData.append('name', this.itemData.name.toString());
    formData.append('type', this.itemData.type.toString());
    formData.append('quantity', this.itemData.quantity.toString());
    formData.append('price', this.itemData.price.toString());
    if (this.itemData.image) {
      formData.append('image', this.itemData.image);
    }
    return formData;
  }
onSubmit(){
  this.displayError=false;

  if (this.checkUndefined()) {

    const formData = this.createFormData();
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  if(this.buttonName=='Update')
  {
    if(this.checkUndefined() && this.itemData.id!=undefined )
      {
       
        this.update.emit(formData);
      }
      else
      {
        this.displayError=true;
        this.message="Please enter all fields!";
      }
  }
  else if(this.buttonName=='Insert')
  {
    if(this.checkUndefined())
      {
        
        this.update.emit(formData);
      }
      else
      {
        this.displayError=true;
        this.message="Please enter all fields!";
      }
  }
  
  }
}}

