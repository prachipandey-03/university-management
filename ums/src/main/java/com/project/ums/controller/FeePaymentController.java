package com.project.ums.controller;

import com.project.ums.entity.FeePayment;
import com.project.ums.repository.FeePaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fees")
public class FeePaymentController {

    private final FeePaymentRepository feePaymentRepository;

    public FeePaymentController(FeePaymentRepository feePaymentRepository) {
        this.feePaymentRepository = feePaymentRepository;
    }

    @GetMapping
    public List<FeePayment> getAllPayments() {
        return feePaymentRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<FeePayment> addPayment(@RequestBody FeePayment feePayment) {
        FeePayment saved = feePaymentRepository.save(feePayment);
        return ResponseEntity.ok(saved);
    }
}
