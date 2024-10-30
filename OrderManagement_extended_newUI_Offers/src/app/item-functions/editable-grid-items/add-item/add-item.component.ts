import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemData } from '../../../item.model';
import { ApiService } from '../../../api.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ITEM_TYPES } from '../../../constants/item-types';
import { ErrorMessageComponent } from "../../../error-message/error-message.component";
import { INSERT_SUCCESS, ITEM_INSERTED } from '../../../constants/notifications';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorMessageComponent],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  itemData:ItemData={
    id:0,
    name:'',
    type:'',
    quantity:0,
    price:0,
    image:null,
    description:''
  };
  types=ITEM_TYPES
  displayError: boolean=false;
  message!: string;

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiService:ApiService,private toastr:ToastrService
  ) {
    this.itemData.type = this.types[0];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  checkUndefined(): boolean{
    return this.itemData.name!='' && this.itemData.type!='' && this.itemData.quantity!=undefined && this.itemData.price!=undefined && this.itemData.image!=null && this.itemData.description!=''
  }
  onImageSelected($event: Event) {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.itemData.image = input.files[0];  
    }
    }
    private createFormData(): FormData {
      const formData = new FormData();
      formData.append('id', this.itemData.id.toString());
      formData.append('name', this.itemData.name.toString());
      formData.append('type', this.itemData.type.toString());
      formData.append('quantity', this.itemData.quantity.toString());
      formData.append('price', this.itemData.price.toString());
      formData.append('description', this.itemData.description.toString());
      if (this.itemData.image) {
        formData.append('image', this.itemData.image);
      }
      return formData;
    }
  async submitForm(): Promise<void> {
    if (this.checkUndefined()) {
      const formData = this.createFormData();
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
         await this.apiService.insertItems(formData);
         this.toastr.success(ITEM_INSERTED,INSERT_SUCCESS,{ 
           timeOut: 3000,
            positionClass: 'toast-top-right'
         });
         this.dialogRef.close(this.itemData);
        }
      else
        {
          this.displayError=true;
          this.message="Please enter all fields!";
        }
    
  }
}
