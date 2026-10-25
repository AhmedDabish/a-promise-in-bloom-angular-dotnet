export interface Invitation {
  groom: string;
  bride: string;
  families: string;
  date: string;
  dateLabel: string;
  timeLabel: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  whatsAppPhone: string;
  verse: string;
}

export interface TimelineEvent {
  id: number;
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface GuestWish {
  id: number;
  guestName: string;
  message: string;
  createdAt: string;
}

export interface RsvpRequest {
  guestName: string;
  phone: string;
  guestCount: number;
  message: string;
}

export interface WishRequest {
  guestName: string;
  message: string;
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface WeddingStats {
  totalRsvps: number;
  totalGuests: number;
  totalWishes: number;
}
