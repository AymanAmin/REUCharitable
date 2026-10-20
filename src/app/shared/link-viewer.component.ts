import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * نافذة منبثقة لعرض الروابط الخارجية والملفات داخل الموقع بدل فتح تبويب جديد.
 * تلتقط النقر على أي رابط يفتح في نافذة جديدة (target="_blank") أو يشير إلى ملف.
 * المواقع التي تمنع العرض داخل إطار (شبكات التواصل) تبقى في تبويب جديد.
 * لاستثناء رابط معيّن: أضف له data-no-viewer.
 */
@Component({
  selector: 'app-link-viewer',
  template: `
    <div class="lvw" *ngIf="open" role="dialog" aria-modal="true" [attr.aria-label]="title" (click)="onBackdrop($event)">
      <div class="panel" #panel>
        <header>
          <span class="ic"><i class="fa" [class.fa-file-pdf]="kind === 'pdf'" [class.fa-image]="kind === 'image'"
             [class.fa-clipboard-list]="kind === 'form'" [class.fa-globe]="kind === 'page'"></i></span>
          <b class="t">{{ title }}</b>
          <a class="act" [href]="rawUrl" target="_blank" rel="noopener" data-no-viewer>
            <i class="fa fa-external-link-alt"></i><span>فتح في نافذة جديدة</span>
          </a>
          <a class="act" *ngIf="kind === 'pdf' || kind === 'image'" [href]="rawUrl" download data-no-viewer>
            <i class="fa fa-download"></i><span>تحميل</span>
          </a>
          <button #closeBtn type="button" class="close" (click)="close()" aria-label="إغلاق"><i class="fa fa-times"></i></button>
        </header>

        <div class="body" [class.is-image]="kind === 'image'">
          <div class="loading" *ngIf="loading"><span></span></div>
          <img *ngIf="kind === 'image'" [src]="rawUrl" [alt]="title" (load)="loaded()" (error)="loaded()">
          <iframe *ngIf="kind !== 'image'" [src]="frameUrl" [title]="title" (load)="loaded()"></iframe>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .lvw{
      position:fixed;inset:0;z-index:100000;display:grid;place-items:center;padding:3vh 3vw;
      background:rgba(14,26,8,.72);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);
      animation:fade .25s ease both;direction:rtl;font-family:var(--arp-f-body);
    }
    .panel{
      width:min(1180px,100%);height:min(92vh,100%);display:flex;flex-direction:column;overflow:hidden;
      background:#fff;border-radius:6px;box-shadow:0 40px 90px -30px rgba(0,0,0,.6);
      animation:rise .35s cubic-bezier(.2,.8,.2,1) both;
    }
    header{display:flex;align-items:center;gap:10px;padding:10px 12px 10px 16px;border-bottom:1px solid var(--arp-line);background:var(--arp-ivory)}
    .ic{flex:none;width:36px;height:36px;border-radius:4px;display:grid;place-items:center;background:var(--arp-forest-800);color:var(--arp-leaf-300)}
    .t{flex:1;min-width:0;font-family:var(--arp-f-display);font-weight:500;font-size:15.5px;color:var(--arp-forest-800);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .act{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid var(--arp-line);border-radius:4px;background:#fff;color:var(--arp-forest-800);font-size:13.5px;font-weight:600;white-space:nowrap}
    .act:hover{background:var(--arp-forest-800);border-color:var(--arp-forest-800);color:#fff}
    .close{flex:none;width:40px;height:40px;border:0;border-radius:4px;background:var(--arp-forest-800);color:#fff;font-size:16px;cursor:pointer}
    .close:hover{background:var(--arp-olive-600)}
    .close:focus-visible,.act:focus-visible{outline:3px solid var(--arp-leaf-400);outline-offset:2px}
    .body{position:relative;flex:1;background:#EEF0EA}
    .body iframe{position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff}
    .body.is-image{display:grid;place-items:center;overflow:auto;padding:16px;background:#1A2414}
    .body.is-image img{max-width:100%;max-height:100%;object-fit:contain;border-radius:2px}
    .loading{position:absolute;inset:0;display:grid;place-items:center;z-index:1;pointer-events:none}
    .loading span{width:42px;height:42px;border-radius:50%;border:3px solid var(--arp-line);border-top-color:var(--arp-leaf-500);animation:spin .8s linear infinite}
    @keyframes fade{from{opacity:0}}
    @keyframes rise{from{opacity:0;transform:translateY(20px) scale(.98)}}
    @keyframes spin{to{transform:rotate(360deg)}}
    @media (max-width:640px){
      .lvw{padding:0}
      .panel{height:100%;border-radius:0}
      .act span{display:none}
      .act{padding:8px 11px}
    }
  `]
})
export class LinkViewerComponent {

  @ViewChild('closeBtn') closeBtn?: ElementRef<HTMLButtonElement>;

  open = false;
  loading = true;
  title = '';
  rawUrl = '';
  frameUrl?: SafeResourceUrl;
  kind: 'pdf' | 'image' | 'form' | 'page' = 'page';
  private returnFocus: HTMLElement | null = null;

  /** مواقع ترفض العرض داخل إطار، فتبقى في تبويب جديد */
  private static blocked = /(^|\.)(twitter\.com|x\.com|linkedin\.com|facebook\.com|instagram\.com|youtube\.com|youtu\.be|tiktok\.com|snapchat\.com|wa\.me|whatsapp\.com|maps\.google\.com|google\.com\/maps)$/i;

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent) {
    if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
    if (!a || !a.href || a.hasAttribute('data-no-viewer') || a.hasAttribute('download')) return;

    let url: URL;
    try { url = new URL(a.href, location.href); } catch { return; }
    if (!/^https?:$/.test(url.protocol)) return;

    const isFile = /\.(pdf|jpe?g|png|gif|webp|svg)$/i.test(decodeURIComponent(url.pathname));
    const opensNewWindow = (a.getAttribute('target') || '').toLowerCase() === '_blank';
    if (!opensNewWindow && !isFile) return;
    if (LinkViewerComponent.blocked.test(url.hostname)) return;
    // صفحة http داخل موقع https يحجبها المتصفح داخل الإطار
    if (location.protocol === 'https:' && url.protocol === 'http:' && url.origin !== location.origin) return;

    e.preventDefault();
    this.show(url, a);
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.open) this.close();
  }

  // حدث التحميل قد يقع أثناء دورة التحديث نفسها، فنؤجّل التغيير
  loaded() {
    setTimeout(() => this.loading = false);
  }

  onBackdrop(e: MouseEvent) {
    if (e.target === e.currentTarget) this.close();
  }

  close() {
    this.open = false;
    document.documentElement.style.overflow = '';
    this.returnFocus?.focus?.();
  }

  private show(url: URL, a: HTMLAnchorElement) {
    const path = decodeURIComponent(url.pathname);
    this.kind = /\.pdf$/i.test(path) ? 'pdf'
      : /\.(jpe?g|png|gif|webp|svg)$/i.test(path) ? 'image'
      : /docs\.google\.com\/forms/i.test(url.href) ? 'form' : 'page';

    // نماذج جوجل تحتاج وضع التضمين
    if (this.kind === 'form' && !url.searchParams.has('embedded')) url.searchParams.set('embedded', 'true');

    this.rawUrl = a.href;
    this.frameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url.href);
    this.title = this.titleFor(a, path);
    this.loading = true;
    this.returnFocus = a;
    this.open = true;
    document.documentElement.style.overflow = 'hidden';
    setTimeout(() => this.closeBtn?.nativeElement.focus());
  }

  private titleFor(a: HTMLAnchorElement, path: string): string {
    const text = (a.getAttribute('aria-label') || a.textContent || '').replace(/\s+/g, ' ').trim();
    // روابط "عرض" داخل الجداول: نأخذ اسم الملف من الصف
    if (!text || text.length < 3 || /^(عرض|تحميل|اضغط هنا)$/.test(text)) {
      const row = a.closest('tr');
      const cell = row?.querySelector('td:nth-child(2)')?.textContent?.replace(/\s+/g, ' ').trim();
      if (cell) return cell;
      const file = path.split('/').pop() || '';
      return file.replace(/\.[a-z0-9]+$/i, '') || 'عرض';
    }
    return text;
  }
}
