import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-role-selection',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.css',
  encapsulation: ViewEncapsulation.None
})
export class RoleSelectionComponent {
  constructor(public dialogRef: MatDialogRef<RoleSelectionComponent>) { }

  loginAsAdmin() {
      this.dialogRef.close('Admin');
  }

  loginAsUser() {
      this.dialogRef.close('User');
  }
}
