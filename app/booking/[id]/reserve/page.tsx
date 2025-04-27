// app/reservation/[reservationId]/page.tsx
'use client';  // クライアントサイドで動作するコンポーネントとして指定

import { useSearchParams } from 'next/navigation';  // useSearchParamsをインポート
import { useState, useEffect } from 'react';

export default function ReservationDetailPage() {
  const searchParams = useSearchParams();  // URLの検索パラメータを取得
  const reservationId = searchParams.get('reservationId');  // 予約IDを取得

  const [reservation, setReservation] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      const response = await fetch(`/api/reservation/${reservationId}`);
      const data = await response.json();
      setReservation(data);
      setLoading(false);
    };

    if (reservationId) {
      fetchReservationDetails();
    }
  }, [reservationId]);

  if (loading) {
    return <p>Loading reservation details...</p>;
  }

  return (
    <div>
      <h1>Reservation Details</h1>
      <p>Reservation ID: {reservation?.id}</p>
      <p>Event ID: {reservation?.eventId}</p>
      <p>Customer: {reservation?.customerName}</p>
      <p>Date: {reservation?.date}</p>
      <p>Location: {reservation?.location}</p>
    </div>
  );
}
