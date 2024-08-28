import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {AgGridAngular}  from 'ag-grid-angular';
import { ItemData } from '../../item.model';
import { ColDef } from 'ag-grid-community';



@Component({
  selector: 'app-grid-items',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './grid-items.component.html',
  styleUrl: './grid-items.component.css'
})
export class GridItemsComponent{ //implements OnChanges{
    @Input({required: true}) itemData!: ItemData[];
  
    colDefs: ColDef[] = [
      { field: 'id', headerName: 'ID', flex: 1, autoHeight: true },
      { field: 'name', headerName: 'Name', flex: 1, autoHeight: true },
      { field: 'type', headerName: 'Type', flex: 1, autoHeight: true },
      { field: 'quantity', headerName: 'Quantity', flex: 1, autoHeight: true },
      { field: 'price', headerName: 'Price', flex: 1, autoHeight: true }
    ];
  
    gridOptions = {
      defaultColDef: {
        resizable: true,
        wrapText: true,
        autoHeight: true
      }
    };
}




