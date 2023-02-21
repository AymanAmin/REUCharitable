import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-PatientHealth',
  templateUrl: './PatientHealth.component.html',
  styleUrls: ['./PatientHealth.component.css']
})
export class PatientHealthComponent implements OnInit {
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  PatientHealthForm: FormGroup = new FormGroup({});
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
    this.PatientHealthForm = new FormGroup({
      Disease_Type: new FormControl(null, [Validators.required]),
      Injury_Date: new FormControl(null, [Validators.required]),
      Hostiptal_Name: new FormControl(null),
      City: new FormControl(null),
      File_No: new FormControl(null),
      Remedies: new FormControl("لم يخضع"),
      Past_Remedies: new FormControl("لم يوجد"),
      Current_Remedies: new FormControl("لم يوجد"),
      Patient_Condition: new FormControl("جيدة"),
      Self_Service: new FormControl("يخدم نفسه بنفسه"),
      Home_Care: new FormControl("لا يتلقى"),
      Senses_Speech_Integrity: new FormControl("سليم"),
      Other_Diseases: new FormControl("لا يوجد"),
      Brief_Medical_Description: new FormControl(null)
    });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/PatientHealthData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var PatientHealthData = Data[0];
    if (PatientHealthData)
      this.PatientHealthForm.patchValue({
        Disease_Type: PatientHealthData.Disease_Type,
        Injury_Date: PatientHealthData.Injury_Date,
        Hostiptal_Name: PatientHealthData.Hostiptal_Name,
        City: PatientHealthData.City,
        File_No: PatientHealthData.File_No,
        Remedies: PatientHealthData.Remedies,
        Past_Remedies: PatientHealthData.Past_Remedies,
        Current_Remedies: PatientHealthData.Current_Remedies,
        Patient_Condition: PatientHealthData.Patient_Condition,
        Self_Service: PatientHealthData.Self_Service,
        Home_Care: PatientHealthData.Home_Care,
        Senses_Speech_Integrity: PatientHealthData.Senses_Speech_Integrity,
        Other_Diseases: PatientHealthData.Other_Diseases,
        Brief_Medical_Description: PatientHealthData.Brief_Medical_Description
      });
  }

  OnSubmit() {
    console.log(this.PatientHealthForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Disease_Type", this.PatientHealthForm.get('Disease_Type')?.value);
    formData.append("Injury_Date", this.PatientHealthForm.get('Injury_Date')?.value);
    formData.append("Hostiptal_Name", this.PatientHealthForm.get('Hostiptal_Name')?.value);
    formData.append("City", this.PatientHealthForm.get('City')?.value);
    formData.append("File_No", this.PatientHealthForm.get('File_No')?.value);
    formData.append("Remedies", this.PatientHealthForm.get('Remedies')?.value);
    formData.append("Past_Remedies", this.PatientHealthForm.get('Past_Remedies')?.value);
    formData.append("Current_Remedies", this.PatientHealthForm.get('Current_Remedies')?.value);
    formData.append("Patient_Condition", this.PatientHealthForm.get('Patient_Condition')?.value);
    formData.append("Self_Service", this.PatientHealthForm.get('Self_Service')?.value);
    formData.append("Home_Care", this.PatientHealthForm.get('Home_Care')?.value);
    formData.append("Senses_Speech_Integrity", this.PatientHealthForm.get('Senses_Speech_Integrity')?.value);
    formData.append("Other_Diseases", this.PatientHealthForm.get('Other_Diseases')?.value);
    formData.append("Brief_Medical_Description", this.PatientHealthForm.get('Brief_Medical_Description')?.value);

    this.http.post(environment.baseUrl + '/api/CS/Set/PatientHealthData.ashx', formData).subscribe(
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
