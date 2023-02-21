import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

  IsShowError: boolean = false;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  OnLogin(loginForm: NgForm) {
    //console.log(loginForm.value);
    this.login_auth(loginForm.value);
  }

  login_auth(user: any) {
    let UsersArray: User[];
    this.http.get(environment.baseUrl + '/api/Users/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        UsersArray = JSON.parse(jsonInfo);
        let token = UsersArray.find((u: any) => u.email === user.email && u.password == user.password);
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));
          this.IsShowError = false;
          window.location.href = '/backend/home';
        }
        else
          this.IsShowError = true;
      }
    )
  }

}
