import { HttpClient } from '@angular/common/http';
import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from 'src/app/Model/user';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({});
  user: User | undefined;
  userSubmitted: boolean = false;
  userId: any = this.route.snapshot.params['id'];
  IsShowMessageInsert: boolean = false;
  IsShowMessageUpdate: boolean = false;


  constructor(private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit() {
    this.CreateRegistrationForm();
    if (this.userId)
      this.getCurrentUser();
  }

  // Create From
  CreateRegistrationForm() {
    this.registrationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, createPasswordStrengthValidator()]),
      confirmPassword: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    }, this.passwordMatchingValidator);
  }


  getCurrentUser() {
    this.http.get(environment.baseUrl + '/api/Users/GetUser.ashx?id=' + this.userId).subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let currentUser = JSON.parse(jsonInfo);
        this.PathValueToUserForm(currentUser);
      }
    )
  }

  PathValueToUserForm(user: any) {
    //console.log("Current user: "+user.userName);
    this.registrationForm = new FormGroup({
      userName: new FormControl(user.userName, Validators.required),
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      password: new FormControl(user.password, [Validators.required, createPasswordStrengthValidator()]),
      confirmPassword: new FormControl(user.password, [Validators.required]),
      mobile: new FormControl(user.mobile, [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    }, this.passwordMatchingValidator);
  }

  // Check Password Matching
  passwordMatchingValidator(fg: AbstractControl) {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null : { notmatched: true }
  }

  OnSubmit() {
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      this.AddUser(this.userData());
    }
  }

  // Save UserModel to Local Storge
  AddUser(newuser: User) {
    var formData: any = new FormData();
    formData.append("id", this.userId);
    formData.append("email", newuser.email);
    formData.append("mobile", newuser.mobile);
    formData.append("password", newuser.password);
    formData.append("userName", newuser.userName);

    this.http.post(environment.baseUrl + '/api/Users/UpdateData.ashx', formData).subscribe(
      (response) => {
        if (response == "1") {
          this.IsShowMessageInsert = true;
          this.IsShowMessageUpdate = false;
          this.registrationForm.reset();
        }
        else if (response == "2") {
          this.IsShowMessageInsert = false;
          this.IsShowMessageUpdate = true;
        }
      },
      (error) => console.log(error)
    )
  }

  // Fill User of Model
  userData(): User {
    return this.user = {
      userName: this.registrationForm.get('userName')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
      mobile: this.registrationForm.get('mobile')?.value
    }
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
