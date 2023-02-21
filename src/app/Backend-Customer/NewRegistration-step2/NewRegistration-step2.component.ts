import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-NewRegistration-step2',
  templateUrl: './NewRegistration-step2.component.html',
  styleUrls: ['./NewRegistration-step2.component.css']
})
export class NewRegistrationStep2Component implements OnInit {

  NewRegisterForm: FormGroup = new FormGroup({});
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  date: any;
  CustomerInsID: any = this.route.snapshot.params['id'];
  Institution:any;

  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
  }

  CreateNewRegisterForm() {
    this.NewRegisterForm = new FormGroup({
      id: new FormControl(1, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      InstitutionType: new FormControl(null, [Validators.required]),
      permitNo: new FormControl(null, [Validators.required]),
      createDate: new FormControl(null, [Validators.required]),
      mainInstitution: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      CEOName: new FormControl(null, [Validators.required]),
      CEOPhone: new FormControl(null, [Validators.required])
    })
  }

  OnSubmit() {
    console.log("Submited");
    this.userSubmitted = true;
    if (this.NewRegisterForm.valid) {
      //this.AddCustomer(this.userData());
    }
    else
    console.log(this.NewRegisterForm);
  }

  getInstitution() {
    this.http.get(environment.baseUrl + '/api/Customer/GetUser.ashx?id=' + this.CustomerInsID).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let currentUser = JSON.parse(jsonInfo);
        this.PathValueToInstitutionForm(currentUser);
      }
    )
  }

  PathValueToInstitutionForm(Institution: any) {
    //console.log("Current user: "+user.userName);
    this.NewRegisterForm = new FormGroup({
      name: new FormControl(Institution.name, Validators.required),
      InstitutionType: new FormControl(Institution.InstitutionType, Validators.required),
      permitNo: new FormControl(Institution.permitNo, [Validators.required]),
      createDate: new FormControl(Institution.createDate, [Validators.required]),
      mainInstitution: new FormControl(Institution.mainInstitution, [Validators.required]),
      address: new FormControl(Institution.address, [Validators.required]),
      CEOName: new FormControl(Institution.CEOName, [Validators.required]),
      CEOPhone: new FormControl(Institution.CEOPhone, [Validators.required])
    });
  }

  // Fill User of Model
  userData(): any {
    return this.Institution = {
      name: this.NewRegisterForm.get('name')?.value,
      InstitutionType: this.NewRegisterForm.get('InstitutionType')?.value,
      permitNo: this.NewRegisterForm.get('permitNo')?.value,
      createDate: this.NewRegisterForm.get('createDate')?.value,
      mainInstitution: this.NewRegisterForm.get('mainInstitution')?.value,
      address: this.NewRegisterForm.get('address')?.value,
      CEOName: this.NewRegisterForm.get('CEOName')?.value,
      CEOPhone: this.NewRegisterForm.get('CEOPhone')?.value
    }
  }

  // Save Customer to Local Storge
  AddInstitution(newInstitution: any) {
    console.log("Add Institution")
    var formData: any = new FormData();
    formData.append("id", this.CustomerInsID);
    formData.append("name", newInstitution.name);
    formData.append("InstitutionType", newInstitution.InstitutionType);
    formData.append("permitNo", newInstitution.permitNo);
    formData.append("createDate", newInstitution.createDate);
    formData.append("mainInstitution", newInstitution.mainInstitution);
    formData.append("address", newInstitution.address);
    formData.append("CEOName", newInstitution.CEOName);
    formData.append("CEOPhone", newInstitution.CEOPhone);

    console.log(newInstitution);

    /*this.http.post(environment.baseUrl + '/api/Customer/UpdateData.ashx', formData).subscribe(
      (response) => {
        if (response == "1") {
          this.NewRegisterForm.reset();
          this.IsShowMessageError = false;
        }
        else {
          this.IsShowMessageError = true;
        }
      },
      (error) => console.log(error)
    )*/
  }

}
