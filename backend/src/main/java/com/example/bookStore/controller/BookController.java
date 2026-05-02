package com.example.bookStore.controller;
import java.util.List;

import com.example.bookStore.model.Book;
import com.example.bookStore.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/books")
@CrossOrigin(
        origins = {"http://localhost:5173", "https://bookstorewebapp.onrender.com"},
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping
    public ResponseEntity<?> createBook(@Valid @RequestBody Book book) {

        if (bookService.isbnExists(book.getIsbn())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("ISBN already exists");
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookService.saveBook(book));
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBook(@PathVariable Long id) {
        try {
            Book book = bookService.getBookById(id);
            return ResponseEntity.ok(book);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id,
                                        @Valid @RequestBody Book book) {

        try {
            Book existing = bookService.getBookById(id);

            if (bookService.isbnExistsForOtherBook(book.getIsbn(), id)) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("ISBN already used");
            }

            existing.setTitle(book.getTitle());
            existing.setAuthor(book.getAuthor());
            existing.setIsbn(book.getIsbn());
            existing.setPrice(book.getPrice());
            existing.setPublicationDate(book.getPublicationDate());
            existing.setGenre(book.getGenre());
            existing.setDescription(book.getDescription());
            existing.setImageUrl(book.getImageUrl());

            return ResponseEntity.ok(bookService.saveBook(existing));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Book not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {

        try {
            Book book = bookService.getBookById(id);

            bookService.deleteBook(id);
            return ResponseEntity.ok("Deleted successfully");

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Book not found");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Book>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(bookService.searchBook(keyword));
    }
}