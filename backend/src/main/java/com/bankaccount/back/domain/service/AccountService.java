package com.bankaccount.back.domain.service;

import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.web.dto.AccountDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<AccountEntity> getAccountById(int id) {
        return accountRepository.getAccountById(id);
    }

    public Optional<AccountEntity> getAccountByEmail(String email) {
        return accountRepository.getAccountByEmail(email);
    }

    public AccountEntity saveAccount(AccountDto accountDto) throws NotAllowedException {
        if (accountRepository.emailExist(accountDto.email())) {
            throw new NotAllowedException("email", "There is an account with that email address: " + accountDto.email());
        }
        AccountEntity accountEntity = AccountEntity.builder()
                .idAccount(idGenerator())
                .accountName(accountDto.name())
                .email(accountDto.email())
                .password(passwordEncoder.encode(accountDto.password()))
                .build();

        return accountRepository.saveAccount(accountEntity);
    }

    public void changePassword(String newPassword, Integer idAccount) {
        accountRepository.updatePassword(passwordEncoder.encode(newPassword), idAccount);
    }

    public boolean checkIfValidOldPassword(AccountEntity accountEntity, String oldPassword) {
        return passwordEncoder.matches(oldPassword, accountEntity.getPassword());
    }

    private int idGenerator() {
        int id = (int) (Math.random()*(999999999 - 100000000 + 1) + 100000000);

        while (accountRepository.idExist(id)) {
            id = (int) (Math.random()*(999999999 - 100000000 + 1) + 100000000);
        }

        return id;
    }
}
