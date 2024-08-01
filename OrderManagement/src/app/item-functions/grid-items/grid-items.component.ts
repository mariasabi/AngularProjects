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
export class GridItemsComponent implements OnChanges{
  @Input({required:true}) itemData!: ItemData[];
  colDefs: ColDef[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['itemData']) {
      this.colDefs = this.createColDefs(this.itemData);
    }
  }

  createColDefs(data: ItemData[]): ColDef[] {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map(key => ({ field: key,flex:1,autoHeight: true   }));
  }

  gridOptions = {
    defaultColDef: {
      resizable: true,
      wrapText: true,
      autoHeight: true
    }
}
}



