import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BooksProvider } from './context/BooksContext';
import { ToastProvider } from './components/Toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';

export default function App() {
  return (
    <BrowserRouter>
      <BooksProvider>
        <ToastProvider>  
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/new" element={<BookForm />} />
              <Route path="/books/edit/:id" element={<BookForm />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </ToastProvider>
      </BooksProvider>
    </BrowserRouter>
  );
}