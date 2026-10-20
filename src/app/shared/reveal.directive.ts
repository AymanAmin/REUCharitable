import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * يُظهر العنصر بحركة عند دخوله مجال الرؤية.
 * الاستخدام: <div arpReveal></div> أو <img arpReveal="mask"> أو <hr arpReveal="line">
 * الأنماط في src/arp-theme.css تحت [arpReveal].
 */
@Directive({ selector: '[arpReveal]' })
export class RevealDirective implements OnInit, OnDestroy {

  @Input() arpReveal: '' | 'up' | 'mask' | 'line' | 'fade' = '';
  /** تأخير بالمللي ثانية لترتيب ظهور العناصر المتتالية */
  @Input() arpRevealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    const node = this.el.nativeElement;
    node.setAttribute('data-reveal', this.arpReveal || 'up');
    if (this.arpRevealDelay) node.style.setProperty('--reveal-delay', this.arpRevealDelay + 'ms');

    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-in');
      return;
    }
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          node.classList.add('is-in');
          this.observer?.disconnect();
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    this.observer.observe(node);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
