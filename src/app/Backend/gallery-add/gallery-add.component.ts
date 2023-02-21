import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.css']
})
export class GalleryAddComponent implements OnInit {

  //Pangation
  tatalRecords: any;
  page: number = 1;

  imageName: string = "غير محدد";
  imageSize: number = 0;
  imageType: string = "غير محدد";

  imageSrc: string = "https://yewtree-farm.com/wp-content/uploads/2020/10/placeholder-square.jpg";
  AddImageForm: FormGroup = new FormGroup({});

  image_list: any = [];


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.createImageForm();
    this.GetImageList();
  }

  createImageForm() {
    this.AddImageForm = new FormGroup({
      id: new FormControl(1),
      img: new FormControl(null, [Validators.required]),
      imageSrc: new FormControl(this.imageSrc, []),
      name: new FormControl(this.imageName, []),
      size: new FormControl(this.imageSize, []),
      type: new FormControl(this.imageType, []),

    })
  }

  deleteImage(id: any) {
    var formData: any = new FormData();
    formData.append("id", id);

    this.http.post(environment.baseUrl + '/api/Gallery/UpdateData.ashx', formData).subscribe(
      (response) => {
        console.log(response);
        this.GetImageList();
        this.resetForm();
      },
      (error) => console.log(error)
    )
  }

  onFileChange(files: FileList) {
    const reader = new FileReader();
    if (files) {
      this.AddImageForm.patchValue({
        size: this.imageSize = files[0].size / 1000,
        name: this.imageName = files[0].name,
        type: this.imageType = files[0].type,
      })

      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.AddImageForm.patchValue({
          imageSrc: reader.result
        });
      };
    }
    else
      this.resetForm();
  }

  uploadImage() {
    //this.addImage(this.AddImageForm.value);
    var formData: any = new FormData();
    formData.append("name", this.AddImageForm.get('name')?.value);
    formData.append("size", this.AddImageForm.get('size')?.value);
    formData.append("type", this.AddImageForm.get('type')?.value);
    formData.append("imageSrc", this.AddImageForm.get('imageSrc')?.value);
    formData.append("img", this.AddImageForm.get('img')?.value);
    this.http.post(environment.baseUrl + '/api/Gallery/UpdateData.ashx', formData).subscribe(
      (response) => {
        console.log(response);
        this.GetImageList();
        this.resetForm();
      },
      (error) => console.log(error)
    )
  }

  resetForm() {
    this.AddImageForm.reset();
    this.imageSrc = "https://yewtree-farm.com/wp-content/uploads/2020/10/placeholder-square.jpg";
    this.imageSize = 0
    this.imageName = "";
    this.imageType = "";

  }

  GetImageList() {
    this.http.get(environment.baseUrl + '/api/Gallery/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.image_list = JSON.parse(jsonInfo);
      }
    )
  }

}
