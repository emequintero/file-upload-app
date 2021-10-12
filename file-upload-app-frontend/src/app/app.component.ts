import { Component, OnInit } from '@angular/core';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'file-upload-app-frontend';
  fileToUpload: any;
  uploadedFiles: string[] = [];
  constructor(public fileService: FileService) {
  }
  ngOnInit(): void {
    this.fileService.getUploadedFileNames().subscribe(response => {
      this.uploadedFiles = response as string[];
    });
  }

  changeFileSelection = (event: any) => {
    /* 
      file inputs store files under event.target.files 
      we use the [0] to get the first file in the event.target.files array 
      because we're only uploading one file
    */
    let selectedFile = event.target.files[0];
    //store the selected file
    this.fileToUpload = selectedFile;
    console.log(selectedFile)
  }

  uploadFile = () => {
    //File uploads need to be in a FormData object to be send in requests
    let payload = new FormData();
    //add the file to upload to the payload
    /*
      Parameters:
      input name (same as multer is expecting)
      file binary
      file name
    */
    payload.append("file_to_upload", this.fileToUpload, this.fileToUpload.name);
    //send the file to our server
    this.fileService.uploadFile(payload).subscribe(response => {
      console.log("Successfully uploaded file :)");
      //add file name to uploadedFiles array so we can display the image in the HTML
      this.uploadedFiles.push(this.fileToUpload.name);
    });

  }

}
