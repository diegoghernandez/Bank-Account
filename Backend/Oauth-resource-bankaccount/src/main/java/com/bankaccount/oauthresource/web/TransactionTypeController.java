package com.bankaccount.oauthresource.web;

import com.bankaccount.oauthresource.domain.TransactionDomain;
import com.bankaccount.oauthresource.domain.service.TransactionTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/transactions-type/{id}")
public class TransactionTypeController {

    @Autowired
    private TransactionTypeService transactionTypeService;

    @PostMapping(value = "/save-deposit/{amount}", consumes = {"application/json"})
    public ResponseEntity<TransactionDomain> saveDepositTransaction(long id, BigDecimal amount) {
        return new ResponseEntity<>(transactionTypeService.saveDepositTransaction(id, amount), HttpStatus.CREATED);
    }

    @PostMapping(value = "/save-check", consumes = {"application/json"})
    public ResponseEntity<TransactionDomain> saveCheckTransaction(long id) {
        return new ResponseEntity<>(transactionTypeService.saveCheckTransaction(id), HttpStatus.CREATED);
    }

    @PostMapping(value = "/save-online-payment/{amount}", consumes = {"application/json"})
    public ResponseEntity<TransactionDomain> saveOnlinePaymentTransaction(long id, BigDecimal amount) {
        return new ResponseEntity<>(transactionTypeService.saveOnlinePaymentTransaction(id, amount), HttpStatus.CREATED);
    }

    @PostMapping(value = "/save-transfer/{amount}", consumes = {"application/json"})
    public ResponseEntity<TransactionDomain> saveWireTransferTransaction(long id, BigDecimal amount) {
        return new ResponseEntity<>(transactionTypeService.saveWireTransferTransaction(id, amount), HttpStatus.CREATED);
    }
}
