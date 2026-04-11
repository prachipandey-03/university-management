package com.project.ums.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "fee_payments")
public class FeePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private double amount;
    @Column(nullable = false)
    private LocalDate paymentDate;
    @Column(nullable = false)
    private String studentId;

    public FeePayment() {
    }

    public FeePayment(double amount, LocalDate paymentDate, String studentId) {
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.studentId = studentId;
    }

    public Long getId() {
        return id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }
}
