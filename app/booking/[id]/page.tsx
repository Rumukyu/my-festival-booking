'use client';

import { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { db } from '@/lib/firebase'; // lib/firebase.ts のパス
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ReservePage() {
  const router = useRouter();
  const { id } = useParams()!; // booking/[id]
  const searchParams = useSearchParams();
  const time = searchParams.get('time')!; // クエリ ?time=HH:MM

  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Firestoreにデータを追加
      const docRef = await addDoc(collection(db, 'reservations'), {
        eventId: id, // どの企画か
        time, // 予約時間
        name, // 入力されたお名前
        createdAt: serverTimestamp(), // 作成時刻
        checkedIn: false, // チェックイン状態
        canceled: false, // キャンセル状態
      });

      // 予約完了ページへリダイレクト（query に reservationId を付与）
      router.push(`/booking/${id}/complete?reservationId=${docRef.id}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        企画 {id} 予約フォーム
      </h1>
      <p className="text-center mb-4">
        時間: <span className="font-medium">{time}</span>
      </p>

      {/* フォームに handleSubmit を紐づけ */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="block mb-1">お名前</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="例：山田 太郎"
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[#4169e1] text-white p-3 rounded-md hover:opacity-90 transition"
        >
          {submitting ? '送信中…' : '予約する'}
        </button>
      </form>
    </div>
  );
}
