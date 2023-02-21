import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-galleryVideo-add',
  templateUrl: './galleryVideo-add.component.html',
  styleUrls: ['./galleryVideo-add.component.css']
})
export class GalleryVideoAddComponent implements OnInit {

 //Pangation
 tatalRecords: any;
 page: number = 1;

 VideoName: string = "غير محدد";
 VideoSize: number = 0;
 VideoType: string = "غير محدد";

 VideoSrc: string = "https://yewtree-farm.com/wp-content/uploads/2020/10/placeholder-square.jpg";
 AddVideoForm: FormGroup = new FormGroup({});

 Video_list: any = [];

 CanUpload:string = "";
 lb_Upload:string = "تحميل الفيديو";


 constructor(private http: HttpClient) { }

 ngOnInit() {
   this.createVideoForm();
   this.GetVideoList();
 }

 createVideoForm() {
   this.AddVideoForm = new FormGroup({
     id: new FormControl(1),
     Video: new FormControl(null, [Validators.required]),
     VideoSrc: new FormControl(this.VideoSrc, []),
     name: new FormControl(this.VideoName, []),
     size: new FormControl(this.VideoSize, []),
     type: new FormControl(this.VideoType, [])
   })
 }

 deleteVideo(id: any) {
   var formData: any = new FormData();
   formData.append("id", id);

   this.http.post(environment.baseUrl + '/api/Gallery/UpdateVideoData.ashx', formData).subscribe(
     (response) => {
       console.log(response);
       this.GetVideoList();
       this.resetForm();
     },
     (error) => console.log(error)
   )
 }

 onFileChange(files: FileList) {
   const reader = new FileReader();
   if (files) {
     this.AddVideoForm.patchValue({
       size: this.VideoSize = files[0].size / 1000,
       name: this.VideoName = files[0].name,
       type: this.VideoType = files[0].type,
     })

     reader.readAsDataURL(files[0]);
     reader.onload = () => {
       //this.VideoSrc = reader.result as string;
       this.AddVideoForm.patchValue({
         VideoSrc: reader.result
       });
     };
   }
   else
     this.resetForm();
 }

 uploadVideo() {
   //this.addImage(this.AddImageForm.value);
   this.lb_Upload = "جاري التحميل";
   this.CanUpload = "disable-btn";
   var formData: any = new FormData();
   formData.append("name", this.AddVideoForm.get('name')?.value);
   formData.append("size", this.AddVideoForm.get('size')?.value);
   formData.append("type", this.AddVideoForm.get('type')?.value);
   formData.append("VideoSrc", this.AddVideoForm.get('VideoSrc')?.value);
   formData.append("Video", this.AddVideoForm.get('Video')?.value);


   this.http.post(environment.baseUrl + '/api/Gallery/UpdateVideoData.ashx', formData).subscribe(
     (response) => {
       console.log(response);
       this.GetVideoList();
       this.resetForm();
     },
     (error) => console.log(error)
   )
 }

 resetForm() {
   this.AddVideoForm.reset();
   this.VideoSrc = "https://yewtree-farm.com/wp-content/uploads/2020/10/placeholder-square.jpg";
   this.VideoSize = 0
   this.VideoName = "";
   this.VideoType = "";

 }

 GetVideoList() {
  this.lb_Upload = "تحميل فيديو";
   this.CanUpload = "";
   this.http.get(environment.baseUrl + '/api/Gallery/GetVideoData.ashx').subscribe(
     data => {
       var jsonInfo = JSON.stringify(data);
       this.Video_list = JSON.parse(jsonInfo);
     }
   )
 }

}
