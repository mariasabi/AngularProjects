import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from '../../error-message/error-message.component';
@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [FormsModule,CommonModule,ErrorMessageComponent],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent {
  @Output() delete=new EventEmitter<any>();
  @Input() buttonName!:string;
  message!:string;
  displayError:boolean=false;
  id:number=0;
  username:string='';
  onSubmit(){
    if(this.buttonName=='Get User By Username')
    {
      if(this.username!='')
      {
        this.delete.emit(this.username);
      }
      else
        {
          this.displayError=true;
          this.message=$localize`Please enter Username!`;
        }
    }
    else
    {
      if(this.id!=undefined )
        {
          this.delete.emit(this.id);
        }
        else
        {
          this.displayError=true;
          this.message=$localize`Please enter Id!`;
        }
    }
   
  }
}
