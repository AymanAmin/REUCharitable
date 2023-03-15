import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Contact',
  templateUrl: './Contact.component.html',
  styleUrls: ['./Contact.component.css']
})
export class ContactComponent implements OnInit {

  company:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getCompanyInfo ();
  }

  getCompanyInfo() {
    this.http.get(environment.baseUrl + '/api/CompanyInfo/GetData.ashx').subscribe(
      data => {
        this.company = JSON.parse(JSON.stringify(data));
        //console.log("companyInfo : "+this.company);
      }
    )
  }

}
