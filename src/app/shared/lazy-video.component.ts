import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * فيديو كسول: يعرض غلافًا وزر تشغيل، ولا يُحمَّل المشغّل إلا عند الضغط.
 * يدعم روابط يوتيوب (embed أو watch أو youtu.be) وملفات الفيديو المباشرة.
 * الاستخدام: <app-lazy-video [src]="url" [title]="'عنوان'"></app-lazy-video>
 */
@Component({
  selector: 'app-lazy-video',
  template: `
    <div class="lv" [class.playing]="playing">
      <button *ngIf="!playing" type="button" class="cover" (click)="play()" [attr.aria-label]="'تشغيل: ' + title">
        <img *ngIf="thumb" [src]="thumb" alt="" loading="lazy">
        <span *ngIf="!thumb" class="brand"><img src="assets/img/Logo.png" alt=""></span>
        <span class="shade"></span>
        <span class="play"><i class="fa fa-play"></i></span>
        <span class="label" *ngIf="title && showTitle">{{ title }}</span>
      </button>

      <iframe *ngIf="playing && youtubeUrl" [src]="youtubeUrl" [title]="title" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

      <video *ngIf="playing && !youtubeUrl" controls autoplay playsinline [title]="title">
        <source [src]="src" type="video/mp4">
        المتصفح الخاص بك لا يدعم الفيديو
      </video>
    </div>
  `,
  styles: [`
    :host{display:block}
    .lv{position:relative;aspect-ratio:16/9;border-radius:4px;overflow:hidden;background:var(--arp-forest-900)}
    .cover{position:absolute;inset:0;width:100%;padding:0;border:0;cursor:pointer;background:none;display:block}
    .cover > img{width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
    .brand{position:absolute;inset:0;display:grid;place-items:center;
      background:radial-gradient(circle at 70% 30%, #2C4F1A, var(--arp-forest-900) 70%)}
    .brand img{width:22%;max-width:130px;opacity:.5}
    .shade{position:absolute;inset:0;background:linear-gradient(to top, rgba(14,30,8,.85), rgba(14,30,8,.1) 55%)}
    .play{
      position:absolute;top:50%;left:50%;width:74px;height:74px;margin:-37px 0 0 -37px;border-radius:50%;
      display:grid;place-items:center;background:var(--arp-leaf-400);color:var(--arp-forest-900);font-size:22px;
      box-shadow:0 0 0 0 rgba(143,209,63,.5);transition:transform .35s cubic-bezier(.3,1.4,.4,1);
      animation:ring 2.4s infinite;
    }
    .play i{margin-left:4px}
    @keyframes ring{70%{box-shadow:0 0 0 18px rgba(143,209,63,0)}100%{box-shadow:0 0 0 0 rgba(143,209,63,0)}}
    .label{position:absolute;inset-inline:18px;bottom:14px;text-align:start;color:#fff;
      font-family:var(--arp-f-display);font-weight:500;font-size:15px;line-height:1.5;
      display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .cover:hover > img{transform:scale(1.05)}
    .cover:hover .play,.cover:focus-visible .play{transform:scale(1.1)}
    .cover:focus-visible{outline:3px solid var(--arp-leaf-400);outline-offset:-3px}
    iframe,video{position:absolute;inset:0;width:100%;height:100%;border:0;background:#000}
    @media (prefers-reduced-motion:reduce){.play{animation:none}}
  `]
})
export class LazyVideoComponent implements OnChanges {

  @Input() src = '';
  @Input() title = '';
  /** إظهار العنوان فوق الغلاف (يُخفى إن كان العنوان معروضًا أسفل الفيديو) */
  @Input() showTitle = true;

  playing = false;
  thumb = '';
  youtubeUrl?: SafeResourceUrl;
  private youtubeId = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges() {
    this.playing = false;
    this.youtubeId = this.parseYoutubeId(this.src);
    this.thumb = this.youtubeId ? `https://i.ytimg.com/vi/${this.youtubeId}/hqdefault.jpg` : '';
  }

  play() {
    if (this.youtubeId) {
      this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.youtubeId}?autoplay=1&rel=0`);
    }
    this.playing = true;
  }

  private parseYoutubeId(url: string): string {
    const m = (url || '').match(/(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/);
    return m ? m[1] : '';
  }
}
