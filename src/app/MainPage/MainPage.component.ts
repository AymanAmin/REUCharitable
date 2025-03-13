import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-MainPage',
  templateUrl: './MainPage.component.html',
  styleUrls: ['./MainPage.component.css']
})
export class MainPageComponent implements OnInit {

  IsView: boolean = false;
  constructor() { }

  ngOnInit() {
    // تعيين IsView بناءً على التحقق
    const startDate = "2025-03-29";
    const endDate = "2025-04-05";
    this.IsView = this.isDateBetween(startDate, endDate);
  }

  isDateBetween(startDate: any, endDate: any) {
    const today = new Date(); // تاريخ اليوم
    const start = new Date(startDate);
    const end = new Date(endDate);

    return today >= start && today <= end;
  }

}
