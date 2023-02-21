import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ProjectDetails',
  templateUrl: './ProjectDetails.component.html',
  styleUrls: ['./ProjectDetails.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  ProjectDetailsForm: FormGroup = new FormGroup({});
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
    this.ProjectDetailsForm = new FormGroup({
      ProjectName: new FormControl(null, [Validators.required]),
      ProjectExecutionTime: new FormControl(null, [Validators.required]),
      ProjectGoals: new FormControl(null, [Validators.required]),
      ProjectStages: new FormControl(null, [Validators.required]),
      ProjectTargetGroup: new FormControl(null, [Validators.required]),
      ProjectTargetNumber: new FormControl(null, [Validators.required]),
      ProjectManager: new FormControl(null, [Validators.required])
    });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/ProjectDetailsData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var ProjectDetailsData = Data[0];
    if (ProjectDetailsData)
      this.ProjectDetailsForm.patchValue({
        ProjectName: ProjectDetailsData.ProjectName,
        ProjectExecutionTime: ProjectDetailsData.ProjectExecutionTime,
        ProjectGoals: ProjectDetailsData.ProjectGoals,
        ProjectStages: ProjectDetailsData.ProjectStages,
        ProjectTargetGroup: ProjectDetailsData.ProjectTargetGroup,
        ProjectTargetNumber: ProjectDetailsData.ProjectTargetNumber,
        ProjectManager: ProjectDetailsData.ProjectManager
      });
  }

  OnSubmit() {
    console.log(this.ProjectDetailsForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("ProjectName", this.ProjectDetailsForm.get('ProjectName')?.value);
    formData.append("ProjectExecutionTime", this.ProjectDetailsForm.get('ProjectExecutionTime')?.value);
    formData.append("ProjectGoals", this.ProjectDetailsForm.get('ProjectGoals')?.value);
    formData.append("ProjectStages", this.ProjectDetailsForm.get('ProjectStages')?.value);
    formData.append("ProjectTargetGroup", this.ProjectDetailsForm.get('ProjectTargetGroup')?.value);
    formData.append("ProjectTargetNumber", this.ProjectDetailsForm.get('ProjectTargetNumber')?.value);
    formData.append("ProjectManager", this.ProjectDetailsForm.get('ProjectManager')?.value);

    this.http.post(environment.baseUrl + '/api/AssociationSupport/Set/ProjectDetailsData.ashx', formData).subscribe(
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
