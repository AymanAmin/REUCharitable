import { Component, OnInit, VERSION, ViewEncapsulation } from '@angular/core';
import lgZoom from 'lightgallery/plugins/zoom';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Gallery',
  templateUrl: './Gallery.component.html',
  styleUrls: ['./Gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryComponent implements OnInit {

  name = "Angular " + VERSION.major;
  settings = {
    counter: false,
    plugins: [lgZoom]
  };
  onBeforeSlide = (detail: BeforeSlideDetail): void => {

    const { index, prevIndex } = detail;
    console.log(index, prevIndex);
  };

  listImages: any = [];
  htmlData:string = "";
  constructor(private http: HttpClient) { }


  ngOnInit() {
  this.GetImageList();
    //console.log("this.listImages: "+this.listImages);
  }

  GetImageList() {
    this.http.get(environment.baseUrl + '/api/Gallery/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.listImages = JSON.parse(jsonInfo);
        this.loadData(this.listImages);
      }
    )
  }

  loadData(images:any) {
    console.log("images.length: "+images.length);
    this.htmlData = "";
    for(let i = 0 ; i < images.length;i ++){
      this.htmlData += '<a  href="'+images[i].imageSrc+'" class="gallery-item">' +
      '<img alt="img1" src="'+images[i].imageSrc+'" class="imageView" />' +
      '</a>';
    }
  }
}
