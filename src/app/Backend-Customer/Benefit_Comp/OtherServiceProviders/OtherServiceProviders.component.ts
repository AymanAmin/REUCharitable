import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-OtherServiceProviders',
  templateUrl: './OtherServiceProviders.component.html',
  styleUrls: ['./OtherServiceProviders.component.css']
})
export class OtherServiceProvidersComponent implements OnInit {
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  OtherServiceProvidersForm: FormGroup = new FormGroup({});
  @Input() Step:string = "";

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.CheckIsReady();
    this.CreateForm();
    this.getData();
  }

  CheckIsReady(){
    if(this.CS_Code)
      this.IsReady = true;
  }

  CreateForm() {
    this.OtherServiceProvidersForm = new FormGroup({
      Al_Ber_Charity_Association: new FormControl(false),
      Medical_Authority: new FormControl(false),
      Al_Rajhi_Charitable_Society: new FormControl(false),
      Sanad_Association_Riyadh: new FormControl(false),
      Comprehensive_Rehabilitation_Center: new FormControl(false),
      Social_Insurance: new FormControl(false),
      OtherServicesProvider: new FormControl(""),
      PatientMassage:new FormControl(null),
    
        });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/OtherServiceProvidersData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var OtherServiceProvidersData = Data[0];
    if (OtherServiceProvidersData)
      this.OtherServiceProvidersForm.patchValue({
        Al_Ber_Charity_Association: OtherServiceProvidersData.Al_Ber_Charity_Association,
        Medical_Authority: OtherServiceProvidersData.Medical_Authority,
        Al_Rajhi_Charitable_Society: OtherServiceProvidersData.Al_Rajhi_Charitable_Society,
        Sanad_Association_Riyadh: OtherServiceProvidersData.Sanad_Association_Riyadh,
        Comprehensive_Rehabilitation_Center: OtherServiceProvidersData.Comprehensive_Rehabilitation_Center,
        Social_Insurance: OtherServiceProvidersData.Social_Insurance,
        OtherServicesProvider: OtherServiceProvidersData.OtherServicesProvider,
      });
  }

  OnSubmit() {
    //console.log(this.OurServicesForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Al_Ber_Charity_Association", this.OtherServiceProvidersForm.get('Al_Ber_Charity_Association')?.value);
    formData.append("Medical_Authority", this.OtherServiceProvidersForm.get('Medical_Authority')?.value);
    formData.append("Al_Rajhi_Charitable_Society", this.OtherServiceProvidersForm.get('Al_Rajhi_Charitable_Society')?.value);
    formData.append("Sanad_Association_Riyadh", this.OtherServiceProvidersForm.get('Sanad_Association_Riyadh')?.value);
    formData.append("Comprehensive_Rehabilitation_Center", this.OtherServiceProvidersForm.get('Comprehensive_Rehabilitation_Center')?.value);
    formData.append("Social_Insurance", this.OtherServiceProvidersForm.get('Social_Insurance')?.value);
    formData.append("OtherServicesProvider", this.OtherServiceProvidersForm.get('OtherServicesProvider')?.value);
    formData.append("Step", this.Step);
  

    //console.log(formData);
    this.http.post(environment.baseUrl + '/api/CS/Set/OtherServiceProvidersData.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url + '/' + response]);
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => console.log(error)
    )
  }

}
