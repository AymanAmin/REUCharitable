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

  // التاريخ بصيغة /Date(ms)/ القادمة من الخادم
  videoDate(video: any): string {
    const ms = Number(String(video?.dateCreation || "").replace(/\D/g, ""));
    return ms ? new Date(ms).toLocaleDateString("ar-SA-u-ca-gregory", { year: "numeric", month: "long", day: "numeric" }) : "";
  }
}
