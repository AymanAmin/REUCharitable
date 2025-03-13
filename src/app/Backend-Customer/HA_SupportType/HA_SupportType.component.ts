import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-HA_SupportType',
  templateUrl: './HA_SupportType.component.html',
  styleUrls: ['./HA_SupportType.component.css']
})
export class HA_SupportTypeComponent implements OnInit {

  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsReady:boolean = false;
  CS_Code:string = this.route.snapshot.params['id'];
  OurServicesForm: FormGroup = new FormGroup({});
  @Input() Step:string = "";


  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {   }

  ngOnInit() 
  {
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

      logistical_Support: new FormControl(false),
      Strategic_Partnerships: new FormControl(false),
      Training_Qualification: new FormControl(false),
      Direct_Services: new FormControl(false),
      Media_Support: new FormControl(false),
      Incentive_Awards: new FormControl(false),
      Awareness_Resources: new FormControl(""),
        });
  }

  getData() {

    this.http.get(environment.baseUrl + '/api/CS/Get/HA_SupportTypeData.ashx?CS_Code='+this.CS_Code).subscribe(
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
        logistical_Support: OurServicesData.logistical_Support,
        Strategic_Partnerships: OurServicesData.Strategic_Partnerships,
        Training_Qualification: OurServicesData.Training_Qualification,
        Direct_Services: OurServicesData.Direct_Services,
        Media_Support: OurServicesData.Media_Support,
        Incentive_Awards: OurServicesData.Incentive_Awards,
        Awareness_Resources: OurServicesData.Awareness_Resources,

      });
  }

  OnSubmit() {
    console.log(this.OurServicesForm.value);
    var formData: any = new FormData();
    formData.append("CS_Code", this.CS_Code);
    formData.append("logistical_Support", this.OurServicesForm.get('logistical_Support')?.value);
    formData.append("Strategic_Partnerships", this.OurServicesForm.get('Strategic_Partnerships')?.value);
    formData.append("Training_Qualification", this.OurServicesForm.get('Training_Qualification')?.value);
    formData.append("Direct_Services", this.OurServicesForm.get('Direct_Services')?.value);
    formData.append("Media_Support", this.OurServicesForm.get('Media_Support')?.value);
    formData.append("Incentive_Awards", this.OurServicesForm.get('Incentive_Awards')?.value);
    formData.append("Awareness_Resources", this.OurServicesForm.get('Awareness_Resources')?.value);

    console.log(formData);
    this.http.post(environment.baseUrl + '/api/CS/Set/OurServicesData.ashx', formData).subscribe(
      (response) => {
        if (response != "0") {
          this.IsShowMessageUpdate = true;
          this.IsShowMessageError = false;
          window.location.reload();
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
