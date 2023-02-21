import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Model/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {

  newsId: any = this.route.snapshot.params['id'];
  AddNewsForm: FormGroup = new FormGroup({});
  IsShowMessageUpdate: boolean = false;
  IsShowMessageInsert: boolean = false;
  IsShowMessageError: boolean = false;
  userSubmitted: boolean = false;
  IsPublish:boolean =false;
  date: any;

  currentUser: User | undefined;
  imageSrc: string | undefined;

  constructor(private route: ActivatedRoute,private http: HttpClient) { }

  ngOnInit() {
    //Load Current User Object From Token
    this.getCurrentUser();
    //Create From
    this.CreateNewsForm();

    if (this.newsId)
      this.getNews(this.newsId);

  }

  CreateNewsForm() {
    var date = new Date();
    let short_date = date.toDateString();
    this.AddNewsForm = new FormGroup({
      id: new FormControl(1, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      details: new FormControl(null, [Validators.required]),
      NewsDate: new FormControl(null, [Validators.required]),
      numberOfViews: new FormControl(0, []),
      publishBy: new FormControl(this.currentUser?.userName, []),
      IsPublish: new FormControl(this.IsPublish, []),
      date: new FormControl(short_date, []),
      img: new FormControl(null),
      imageSrc: new FormControl(this.imageSrc, []),
    })
  }

  OnSubmit() {
    this.userSubmitted = true;
    if (this.AddNewsForm.valid) {
      this.AddNews(this.AddNewsForm.value);
    }
    else {
      this.IsShowMessageError = true;
    }
  }

  getNews(newsId:any){
      this.http.get(environment.baseUrl + '/api/News/GetPost.ashx?id=' + this.newsId).subscribe(
        data => {
          var jsonInfo = JSON.stringify(data);
          let newsData = JSON.parse(jsonInfo);
          this.PathValueToUserForm(newsData);
        }
      )
  }

  PathValueToUserForm(newsData: any) {
    this.IsPublish = newsData.IsPublish;
    var date = new Date();
    let short_date = date.toDateString();
    this.AddNewsForm.patchValue({
      id: newsData.id,
      title: newsData.title,
      NewsDate: newsData.NewsDate,
      details: newsData.details,
      numberOfViews: newsData.numberOfViews,
      //publishBy:this.currentUser?.userName,
      IsPublish: this.IsPublish,
      date:short_date,
      //img: newsData.img,
      //imageSrc: newsData.imageSrc,
    });
  }

  AddNews(news: any) {
    var formData: any = new FormData();
    if (this.newsId)
      formData.append("id", this.newsId);
    else
      formData.append("id", 0);

    formData.append("details", news.details);
    formData.append("imageSrc", news.imageSrc);
    formData.append("img", news.img);
    formData.append("numberOfViews", news.numberOfViews);
    formData.append("IsPublish", this.IsPublish);
    formData.append("img", news.img);
    formData.append("title", news.title);

    formData.append("NewsDate", news.NewsDate);

    this.http.post(environment.baseUrl + '/api/News/UpdateData.ashx', formData).subscribe(
      (response) => {
        if (response == "1") {
          this.IsShowMessageInsert = true;
          this.IsShowMessageUpdate = false;
          this.AddNewsForm.reset();
          this.imageSrc = "";

          this.CreateNewsForm();
          this.userSubmitted = false;
        }
        else if (response == "2") {
          this.IsShowMessageInsert = false;
          this.IsShowMessageUpdate = true;
        }
      },
      (error) => console.log(error)
    )
  }

  onFileChange(files: FileList) {
    const reader = new FileReader();
    console.log(files);
    if (files) {
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.AddNewsForm.patchValue({
          imageSrc: reader.result
        });
      };
    }
  }

  getCurrentUser() {
    let user = localStorage.getItem('token');
    if (user != null)
      this.currentUser = JSON.parse(user.toString());
  }

}
