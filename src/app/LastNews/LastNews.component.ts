import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-LastNews',
  templateUrl: './LastNews.component.html',
  styleUrls: ['./LastNews.component.css']
})
export class LastNewsComponent implements OnInit {

  LastNews :any [] = [];
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getLastNews();
  }

  getLastNews(){
    this.http.get(environment.baseUrl + '/api/News/GetData.ashx').subscribe(
      data => {
        this.LastNews = JSON.parse(JSON.stringify(data));
        //console.log("LastNews : "+this.LastNews);
      }
    )
  }

}
