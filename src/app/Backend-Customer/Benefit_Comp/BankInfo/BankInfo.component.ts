import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-BankInfo',
  templateUrl: './BankInfo.component.html',
  styleUrls: ['./BankInfo.component.css']
})
export class BankInfoComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  BankInfoForm: FormGroup = new FormGroup({});
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
    this.BankInfoForm = new FormGroup({
      Bank_Name_1: new FormControl("البنك الأهلي السعودي", [Validators.required]),
      Bank_No_1: new FormControl('SA', [Validators.required]),
      Bank_Name_2: new FormControl("البنك الأهلي السعودي"),
      Bank_No_2: new FormControl('SA')
    });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/BankInfoData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var BankInfoData = Data[0];
    if (BankInfoData)
      this.BankInfoForm.patchValue({
        Bank_Name_1: BankInfoData.Bank_Name_1,
        Bank_No_1: BankInfoData.Bank_No_1,
        Bank_Name_2: BankInfoData.Bank_Name_2,
        Bank_No_2: BankInfoData.Bank_No_2
      });
  }

  OnSubmit() {
    console.log(this.BankInfoForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Bank_Name_1", this.BankInfoForm.get('Bank_Name_1')?.value);
    formData.append("Bank_No_1", this.BankInfoForm.get('Bank_No_1')?.value);
    formData.append("Bank_Name_2", this.BankInfoForm.get('Bank_Name_2')?.value);
    formData.append("Bank_No_2", this.BankInfoForm.get('Bank_No_2')?.value);
    formData.append("Step", this.Step);

    this.http.post(environment.baseUrl + '/api/CS/Set/BankInfoData.ashx', formData).subscribe(
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
