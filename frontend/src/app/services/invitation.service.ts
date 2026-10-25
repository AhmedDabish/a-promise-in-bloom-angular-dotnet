import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GuestWish, Invitation, RsvpRequest, TimelineEvent, WishRequest } from '../models/wedding.models';

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
  { id: 1, time: '٧:٠٠ م', title: 'استقبال الضيوف', description: 'نستقبلكم بفرح ومحبة', icon: '✧' },
  { id: 2, time: '٨:٠٠ م', title: 'عقد القران', description: 'لحظتنا المنتظرة', icon: '♡' },
  { id: 3, time: '٨:٣٠ م', title: 'الزفة الملكية', description: 'نحتفل ببداية حكايتنا', icon: '✿' },
  { id: 4, time: '٩:٣٠ م', title: 'العشاء والاحتفال', description: 'ليلة تجمعنا بكم', icon: '❋' }
];

const DEMO_WISHES: GuestWish[] = [
  { id: 1, guestName: 'مريم', message: 'ألف مبروك يا أحلى عروسين، ربنا يسعدكم دائمًا 💛', createdAt: new Date().toISOString() },
  { id: 2, guestName: 'عمر', message: 'بارك الله لكما وبارك عليكما وجمع بينكما في خير', createdAt: new Date().toISOString() },
  { id: 3, guestName: 'سارة', message: 'ليلتكم أجمل بداية لحكاية عمر.. بحبكم 🤍', createdAt: new Date().toISOString() }
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

  createRsvp(request: RsvpRequest): Observable<unknown> {
    return this.http.post(`${API_URL}/rsvp`, request);
  }

  createWish(request: WishRequest): Observable<GuestWish> {
    return this.http.post<GuestWish>(`${API_URL}/wishes`, request);
  }
}
