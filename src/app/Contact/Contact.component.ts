
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})

export class ContactComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];

  company:any;

  ContactForm: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit()
  {
    this.CreateForm();
    this.getBasicData();
  }

  CreateForm() {
    this.ContactForm = new FormGroup({
      UserName: new FormControl(null, [Validators.required]),
      Email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      Mobile: new FormControl(null, [Validators.required]),
      Subject:new FormControl(null, [Validators.required]),
      InquiryText: new FormControl(null, [Validators.required]),
    });
  }

  OnSubmit() {

    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("UserName", this.ContactForm.get('UserName')?.value);
    formData.append("Mobile", this.ContactForm.get('Mobile')?.value);
    formData.append("Subject", this.ContactForm.get('Subject')?.value);
    formData.append("InquiryText", this.ContactForm.get('InquiryText')?.value);


    this.http.post(environment.baseUrl + '/api/CS/Set/ContactForm.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url + '/' + response]);
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => console.log(error)
    )
  }

  getBasicData() {

    this.http.get(environment.baseUrl + '/API/Contact/SendEmail.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var ContactForm = Data[0];
    if (ContactForm)
      this.ContactForm.patchValue({
        UserName: ContactForm.UserName,
        Email: ContactForm.Email,
        Mobile: ContactForm.Mobile,
        Subject: ContactForm.Subject,
        InquiryText: ContactForm.age,
      });
  }

}



