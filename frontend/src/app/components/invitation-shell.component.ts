import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wed-invitation-shell',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="envelope-stage" [class.unsealed]="isOpening">
      <!-- Ambient background lighting -->
      <div class="stage-backdrop">
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
      </div>

      <!-- Real 3D interactive envelope experience -->
      <div class="envelope-container" [class.open-anim]="isOpening">
        <!-- Back of envelope -->
        <div class="envelope-back"></div>

        <!-- The physical invitation card that slides up -->
        <div class="invitation-letter-card">
          <div class="letter-inner-frame">
            <div class="letter-calligraphy-header">
              <span class="bismillah-text">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</span>
              <div class="letter-divider"><span>✧</span></div>
            </div>

            <div class="letter-monogram">
              <span class="mono-char">ل</span>
              <span class="mono-center">
                <svg viewBox="0 0 40 40" width="28" height="28" fill="none" class="wedding-rings-icon">
                  <circle cx="16" cy="20" r="10" stroke="currentColor" stroke-width="1.6" opacity="0.85"/>
                  <circle cx="24" cy="20" r="10" stroke="currentColor" stroke-width="1.6"/>
                </svg>
              </span>
              <span class="mono-char">ي</span>
            </div>

            <h1 class="letter-names">
              <span>ليلى</span>
              <span class="letter-amp">&amp;</span>
              <span>يوسف</span>
            </h1>

            <p class="letter-body">
              بكل آيات المودة وصدق المحبة،<br>
              نتشرف بدعوتكم لحضور حفل زفافنا ومشاركتنا فرحة العمر
            </p>

            <div class="letter-date-pill">
              <span class="date-icon">❖</span>
              <span>الخميس ٢٤ ديسمبر ٢٠٢٦</span>
            </div>
          </div>
        </div>

        <!-- Front pocket flaps of envelope -->
        <div class="envelope-pocket"></div>

        <!-- Top triangular seal flap -->
        <div class="envelope-flap" [class.flap-opened]="isOpening">
          <!-- Realistic Wax Seal Button -->
          <button
            type="button"
            class="wax-seal-press"
            [class.cracking]="isOpening"
            (click)="triggerOpen()"
            [disabled]="isOpening"
            aria-label="كسر الختم وفتح الدعوة"
          >
            <span class="seal-glow-ring"></span>
            <span class="seal-wax-stamp">
              <span class="seal-initials">LY</span>
              <span class="seal-subtext">افتح الدعوة</span>
            </span>
          </button>
        </div>
      </div>

      <div class="envelope-prompt" *ngIf="!isOpening">
        <span class="prompt-pulse-dot"></span>
        <span>اضغط على الختم الملكي لفتح الدعوة الرسمية</span>
      </div>
    </main>
  `
})
export class InvitationShellComponent {
  @Output() open = new EventEmitter<void>();
  isOpening = false;

  triggerOpen(): void {
    if (this.isOpening) return;
    this.isOpening = true;

    // Smooth choreographed transition: flap opens -> card slides out -> full invitation appears
    setTimeout(() => {
      this.open.emit();
    }, 1100);
  }
}
