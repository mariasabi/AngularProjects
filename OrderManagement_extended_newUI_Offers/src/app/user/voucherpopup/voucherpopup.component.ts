import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-voucherpopup',
  standalone: true,
  imports: [],
  templateUrl: './voucherpopup.component.html',
  styleUrl: './voucherpopup.component.css'
})
export class VoucherpopupComponent {
  message:string="";
  constructor(  public dialogRef: MatDialogRef<VoucherpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,){this.message=data.message}

}
