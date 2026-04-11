package com.project.ums.repository;

import com.project.ums.entity.LibraryBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibraryBookRepository extends JpaRepository<LibraryBook, Long> {
    List<LibraryBook> findAllByOrderByTitleAsc();
}
