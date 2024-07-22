import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ItemData } from '../item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-delete-item',
  standalone: true,
  imports: [FormsModule,ErrorMessageComponent,CommonModule],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.css'
})
export class DeleteItemComponent {
@Output() delete=new EventEmitter<number>();
@Input() buttonName!:string;
displayError:boolean=false;
id:number=0;
onSubmit(){
  if(this.id!=undefined )
    {
      this.delete.emit(this.id);
    }
    else
    {
      this.displayError=true;
    }
}
}
