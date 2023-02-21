import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  //Pangation
  tatalRecords: any;
  page:number = 1;

  user_list: any;


  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.GetUserList();
    //console.log(this.user_list);
  }

  GetUserList(){
    this.http.get(environment.baseUrl + '/api/Users/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.user_list  = JSON.parse(jsonInfo);
      }
    )
  }

}
