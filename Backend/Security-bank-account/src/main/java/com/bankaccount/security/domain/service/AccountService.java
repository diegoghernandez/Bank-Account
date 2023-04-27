package com.bankaccount.security.domain.service;

import com.bankaccount.security.domain.repository.AccountRepository;
import com.bankaccount.security.model.AccountModel;
import com.bankaccount.security.persistence.entity.AccountEntity;
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

    public Optional<AccountEntity> getAccountByEmail(String email) {
        return accountRepository.getAccountByEmail(email);
    }

    public AccountEntity saveAccount(AccountModel accountModel) throws Exception {
        if (accountRepository.emailExist(accountModel.getEmail())) {
            throw new Exception("There is an account with that email address: " + accountModel.getEmail());
        }

        AccountEntity accountEntity = AccountEntity.builder()
                .accountName(accountModel.getAccountName())
                .email(accountModel.getEmail())
                .password(passwordEncoder.encode(accountModel.getPassword()))
                .build();

        return accountRepository.saveAccount(accountEntity);
    }

    public void changePassword(String newPassword, Long idAccount) {
        accountRepository.updatePassword(passwordEncoder.encode(newPassword), idAccount);
    }

    public boolean checkIfValidOldPassword(AccountEntity accountEntity, String oldPassword) {
        return passwordEncoder.matches(oldPassword, accountEntity.getPassword());
    }
}
