import { Component, EventEmitter, Output } from '@angular/core';
import { ShortItem } from '../../item.model';
import { ApiService } from '../../api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from "../item-card/item-card.component";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, ItemCardComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  searchQuery: string = '';
  items: ShortItem[] = [];
  @Output() searchItems=new EventEmitter<ShortItem[]>();
  constructor(private apiService: ApiService) { }

  onSearch(): void {
    
    this.apiService.searchItem(this.searchQuery)
    .then(async(data:ShortItem[])=>
    {
     this.items=data;
     this.searchItems.emit(this.items);
     this.searchQuery='';
  })
.catch((error)=>{
  if (error.status === 400) {
    console.log('Search key not found');
//Add error for empty key search
  }
  else
  console.error('Error fetching cart items:', error);
}
)
};

}
