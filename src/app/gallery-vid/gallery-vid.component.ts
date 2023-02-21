import { Component, OnInit, VERSION, ViewEncapsulation } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-vid',
  templateUrl: './gallery-vid.component.html',
  styleUrls: ['./gallery-vid.component.css']
})

export class GalleryVidComponent implements OnInit {

  //Pangation
  tatalRecords: any;
  page: number = 1;

  listVideo: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetVideoList();
    console.log("this.listVideo: " + this.listVideo);
  }

  GetVideoList() {
    this.http.get(environment.baseUrl + '/api/Gallery/GetVideoData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.listVideo = JSON.parse(jsonInfo);
        //this.loadData(this.listVideo);
      }
    )
  }
}
