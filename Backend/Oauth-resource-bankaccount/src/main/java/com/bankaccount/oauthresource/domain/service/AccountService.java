package com.bankaccount.oauthresource.domain.service;

import com.bankaccount.oauthresource.domain.AccountDomain;
import com.bankaccount.oauthresource.domain.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Optional<AccountDomain> getAccountById(long id) {
        return accountRepository.getAccountById(id);
    }

    public Optional<AccountDomain> getAccountByEmail(String email) {
        return accountRepository.getAccountByEmail(email);
    }
}
