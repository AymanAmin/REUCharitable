import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit } from '@angular/core';

/**
 * يُظهر العنصر بحركة عند وصوله إلى مجال الرؤية.
 * الاستخدام: <div arpReveal></div> أو <img arpReveal="mask"> أو <hr arpReveal="line">
 * الأنماط في src/arp-theme.css تحت [data-reveal].
 *
 * نستخدم مستمع تمرير واحدًا مشتركًا بدل IntersectionObserver لأن الأخير
 * لا يُبلغ عن العناصر المقصوصة بالكامل (clip-path) وقد يتخطى العناصر عند التمرير السريع،
 * فيبقى المحتوى مخفيًا. هنا يظهر أي عنصر بلغ أعلاه أسفل الشاشة أو تجاوزه.
 */
@Directive({ selector: '[arpReveal]' })
export class RevealDirective implements OnInit, OnDestroy {

  @Input() arpReveal: '' | 'up' | 'mask' | 'line' | 'fade' = '';
  /** تأخير بالمللي ثانية لترتيب ظهور العناصر المتتالية */
  @Input() arpRevealDelay = 0;

  private static pending = new Set<HTMLElement>();
  private static listening = false;
  private static scheduled = false;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) { }

  ngOnInit() {
    const node = this.el.nativeElement;
    node.setAttribute('data-reveal', this.arpReveal || 'up');
    if (this.arpRevealDelay) node.style.setProperty('--reveal-delay', this.arpRevealDelay + 'ms');

    RevealDirective.pending.add(node);
    this.zone.runOutsideAngular(() => {
      RevealDirective.listen();
      // فحوص بعد الرسم: العناصر القادمة مع بيانات الخادم تُضاف قبل اكتمال التخطيط
      requestAnimationFrame(() => RevealDirective.check());
      [150, 600, 1500].forEach(t => setTimeout(() => RevealDirective.check(), t));
    });
  }

  ngOnDestroy() {
    RevealDirective.pending.delete(this.el.nativeElement);
  }

  private static listen() {
    if (this.listening) return;
    this.listening = true;
    const schedule = () => {
      if (this.scheduled) return;
      this.scheduled = true;
      requestAnimationFrame(() => { this.scheduled = false; this.check(); });
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', schedule);
  }

  private static check() {
    const limit = window.innerHeight * 0.92;
    this.pending.forEach(node => {
      if (!node.isConnected) return;
      if (node.getBoundingClientRect().top < limit) {
        node.classList.add('is-in');
        this.pending.delete(node);
      }
    });
  }
}
