import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MainInfo } from '../Model/MainInfo';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  IsLogin:boolean = false;
  company!:MainInfo;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.CheckIfLogin();
    this.getCompanyInfo ();
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

}
