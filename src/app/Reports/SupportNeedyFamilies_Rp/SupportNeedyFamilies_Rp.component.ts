import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-SupportNeedyFamilies_Rp',
  templateUrl: './SupportNeedyFamilies_Rp.component.html',
  styleUrls: ['./SupportNeedyFamilies_Rp.component.css']
})
export class SupportNeedyFamilies_RpComponent implements OnInit {

  CS_Code:string = this.route.snapshot.params['id'];
  TitleReport:any;
  BasicInfo:any;
  BankData:any;
  FinancialSituation:any;
  FamilyMemberData:any;
  ServicesFamilies:any;
  RelatedPersonData:any;
  Massage:any;
  FilesData:any;
  HouseInfo:any;
  PatientHealth: any;
  PatientNeeds:any;
  OtherPatientConditions:any;
  ServicesPatients:any;



  constructor(private http: HttpClient, private route: ActivatedRoute,private titleService:Title) {}

  ngOnInit() {
    this.getBasicData();
    this.getBankData();
    this.getFinancialSituationData();
    this.getFamilyMemberData();
    this.getServicesFamiliesData();
    this.getRelatedPersonData();
    this.getDataMassage();
    this.getFilesData();
    this.getHouseInfoData();
    this.getPatientHealthData();
    this.getPatientNeedsData();
    this.getOtherPatientConditionsData();
    this.getServicesPatientsData();

  }

  getBasicData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/BasicInfoData.ashx?CS_Code=' + this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        var Result = JSON.parse(jsonInfo);

        this.titleService.setTitle('' + Result[0].Full_Name);
        const myArray = Result[0].FormName.split("/");
        if (myArray[2] == "SupportNeedyFamilies")
          this.TitleReport = "طلب دعم مقطوع";
        else if (myArray[2] == "InstitutionBenefitForm")
          this.TitleReport = "طلب دعم حالة مرضية";
        else if (myArray[2] == "RestorationHomeForm")
          this.TitleReport = "طلب دعم ترميم مسكن";

        this.BasicInfo = Result[0];
       // console.log(this.BasicInfo);
      }
    )
  }

  getDataMassage() {
    this.http.get(environment.baseUrl + '/api/CS/Get/PatientMassage.ashx?CS_Code=' + this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let Result = JSON.parse(jsonInfo);
        this.Massage = Result[0].PatientMassage;
      }
    )
  }


  getBankData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/BankInfoData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        var Result =  JSON.parse(jsonInfo);
        this.BankData = Result[0];
        //console.log(this.BankData);
      }
    )
  }

  getFinancialSituationData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/FinancialSituationData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        var Result =  JSON.parse(jsonInfo);
        this.FinancialSituation = Result[0];
        //console.log(this.FinancialSituation);
      }
    )
  }

  getFamilyMemberData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/FamilyMembersData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.FamilyMemberData = JSON.parse(jsonInfo);
        //console.log(this.FamilyMemberData[0]);
      }
    )
  }


  getRelatedPersonData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/RelatedPersonData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.RelatedPersonData = JSON.parse(jsonInfo);
        //console.log(this.RelatedPersonData[0]);
      }
    )
  }


  getFilesData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/PatientFilesData.ashx?CS_Code=' + this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.FilesData = JSON.parse(jsonInfo);
        //console.log(this.FilesData);
      }
    )
  }

  getHouseInfoData() {

    this.http.get(environment.baseUrl + '/api/HouseRenovation/Get/HouseInfoData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let Result = JSON.parse(jsonInfo);
        this.HouseInfo = Result[0];
        console.log(this.HouseInfo);
      }
    )
  }

  getPatientHealthData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/PatientHealthData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let Result = JSON.parse(jsonInfo);
        this.PatientHealth =  Result[0];
        console.log(this.PatientHealth);
      }
    )
  }

  getPatientNeedsData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/PatientNeedsData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let Result = JSON.parse(jsonInfo);
        this.PatientNeeds= Result[0];
        console.log(this.PatientNeeds);
      }
    )
  }


  getOtherPatientConditionsData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/OtherPatientConditionsData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let Result = JSON.parse(jsonInfo);
        this.OtherPatientConditions= Result[0];
        console.log(this.OtherPatientConditions);
      }
    )
  }

  getServicesFamiliesData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/OurServicesData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        var Result =  JSON.parse(jsonInfo);
        this.ServicesFamilies = Result[0];
        //console.log(this.ServicesFamilies);
      }
    )
  }


  getServicesPatientsData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/OtherServiceProvidersData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let Result = JSON.parse(jsonInfo);
        this.ServicesPatients=Result[0];
        //console.log(this.ServicesPatients);
      }
    )
  }

}
