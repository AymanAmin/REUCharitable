import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-YearlyReport-add',
  templateUrl: './YearlyReport-add.component.html',
  styleUrls: ['./YearlyReport-add.component.css']
})
export class YearlyReportAddComponent implements OnInit {

  //Pangation
  tatalRecords: any;
  page:number = 1;

  fileName: string = "غير محدد";
  fileSize: number = 0;
  fileType: string = "غير محدد";

  fileList: any;
  fileSrc: string = "https://yewtree-farm.com/wp-content/uploads/2020/10/placeholder-square.jpg";
  AddFileForm: FormGroup = new FormGroup({});
  Pdf:string = "";

  file_list: any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.createImageForm();
    this.GetFileList();
  }

  createImageForm() {
    this.AddFileForm = new FormGroup({
      id:new FormControl(1),
      img: new FormControl(null, [Validators.required]),
      imageSrc: new FormControl(this.fileSrc, []),
      name: new FormControl(this.fileName, []),
      size: new FormControl(this.fileSize, []),
      type: new FormControl(this.fileType, []),
    })
  }

  deleteFile(id: any) {
    var formData: any = new FormData();
    formData.append("id", id);

    this.http.post(environment.baseUrl + '/api/YearlyReport/UpdateData.ashx', formData).subscribe(
      (response) => {
        console.log(response);
        this.GetFileList();
        this.resetForm();
      },
      (error) => console.log(error)
    )
  }

  onFileChange(files: FileList) {
    const reader = new FileReader();
    if (files) {
      this.AddFileForm.patchValue({
        size: this.fileSize = files[0].size/1000,
        name: this.fileName = files[0].name,
        type: this.fileType = files[0].type,
      })

      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        //this.fileSrc = reader.result as string;
        this.fileSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1200px-PDF_file_icon.svg.png";
        this.AddFileForm.patchValue({
          imageSrc: reader.result
        });
      };
    }
    else
    this.resetForm();
  }

  uploadFile() {
    this.addFile();
  }

  resetForm(){
    this.AddFileForm.reset();
    this.fileSrc = "https://yewtree-farm.com/wp-content/uploads/2020/10/placeholder-square.jpg";
    this.fileSize = 0
    this.fileName = "";
    this.fileType = "";

  }

  addFile() {
    var formData: any = new FormData();
    formData.append("name", this.AddFileForm.get('name')?.value);
    formData.append("size", this.AddFileForm.get('size')?.value);
    formData.append("type", this.AddFileForm.get('type')?.value);
    formData.append("imageSrc", this.AddFileForm.get('imageSrc')?.value);
    formData.append("img", this.AddFileForm.get('img')?.value);

    this.http.post(environment.baseUrl + '/api/YearlyReport/UpdateData.ashx', formData).subscribe(
      (response) => {
        console.log(response);
        this.GetFileList();
        this.resetForm();
      },
      (error) => console.log(error)
    )
  }

  GetFileList(){
    this.http.get(environment.baseUrl + '/api/YearlyReport/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.file_list = JSON.parse(jsonInfo);
      }
    )
  }
}
