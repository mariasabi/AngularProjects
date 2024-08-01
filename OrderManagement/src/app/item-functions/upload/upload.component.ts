import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from '../../api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
public message!:string;
public progress!:number;
@Output() public onUploadFinish= new EventEmitter();
constructor(private http:HttpClient, private apiService:ApiService){}

public uploadFile=async (files:any) =>{
  if(files.length===0)
    return;
  let fileToUpload=<File>files[0];
  const formData=new FormData();
  formData.append('file',fileToUpload,fileToUpload.name);
try{
  const event= await this.apiService.bulkInsert(formData);
  if(event!.type===HttpEventType.UploadProgress){
    this.progress=Math.round(100*event!.loaded/ event!.total!);
  }
  else if(event!.type===HttpEventType.Response){
    this.message='Insert success.';
    this.onUploadFinish.emit(event!.body);
  }
}
catch(error){
  this.message='Insert failed.';
}
}
}


