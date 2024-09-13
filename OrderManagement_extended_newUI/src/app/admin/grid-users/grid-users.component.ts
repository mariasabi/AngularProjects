import { Component, OnInit, ViewChild } from '@angular/core';
import { UserData } from '../user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DELETE_SUCESS, NO_USER, UNAUTHORIZED, USER_ADMIN, USER_DELETED, USER_NOT_FOUND } from '../../constants/notifications';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-grid-users',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule ,MatTooltipModule,MatPaginator,MatSort,MatTableModule,CommonModule,MatButtonModule],
  templateUrl: './grid-users.component.html',
  styleUrl: './grid-users.component.css'
})
export class GridUsersComponent implements OnInit{

 userData!: UserData[];
 colDefs: string[] = [];
 dataSource = new MatTableDataSource<UserData>();
 totalUsers=0;
 pageSizeOptions: any;
 @ViewChild(MatPaginator) paginator!: MatPaginator;
 @ViewChild(MatSort) sort!:MatSort;
// colDefs: ColDef[] = ['id','username','email','role'];
constructor(public apiService:ApiService,private toastr:ToastrService){}

async ngOnInit() {

  try{
        this.userData= await this.apiService.getUsers();
        this.totalUsers = this.userData.length; 
        this.pageSizeOptions=this.getPageSizeOptions(this.totalUsers);
        this.colDefs = this.createColDefs(this.userData);
        this.loadData();
     }
      catch(error) {          
        console.error('Error fetching items:', error);
      }
}
loadData() {
  try {  
    this.dataSource = new MatTableDataSource(this.userData);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort = this.sort;
   } 
   catch (error) {
    console.error(error);
  }
};
getPageSizeOptions(totalItems: number): number[] {
  return Array.from({ length: totalItems }, (_, i) => i + 1);
}
  createColDefs(data: UserData[]): string[] {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }
  async deleteUser(user: UserData) {
    try{
      const userName=user.username;
      await this.apiService.deleteUser(userName);
    
      this.toastr.success(USER_DELETED,DELETE_SUCESS, {
        timeOut: 3000,
        positionClass: 'toast-top-right'
      });
    }
    catch(error:any){
      console.error('Error from server: ',error);
      if(error.status==400)  
      {
        this.toastr.error(NO_USER, USER_NOT_FOUND, {
          timeOut: 3000,
           positionClass: 'toast-top-right'
        });
      }
      else if(error.status==401)
      {
        this.toastr.error(USER_ADMIN, UNAUTHORIZED, {
          timeOut: 3000,
           positionClass: 'toast-top-right'
        });
      }
      else
      console.log(error.message);
    }
  }
  applyFilter(event:KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value;
    this.dataSource.filter=filterValue.trim().toLowerCase();
    }
}
