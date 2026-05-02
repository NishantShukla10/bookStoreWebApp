import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import BookCard from '../components/BookCard';

export default function Home() {
    const { books } = useBooks();
    const featured = books.slice(0, 4);

    return (
        <div className="page-enter"> 
            {/* Hero */}
            <section className="bg-ink-light min-h-[420px] flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden">
                {/* subtle grid overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04]"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(0deg,transparent,transparent 39px,#fff 39px,#fff 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#fff 39px,#fff 40px)',
                    }}
                />
                <span className="relative z-10 text-xs tracking-[0.18em] uppercase text-gold border border-gold px-4 py-1 rounded-sm mb-6 inline-block">
                    Est. 2026 · Curated Collection
                </span>
                <h1 className="relative z-10 font-serif text-white text-4xl md:text-6xl leading-tight max-w-2xl mb-4">
                    Discover Stories That{' '}
                    <em className="text-gold-light not-italic">Move</em> You
                </h1>
                <p className="relative z-10 text-white/60 text-base max-w-md leading-relaxed mb-8">
                    Your one-stop destination for timeless classics, modern masterpieces,
                    and technical essentials.
                </p>
                <Link to="/books" className="relative z-10 btn-primary">
                    Browse All Books
                </Link>
            </section>

            {/* Featured */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <p className="section-label">Hand-picked</p>
                <h2 className="font-serif text-3xl text-ink mb-1">Featured Titles</h2>
                <p className="text-ink/50 text-sm mb-2">
                    Our curated selection of must-read books for every reader
                </p>
                <div className="w-10 h-0.5 bg-gold mb-10" />

                {featured.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featured.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <p className="text-ink/40 italic text-sm">No books available yet.</p>
                )}

                <div className="text-center mt-12">
                    <Link to="/books" className="btn-outline">
                        View All Books →
                    </Link>
                </div>
            </section>
        </div>
    );
}
