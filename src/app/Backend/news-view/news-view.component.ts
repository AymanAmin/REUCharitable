import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.css']
})
export class NewsViewComponent implements OnInit {

  //Pangation
  tatalRecords: any;
  page:number = 1;

  LastNews:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getLastNews();
  }

  getLastNews(){
    this.http.get(environment.baseUrl + '/api/News/GetData.ashx?All=1').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.LastNews  = JSON.parse(jsonInfo);
        //console.log("LastNews: "+this.LastNews);
      }
    )
  }
}
