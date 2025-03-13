import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-BaiscBankInfo',
  templateUrl: './BaiscBankInfo.component.html',
  styleUrls: ['./BaiscBankInfo.component.css']
})
export class BaiscBankInfoComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  @Input() ShowBank :boolean = true;

  UpdateStat: boolean = false;
  UpdateStat2: boolean = false;
  IsLogin: boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  BasicBankInfoForm: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.CheckIsReady();
    this.CreateForm();
    this.getData();
  }

  CheckIsReady(){
    //if(this.CS_Code)
      this.IsReady = true;
  }

  CreateForm() {
    this.BasicBankInfoForm = new FormGroup({
      AssociationName: new FormControl(null, [Validators.required]),
      LicenseNumber: new FormControl(null, [Validators.required]),
      AssemblySpecialty: new FormControl(null, [Validators.required]),
      DateOfEstablishment: new FormControl(null, [Validators.required]),
      Bank_Name_1: new FormControl(null, this.ShowBank ? [Validators.required] : []),
      Bank_No_1: new FormControl('SA', this.ShowBank ? [Validators.required] : []),
      Bank_Name_2: new FormControl(null),
      Bank_No_2: new FormControl('SA'),
      ProjectsLastYear: new FormControl(null),
      ProjectsNextYear: new FormControl(null),
      Email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/BasicBankInfoData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var BasicBankInfoData = Data[0];
    if (BasicBankInfoData)
      this.BasicBankInfoForm.patchValue({
        AssociationName: BasicBankInfoData.AssociationName,
        LicenseNumber: BasicBankInfoData.LicenseNumber,
        AssemblySpecialty: BasicBankInfoData.AssemblySpecialty,
        DateOfEstablishment: BasicBankInfoData.DateOfEstablishment,
        Bank_Name_1: BasicBankInfoData.Bank_Name_1,
        Bank_No_1: BasicBankInfoData.Bank_No_1,
        Bank_Name_2: BasicBankInfoData.Bank_Name_2,
        Bank_No_2: BasicBankInfoData.Bank_No_2,
        ProjectsLastYear: BasicBankInfoData.ProjectsLastYear,
        ProjectsNextYear: BasicBankInfoData.ProjectsNextYear,
        Email: BasicBankInfoData.ProjectsNextYear
      });
      this.CanUpdateStatus(BasicBankInfoData.StatusId);  
  }

  ChangeStatus(value:any){
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("UpdateStatus", true);
    formData.append("StatusValue", value);

    this.http.post(environment.baseUrl + '/api/AssociationSupport/Set/BasicBankInfoData.ashx', formData).subscribe(
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

  OnSubmit() {
    console.log(this.BasicBankInfoForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("AssociationName", this.BasicBankInfoForm.get('AssociationName')?.value);
    formData.append("LicenseNumber", this.BasicBankInfoForm.get('LicenseNumber')?.value);
    formData.append("AssemblySpecialty", this.BasicBankInfoForm.get('AssemblySpecialty')?.value);
    formData.append("DateOfEstablishment", this.BasicBankInfoForm.get('DateOfEstablishment')?.value);
    formData.append("Bank_Name_1", this.BasicBankInfoForm.get('Bank_Name_1')?.value);
    formData.append("Bank_No_1", this.BasicBankInfoForm.get('Bank_No_1')?.value);
    formData.append("Bank_Name_2", this.BasicBankInfoForm.get('Bank_Name_2')?.value);
    formData.append("Bank_No_2", this.BasicBankInfoForm.get('Bank_No_2')?.value);
    formData.append("ProjectsLastYear", this.BasicBankInfoForm.get('ProjectsLastYear')?.value);
    formData.append("ProjectsNextYear", this.BasicBankInfoForm.get('ProjectsNextYear')?.value);
    formData.append("Email", this.BasicBankInfoForm.get('ProjectsNextYear')?.value);

    this.http.post(environment.baseUrl + '/api/AssociationSupport/Set/BasicBankInfoData.ashx', formData).subscribe(
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
