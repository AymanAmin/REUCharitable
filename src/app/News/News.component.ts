import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-News',
  templateUrl: './News.component.html',
  styleUrls: ['./News.component.css']
})
export class NewsComponent implements OnInit {

  //Pangation
  tatalRecords: any;
  page:number = 1;

  LastNews:any;
  searchedKeyword:string = "";

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getLastNews();
  }

  getLastNews(){
    this.http.get(environment.baseUrl + '/api/News/GetData.ashx').subscribe(
      data => {
        this.LastNews = data;
        //console.log(data)
      }
    )
  }

}
