import { Component, EventEmitter, Output } from '@angular/core';
import { ShortItem } from '../../item.model';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from "../item-card/item-card.component";
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatTooltip,FormsModule, CommonModule, ItemCardComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchQuery: string = '';
  items: ShortItem[] = [];
  @Output() search=new EventEmitter<string>();
  // @Output() loading=new EventEmitter<boolean>();


onSearch(){
  if (this.searchQuery.trim()) {  
    this.search.emit(this.searchQuery); 
  }
};
clearSearchQuery(): void {
  this.searchQuery = '';  
}
}
