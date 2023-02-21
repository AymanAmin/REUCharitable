import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Members',
  templateUrl: './Members.component.html',
  styleUrls: ['./Members.component.css']
})
export class MembersComponent implements OnInit {

  Members:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.GetMemberList();
  }

  GetMemberList() {
    this.http.get(environment.baseUrl + '/api/Member/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.Members = JSON.parse(jsonInfo);
        //console.log("jsonInfo: "+this.listImages);
      }
    )
  }

}
