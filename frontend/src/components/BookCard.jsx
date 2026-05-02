import React, { useState } from 'react';

const PALETTE = ['#c9922a', '#4a6741', '#9b3a1a', '#3d5a80', '#7b4ea0'];

function colorFor(str) {
  let h = 0;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return PALETTE[h % PALETTE.length];
}

export default function BookCard({ book }) {
  const [imgError, setImgError] = useState(false);
  const color = colorFor(book.title);

  return (
    <div className="bg-white rounded-md overflow-hidden border border-black/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-250">
      {book.imageUrl && !imgError ? (
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full aspect-[3/4] object-cover block"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-full aspect-[3/4] flex items-center justify-center font-serif text-base text-center p-4"
          style={{ background: `${color}22`, color }}
        >
          {book.title}
        </div>
      )}
      <div className="p-4">
        <p className="text-xs tracking-widest uppercase text-gold mb-1">{book.genre || '—'}</p>
        <h3 className="font-serif text-base text-ink leading-snug mb-1">{book.title}</h3>
        <p className="text-xs text-ink/50 mb-2">{book.author}</p>
        <p className="text-base font-medium text-rust">${Number(book.price).toFixed(2)}</p>
      </div>
    </div>
  );
}
