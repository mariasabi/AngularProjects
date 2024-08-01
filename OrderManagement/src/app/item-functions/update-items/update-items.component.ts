import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemData } from '../../item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from "../../error-message/error-message.component";
import { SuccessMessageComponent } from "../../success-message/success-message.component";
@Component({
  selector: 'app-update-items',
  standalone: true,
  imports: [FormsModule, CommonModule, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './update-items.component.html',
  styleUrl: './update-items.component.css'
})
export class UpdateItemsComponent{
@Output() update=new EventEmitter<ItemData>();
@Input() buttonName!:string;
itemData:ItemData={
  id:0,
  name:'',
  type:'',
  quantity:0,
  price:0
};
displayError=false;
checkUndefined(): boolean{
  return this.itemData.name!='' && this.itemData.type!='' && this.itemData.quantity!=undefined && this.itemData.price!=undefined
}

onSubmit(){
  this.displayError=false;
  console.log(this.itemData);
  if(this.buttonName=='Update')
  {
    if(this.checkUndefined() && this.itemData.id!=undefined )
      {
        this.update.emit(this.itemData);
      }
      else
      {
        this.displayError=true;
      }
  }
  else if(this.buttonName=='Insert')
  {
    if(this.checkUndefined())
      {
        this.update.emit(this.itemData);
      }
      else
      {
        this.displayError=true;
      }
  }
  
  }
        
}
