import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ProjectEstimatedBudget',
  templateUrl: './ProjectEstimatedBudget.component.html',
  styleUrls: ['./ProjectEstimatedBudget.component.css']
})
export class ProjectEstimatedBudgetComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  PEBForm: FormGroup = new FormGroup({});

  PEBList:any;

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
    this.PEBForm = new FormGroup({
      ProjectItem: new FormControl(null, [Validators.required]),
      ApproximatePrices: new FormControl(null, [Validators.required]),
      PercentageOfBudget: new FormControl(null, [Validators.required]),
      AmountPercentageOfBudget: new FormControl(null, [Validators.required]),
      Notes: new FormControl(null, [Validators.required])
    });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/PEBData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    this.PEBList = Data;
  }

  OnSubmit(Id:any) {
    //console.log(this.FamilyMembersForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Id", Id);
    formData.append("ProjectItem", this.PEBForm.get('ProjectItem')?.value);
    formData.append("ApproximatePrices", this.PEBForm.get('ApproximatePrices')?.value);
    formData.append("PercentageOfBudget", this.PEBForm.get('PercentageOfBudget')?.value);
    formData.append("AmountPercentageOfBudget", this.PEBForm.get('AmountPercentageOfBudget')?.value);
    formData.append("Notes", this.PEBForm.get('Notes')?.value);

    this.http.post(environment.baseUrl + '/api/AssociationSupport/Set/PEBData.ashx', formData).subscribe(
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
