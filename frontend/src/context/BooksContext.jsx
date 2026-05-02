import { createContext, useContext, useEffect, useState } from "react";
import * as api from "../api/BookApi";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const res = await api.getBooks();
      console.log("API DATA:", res.data); 
      setBooks(res.data);
    } catch (err) {
      console.error(err); 
    }
  };

  const addBook = async (book) => {
    await api.createBook(book);
    loadBooks();
  };

  const getBook = async (id) => {
    const res = await api.getBookById(id);
    return res.data;
  };

  const editBook = async (id, book) => {
    await api.updateBook(id, book);
    loadBooks();
  };

  const removeBook = async (id) => {
    await api.deleteBook(id);
    loadBooks();
  };

  const searchBook = async (keyword) => {
    const res = await api.searchBooks(keyword);
    setBooks(res.data);
  };

  return (
    <BooksContext.Provider
      value={{ books, loadBooks, addBook, editBook, removeBook, searchBook, getBook }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export function useBooks() {
  return useContext(BooksContext);
}