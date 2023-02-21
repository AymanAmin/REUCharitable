import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-BasicInfo',
  templateUrl: './BasicInfo.component.html',
  styleUrls: ['./BasicInfo.component.css']
})
export class BasicInfoComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  UpdateStat: boolean = false;
  UpdateStat2: boolean = false;
  IsLogin: boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  CreationDate: string = new Date().toISOString().slice(0, 10);

  BasicInfoForm: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.CreateForm();
    this.getBasicData();
  }

  CreateForm() {
    this.BasicInfoForm = new FormGroup({
      Full_Name: new FormControl(null, [Validators.required]),
      Identify_Id: new FormControl(null, [Validators.required]),
      Gander: new FormControl("ذكر"),
      Nationalty: new FormControl(null),
      BirthDate: new FormControl(null),
      Social_Situation: new FormControl("متزوج"),
      Career: new FormControl("موظف قطاع خاص"),
      Salary: new FormControl(null),
      Income_Source: new FormControl(null),
      Family_Role: new FormControl("عائل"),
      Phone: new FormControl(null, [Validators.required]),
      Housing_Status: new FormControl("ملك"),
      Housing_Type: new FormControl("فيلا"),
      Neighborhood: new FormControl(null),
      city: new FormControl(null),
      age: new FormControl(null),
      Email: new FormControl(''),
      //Email: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }

  OnSubmit() {
    //console.log(this.BasicInfoForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Full_Name", this.BasicInfoForm.get('Full_Name')?.value);
    formData.append("Identify_Id", this.BasicInfoForm.get('Identify_Id')?.value);
    formData.append("Gander", this.BasicInfoForm.get('Gander')?.value);
    formData.append("age", this.BasicInfoForm.get('age')?.value);
    formData.append("Nationalty", this.BasicInfoForm.get('Nationalty')?.value);
    formData.append("BirthDate", this.BasicInfoForm.get('BirthDate')?.value);
    formData.append("Social_Situation", this.BasicInfoForm.get('Social_Situation')?.value);
    formData.append("Career", this.BasicInfoForm.get('Career')?.value);
    formData.append("Salary", this.BasicInfoForm.get('Salary')?.value);
    formData.append("Income_Source", this.BasicInfoForm.get('Income_Source')?.value);
    formData.append("Family_Role", this.BasicInfoForm.get('Family_Role')?.value);
    formData.append("Phone", this.BasicInfoForm.get('Phone')?.value);
    formData.append("Housing_Status", this.BasicInfoForm.get('Housing_Status')?.value);
    formData.append("Housing_Type", this.BasicInfoForm.get('Housing_Type')?.value);
    formData.append("Neighborhood", this.BasicInfoForm.get('Neighborhood')?.value);
    formData.append("Email", this.BasicInfoForm.get('Email')?.value);
    formData.append("city", this.BasicInfoForm.get('city')?.value);
    formData.append("FormName", this.router.url);
    formData.append("UpdateStatus", false);
    this.http.post(environment.baseUrl + '/api/CS/Set/BasicInfoData.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url.replace(this.CS_Code,"") + '/' + response]);
          console.log("call ");
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => console.log(error)
    )
  }

  getBasicData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/BasicInfoData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var BasicInfoData =  Data[0]
    if (BasicInfoData){
        this.CreationDate = BasicInfoData.DateCreation;
        this.BasicInfoForm.patchValue({
        Full_Name: BasicInfoData.Full_Name,
        Identify_Id: BasicInfoData.Identify_Id,
        Gander: BasicInfoData.Gander,
        Nationalty: BasicInfoData.Nationalty,
        BirthDate: BasicInfoData.BirthDate,
        Social_Situation: BasicInfoData.Social_Situation,
        Career: BasicInfoData.Career,
        Salary: BasicInfoData.Salary,
        Income_Source: BasicInfoData.Income_Source,
        Family_Role: BasicInfoData.Family_Role,
        Phone: BasicInfoData.Phone,
        Housing_Status: BasicInfoData.Housing_Status,
        Housing_Type: BasicInfoData.Housing_Type,
        Neighborhood: BasicInfoData.Neighborhood,
        city: BasicInfoData.city,
        age: BasicInfoData.age,
        Email: BasicInfoData.Email
      });
    }
    this.CanUpdateStatus(BasicInfoData.StatusId);  
  }

  ChangeStatus(value:any){
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("UpdateStatus", true);
    formData.append("StatusValue", value);

    this.http.post(environment.baseUrl + '/api/CS/Set/BasicInfoData.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.router.navigate([this.router.url + '/' + response]);
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

  
    CanUpdateStatus(StatusID: any) {
        // Can Update Status
        this.CheckIfLogin();
        if (StatusID == 1 && this.IsLogin)
            this.UpdateStat = true;
        else if (StatusID == 2 && this.IsLogin)
            this.UpdateStat2 = true;
    }

  CheckIfLogin(){
    let token = localStorage.getItem('token');
    if(token)
      this.IsLogin = true;
  }

}
