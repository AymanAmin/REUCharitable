import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-FamilyMembers',
  templateUrl: './FamilyMembers.component.html',
  styleUrls: ['./FamilyMembers.component.css']
})
export class FamilyMembersComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  FamilyMembersForm: FormGroup = new FormGroup({});
  @Input() Step:string ="";

  FamilyMembersList:any;

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
    this.FamilyMembersForm = new FormGroup({
      FamilyName: new FormControl(null, [Validators.required]),
      RelationShip: new FormControl(null, [Validators.required]),
      Age: new FormControl(null),
      Gander: new FormControl("ذكر"),
      Level_Edu: new FormControl(null),
      Social_Status: new FormControl(null),
      Health_Status: new FormControl(null)
    });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/FamilyMembersData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    this.FamilyMembersList = Data;
  }

  OnSubmit(Id:any) {
    //console.log(this.FamilyMembersForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Id", Id);
    formData.append("FamilyName", this.FamilyMembersForm.get('FamilyName')?.value);
    formData.append("RelationShip", this.FamilyMembersForm.get('RelationShip')?.value);
    formData.append("Age", this.FamilyMembersForm.get('Age')?.value);
    formData.append("Gander", this.FamilyMembersForm.get('Gander')?.value);
    formData.append("Level_Edu", this.FamilyMembersForm.get('Level_Edu')?.value);
    formData.append("Social_Status", this.FamilyMembersForm.get('Social_Status')?.value);
    formData.append("Health_Status", this.FamilyMembersForm.get('Health_Status')?.value);
    formData.append("Step", this.Step);

    this.http.post(environment.baseUrl + '/api/CS/Set/FamilyMembersData.ashx', formData).subscribe(
        (response) => {
            if (response != "0") {
              this.IsShowMessageUpdate = true;
              this.IsShowMessageError = false;
              window.location.reload();
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

  NextStep(){
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Step", this.Step);

    this.http.post(environment.baseUrl + '/api/CS/Set/NextStep.ashx', formData).subscribe(
        (response) => {
          if (response != "0") {          
            window.location.reload();
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
