import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-OrganizationChart',
  templateUrl: './OrganizationChart.component.html',
  styleUrls: ['./OrganizationChart.component.css']
})
export class OrganizationChartComponent implements OnInit {

  constructor(private http: HttpClient) { }

  FileSrc: any;
  ngOnInit() {
    this.GetOrgChartFile();
  }

  GetOrgChartFile() {
    this.http.get(environment.baseUrl + '/api/OrganizationChart/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.FileSrc = MainInfoData.imageSrc;

      }
    )
  }

}
