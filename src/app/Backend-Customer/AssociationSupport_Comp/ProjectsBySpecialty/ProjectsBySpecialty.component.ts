import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ProjectsBySpecialty',
  templateUrl: './ProjectsBySpecialty.component.html',
  styleUrls: ['./ProjectsBySpecialty.component.css']
})
export class ProjectsBySpecialtyComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  ProjectsBySpecialtyForm: FormGroup = new FormGroup({});

  ProjectList:any;

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
    this.ProjectsBySpecialtyForm = new FormGroup({
      ProjectName: new FormControl(null, [Validators.required]),
      BeneficiariesFromProject: new FormControl(null, [Validators.required]),
      ProjectPlace: new FormControl(null, [Validators.required]),
      ProjectStartDate: new FormControl(null, [Validators.required]),
      ProjectEndDate: new FormControl(null, [Validators.required]),


    });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/ProjectsBySpecialtyData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    this.ProjectList = Data;
  }

  OnSubmit(Id:any) {
    //console.log(this.FamilyMembersForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Id", Id);
    formData.append("ProjectName", this.ProjectsBySpecialtyForm.get('ProjectName')?.value);
    formData.append("BeneficiariesFromProject", this.ProjectsBySpecialtyForm.get('BeneficiariesFromProject')?.value);
    formData.append("ProjectPlace", this.ProjectsBySpecialtyForm.get('ProjectPlace')?.value);
    formData.append("ProjectStartDate", this.ProjectsBySpecialtyForm.get('ProjectStartDate')?.value);
    formData.append("ProjectEndDate", this.ProjectsBySpecialtyForm.get('ProjectEndDate')?.value);


    

    this.http.post(environment.baseUrl + '/api/AssociationSupport/Set/ProjectsBySpecialtyData.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          this.CreateForm();
          this.getData();
          //this.router.navigate(['/Customer/InstitutionBenefitForm/' + response]);
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
