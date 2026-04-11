package com.project.ums.controller;

import com.project.ums.entity.LibraryBook;
import com.project.ums.repository.LibraryBookRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library/books")
public class LibraryBookController {

    private final LibraryBookRepository libraryBookRepository;

    public LibraryBookController(LibraryBookRepository libraryBookRepository) {
        this.libraryBookRepository = libraryBookRepository;
    }

    @GetMapping
    public List<LibraryBook> list() {
        return libraryBookRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<LibraryBook> create(@RequestBody LibraryBook book) {
        if (book.getAvailabilityStatus() == null || book.getAvailabilityStatus().isBlank()) {
            book.setAvailabilityStatus("Available");
        }
        return ResponseEntity.ok(libraryBookRepository.save(book));
    }
}
