import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-YearlyReports',
  templateUrl: './YearlyReports.component.html',
  styleUrls: ['./YearlyReports.component.css']
})
export class YearlyReportsComponent implements OnInit {

  listReports:any;
   //Pangation
   tatalRecords: any;
   page:number = 1;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.GetFileList();
  }

  GetFileList(){
      this.http.get(environment.baseUrl + '/api/YearlyReport/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.listReports = JSON.parse(jsonInfo);
      }
    )
  }

}
