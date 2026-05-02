import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import { useToast } from '../components/Toast';

export default function BookList() {
  const { books, removeBook } = useBooks();
  const { showToast } = useToast();
  const [query, setQuery] = useState('');

  const filtered = books.filter((b) => {
    const q = query.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      (b.genre || '').toLowerCase().includes(q)
    );
  }); 

  const handleDelete = (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    removeBook(id);
    showToast('Book deleted successfully');
  };

  return (
    <div className="page-enter">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-0 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="section-label">Catalogue</p>
          <h1 className="font-serif text-3xl text-ink">Book Management</h1>
        </div>
        <Link to="/books/new" className="btn-primary">
          + Add New Book
        </Link>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-6 flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, author, or genre…"
          className="form-input max-w-sm"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="px-4 py-2 text-sm border border-black/10 bg-white rounded-sm text-ink/60 hover:text-ink transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 mt-6 pb-16 overflow-x-auto">
        <table className="w-full text-sm bg-white border border-black/10 rounded-lg overflow-hidden">
          <thead className="bg-ink text-white">
            <tr>
              {['Title', 'Author', 'ISBN', 'Price', 'Genre', 'Pub. Date', 'Actions'].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs tracking-widest uppercase font-medium"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-ink/40 italic py-12 px-4"
                >
                  No books found.
                </td>
              </tr>
            ) : (
              filtered.map((book, i) => (
                <tr
                  key={book.id}
                  className={`border-b border-black/5 hover:bg-parchment/60 transition-colors ${
                    i === filtered.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  {/* <td className="px-4 py-3 text-ink/40 text-xs">{book.id}</td> */}
                  <td className="px-4 py-3 font-serif font-medium text-ink">{book.title}</td>
                  <td className="px-4 py-3 text-ink/70">{book.author}</td>
                  <td className="px-4 py-3 font-mono text-xs text-ink/50">{book.isbn}</td>
                  <td className="px-4 py-3 text-rust font-medium">
                    ${Number(book.price).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-ink/70">{book.genre || '—'}</td>
                  <td className="px-4 py-3 text-ink/50 text-xs">{book.publicationDate || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/books/edit/${book.id}`} className="btn-edit">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(book.id, book.title)}
                        className="btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
