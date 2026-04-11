package com.project.ums.controller;

import com.project.ums.entity.FeeStructure;
import com.project.ums.repository.FeeStructureRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fee-structures")
public class FeeStructureController {

    private final FeeStructureRepository feeStructureRepository;

    public FeeStructureController(FeeStructureRepository feeStructureRepository) {
        this.feeStructureRepository = feeStructureRepository;
    }

    @GetMapping
    public List<FeeStructure> list() {
        return feeStructureRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<FeeStructure> create(@RequestBody FeeStructure feeStructure) {
        return ResponseEntity.ok(feeStructureRepository.save(feeStructure));
    }
}
