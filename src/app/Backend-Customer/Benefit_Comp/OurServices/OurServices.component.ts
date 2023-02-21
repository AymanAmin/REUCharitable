import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-OurServices',
  templateUrl: './OurServices.component.html',
  styleUrls: ['./OurServices.component.css']
})
export class OurServicesComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  OurServicesForm: FormGroup = new FormGroup({});

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
    this.OurServicesForm = new FormGroup({
      Food_Gift: new FormControl(false),
      BillS: new FormControl(false),
      Physiotherapy: new FormControl(false),
      Medical_Supplies: new FormControl(false),
      Financial_Support: new FormControl(false),
      House_Rent: new FormControl(false),
      BillS_Serves: new FormControl(false),
      WinterClothing: new FormControl(false),
      OtherServices: new FormControl("")
        });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/OurServicesData.ashx?CS_Code='+this.CS_Code).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }

  fillData(Data: any) {
    var OurServicesData = Data[0];
    if (OurServicesData)
      this.OurServicesForm.patchValue({
        Food_Gift: OurServicesData.Food_Gift,
        BillS: OurServicesData.BillS,
        Physiotherapy: OurServicesData.Physiotherapy,
        Medical_Supplies: OurServicesData.Medical_Supplies,
        Financial_Support: OurServicesData.Financial_Support,
        House_Rent: OurServicesData.House_Rent,
        OtherServices: OurServicesData.OtherServices,
        BillS_Serves: OurServicesData.BillS_Serves,
        WinterClothing: OurServicesData.WinterClothing,
        
        
      });
  }

  OnSubmit() {
    console.log(this.OurServicesForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("Food_Gift", this.OurServicesForm.get('Food_Gift')?.value);
    formData.append("BillS", this.OurServicesForm.get('BillS')?.value);
    formData.append("Physiotherapy", this.OurServicesForm.get('Physiotherapy')?.value);
    formData.append("Medical_Supplies", this.OurServicesForm.get('Medical_Supplies')?.value);
    formData.append("Financial_Support", this.OurServicesForm.get('Financial_Support')?.value);
    formData.append("House_Rent", this.OurServicesForm.get('House_Rent')?.value);
    formData.append("OtherServices", this.OurServicesForm.get('OtherServices')?.value);
    formData.append("BillS_Serves", this.OurServicesForm.get('BillS_Serves')?.value);
    formData.append("WinterClothing", this.OurServicesForm.get('WinterClothing')?.value);
    console.log(formData);
    this.http.post(environment.baseUrl + '/api/CS/Set/OurServicesData.ashx', formData).subscribe(
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
