import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-InstitutionBenefitForm',
  templateUrl: './InstitutionBenefitForm.component.html',
  styleUrls: ['./InstitutionBenefitForm.component.css']
})
export class InstitutionBenefitFormComponent implements OnInit {

    BasicInfo_step: string = "4-1";
    BankInfo_step:string ="4-2";
    FinancialSituation_step: string ="4-3";
    FamilyMembers_step:string ="4-4";
    PatientHealth_step:string ="4-5";
    PatientNeeds_step :string ="4-6";
    OtherPatientConditions_step: string ="4-7";
    OurServices_step:string ="4-8";
    OtherServiceProviders_step : string="4-9";
    PatientFiles_step :string="4-10";


    current_step: string = "4-1";
    viewAll: boolean = false;
    CS_Code: string = this.route.snapshot.params['id'];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(this.CS_Code);
    if(this.CS_Code != undefined)
      this.getBasicData();
  }

  getBasicData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/BasicInfoData.ashx?CS_Code=' + this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        var MainInfoData = JSON.parse(jsonInfo);
        console.log(MainInfoData[0].Step)
        const myArray = MainInfoData[0].Step.split("-");

        let last_step = parseInt(myArray[1]) + 1;
        if (last_step == 11)
          this.viewAll = true;

        this.current_step = myArray[0] + "-" + last_step;
      }
    );
  }

}
