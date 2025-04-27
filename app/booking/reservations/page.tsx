// app/booking/reservations/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "@/lib/firebase";  // app をインポート

const db = getFirestore(app);  // Firestoreインスタンスの取得

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const querySnapshot = await getDocs(collection(db, "reservations"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(data);
      } catch (error) {
        console.error("予約取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReservations();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">予約一覧</h1>
      {reservations.length === 0 ? (
        <p>予約がありません</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="p-4 border rounded-lg shadow">
              <p><strong>予約ID:</strong> {reservation.id}</p>
              <p><strong>イベントID:</strong> {reservation.eventId}</p>
              <p><strong>名前:</strong> {reservation.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
