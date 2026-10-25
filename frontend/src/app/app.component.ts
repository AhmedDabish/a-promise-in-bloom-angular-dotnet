import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription, interval } from 'rxjs';
import { AudioService } from './services/audio.service';
import { InvitationService } from './services/invitation.service';
import { Countdown, GuestWish, Invitation, RsvpRequest, TimelineEvent, WeddingStats } from './models/wedding.models';
import { InvitationShellComponent } from './components/invitation-shell.component';

@Component({
  selector: 'wed-root', standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, InvitationShellComponent],
  template: `
    <wed-invitation-shell *ngIf="!opened" (open)="openInvitation()"></wed-invitation-shell>

    <div class="invitation-page" *ngIf="opened" [class.music-on]="musicOn">
      <nav class="site-nav" aria-label="التنقل الرئيسي">
        <a class="nav-monogram" href="#home" aria-label="للأعلى">ل <span>✧</span> ي</a>
        <div class="nav-links">
          <a href="#countdown">العد التنازلي</a>
          <a href="#details">التفاصيل</a>
          <a href="#rsvp">تأكيد الحضور</a>
        </div>
        <a class="nav-rsvp" href="#rsvp">أكد حضورك <span>↗</span></a>
      </nav>

      <header class="hero-section" id="home">
        <div class="hero-image-layer"></div>
        <div class="hero-wash"></div>
        <div class="hero-grain"></div>
        <div class="hero-content" [class.entered]="pageEntered">
          <div class="hero-eyebrow"><span class="eyebrow-rule"></span> بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ <span class="eyebrow-rule"></span></div>
          <p class="hero-invitation">{{ invitation?.families }}</p>
          <div class="name-lockup" aria-label="ليلى ويوسف">
            <span class="hero-name bride-name">{{ invitation?.bride }}</span>
            <span class="ampersand">&amp;</span>
            <span class="hero-name groom-name">{{ invitation?.groom }}</span>
          </div>
          <p class="hero-caption">نحتفل بالحب، ونفرح بوجودكم</p>
          <div class="hero-date"><span class="date-rule"></span><span>{{ invitation?.dateLabel }}</span><span class="date-rule"></span></div>
          <a href="#countdown" class="scroll-cue" aria-label="اكتشف تفاصيل الدعوة"><span></span></a>
        </div>
        <div class="hero-side-note">A PROMISE IN BLOOM · CAIRO</div>
        <span class="hero-index">01 — 05</span>
      </header>

      <main>
        <section class="quote-section section-pad reveal-section">
          <p class="section-index">كلمات من كتابٍ كريم</p>
          <p class="quran-verse">{{ invitation?.verse }}</p>
          <p class="quote-translation">« وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً »</p>
          <span class="quote-rule"></span>
        </section>

        <section class="countdown-section section-pad reveal-section" id="countdown">
          <div class="section-heading"><span class="eyebrow">اللحظة تقترب</span><h2>على موعدٍ مع <em>الفرح</em></h2><p class="section-subtitle">ننتظر هذه الليلة بشوق، وتكتمل فرحتنا بحضوركم</p></div>
          <div class="countdown-grid" dir="ltr">
            <div class="count-card"><span class="count-number">{{ countdown.days }}</span><span class="count-label">يوم</span></div>
            <span class="count-separator">:</span>
            <div class="count-card"><span class="count-number">{{ countdown.hours | number:'2.0' }}</span><span class="count-label">ساعة</span></div>
            <span class="count-separator">:</span>
            <div class="count-card"><span class="count-number">{{ countdown.minutes | number:'2.0' }}</span><span class="count-label">دقيقة</span></div>
            <span class="count-separator">:</span>
            <div class="count-card"><span class="count-number">{{ countdown.seconds | number:'2.0' }}</span><span class="count-label">ثانية</span></div>
          </div>
          <div class="countdown-footnote"><span class="footnote-line"></span> الخميس · القاهرة · ٢٠٢٦ <span class="footnote-line"></span></div>
        </section>

        <section class="details-section section-pad reveal-section" id="details">
          <div class="section-heading"><span class="eyebrow">موعدنا مع الفرح</span><h2>تفاصيل <em>ليلتنا</em></h2></div>
          <div class="details-grid">
            <article class="detail-card date-detail"><div class="detail-card-top"><span class="detail-index">01</span><span class="detail-icon">✧</span></div><span class="detail-label">التاريخ والموعد</span><h3>{{ invitation?.dateLabel }}</h3><p>{{ invitation?.timeLabel }}</p></article>
            <article class="detail-card location-detail"><div class="detail-card-top"><span class="detail-index">02</span><span class="detail-icon">⌖</span></div><span class="detail-label">المكان</span><h3>{{ invitation?.venueName }}</h3><p>{{ invitation?.venueAddress }}</p><a class="text-link" [href]="invitation?.mapsUrl" target="_blank" rel="noopener">افتح الموقع على الخريطة <span>↗</span></a></article>
          </div>
          <a class="calendar-link" [href]="calendarUrl" download="ليلة-ليلى-ويوسف.ics"><span>＋</span> أضف الموعد إلى تقويمك</a>
        </section>

        <section class="timeline-section section-pad reveal-section">
          <div class="section-heading"><span class="eyebrow">كل لحظة لها حكاية</span><h2>برنامج <em>الليلة</em></h2></div>
          <div class="timeline-list">
            <article class="timeline-item" *ngFor="let item of timeline; let last = last; let index = index" [style.--item-index]="index">
              <div class="timeline-icon">{{ item.icon }}</div><div class="timeline-copy"><span class="timeline-time">{{ item.time }}</span><h3>{{ item.title }}</h3><p>{{ item.description }}</p></div><span class="timeline-line" *ngIf="!last"></span>
            </article>
          </div>
        </section>

        <section class="rsvp-section section-pad reveal-section" id="rsvp">
          <div class="rsvp-card">
            <div class="rsvp-copy"><span class="eyebrow">فرحتنا لا تكتمل إلا بكم</span><h2>هل <em>ستنضم إلينا؟</em></h2><p class="rsvp-intro">يسعدنا تأكيد حضوركم لنستعد لاستقبالكم بكل حب واهتمام</p><div class="rsvp-note"><span>✧</span> نرجو تأكيد الحضور قبل ١٥ ديسمبر</div><div class="rsvp-stat-row"><div><strong>{{ stats.totalGuests || 64 }}</strong><span>ضيفًا أكد حضوره</span></div><span class="stat-divider"></span><div><strong>{{ stats.totalWishes || 18 }}</strong><span>رسالة محبة</span></div></div></div>
            <form class="rsvp-form" (ngSubmit)="submitRsvp()">
              <label>الاسم الكريم<input name="guestName" [(ngModel)]="rsvp.guestName" required minlength="2" placeholder="اكتب اسمك هنا"></label>
              <div class="form-row"><label>رقم الهاتف<input name="phone" [(ngModel)]="rsvp.phone" required type="tel" placeholder="01xxxxxxxxx"></label><label>عدد الحضور<select name="guestCount" [(ngModel)]="rsvp.guestCount"><option [ngValue]="1">شخص واحد</option><option [ngValue]="2">شخصان</option><option [ngValue]="3">3 أشخاص</option><option [ngValue]="4">4 أشخاص</option></select></label></div>
              <label>رسالة تهنئة <span class="optional-label">اختياري</span><textarea name="message" [(ngModel)]="rsvp.message" rows="2" placeholder="اترك لنا كلمة جميلة..."></textarea></label>
              <button class="primary-button" type="submit" [disabled]="sending">{{ sending ? 'جارٍ الإرسال...' : 'أؤكد حضوري' }} <span>↗</span></button>
              <p class="form-status" [class.success]="rsvpSuccess" *ngIf="formMessage">{{ formMessage }}</p>
              <a class="whatsapp-link" [href]="whatsappUrl" target="_blank" rel="noopener"><span class="wa-icon">◉</span> أو أكّد حضورك عبر واتساب</a>
            </form>
          </div>
        </section>

        <section class="wishes-section section-pad reveal-section">
          <div class="section-heading"><span class="eyebrow">كلمات من القلب</span><h2>رسائل <em>المحبّة</em></h2><p class="section-subtitle">كلماتكم الطيبة تبقى معنا بعد انتهاء هذه الليلة</p></div>
          <div class="wishes-grid"><article class="wish-card" *ngFor="let wish of wishes; let index = index" [style.--wish-index]="index"><span class="wish-quote">“</span><p>{{ wish.message }}</p><div class="wish-author">{{ wish.guestName }}</div><time>{{ wish.createdAt | date:'mediumDate':'':'ar' }}</time></article></div>
          <form class="wish-form" (ngSubmit)="submitWish()"><input name="wishName" [(ngModel)]="wishName" required placeholder="اسمك"><input name="wishMessage" [(ngModel)]="wishMessage" required minlength="3" placeholder="اكتب تهنئتك الجميلة"><button type="submit" aria-label="أرسل التهنئة">أرسلها <span>↗</span></button></form>
        </section>
      </main>

      <footer class="footer-section"><div class="footer-monogram">ل <span>✧</span> ي</div><p>ننتظركم بكل الحب</p><span class="footer-date">{{ invitation?.dateLabel }}</span><div class="footer-rule"></div><small>A PROMISE IN BLOOM · CAIRO · 2026</small></footer>
      <button class="music-toggle" type="button" (click)="toggleMusic()" [attr.aria-label]="musicOn ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'"><span class="music-bars" [class.playing]="musicOn"><i></i><i></i><i></i><i></i></span><span>{{ musicOn ? 'إيقاف' : 'موسيقى' }}</span></button>
      <a class="back-to-top" href="#home" aria-label="العودة للأعلى">↑</a>
      <div class="petal-field" aria-hidden="true"><span *ngFor="let petal of petals" [style.left.%]="petal.left" [style.animation-delay.s]="petal.delay">✿</span></div>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly invitationService = inject(InvitationService);
  private readonly audioService = inject(AudioService);
  private subscription = new Subscription();

  opened = false;
  pageEntered = false;
  musicOn = false;
  stats: WeddingStats = { totalRsvps: 28, totalGuests: 64, totalWishes: 18 };
  sending = false;
  rsvpSuccess = false;
  formMessage = '';
  invitation: Invitation | null = null;
  timeline: TimelineEvent[] = [];
  wishes: GuestWish[] = [];
  countdown: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  rsvp: RsvpRequest = { guestName: '', phone: '', guestCount: 1, message: '' };
  wishName = '';
  wishMessage = '';
  readonly petals = Array.from({ length: 9 }, (_, index) => ({ left: 6 + (index * 13) % 90, delay: (index * 2.3) % 12 }));

  get calendarUrl(): string {
    const title = encodeURIComponent('حفل زفاف ليلى ويوسف');
    const details = encodeURIComponent('يسعدنا حضوركم ومشاركتنا فرحة العمر');
    return `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:${title}%0ADESCRIPTION:${details}%0ADTSTART:20261224T173000Z%0ADTEND:20261224T220000Z%0ALOCATION:${encodeURIComponent('قاعة الياسمين، جاردن سيتي، القاهرة')}%0AEND:VEVENT%0AEND:VCALENDAR`;
  }

  get whatsappUrl(): string {
    const phone = this.invitation?.whatsAppPhone ?? '201000000000';
    const message = `مبروك ${this.invitation?.groom ?? 'يوسف'} و${this.invitation?.bride ?? 'ليلى'}! يسعدني تأكيد حضوري 🤍`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  ngOnInit(): void {
    this.subscription.add(this.invitationService.getInvitation().subscribe((data) => { this.invitation = data; this.updateCountdown(); }));
    this.subscription.add(this.invitationService.getTimeline().subscribe((data) => this.timeline = data));
    this.subscription.add(this.invitationService.getWishes().subscribe((data) => this.wishes = data));
    this.subscription.add(this.invitationService.getStats().subscribe((data) => this.stats = data));
    this.subscription.add(interval(1000).subscribe(() => this.updateCountdown()));
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }

  openInvitation(): void {
    this.opened = true;
    window.setTimeout(() => {
      this.pageEntered = true;
      this.observeSections();
      document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  }

  private observeSections(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal-section').forEach((section) => observer.observe(section));
  }

  async toggleMusic(): Promise<void> { this.musicOn = await this.audioService.toggle(); }

  submitRsvp(): void {
    if (!this.rsvp.guestName.trim() || !this.rsvp.phone.trim()) return;
    this.sending = true; this.formMessage = '';
    this.invitationService.createRsvp(this.rsvp).subscribe({
      next: () => { this.rsvpSuccess = true; this.formMessage = 'شكرًا لك! تم تسجيل تأكيد حضورك بكل سرور 🤍'; this.sending = false; },
      error: () => { this.rsvpSuccess = false; this.formMessage = 'تعذّر الاتصال بالخادم. جرّب لاحقًا أو أكّد عبر واتساب.'; this.sending = false; }
    });
  }

  submitWish(): void {
    if (!this.wishName.trim() || !this.wishMessage.trim()) return;
    const fallback: GuestWish = { id: Date.now(), guestName: this.wishName.trim(), message: this.wishMessage.trim(), createdAt: new Date().toISOString() };
    this.invitationService.createWish({ guestName: this.wishName, message: this.wishMessage }).subscribe({
      next: (wish) => this.wishes = [wish, ...this.wishes],
      error: () => this.wishes = [fallback, ...this.wishes]
    });
    this.wishName = ''; this.wishMessage = '';
  }

  private updateCountdown(): void {
    const target = new Date(this.invitation?.date ?? '2026-12-24T19:30:00+02:00').getTime();
    const remaining = Math.max(0, target - Date.now());
    const seconds = Math.floor(remaining / 1000);
    this.countdown = {
      days: Math.floor(seconds / 86400),
      hours: Math.floor((seconds % 86400) / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60
    };
  }
}
