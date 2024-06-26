import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-needyfamiliesfile',
  templateUrl: './needyfamiliesfile.component.html',
  styleUrls: ['./needyfamiliesfile.component.css']
})
export class NeedyfamiliesfileComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady: boolean = false;
  Endorsement_value: boolean = false;
  CS_Code: string = this.route.snapshot.params['id'];
  PatientFilesForm: FormGroup = new FormGroup({});
  PatientMassageForm: FormGroup = new FormGroup({});
  FileList: any;
  Massage: any = "";
  @Input() Step:string = "";

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.CheckIsReady();
    this.CreateForm();
    this.getData();
    this.getDataMassage();
  }

  CheckIsReady() {
    if (this.CS_Code)
      this.IsReady = true;
  }

  CreateForm() {
    this.PatientFilesForm = new FormGroup({
      Identify: new FormControl(null, [Validators.required]),
      Family_Report: new FormControl(null, [Validators.required]),
      Proof_of_Residence: new FormControl(null),
      Bank_Statement: new FormControl(null),
      Clan_leader_idefntication:new FormControl(null),

      Other_Files: new FormControl(null),
    });


    this.PatientMassageForm = new FormGroup({
      PatientMassage: new FormControl(null),
      Endorsement: new FormControl(false)
    });
  }

  getData() {
    this.http.get(environment.baseUrl + '/api/CS/Get/PatientFilesData.ashx?CS_Code=' + this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let dataList = JSON.parse(jsonInfo);
        this.fillData(dataList);

        this.IsReady = false;
        for(let i = 0 ; i < dataList.length; i++)
        {
          if(dataList[i].Type == "مستند التعريف")
           this.IsReady = true;
        }
        console.log(dataList);
      }
    )
  }

  fillData(Data: any) {
    this.FileList = Data;
  }

  getDataMassage() {
    this.http.get(environment.baseUrl + '/api/CS/Get/PatientMassage.ashx?CS_Code=' + this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let dataList = JSON.parse(jsonInfo);
        this.fillDataMassage(dataList);
      }
    )
  }

  fillDataMassage(Data: any) {
    //console.log(Data[0].PatientMassage);
    if(Data.length > 0)
    this.Massage = Data[0].PatientMassage;
  }



  onFileChange(files: FileList, Type: string) {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      var file = reader.result as string;
      var formData: any = new FormData();
      formData.append("CS_Code", this.CS_Code);
      formData.append('file', file);
      formData.append('Type', Type);

      this.http.post(environment.baseUrl + '/api/CS/Set/PatientFilesData.ashx', formData).subscribe(
        (response) => {
          if (response != "0") {
            this.IsShowMessageUpdate = true;
            this.IsShowMessageError = false;
            //this.router.navigate(['/Customer/InstitutionBenefitForm/' + response]);
            this.getData();
            this.PatientFilesForm.reset();
          }
          else {
            this.IsShowMessageUpdate = false;
            this.IsShowMessageError = true;
          }
        },
        (error) => console.log(error)
      );
    };
  }

  DeleteFile(Id: any) {
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Id", Id);

    this.http.post(environment.baseUrl + '/api/CS/Set/PatientFilesData.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          //this.router.navigate(['/Customer/InstitutionBenefitForm/' + response]);
          this.getData();
          this.PatientFilesForm.reset();
        }
        else {
          this.IsShowMessageUpdate = false;
          this.IsShowMessageError = true;
        }
      },
      (error) => console.log(error)
    );

  }

  OnSubmit() {
    console.log(this.PatientMassageForm.value);
    var formData: any = new FormData();

    formData.append("CS_Code", this.CS_Code);
    formData.append("PatientMassage", this.PatientMassageForm.get('PatientMassage')?.value);
    formData.append("Step", this.Step);

    console.log(formData);
    this.http.post(environment.baseUrl + '/api/CS/Set/PatientMassage.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          window.location.reload();
          //this.router.navigate(['/Customer/PatientFilesForm/' + response]);
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
