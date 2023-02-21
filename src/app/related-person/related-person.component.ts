
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-related-person',
  templateUrl: './related-person.component.html',
  styleUrls: ['./related-person.component.css']
})
export class RelatedPersonComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  RelatedPersonForm: FormGroup = new FormGroup({});
  NumberOfPerson:any = 0;

  RelatedPersonList:any;

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
    this.RelatedPersonForm = new FormGroup({
      Name: new FormControl(null, [Validators.required]),
      NationalAddress: new FormControl(null, [Validators.required]),
      PhoneNumber: new FormControl(null),
      RelatedPerson: new FormControl("عمدة")

    });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/RelatedPersonData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }
  fillData(Data: any) {
    this.NumberOfPerson = Data.length;
    this.RelatedPersonList = Data;
  }


  OnSubmit(Id:any) {
    //console.log(this.RelatedPersonForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Id", Id);
    formData.append("Name", this.RelatedPersonForm.get('Name')?.value);
    formData.append("NationalAddress", this.RelatedPersonForm.get('NationalAddress')?.value);
    formData.append("PhoneNumber", this.RelatedPersonForm.get('PhoneNumber')?.value);
    formData.append("RelatedPerson", this.RelatedPersonForm.get('RelatedPerson')?.value);


    this.http.post(environment.baseUrl + '/api/CS/Set/RelatedPersonData.ashx', formData).subscribe(
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



















