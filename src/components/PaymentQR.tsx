import React from 'react';


export default function PaymentQR({ qrImage, vaNumber }: { qrImage?: string | null, vaNumber?: string | null }) {
    return (
        <div className="p-4 bg-white rounded shadow text-center">
            <h3 className="font-bold mb-2">Pembayaran</h3>
            {qrImage ? <img src={qrImage} alt="qris" className="mx-auto" /> : null}
            {vaNumber ? <div className="mt-3">Virtual Account: <span className="font-mono">{vaNumber}</span></div> : null}
            <div className="mt-4 text-sm text-gray-600">Tunggu hingga pembayaran terverifikasi oleh sistem.</div>
        </div>
    );
}