package com.example.bookStore.service;

import com.example.bookStore.model.Book;
import com.example.bookStore.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public boolean isbnExists(String isbn) {
        return bookRepository.findByIsbn(isbn) != null;
    }

    public boolean isbnExistsForOtherBook(String isbn, Long id) {
        Book book = bookRepository.findByIsbn(isbn);
        return book != null && !book.getId().equals(id);
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id: " + id));
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public List<Book> searchBook(String keyword){
        return bookRepository.findByTitleContainingIgnoreCase(keyword);
    }
}
