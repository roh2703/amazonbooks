package com.ecommerce.backend.service;

import com.ecommerce.backend.model.Book;
import com.ecommerce.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class BookService {

    private final BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    public Book createBook(Book book) {
        log.info("Saving book to database: {}", book.getTitle());
        Book savedBook = bookRepository.save(book);
        log.info("Book saved with ID: {}", savedBook.getId());
        return savedBook;
    }
}
