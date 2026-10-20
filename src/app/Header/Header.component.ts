import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MainInfo } from '../Model/MainInfo';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  IsLogin:boolean = false;
  company!:MainInfo;
  menuOpen = false;
  openGroup: string | null = null;
  scrolled = false;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.CheckIfLogin();
    this.getCompanyInfo ();
  }

  getCompanyInfo() {
    this.http.get(environment.baseUrl + '/api/CompanyInfo/GetData.ashx').subscribe(
      data => {
        this.company = JSON.parse(JSON.stringify(data));
      }
    )
  }

  CheckIfLogin(){
    let token = localStorage.getItem('token');
    if(token)
      this.IsLogin = true;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.openGroup = null;
  }

  // في الجوال تُفتح القوائم الفرعية بالضغط، وعلى سطح المكتب تُفتح بالمرور
  toggleGroup(name: string) {
    this.openGroup = this.openGroup === name ? null : name;
  }

  closeMenu() {
    this.menuOpen = false;
    this.openGroup = null;
  }

  progress = 0;

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 10;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  }

}
