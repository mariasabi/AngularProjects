import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { ShortItem } from '../../item.model';
import { ItemCardComponent } from "../item-card/item-card.component";

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [ItemCardComponent],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent {
  category!: string|null;
  loading: boolean = false; 
  itemData:ShortItem[]=[];
  constructor(private route: ActivatedRoute,private apiService:ApiService) {}

  async ngOnInit() {
    
    this.category = this.route.snapshot.paramMap.get('type');
    console.log(this.category);
    this.loading=true;
       await this.apiService.getItems()
        .then((data: any[]) => {
          this.itemData=data.filter(item => item.type === this.category);
          this.loading=false;
          console.log(this.itemData);
    })
    .catch((error)=>{
      console.error('Error fetching items:', error);
      this.loading = false;
    });
  }
}
