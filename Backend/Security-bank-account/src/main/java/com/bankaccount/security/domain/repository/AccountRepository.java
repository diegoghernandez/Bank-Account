package com.bankaccount.security.domain.repository;

import com.bankaccount.security.persistence.entity.AccountEntity;

import java.util.Optional;

public interface AccountRepository {

    boolean emailExist(String email);

    Optional<AccountEntity> getAccountByEmail(String email);

    AccountEntity saveAccount(AccountEntity accountEntity);

    void updateStatus(long id);

    void saveVerificationToken(String token, AccountEntity accountEntity);

    void updatePassword(String newPassword, long id);
}
