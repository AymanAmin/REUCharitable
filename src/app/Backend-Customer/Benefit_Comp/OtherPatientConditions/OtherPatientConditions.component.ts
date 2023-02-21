import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-OtherPatientConditions',
  templateUrl: './OtherPatientConditions.component.html',
  styleUrls: ['./OtherPatientConditions.component.css']
})
export class OtherPatientConditionsComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  OtherPatientConditionsForm: FormGroup = new FormGroup({});

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
    this.OtherPatientConditionsForm = new FormGroup({
      Home_Mode: new FormControl("واسع ولائق", [Validators.required]),
      Special_Patient_Supplies: new FormControl("متوفر ولائق", [Validators.required]),
      Patient_Travel_Outside: new FormControl("متوفرة من الاسرة"),
      Nutrition_Food: new FormControl("غير مقيد")
        });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/OtherPatientConditionsData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var OtherPatientConditionsData = Data[0];
    if (OtherPatientConditionsData)
      this.OtherPatientConditionsForm.patchValue({
        Home_Mode: OtherPatientConditionsData.Home_Mode,
        Special_Patient_Supplies: OtherPatientConditionsData.Special_Patient_Supplies,
        Patient_Travel_Outside: OtherPatientConditionsData.Patient_Travel_Outside,
        Nutrition_Food: OtherPatientConditionsData.Nutrition_Food
      });
  }

  OnSubmit() {
    console.log(this.OtherPatientConditionsForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Home_Mode", this.OtherPatientConditionsForm.get('Home_Mode')?.value);
    formData.append("Special_Patient_Supplies", this.OtherPatientConditionsForm.get('Special_Patient_Supplies')?.value);
    formData.append("Patient_Travel_Outside", this.OtherPatientConditionsForm.get('Patient_Travel_Outside')?.value);
    formData.append("Nutrition_Food", this.OtherPatientConditionsForm.get('Nutrition_Food')?.value);

    this.http.post(environment.baseUrl + '/api/CS/Set/OtherPatientConditionsData.ashx', formData).subscribe(
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
