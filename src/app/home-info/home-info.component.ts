import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.css']
})
export class HomeInfoComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
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

      Housing_Type: new FormControl("ملك", [Validators.required]),

      Housing_Status: new FormControl("جيد", [Validators.required]),

      Housing_Classification: new FormControl("فيلا", [Validators.required]),

      Housing_look: new FormControl("نعم", [Validators.required]),

      Housing_Cost: new FormControl("من 500-1500", [Validators.required]),

      PatientMassage: new FormControl("")

    });
  }

  OnSubmit() {
    //console.log(this.BasicInfoForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);

    formData.append("Housing_Type", this.BasicInfoForm.get('Housing_Type')?.value);
    formData.append("Housing_Status", this.BasicInfoForm.get('Housing_Status')?.value);
    formData.append("Housing_Classification", this.BasicInfoForm.get('Housing_Classification')?.value);
    formData.append("Housing_look", this.BasicInfoForm.get('Housing_look')?.value);
    formData.append("Housing_Cost", this.BasicInfoForm.get('Housing_Cost')?.value);
    formData.append("PatientMassage", this.BasicInfoForm.get('PatientMassage')?.value);


    this.http.post(environment.baseUrl + '/api/HouseRenovation/Set/HouseInfo.ashx', formData).subscribe(
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

  getBasicData() {

    this.http.get(environment.baseUrl + '/api/HouseRenovation/Get/HouseInfoData.ashx?CS_Code='+this.CS_Code).subscribe(
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

        Housing_Status: BasicInfoData.Housing_Status,
        Housing_Type: BasicInfoData.Housing_Type,
        Housing_look: BasicInfoData.Housing_look,
        Housing_Cost: BasicInfoData.Housing_Cost,
        Housing_Classification:BasicInfoData.Housing_Classification,
        PatientMassage:BasicInfoData.PatientMassage,

      });
  }

}



