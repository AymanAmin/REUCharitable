import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  //Pangation
  tatalRecords: any;
  page: number = 1;

  member_list: any;

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.GetMemberList();

  }

  GetMemberList() {
    this.http.get(environment.baseUrl + '/api/Member/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.member_list  = JSON.parse(jsonInfo);
        //console.log("jsonInfo: "+this.listImages);
      }
    )
  }

}
