import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support-needy-families',
  templateUrl: './support-needy-families.component.html',
  styleUrls: ['./support-needy-families.component.css']
})
export class SupportNeedyFamiliesComponent implements OnInit {

  BasicInfo_step: string  = "1-1";
  BankInfo_step: string  = "1-2";
  FinancialSituation_step: string  = "1-3";
  FamilyMembers_step: string  = "1-4";
  related_person_step: string  = "1-5";
  servicesfamilies_step: string  = "1-6";
  needyfamiliesfile_step: string  = "1-7";

  current_step : string= "1-1";
  viewAll:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getBasicData();
  }

  getBasicData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/BasicInfoData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        var MainInfoData = JSON.parse(jsonInfo);
        const myArray = MainInfoData[0].Step.split("-");

        let last_step = parseInt(myArray[1]) + 1;
        if(last_step == 8 || localStorage.getItem("token") != null)
          this.viewAll = true;

         this.current_step = myArray[0] + "-"+ last_step;
      }
    )
  }

}
