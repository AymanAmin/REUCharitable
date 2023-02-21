import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-SliderImg',
  templateUrl: './SliderImg.component.html',
  styleUrls: ['./SliderImg.component.css']
})
export class SliderImgComponent implements OnInit {

  company:any;
  about:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getCompanyInfo ();

  }

  getCompanyInfo() {
    this.http.get(environment.baseUrl + '/api/CompanyInfo/GetData.ashx').subscribe(
      data => {
        this.company = JSON.parse(JSON.stringify(data));
        this.about = decodeURIComponent(atob(this.company.about));
      }
    )
  }

}
