package com.ecommerce.backend.config;

import com.ecommerce.backend.model.Book;
import com.ecommerce.backend.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final BookRepository bookRepository;

    @Override
    public void run(String... args) throws Exception {
        // First, ensure existing books have correct URLs
        updateBookUrl("1984", "https://covers.openlibrary.org/b/id/12711044-L.jpg");
        updateBookUrl("The Great Gatsby", "https://covers.openlibrary.org/b/id/8432047-L.jpg");

        if (bookRepository.count() == 0) {
            Book book1 = new Book(null, "Pride and Prejudice", "Jane Austen", "A romantic novel of manners written by Jane Austen in 1813.", new BigDecimal("12.99"), "https://covers.openlibrary.org/b/id/12643594-L.jpg", 50);
            Book book2 = new Book(null, "1984", "George Orwell", "A dystopian social science fiction novel and cautionary tale.", new BigDecimal("14.99"), "https://covers.openlibrary.org/b/id/12711044-L.jpg", 100);
            Book book3 = new Book(null, "The Great Gatsby", "F. Scott Fitzgerald", "A 1925 novel considered to be Fitzgerald's magnum opus.", new BigDecimal("10.99"), "https://covers.openlibrary.org/b/id/8432047-L.jpg", 75);
            Book book4 = new Book(null, "To Kill a Mockingbird", "Harper Lee", "A novel by Harper Lee published in 1960. It was immediately successful.", new BigDecimal("15.50"), "https://covers.openlibrary.org/b/id/8225266-L.jpg", 30);
            Book book5 = new Book(null, "Moby-Dick", "Herman Melville", "An 1851 novel by American writer Herman Melville.", new BigDecimal("18.00"), "https://covers.openlibrary.org/b/id/12832043-L.jpg", 20);

            bookRepository.saveAll(Arrays.asList(book1, book2, book3, book4, book5));
            log.info("Sample books have been seeded into the database.");
        } else {
            log.info("Database already contains data ({} books). Skipping seeding.", bookRepository.count());
        }
    }

    private void updateBookUrl(String title, String newUrl) {
        bookRepository.findByTitle(title).ifPresent(book -> {
            if (!newUrl.equals(book.getImageUrl())) {
                book.setImageUrl(newUrl);
                bookRepository.save(book);
                log.info("Updated cover URL for book: {}", title);
            }
        });
    }
}
