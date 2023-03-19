
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
message:boolean=false;
  ngOnInit()
  {
    this.getCompanyInfo();
    this.CreateForm();

  }

  getCompanyInfo() {
    this.http.get(environment.baseUrl + '/api/CompanyInfo/GetData.ashx').subscribe(
      data => {
        this.company = JSON.parse(JSON.stringify(data));

        //console.log("companyInfo : "+data);
      });
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
    var Email = this.Contact.get('Email')?.value;
    var UserName = this.Contact.get('UserName')?.value;
    var Mobile = this.Contact.get('Mobile')?.value;
    var Subject = this.Contact.get('Subject')?.value;
    var InquiryText = this.Contact.get('InquiryText')?.value;

    this.http.get('https://store.riyadh.edu.sa:8050/arp/Contact/SendEmail.ashx?Email='+Email+'&UserName='+UserName +'&Mobile='+Mobile +'&Subject='+Subject +'&InquiryText='+InquiryText).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.message=true;
          this.Contact.reset({});
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;

        }
      },
      (error) =>{
        this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
           console.log(error);}
    )

  }
  removeMessage(){
    this.message=false;
  }




}



