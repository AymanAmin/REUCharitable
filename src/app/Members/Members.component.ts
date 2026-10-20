import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Members',
  templateUrl: './Members.component.html',
  styleUrls: ['./Members.component.css']
})
export class MembersComponent implements OnInit {

  Members: any[] = [];
  /** رئيس المجلس يُعرض في بطاقة بارزة وبقية الأعضاء في شبكة */
  Chair: any;
  Others: any[] = [];

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.GetMemberList();
  }

  GetMemberList() {
    this.http.get(environment.baseUrl + '/api/Member/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        this.Members = (JSON.parse(jsonInfo) || []).map((m: any) => ({
          ...m,
          // الصور مخزنة بروابط http فتُحجب في الموقع الآمن
          imageSrc: String(m.imageSrc || '').replace(/^http:\/\//i, 'https://'),
          memberPosition: String(m.memberPosition || '').trim()
        }));
        const chairIndex = this.Members.findIndex(m => /رئيس مجلس/.test(m.memberPosition) && !/نائب/.test(m.memberPosition));
        this.Chair = chairIndex > -1 ? this.Members[chairIndex] : undefined;
        this.Others = this.Members.filter((_, i) => i !== chairIndex);
      }
    )
  }

}
