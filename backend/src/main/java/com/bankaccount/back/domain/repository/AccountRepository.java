package com.bankaccount.back.domain.repository;

import com.bankaccount.back.domain.AccountDomain;
import com.bankaccount.back.persistence.entity.AccountEntity;

import java.math.BigDecimal;
import java.util.Optional;

public interface AccountRepository {

    Optional<AccountEntity> getAccountById(int id);

    Optional<AccountEntity> getAccountByEmail(String email);

    void updateBalance(BigDecimal bigDecimal, int id);

    void updateStatus(int id);

    void updateName(String newName, int id);

    void updatePassword(String newPassword, int id);

    void updateEmail(String newEmail, int id);

    AccountEntity saveAccount(AccountEntity accountEntity);

    void saveVerificationToken(String token, AccountEntity accountEntity);

    boolean emailExist(String email);

    boolean idExist(int id);
}
