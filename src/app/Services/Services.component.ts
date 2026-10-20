import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-Services',
  templateUrl: './Services.component.html',
  styleUrls: ['./Services.component.css']
})
export class ServicesComponent
{

  @ViewChild('goalList') goalList?: ElementRef<HTMLElement>;

  arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  activeGoal = 0;

  Pillars = [
    { k: 'أ', title: 'الرؤية', text: 'أن تكون المؤسسة رائدة للأعمال الإنسانية والتنمية الاجتماعية المستدامة لأسرة واعية ومجتمع متماسك.' },
    { k: 'ب', title: 'الرسالة', text: 'الإسهام الحضاري في تطوير مجالات التنمية الاجتماعية ودعم العمل الخيري وتقديم القرض غير الربحي.' },
    { k: 'ج', title: 'القيم', list: [
      'الإيمان بالقيم والمبادئ الأساسية للإسلام ومن أهمها التكافل الاجتماعي.',
      'الأمانة والإخلاص.',
      'العمل المؤسسي والتطوير.'
    ] }
  ];

  Values = ['التكافل الاجتماعي', 'الأمانة', 'الإخلاص', 'العمل المؤسسي', 'التطوير'];

  // الهدف الأقرب لمنتصف الشاشة يُبرز أثناء التمرير
  @HostListener('window:scroll')
  onScroll() {
    const list = this.goalList?.nativeElement;
    if (!list) return;
    const mid = window.innerHeight * 0.55;
    let best = 0, bestDist = Infinity;
    Array.from(list.children).forEach((li, i) => {
      const r = li.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    });
    this.activeGoal = best;
  }

  // بقعة ضوء تتبع المؤشر داخل خلايا البرامج
  spot(e: MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }

  Goals = [
    'دعم الجهود والمشاريع التي تهدف إلى تطوير مكونات القطاع غير الربحي وتطويره.',
    'الدعم المالي للمبادرات التنموية والأهلية التي تهدف لتحسين جودة الحياة.',
    'دعم البرامج والمشروعات التنموية والاجتماعية والتعليمية والصحية والتطوعية.',
    'تقديم الدعم المالي والعيني للأسر والأفراد والحالات المحتاجة.',
    'تقديم القروض والتسهيلات غير الربحية للمحتاجين.'
  ];

  // البرامج التي ليس لها نموذج خاص تُحال إلى نموذج الدعم المقطوع
  ServicesList = [
    {
      "Id": 1,
      "Name": "دعم الأسر المتعففة",
      "Deatils": "دعم وتأمين الحياة الكريمة للأسر المتعففة.",
      "Icon": "fas fa-hand-holding-heart",
      "Link": "/Customer/SupportNeedyFamilies"
    },{
      "Id": 2,
      "Name": "ترميم المنازل",
      "Deatils": "يوجد كثير من المباني تحتاج إلى ترميم، ويوجد أسر تحتاج إلى مبانٍ.",
      "Icon": "fas fa-tools",
      "Link": "/Customer/RestorationHomeForm"
    }, {
      "Id": 3,
      "Name": "دعم حالة مرضية",
      "Deatils": "توفير وتأمين العلاج الشهري للمستفيدين.",
      "Icon": "fas fa-heartbeat",
      "Link": "/Customer/InstitutionBenefitForm"
    },{
      "Id": 5,
      "Name": "السلة الغذائية",
      "Deatils": "شراء مواد غذائية وتسليمها للمستفيدين وتوصيلها لغير القادرين.",
      "Icon": "fas fa-shopping-basket",
      "Link": "/Customer/SupportNeedyFamilies"
    },{
      "Id": 9,
      "Name": "فرحة العيدين",
      "Deatils": "تأمين كسوة العيدين للفقير والمحتاج لإدخال السرور عليهم.",
      "Icon": "fas fa-moon",
      "Link": "/Customer/SupportNeedyFamilies"
    },{
      "Id": 7,
      "Name": "تسديد فواتير المستفيدين",
      "Deatils": "تسديد الفواتير بأنواعها المختلفة للمستفيدين لتخفيف الأعباء عنهم.",
      "Icon": "fas fa-file-invoice-dollar",
      "Link": "/Customer/SupportNeedyFamilies"
    }
  ]

}
