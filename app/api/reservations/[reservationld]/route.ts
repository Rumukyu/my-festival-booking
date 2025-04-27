// app/api/reservation/[reservationId]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reservationId = searchParams.get('reservationId');
  
  if (!reservationId) {
    return NextResponse.json({ error: 'Reservation ID is required' }, { status: 400 });
  }

  // 仮の予約データ
  const reservation = {
    id: reservationId,
    eventId: '1',
    customerName: 'John Doe',
    date: '2025-05-01',
    location: 'Tokyo, Japan',
  };

  return NextResponse.json(reservation);
}
