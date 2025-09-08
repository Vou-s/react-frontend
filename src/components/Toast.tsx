import React from 'react';

export default function Toast({ message }: { message: string }) {
    return (
        <div className="fixed top-6 right-6 bg-black text-white px-4 py-2 rounded shadow z-50">
            {message}
        </div>
    );
}
