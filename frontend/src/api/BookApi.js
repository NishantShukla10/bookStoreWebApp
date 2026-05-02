import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080/api/v1/books",
// });
const API = axios.create({
  baseURL: "https://bookstorewebapp-backend-ea5z.onrender.com/api/v1/books",
});

// GET all books
export const getBooks = () => API.get("");

// GET single book
export const getBookById = (id) => API.get(`/${id}`);

// CREATE book
export const createBook = (book) => API.post("", book);

// UPDATE book
export const updateBook = (id, book) => API.put(`/${id}`, book);

// DELETE book
export const deleteBook = (id) => API.delete(`/${id}`);

// SEARCH book
export const searchBooks = (keyword) => API.get(`/search?keyword=${keyword}`);