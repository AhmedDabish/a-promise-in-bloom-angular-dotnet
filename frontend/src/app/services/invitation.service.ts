import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GuestWish, Invitation, RsvpRequest, TimelineEvent, WeddingStats, WishRequest } from '../models/wedding.models';

const API_URL = 'http://localhost:5000/api';

const DEMO_INVITATION: Invitation = {
  groom: 'يوسف', bride: 'ليلى',
  families: 'بكل الحب تتشرف عائلتا الأحمد والسيد بدعوتكم',
  date: '2026-12-24T19:30:00+02:00', dateLabel: 'الخميس ٢٤ ديسمبر ٢٠٢٦', timeLabel: 'السابعة والنصف مساءً',
  venueName: 'قاعة الياسمين — فندق النيل', venueAddress: 'كورنيش النيل، جاردن سيتي، القاهرة',
  mapsUrl: 'https://maps.google.com/?q=Garden+City+Cairo', whatsAppPhone: '201000000000',
  verse: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا'
};

const DEMO_TIMELINE: TimelineEvent[] = [
  { id: 1, time: '٧:٠٠ م', title: 'استقبال الضيوف', description: 'نستقبلكم بكل حب وترحاب في بهو القاعة', icon: '✦' },
  { id: 2, time: '٨:٠٠ م', title: 'عقد القران المبارك', description: 'توثيق العهد وكلمات المحبة بحضور الأهل والأحباب', icon: '✧' },
  { id: 3, time: '٨:٤٥ م', title: 'الزفة ودخول العروسين', description: 'لحظة الفرح الكبرى وبداية الاحتفال مع الأصدقاء', icon: '✺' },
  { id: 4, time: '٩:٣٠ م', title: 'مأدبة العشاء الفاخرة', description: 'تشريفكم يزين مائدتنا ويسعد قلوبنا', icon: '◈' }
];

const DEMO_WISHES: GuestWish[] = [
  { id: 1, guestName: 'مريم الشريف', message: 'ألف مبروك يا أجمل ليلى ويوسف، بارك الله لكما وجمع بينكما في خير وسعادة دائمة 🤍', createdAt: new Date().toISOString() },
  { id: 2, guestName: 'عمر كمال', message: 'من أطيب وأجمل القلوب، ليلة لا تُنسى وحياة مليئة بالبركة والرضا يا رب 💍', createdAt: new Date().toISOString() },
  { id: 3, guestName: 'سارة عبد الرحمن', message: 'فرحتنا بيكم ملهاش حدود، أحلى وأرقى عرسان في الدنيا 🌿', createdAt: new Date().toISOString() }
];

@Injectable({ providedIn: 'root' })
export class InvitationService {
  private readonly http = inject(HttpClient);

  getInvitation(): Observable<Invitation> {
    return this.http.get<Invitation>(`${API_URL}/invitation`).pipe(catchError(() => of(DEMO_INVITATION)));
  }

  getTimeline(): Observable<TimelineEvent[]> {
    return this.http.get<TimelineEvent[]>(`${API_URL}/invitation/timeline`).pipe(catchError(() => of(DEMO_TIMELINE)));
  }

  getWishes(): Observable<GuestWish[]> {
    return this.http.get<GuestWish[]>(`${API_URL}/wishes`).pipe(catchError(() => of(DEMO_WISHES)));
  }

  getStats(): Observable<WeddingStats> {
    return this.http.get<WeddingStats>(`${API_URL}/stats`).pipe(catchError(() => of({ totalRsvps: 28, totalGuests: 64, totalWishes: 18 })));
  }

  createRsvp(request: RsvpRequest): Observable<unknown> {
    return this.http.post(`${API_URL}/rsvp`, request);
  }

  createWish(request: WishRequest): Observable<GuestWish> {
    return this.http.post<GuestWish>(`${API_URL}/wishes`, request);
  }
}
