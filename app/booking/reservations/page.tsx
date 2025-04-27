// app/booking/[id]/reservation/[reservationId]/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ReservationDetailPage() {
  const { id, reservationId } = useParams() as { id: string; reservationId: string; };
  const router = useRouter();
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reservationId) return;
    (async () => {
      const snap = await getDoc(doc(db, 'reservations', reservationId));
      if (snap.exists()) setRes(snap.data());
      else router.push('/booking/reservations');
      setLoading(false);
    })();
  }, [reservationId, router]);

  if (loading) return <p>Loading…</p>;
  if (!res) return <p>予約が見つかりませんでした。</p>;

  return (
    <div>
      <h1>予約詳細</h1>
      <p>イベントID: {id}</p>
      <p>予約ID: {reservationId}</p>
      <p>お名前: {res.name}</p>
      <p>時間: {res.time}</p>
      {/* … */}
    </div>
  );
}
