import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-SliderImg',
  templateUrl: './SliderImg.component.html',
  styleUrls: ['./SliderImg.component.css']
})
export class SliderImgComponent implements OnInit {

  @ViewChild('frame', { static: true }) frame!: ElementRef<HTMLElement>;

  latestNews:any;

  // النماذج الإلكترونية كما في قائمة الخدمات
  forms = [
    { title: 'دعم مقطوع', link: '/Customer/SupportNeedyFamilies' },
    { title: 'دعم الجمعيات والمؤسسات', link: '/Customer/AssociationSupport' },
    { title: 'دعم ترميم مسكن', link: '/Customer/RestorationHomeForm' },
    { title: 'دعم حالة مرضية', link: '/Customer/InstitutionBenefitForm' }
  ];

  private ticking = false;

  constructor(private http:HttpClient, private zone: NgZone) { }

  ngOnInit() {
    this.getLatestNews();
  }

  getLatestNews() {
    this.http.get(environment.baseUrl + '/api/News/GetData.ashx').subscribe(
      (data: any) => {
        if (Array.isArray(data) && data.length) this.latestNews = data[0];
      }
    )
  }

  // حركة اختلاف المنظور للصورة أثناء التمرير (خارج دورة Angular لتفادي إعادة الرسم)
  @HostListener('window:scroll')
  onScroll() {
    if (this.ticking) return;
    this.ticking = true;
    this.zone.runOutsideAngular(() => requestAnimationFrame(() => {
      const y = Math.min(window.scrollY, 900);
      this.frame.nativeElement.style.setProperty('--py', (y * 0.18).toFixed(1) + 'px');
      this.ticking = false;
    }));
  }

  // بقعة ضوء تتبع المؤشر داخل شريط النماذج
  spot(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }

}
