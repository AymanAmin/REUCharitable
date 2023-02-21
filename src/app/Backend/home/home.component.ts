import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  IsLogin:boolean = false;
  constructor() { }

  ngOnInit() {
    // Check if user login
    this.CheckIfLogin();

    if(!this.IsLogin){
      window.location.href = '/user/login';
    }
  }

  CheckIfLogin(){
    let token = localStorage.getItem('token');
    if(token)
      this.IsLogin = true;
  }

}
