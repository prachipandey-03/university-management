package com.project.ums.repository;

import com.project.ums.entity.LibraryIssue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LibraryIssueRepository extends JpaRepository<LibraryIssue, Long> {
    List<LibraryIssue> findAllByOrderByIssueDateDesc();
}
