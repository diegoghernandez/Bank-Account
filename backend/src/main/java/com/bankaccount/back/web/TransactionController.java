package com.bankaccount.back.web;

import com.bankaccount.back.domain.service.TransactionService;
import com.bankaccount.back.domain.service.TransactionTypeService;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.TransactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private TransactionTypeService transactionTypeService;

    @GetMapping("/{id}")
    public ResponseEntity<TransactionEntity> getTransactionById(@PathVariable long id) {
        return transactionService.getTransactionById(id)
                .map(transaction -> new ResponseEntity<>(transaction, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/account")
    public ResponseEntity<Page<TransactionEntity>> getByIdAccount(@RequestParam(name = "id") int idAccount, @RequestParam int page) {
        return transactionService.getByIdAccount(idAccount, page)
                .map(transaction -> new ResponseEntity<>(transaction, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/year")
    public ResponseEntity<List<TransactionEntity>> getByYearAndIdAccount(@RequestParam(name = "id") int idAccount, @RequestParam int year) {
        List<TransactionEntity> transactionDomainList = transactionService.getByIdAccountAndYear(idAccount, year);

        if (!transactionDomainList.isEmpty()) {
            return new ResponseEntity<>(transactionDomainList, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/save", consumes = {"application/json"})
    public ResponseEntity<?> saveDepositTransaction(@RequestBody TransactionDto transactionDto) throws Exception {
        try {
            return new ResponseEntity<>(transactionTypeService.saveTransaction(transactionDto, false), HttpStatus.CREATED);
        } catch (Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
