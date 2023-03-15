
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

  Contact: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit()
  {
    this.CreateForm();

  }

  CreateForm() {
    this.Contact = new FormGroup({
      UserName: new FormControl(null, [Validators.required]),
      Email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      Mobile: new FormControl(null, [Validators.required]),
      Subject:new FormControl(null, [Validators.required]),
      InquiryText: new FormControl(null, [Validators.required]),
    });
  }

  OnSubmit() {

    var formData: any = new FormData();

    formData.append("UserName", this.Contact.get('UserName')?.value);
    formData.append("Mobile", this.Contact.get('Mobile')?.value);
    formData.append("Subject", this.Contact.get('Subject')?.value);
    formData.append("InquiryText", this.Contact.get('InquiryText')?.value);


    this.http.post(environment.baseUrl + '/API/Contact/SendEmail.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
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



  fillData(Data: any) {
    var Contact = Data[0];
    if (Contact)
      this.Contact.patchValue({
        UserName: Contact.UserName,
        Email: Contact.Email,
        Mobile: Contact.Mobile,
        Subject: Contact.Subject,
        InquiryText: Contact.age,
      });
  }

}



