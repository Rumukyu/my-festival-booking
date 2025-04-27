import Link from 'next/link';

const mockBookings = [
  { id: '1', name: '企画1', description: 'みんなで楽しめるワークショップ' },
  { id: '2', name: '企画2', description: '魅惑のお化け屋敷ツアー' },
  { id: '3', name: '企画3', description: 'カラオケ大会で熱唱！' },
  { id: '4', name: '企画4', description: '手作りアクセサリー制作体験' },
  { id: '5', name: '企画5', description: 'VRゲーム体験コーナー' },
  { id: '6', name: '企画6', description: 'ドリンクバー＆ボードゲーム' },
];

export default function BookingList() {
  return (
    <div className="p-8 bg-blue-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">予約可能な企画一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {mockBookings.map((booking) => (
          <Link
            key={booking.id}
            href={`/booking/${booking.id}`}
            className="block bg-blue-50 border-2 border-blue-300 p-6 rounded-xl shadow-xl 
                       hover:bg-blue-100 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-blue-900 text-center mb-4">
              {booking.name}
            </h2>
            <p className="text-center text-blue-700">
              {booking.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
