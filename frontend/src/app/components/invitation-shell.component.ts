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
  template: 
})
export class InvitationShellComponent {
  @Output() open = new EventEmitter<void>();
}
