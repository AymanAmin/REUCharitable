import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Footer',
  templateUrl: './Footer.component.html',
  styleUrls: ['./Footer.component.css']
})
export class FooterComponent implements OnInit {

  IsLogin:boolean = false;
  company:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getCompanyInfo ();

    // Check if user login
    this.CheckIfLogin();
  }

  getCompanyInfo() {
    this.http.get(environment.baseUrl + '/api/CompanyInfo/GetData.ashx').subscribe(
      data => {
        this.company = JSON.parse(JSON.stringify(data));
      }
    )
  }

  CheckIfLogin(){
    let token = localStorage.getItem('token');
    if(token)
      this.IsLogin = true;
  }

  Logout()
  {
    localStorage.removeItem('token');
    this.CheckIfLogin();
    window.location.href = '/';
  }

}
