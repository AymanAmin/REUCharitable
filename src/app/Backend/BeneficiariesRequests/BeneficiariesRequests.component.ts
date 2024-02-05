import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-BeneficiariesRequests',
  templateUrl: './BeneficiariesRequests.component.html',
  styleUrls: ['./BeneficiariesRequests.component.css']
})
export class BeneficiariesRequestsComponent implements OnInit {

  FormList:any;
  FinalFormList:any;
  RequsetStatus:any = "";RequsetType:any = "";
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.LoadData();
  }

  fillData(Data: any) {
    this.FormList = Data;
  }

  LoadData(){
    this.http.get(environment.baseUrl + '/api/CS/Get/BeneficiariesRequests.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  Delete(CS_Code:any){
    this.http.get(environment.baseUrl + '/API/CS/Delete/D_Request.ashx?Type=1&CS_Code='+CS_Code).subscribe(
      data => {
        this.LoadData();
      }
    )
  }

}
