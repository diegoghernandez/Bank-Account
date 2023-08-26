package com.bankaccount.back.domain.service;

import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.web.dto.AccountDto;
import com.bankaccount.back.web.dto.PasswordDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

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

    public String changeName(String newName, PasswordDto passwordDto) throws NotFoundException {
        int idAccount = passwordDto.idAccount();

        if (checkIfValidPassword(idAccount, passwordDto.newPassword())) {
            accountRepository.updateName(newName, idAccount);
            transactionRepository.updateTransactionsName(idAccount, newName);
            return "Change name successfully";
        } else {
            return "Invalid password";
        }
    }

    public String changePassword(PasswordDto passwordDto) throws NotFoundException {
        int idAccount = passwordDto.idAccount();

        if (checkIfValidPassword(idAccount, passwordDto.oldPassword())) {
            accountRepository.updatePassword(passwordEncoder.encode(passwordDto.newPassword()), idAccount);
            return "Password changed successfully";
        } else {
            return "Invalid old password";
        }
    }

    public String changeEmail(PasswordDto passwordDto) throws NotFoundException, NotAllowedException {
        int idAccount = passwordDto.idAccount();
        String newEmail = passwordDto.email();

        if (!accountRepository.emailExist(newEmail)) {
            if (checkIfValidPassword(idAccount, passwordDto.newPassword())) {
                accountRepository.updateEmail(newEmail, idAccount);
                return "Change email successfully";
            } else {
                return "Invalid password";
            }
        } else {
            throw new NotAllowedException("email", "There is an account with that email address: " + newEmail);
        }
    }

    private boolean checkIfValidPassword(int id, String password) throws NotFoundException {
        Optional<AccountEntity> accountEntity = accountRepository.getAccountById(id);

        if (accountEntity.isPresent()) {
            return passwordEncoder.matches(password, accountEntity.get().getPassword());
        } else {
            throw new NotFoundException("Account not found " + id);
        }

    }

    private int idGenerator() {
        int id = (int) (Math.random()*(999999999 - 100000000 + 1) + 100000000);

        while (accountRepository.idExist(id)) {
            id = (int) (Math.random()*(999999999 - 100000000 + 1) + 100000000);
        }

        return id;
    }
}
