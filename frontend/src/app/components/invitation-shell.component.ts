import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'wed-invitation-shell', standalone: true, imports: [CommonModule],
  animations: [trigger('reveal', [transition(':enter', [style({ opacity: 0, transform: 'translateY(24px)' }), animate('850ms cubic-bezier(.2,.7,.2,1)', style({ opacity: 1, transform: 'translateY(0)' }))])])],
  template: `
    <main class="invitation-shell" [@reveal]="true">
      <div class="shell-ornament ornament-top">✦</div>
      <p class="shell-kicker">دعوة لحكايةٍ من حُبّ</p>
      <div class="shell-monogram"><span>ل</span><i>♡</i><span>ي</span></div>
      <h1>ليلةٌ لا تُنسى<br><em>تبدأ بوجودكم</em></h1>
      <p class="shell-copy">بكل الحب ندعوكم لمشاركتنا<br>أجمل فصول حكايتنا</p>
      <button type="button" class="seal-button" (click)="open.emit()" aria-label="افتح الدعوة">
        <span class="seal-ring"></span><span class="seal-letter">افتح<br>الدعوة</span>
      </button>
      <p class="shell-hint">اضغط على الختم لفتح الدعوة</p>
      <div class="shell-ornament ornament-bottom">✦</div>
    </main>
  `
})
export class InvitationShellComponent {
  @Output() open = new EventEmitter<void>();
}
