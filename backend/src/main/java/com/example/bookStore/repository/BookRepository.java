package com.example.bookStore.repository;

import com.example.bookStore.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    //Custom Repository method to find books by title containing a specific string
    // (case insensitive)
    List<Book> findByTitleContainingIgnoreCase(String title);

    //find book by Isbn -custom method
    Book findByIsbn(String isbn);
}
