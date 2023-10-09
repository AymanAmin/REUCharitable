import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-PatientNeeds',
  templateUrl: './PatientNeeds.component.html',
  styleUrls: ['./PatientNeeds.component.css']
})
export class PatientNeedsComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  PatientNeedsForm: FormGroup = new FormGroup({});
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
    this.PatientNeedsForm = new FormGroup({
      Educational_Needs: new FormControl("لا يحتاج", [Validators.required]),
      External_Meetings_Appointments: new FormControl("لا يحتاج", [Validators.required]),
      Medical_Centers_Review: new FormControl("بمفرده"),
      Difficulties_In_Hospital: new FormControl("ترتيب المواعيد"),
      Health_Medical_Needs: new FormControl("لا يحتاج"),
      Support_Services: new FormControl("لا يحتاج"),
      Auxiliary_Devices: new FormControl("لا يحتاج"),
      Psychological_Support: new FormControl("لا يحتاج"),
      Other_Needs: new FormControl("")
        });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/PatientNeedsData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var PatientNeedsData = Data[0];
    if (PatientNeedsData)
      this.PatientNeedsForm.patchValue({
        Educational_Needs: PatientNeedsData.Educational_Needs,
        External_Meetings_Appointments: PatientNeedsData.External_Meetings_Appointments,
        Medical_Centers_Review: PatientNeedsData.Medical_Centers_Review,
        Difficulties_In_Hospital: PatientNeedsData.Difficulties_In_Hospital,
        Health_Medical_Needs: PatientNeedsData.Health_Medical_Needs,
        Support_Services: PatientNeedsData.Support_Services,
        Auxiliary_Devices: PatientNeedsData.Auxiliary_Devices,
        Psychological_Support: PatientNeedsData.Psychological_Support,
        Other_Needs: PatientNeedsData.Other_Needs
      });
  }

  OnSubmit() {
    console.log(this.PatientNeedsForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Educational_Needs", this.PatientNeedsForm.get('Educational_Needs')?.value);
    formData.append("External_Meetings_Appointments", this.PatientNeedsForm.get('External_Meetings_Appointments')?.value);
    formData.append("Medical_Centers_Review", this.PatientNeedsForm.get('Medical_Centers_Review')?.value);
    formData.append("Difficulties_In_Hospital", this.PatientNeedsForm.get('Difficulties_In_Hospital')?.value);
    formData.append("Health_Medical_Needs", this.PatientNeedsForm.get('Health_Medical_Needs')?.value);
    formData.append("Support_Services", this.PatientNeedsForm.get('Support_Services')?.value);
    formData.append("Auxiliary_Devices", this.PatientNeedsForm.get('Auxiliary_Devices')?.value);
    formData.append("Psychological_Support", this.PatientNeedsForm.get('Psychological_Support')?.value);
    formData.append("Other_Needs", this.PatientNeedsForm.get('Other_Needs')?.value);
    formData.append("Step", this.Step);

    this.http.post(environment.baseUrl + '/api/CS/Set/PatientNeedsData.ashx', formData).subscribe(
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
