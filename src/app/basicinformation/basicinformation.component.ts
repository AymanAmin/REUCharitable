
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-basicinformation',
  templateUrl: './basicinformation.component.html',
  styleUrls: ['./basicinformation.component.css']
})
export class BasicinformationComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  UserExisted: boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];

  BasicInfoForm: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit()
  {
    this.CreateForm();
    this.getBasicData();
  }

  CreateForm() {
    this.BasicInfoForm = new FormGroup({
      Full_Name: new FormControl(null, [Validators.required]),
      Identify_Id: new FormControl(null, [Validators.required]),
      Gander: new FormControl("ذكر"),
      Nationalty: new FormControl(null),
      age: new FormControl(null),
      BirthDate: new FormControl(null),
      Social_Situation: new FormControl("متزوج"),
      Career: new FormControl(null),
      Income_Source: new FormControl(null),
      Salary: new FormControl(null),
      Family_Role: new FormControl("عائل"),
      Phone: new FormControl(null, [Validators.required]),
      Email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      Neighborhood: new FormControl(null),

    });
  }

  OnSubmit() {
    //console.log(this.BasicInfoForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Full_Name", this.BasicInfoForm.get('Full_Name')?.value);
    formData.append("Identify_Id", this.BasicInfoForm.get('Identify_Id')?.value);
    formData.append("Gander", this.BasicInfoForm.get('Gander')?.value);
    formData.append("Nationalty", this.BasicInfoForm.get('Nationalty')?.value);
    formData.append("age", this.BasicInfoForm.get('age')?.value);
    formData.append("Email", this.BasicInfoForm.get('Email')?.value);
    formData.append("BirthDate", this.BasicInfoForm.get('BirthDate')?.value);
    formData.append("Social_Situation", this.BasicInfoForm.get('Social_Situation')?.value);
    formData.append("Career", this.BasicInfoForm.get('Career')?.value);
    formData.append("Income_Source", this.BasicInfoForm.get('Income_Source')?.value);
    formData.append("Salary", this.BasicInfoForm.get('Salary')?.value);
    formData.append("Family_Role", this.BasicInfoForm.get('Family_Role')?.value);
    formData.append("Phone", this.BasicInfoForm.get('Phone')?.value);
    formData.append("city", this.BasicInfoForm.get('city')?.value);
    formData.append("Neighborhood", this.BasicInfoForm.get('Neighborhood')?.value);



    this.http.post(environment.baseUrl + '/api/CS/Set/BasicInfoData.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          if (response == "1001") {
            this.UserExisted = true;
          }
          else {
            this.UserExisted = false;
            this.IsShowMessageUpdate = true;
            this.IsShowMessageError = false;
            this.router.navigate(['/Customer/InstitutionBenefitForm/' + response]);
          }
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
    var BasicInfoData = Data[0];
    if (BasicInfoData)
      this.BasicInfoForm.patchValue({
        Full_Name: BasicInfoData.Full_Name,
        Identify_Id: BasicInfoData.Identify_Id,
        Gander: BasicInfoData.Gander,
        Nationalty: BasicInfoData.Nationalty,
        age: BasicInfoData.age,
        Email: BasicInfoData.Email,
        BirthDate: BasicInfoData.BirthDate,
        Social_Situation: BasicInfoData.Social_Situation,
        Family_Role: BasicInfoData.Family_Role,
        Career: BasicInfoData.Career,
        Income_Source: BasicInfoData.Income_Source,
        Salary:BasicInfoData.Salary,
        Phone: BasicInfoData.Phone,
        city: BasicInfoData.city,
        Neighborhood: BasicInfoData.Neighborhood,


      });
  }

}



