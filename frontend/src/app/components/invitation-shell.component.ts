import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'wed-invitation-shell',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('reveal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.96) translateY(20px)' }),
        animate('900ms cubic-bezier(.16, 1, .3, 1)', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ])
  ],
  template: `
    <main class="invitation-shell" [@reveal]="true">
      <div class="shell-ambient-glow" aria-hidden="true"></div>
      <div class="envelope-card">
        <div class="envelope-border-gold"></div>
        <div class="envelope-corner ec-tl">✤</div><div class="envelope-corner ec-tr">✤</div>
        <div class="envelope-corner ec-bl">✤</div><div class="envelope-corner ec-br">✤</div>
        <div class="shell-ornament ornament-top">✦ ✧ ✦</div>
        <p class="shell-kicker">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</p>
        <div class="shell-monogram-luxury">
          <span class="mono-letter">ل</span>
          <span class="mono-rings"><svg viewBox="0 0 40 40" width="32" height="32" fill="none" aria-hidden="true"><circle cx="16" cy="20" r="10" stroke="currentColor" stroke-width="1.8" opacity=".8"/><circle cx="24" cy="20" r="10" stroke="currentColor" stroke-width="1.8"/></svg></span>
          <span class="mono-letter">ي</span>
        </div>
        <h1 class="shell-title"><span>ليلى</span><span class="shell-and">و</span><span>يوسف</span></h1>
        <p class="shell-subtitle">ندعوكم لمشاركتنا فرحة العمر والاحتفال بليلة زفافنا</p>
        <div class="wax-seal-wrapper">
          <button type="button" class="luxury-seal-btn" (click)="open.emit()" aria-label="افتح الدعوة">
            <span class="seal-outer-ripple"></span>
            <span class="seal-body"><span class="seal-emblem">♡</span><span class="seal-text">افتح الدعوة</span></span>
          </button>
        </div>
        <p class="shell-hint">اضغط على الختم الملكي لفتح تفاصيل الحفل ✧</p>
        <div class="shell-ornament ornament-bottom">✦ ✧ ✦</div>
      </div>
    </main>
  `
})
export class InvitationShellComponent {
  @Output() open = new EventEmitter<void>();
}
