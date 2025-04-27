'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import JsBarcode from 'jsbarcode';

export default function CompletePage() {
  // 1) URL動的セグメント（企画ID）を取得
  const { id } = useParams()!;

  // 2) クエリパラメータの reservationId を取得
  const searchParams = useSearchParams();
  const reservationId = searchParams.get('reservationId')!;

  // 3) バーコード描画用の SVG 要素を取得
  const svgRef = useRef<SVGSVGElement>(null);

  // 4) reservationId があれば、JsBarcode でバーコードを生成
  useEffect(() => {
    if (svgRef.current && reservationId) {
      JsBarcode(svgRef.current, reservationId, {
        format: 'CODE128',
        displayValue: true,
        fontSize: 18,
      });
    }
  }, [reservationId]);

  return (
    <div className="p-8 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">予約完了！</h1>
      <p className="mb-2">企画 <span className="font-semibold">{id}</span> の予約を受け付けました。</p>
      <p className="mb-6">あなたの予約番号：</p>
      <p className="text-4xl font-mono mb-6">{reservationId}</p>
      {/* ここにバーコードを描画 */}
      <svg ref={svgRef} className="mx-auto mb-6"></svg>
      <p className="text-sm text-gray-600">この番号を受付でご提示ください。</p>
    </div>
  );
}
