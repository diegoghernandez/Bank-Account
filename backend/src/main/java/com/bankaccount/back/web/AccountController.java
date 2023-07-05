package com.bankaccount.back.web;

import com.bankaccount.back.domain.AccountDomain;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.persistence.entity.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @GetMapping("/id/{id}")
    public ResponseEntity<AccountDomain> getAccountById(@PathVariable int id) {
        return accountService.getAccountById(id)
                .map(account -> new ResponseEntity<>(mapper(account), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<AccountDomain> getAccountByEmail(@PathVariable String email) {
        return accountService.getAccountByEmail(email)
                .map(account -> new ResponseEntity<>(mapper(account), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    private AccountDomain mapper(AccountEntity accountEntity) {
        return new AccountDomain(
                accountEntity.getIdAccount(),
                accountEntity.getAccountName(),
                accountEntity.getEmail(),
                accountEntity.getCurrentBalance()
        );
    }
}
