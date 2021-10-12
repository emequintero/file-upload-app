import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(public http:HttpClient) { }
 
  getUploadedFileNames = () => {
    return this.http.get(environment.apiURL + "/files");
  }
 
  uploadFile = (payload:FormData) => {
    return this.http.post(environment.apiURL + "/upload", payload);
  }

}
