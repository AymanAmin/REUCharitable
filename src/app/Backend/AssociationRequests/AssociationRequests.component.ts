import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-AssociationRequests',
  templateUrl: './AssociationRequests.component.html',
  styleUrls: ['./AssociationRequests.component.css']
})
export class AssociationRequestsComponent implements OnInit {

  FormList:any;
  RequsetStatus:any = "";RequsetType:any = "";
  searchText:string = "";
  page:number = 1;
  itemsPerPage:number = 10;
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.LoadData();
  }

  fillData(Data: any) {
    // عرض آخر طلب أولاً (ترتيب تنازلي)
    this.FormList = Array.isArray(Data) ? Data.slice().reverse() : Data;
  }

  ExportToExcel() {
    if (!this.FormList || !this.FormList.length) {
      return;
    }

    const headers = ['#', 'إسم الجمعية / المؤسسة', 'رقم الترخيص', 'التخصص', 'تاريخ التقديم', 'الحالة'];

    let rows = '';
    let index = 0;
    for (const item of this.FormList) {
      if (item.StatusId == 6) { continue; }
      index++;
      rows += `<tr>
        <td>${index}</td>
        <td>${this.escapeHtml(item.AssociationName)}</td>
        <td>${this.escapeHtml(item.LicenseNumber)}</td>
        <td>${this.escapeHtml(item.AssemblySpecialty)}</td>
        <td>${this.escapeHtml(item.DateCreation)}</td>
        <td>${this.escapeHtml(item.StatusName)}</td>
      </tr>`;
    }

    const headerRow = headers.map(h => `<th style="background-color:#76b430;color:#fff;border:1px solid #ccc;padding:6px;">${h}</th>`).join('');

    const table = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"></head>
      <body>
        <table border="1" dir="rtl" style="border-collapse:collapse;">
          <thead><tr>${headerRow}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </body></html>`;

    const blob = new Blob(['﻿', table], { type: 'application/vnd.ms-excel;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'الجمعيات_المسجلة_' + new Date().toISOString().slice(0, 10) + '.xls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private escapeHtml(value: any): string {
    if (value === null || value === undefined) { return ''; }
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  LoadData(){
    this.http.get(environment.baseUrl + '/api/AssociationSupport/Get/AssociationRequests.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.fillData(MainInfoData);
      }
    )
  }
  Delete(CS_Code:any){
    this.http.get(environment.baseUrl + '/API/CS/Delete/D_Request.ashx?Type=2&CS_Code='+CS_Code).subscribe(
      data => {
        this.LoadData();
      }
    )
  }

}
