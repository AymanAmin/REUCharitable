import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface OrgNode {
  title: string;
  sub?: string;
  icon: string;
  link?: string;
}

@Component({
  selector: 'app-OrganizationChart',
  templateUrl: './OrganizationChart.component.html',
  styleUrls: ['./OrganizationChart.component.css']
})
export class OrganizationChartComponent implements OnInit {

  constructor(private http: HttpClient) { }

  /** صورة الهيكل المعتمد كما تُرفع من بوابة الموظفين */
  FileSrc: any;

  // الهيكل التنظيمي (مطابق للصورة المعتمدة 2025)
  board: OrgNode = { title: 'مجلس الأمناء', sub: 'الرئيس: أ.د. عبدالله ركيب الشمري', icon: 'fas fa-landmark', link: '/Members' };
  advisory: OrgNode[] = [
    { title: 'مستشار قانوني', sub: 'جهة استشارية', icon: 'fas fa-balance-scale' },
    { title: 'مجلس استشاري', sub: 'جهة استشارية', icon: 'fas fa-comments' }
  ];
  executive: OrgNode = { title: 'المدير التنفيذي', sub: 'د. فهد عبدالله الشمري · مكلّف', icon: 'fas fa-user-tie' };
  departments: OrgNode[] = [
    { title: 'الإدارة المالية', icon: 'fas fa-coins' },
    { title: 'إدارة الائتمان', icon: 'fas fa-hand-holding-usd' },
    { title: 'الجودة والمتابعة', icon: 'fas fa-clipboard-check' },
    { title: 'شؤون الموظفين', icon: 'fas fa-id-badge' }
  ];

  ngOnInit() {
    this.GetOrgChartFile();
  }

  GetOrgChartFile() {
    this.http.get(environment.baseUrl + '/api/OrganizationChart/GetData.ashx').subscribe(
      data => {
        var jsonInfo = JSON.stringify(data);
        let MainInfoData = JSON.parse(jsonInfo);
        this.FileSrc = MainInfoData.imageSrc;

      }
    )
  }

}
