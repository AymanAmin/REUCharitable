import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MainInfo } from 'src/app/Model/MainInfo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-CompanyInfo',
  templateUrl: './CompanyInfo.component.html',
  styleUrls: ['./CompanyInfo.component.css']
})
export class CompanyInfoComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;

  MainInfoFormData: FormGroup = new FormGroup({});
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.CreateForm();
    this.getMainInfoData();
  }

  getMainInfoData() {
    this.http.get(environment.baseUrl + '/api/CompanyInfo/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  CreateForm() {
    this.MainInfoFormData = new FormGroup({
      F_about: new FormControl(null, [Validators.required]),
      F_email: new FormControl(null, [Validators.required]),
      F_location: new FormControl(null, [Validators.required]),
      F_phone: new FormControl(null, [Validators.required]),
      F_phone2: new FormControl(null, [Validators.required]),
      F_twitter: new FormControl(null),
      F_linkedin: new FormControl(null),
      F_youtube: new FormControl(null)
    });
  }

  fillData(MainInfoData: MainInfo) {
    var about = decodeURIComponent(atob(MainInfoData.about));
    if (MainInfoData)
      this.MainInfoFormData.patchValue({
        F_about:about ,
        F_email: MainInfoData.email,
        F_location: MainInfoData.location,
        F_phone: MainInfoData.phone,
        F_phone2: MainInfoData.phone2,
        F_twitter: MainInfoData.twitter,
        F_linkedin: MainInfoData.linkedin,
        F_youtube: MainInfoData.youtube,
      });
  }

  OnSubmit() {
    //console.log(this.MainInfoFormData.value);
    var formData: any = new FormData();
    var about = btoa(encodeURIComponent(this.MainInfoFormData.get('F_about')?.value));
    console.log(about);
    formData.append("about", about);
    formData.append("email", this.MainInfoFormData.get('F_email')?.value);
    formData.append("facebook", this.MainInfoFormData.get('F_facebook')?.value);
    formData.append("linkedin", this.MainInfoFormData.get('F_linkedin')?.value);
    formData.append("location", this.MainInfoFormData.get('F_location')?.value);
    formData.append("phone", this.MainInfoFormData.get('F_phone')?.value);
    formData.append("phone2", this.MainInfoFormData.get('F_phone2')?.value);
    formData.append("twitter", this.MainInfoFormData.get('F_twitter')?.value);
    formData.append("youtube", this.MainInfoFormData.get('F_youtube')?.value);

    this.http.post(environment.baseUrl + '/api/CompanyInfo/UpdateData.ashx', formData).subscribe(
      (response) => {
        if (response == "1" || response == "2") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => console.log(error)
    )
  }



}
