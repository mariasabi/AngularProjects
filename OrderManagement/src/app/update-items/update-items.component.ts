import { Component, EventEmitter, Output } from '@angular/core';
import { ItemData } from '../item.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from "../error-message/error-message.component";
import { SuccessMessageComponent } from "../success-message/success-message.component";
@Component({
  selector: 'app-update-items',
  standalone: true,
  imports: [FormsModule, CommonModule, ErrorMessageComponent, SuccessMessageComponent],
  templateUrl: './update-items.component.html',
  styleUrl: './update-items.component.css'
})
export class UpdateItemsComponent{
@Output() update=new EventEmitter<ItemData>();
itemData:ItemData={
  id:0,
  name:'',
  type:'',
  quantity:0,
  price:0
};
displayError=false;
displaySuccess=false;
onSubmit(){
  console.log(this.itemData);
  let allFieldsDefined = true;
  for (let key in this.itemData) 
    {
      if((typeof key=='number' && key==0)||(typeof key=='string' && key==''))
      {
        allFieldsDefined=false;
        break;
      }
    }
  if(allFieldsDefined && this.itemData.id!=0)
  {
    this.displaySuccess=true;
    this.update.emit(this.itemData);
  }
  else
  {
    this.displayError=true;
  }
  }
        
}
