import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { param } from 'lightgallery/plugins/video/lg-video-utils';
import { environment } from 'src/environments/environment';
import { NewsModel } from '../Model/newsModel';


@Component({
  selector: 'app-NewDeatils',
  templateUrl: './NewDeatils.component.html',
  styleUrls: ['./NewDeatils.component.css']
})
export class NewDeatilsComponent implements OnInit {

  LastNews: NewsModel[] = [];
  CurrentNews: any | undefined;
  NewsId: any = this.route.snapshot.params['id'];
  searchedKeyword:string = "";

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    //get All News
    this.getLastNews();

    // get Current News => when prameter is changed
    this.route.params.subscribe(
      (param) => {
        this.getCurrentNews(param['id']);
      }
    )
  }

  getLastNews() {
    this.http.get(environment.baseUrl + '/api/News/GetData.ashx').subscribe(
      data => {
        this.LastNews = JSON.parse(JSON.stringify(data));
        //console.log("LastNews : "+this.LastNews);
      }
    )
  }

  getCurrentNews(id:any) {
    //console.log("ID: "+id);
    this.http.get(environment.baseUrl + '/api/News/getpost.ashx?id='+id).subscribe(
      data => {
        this.CurrentNews = JSON.parse(JSON.stringify(data));
      }
    )
  }


}
