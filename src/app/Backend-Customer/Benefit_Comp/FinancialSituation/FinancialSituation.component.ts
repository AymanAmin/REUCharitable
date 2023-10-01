import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-FinancialSituation',
  templateUrl: './FinancialSituation.component.html',
  styleUrls: ['./FinancialSituation.component.css']
})
export class FinancialSituationComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  FinancialSituationForm: FormGroup = new FormGroup({});
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
    this.FinancialSituationForm = new FormGroup(
        {
      Salary: new FormControl(null, [Validators.required]),
      Retirement: new FormControl(null, [Validators.required]),
      Social_Insurance: new FormControl(null),
      Social_Insurance_2: new FormControl(null),
      Subsidies: new FormControl(null),
      Other_Money_Sources: new FormControl(null),

          });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/FinancialSituationData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var FinancialSituationData = Data[0];
    if (FinancialSituationData)
      this.FinancialSituationForm.patchValue({
        Salary: FinancialSituationData.Salary,
        Retirement: FinancialSituationData.Retirement,
        Social_Insurance: FinancialSituationData.Social_Insurance,
        Social_Insurance_2: FinancialSituationData.Social_Insurance_2,
        Subsidies: FinancialSituationData.Subsidies,
        Other_Money_Sources: FinancialSituationData.Other_Money_Sources,

      });
  }

  OnSubmit() 
  {
    console.log(this.FinancialSituationForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Salary", this.FinancialSituationForm.get('Salary')?.value);
    formData.append("Retirement", this.FinancialSituationForm.get('Retirement')?.value);
    formData.append("Social_Insurance", this.FinancialSituationForm.get('Social_Insurance')?.value);
    formData.append("Social_Insurance_2", this.FinancialSituationForm.get('Social_Insurance_2')?.value);
    formData.append("Subsidies", this.FinancialSituationForm.get('Subsidies')?.value);
    formData.append("Other_Money_Sources", this.FinancialSituationForm.get('Other_Money_Sources')?.value); 
    formData.append("Step", this.Step); 
  
    this.http.post(environment.baseUrl + '/api/CS/Set/FinancialSituationData.ashx', formData).subscribe(
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

}
