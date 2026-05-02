import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBooks } from '../context/BooksContext';
import { useToast } from '../components/Toast';

const EMPTY_FORM = {
  title: '',
  author: '',
  isbn: '',
  price: '',
  genre: '',
  publicationDate: '',
  imageUrl: '',
  description: '',
};

function FormField({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium tracking-widest uppercase text-ink/50">{label}</label>
      {children}
      {error && <p className="text-red-600 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

export default function BookForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getBook, addBook, editBook } = useBooks();
  const { showToast } = useToast();

  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      loadBook();
    }
  }, [id]);

  const loadBook = async () => {
    try {
      const book = await getBook(Number(id));

      setForm({
        title: book.title || '',
        author: book.author || '',
        isbn: book.isbn || '',
        price: book.price || '',
        genre: book.genre || '',
        publicationDate: book.publicationDate || '',
        imageUrl: book.imageUrl || '',
        description: book.description || '',
      });

    } catch (err) {
      console.error(err);
      showToast("Failed to load book");
      navigate('/books');
    }
  };


  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.author.trim()) errs.author = 'Author is required';
    if (!form.isbn.trim()) errs.isbn = 'ISBN is required';
    if (!String(form.price).trim()) errs.price = 'Price is required';
    else if (isNaN(Number(form.price)) || Number(form.price) < 0)
      errs.price = 'Enter a valid positive price';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const data = { ...form, price: parseFloat(form.price) };
    if (isEdit) {
      editBook(Number(id), data);
      showToast('Book updated successfully');
    } else {
      addBook(data);
      showToast('Book added successfully');
    }
    navigate('/books');
  };

  return (
    <div className="page-enter max-w-3xl mx-auto px-6 py-10 pb-16">
      <p className="section-label">{isEdit ? 'Editing' : 'New Entry'}</p>
      <h2 className="font-serif text-3xl text-ink mb-1">
        {isEdit ? 'Edit Book' : 'Add New Book'}
      </h2>
      <div className="w-10 h-0.5 bg-gold mb-8" />

      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-white border border-black/10 rounded-lg p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField label="Title *" error={errors.title}>
              <input
                type="text"
                value={form.title}
                onChange={set('title')}
                placeholder="Enter book title"
                className="form-input"
                autoFocus
              />
            </FormField>

            <FormField label="Author *" error={errors.author}>
              <input
                type="text"
                value={form.author}
                onChange={set('author')}
                placeholder="Enter author name"
                className="form-input"
              />
            </FormField>

            <FormField label="ISBN *" error={errors.isbn}>
              <input
                type="text"
                value={form.isbn}
                onChange={set('isbn')}
                placeholder="e.g. 978-0-12-345678-9"
                className="form-input"
              />
            </FormField>

            <FormField label="Price ($) *" error={errors.price}>
              <input
                type="number"
                value={form.price}
                onChange={set('price')}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="form-input"
              />
            </FormField>

            <FormField label="Genre" error={errors.genre}>
              <input
                type="text"
                value={form.genre}
                onChange={set('genre')}
                placeholder="e.g. Programming"
                className="form-input"
              />
            </FormField>

            <FormField label="Publication Date" error={errors.publicationDate}>
              <input
                type="date"
                value={form.publicationDate}
                onChange={set('publicationDate')}
                className="form-input"
              />
            </FormField>

            <div className="sm:col-span-2">
              <FormField label="Image URL" error={errors.imageUrl}>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={set('imageUrl')}
                  placeholder="https://… (optional)"
                  className="form-input"
                />
              </FormField>
            </div>

            <div className="sm:col-span-2">
              <FormField label="Description" error={errors.description}>
                <textarea
                  value={form.description}
                  onChange={set('description')}
                  rows={4}
                  placeholder="Brief description of the book…"
                  className="form-input resize-y"
                />
              </FormField>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8 pt-6 border-t border-black/5">
            <button type="submit" className="btn-primary">
              {isEdit ? 'Update Book' : 'Add Book'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="px-5 py-2.5 text-sm border border-black/10 bg-white rounded-sm text-ink/60 hover:text-ink hover:border-black/20 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
