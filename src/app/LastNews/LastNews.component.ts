import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

declare const twttr: any;

@Component({
  selector: 'app-LastNews',
  templateUrl: './LastNews.component.html',
  styleUrls: ['./LastNews.component.css']
})
export class LastNewsComponent implements OnInit, AfterViewInit {

  LastNews :any [] = [];

  Videos: { title: string; details: string; url: string }[] = [
    {
      title: 'بمناسبة يوم التأسيس السعودي | عرضة مملكتنا السعودية',
      details: 'برعاية المؤسسة · كلمات: الشاعر سالم الخزام · أداء: الداوي · توزيع: وحيد غنيم · كورال: فرقة جبال سلمى · مشاركة: فرقة غياض · إخراج: عبدالله العبيد',
      url: 'https://www.youtube.com/embed/FDxmhJT7A4I'
    },
    {
      title: 'كلمة البروفيسور عبدالله ركيب الرمال، رئيس مجلس الأمناء',
      details: 'في حفل جمعية جاه لإصلاح ذات البين بالتعاون مع المؤسسة · فندق الميلينيوم، حائل · 17/11/1444هـ الموافق 6/6/2023م',
      url: 'https://www.youtube.com/embed/IQ2hFSdOymo?si=CIW2Pm-6dqt5pSQv'
    },
    {
      title: 'حفل جمعية جاه بالتعاون مع المؤسسة',
      details: 'لقطات متنوعة من حفل جمعية جاه لإصلاح ذات البين · فندق الميلينيوم، حائل · 17/11/1444هـ الموافق 6/6/2023م',
      url: 'https://www.youtube.com/embed/wZtl4lroeHE?si=wD81zPp7dm5Z9fCs'
    },
    {
      title: 'حفل تكريم البروفيسور فواز الشيحي',
      details: 'لقطات من حفل البروفيسور عبدالله ركيب الرمال لتكريم البروفيسور فواز الشيحي · فندق الميلينيوم، حائل · 02/12/1444هـ الموافق 20/6/2023م',
      url: 'https://www.youtube.com/embed/YjISa4DMJgU?si=Jlnr4iAxP9afuuic'
    }
  ];

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getLastNews();
  }

  // سكربت تويتر يُحمَّل مرة واحدة في index.html؛ نعيد تفعيله عند العودة للصفحة
  ngAfterViewInit() {
    if (typeof twttr !== 'undefined' && twttr.widgets) twttr.widgets.load();
  }

  getLastNews(){
    this.http.get(environment.baseUrl + '/api/News/GetData.ashx').subscribe(
      data => {
        this.LastNews = JSON.parse(JSON.stringify(data));
      }
    )
  }

}
