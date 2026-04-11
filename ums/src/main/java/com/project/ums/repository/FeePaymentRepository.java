package com.project.ums.repository;

import com.project.ums.entity.FeePayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeePaymentRepository extends JpaRepository<FeePayment, Long> {
    java.util.List<FeePayment> findAllByOrderByPaymentDateDesc();
}
