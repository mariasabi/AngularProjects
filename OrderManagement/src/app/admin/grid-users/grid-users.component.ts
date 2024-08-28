import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import {AgGridAngular}  from 'ag-grid-angular';
import { UserData } from '../user.model';

@Component({
  selector: 'app-grid-users',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './grid-users.component.html',
  styleUrl: './grid-users.component.css'
})
export class GridUsersComponent implements OnChanges{
  @Input({required:true}) userData!: UserData[];
 colDefs: ColDef[] = [];
// colDefs: ColDef[] = ['id','username','email','role'];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userData']) {
      this.colDefs = this.createColDefs(this.userData);
    }
  }
  createColDefs(data: UserData[]): ColDef[] {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map(key => ({ field: key,flex:1,autoHeight: true   }));
  }
  // ngOnChanges(changes: SimpleChanges): void {

    
  //    }
  gridOptions = {
    defaultColDef: {
      resizable: true,
      wrapText: true,
      autoHeight: true
    }
}

}
