import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-NewRegistration',
  templateUrl: './NewRegistration.component.html',
  styleUrls: ['./NewRegistration.component.css']
})
export class NewRegistrationComponent implements OnInit {

  NewRegisterForm: FormGroup = new FormGroup({});
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  date: any;
  CustomerInsID: any = this.route.snapshot.params['id'];
  customer:any;

  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    this.CreateNewRegisterForm();
    if (this.CustomerInsID)
      this.getInstitution();
  }

  CreateNewRegisterForm() {
    this.NewRegisterForm = new FormGroup({
      id: new FormControl(1, [Validators.required]),
      fullName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, createPasswordStrengthValidator()]),
      confirmPassword: new FormControl(null, [Validators.required]),
    })
  }

  OnSubmit() {
    console.log("Submited");
    this.userSubmitted = true;
    if (this.NewRegisterForm.valid) {
      this.AddCustomer(this.userData());
    }
    else
    console.log(this.NewRegisterForm);
  }

  // Fill User of Model
  userData(): any {
    return this.customer = {
      userName: this.NewRegisterForm.get('userName')?.value,
      email: this.NewRegisterForm.get('email')?.value,
      fullName: this.NewRegisterForm.get('fullName')?.value,
      password: this.NewRegisterForm.get('password')?.value,
      phone: this.NewRegisterForm.get('phone')?.value
    }
  }

  // Save Customer to Local Storge
  AddCustomer(newCustomer: any) {
    console.log("AddCustomer")
    var formData: any = new FormData();
    formData.append("id", this.CustomerInsID);
    formData.append("fullName", newCustomer.fullName);
    formData.append("email", newCustomer.email);
    formData.append("phone", newCustomer.phone);
    formData.append("userName", newCustomer.userName);
    formData.append("password", newCustomer.password);

    console.log(newCustomer);

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

  getInstitution() {
    this.http.get(environment.baseUrl + '/api/Customer/GetUser.ashx?id=' + this.CustomerInsID).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let currentUser = JSON.parse(jsonInfo);
        this.PathValueToUserForm(currentUser);
      }
    )
  }

  PathValueToUserForm(Customer: any) {
    //console.log("Current user: "+user.userName);
    this.NewRegisterForm = new FormGroup({
      fullName: new FormControl(Customer.fullName, Validators.required),
      userName: new FormControl(Customer.userName, Validators.required),
      email: new FormControl(Customer.email, [Validators.required, Validators.email]),
      password: new FormControl(Customer.password, [Validators.required, createPasswordStrengthValidator()]),
      confirmPassword: new FormControl(Customer.password, [Validators.required]),
      phone: new FormControl(Customer.phone, [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    }, this.passwordMatchingValidator);
  }

  // Check Password Matching
  passwordMatchingValidator(fg: AbstractControl) {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null : { notmatched: true }
  }

}

// Password Validation Rules
export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : null;
  }
}

