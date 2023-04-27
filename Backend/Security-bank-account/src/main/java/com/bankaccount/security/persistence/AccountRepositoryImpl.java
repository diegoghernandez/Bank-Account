package com.bankaccount.security.persistence;

import com.bankaccount.security.domain.repository.AccountRepository;
import com.bankaccount.security.persistence.crud.AccountCrudRepository;
import com.bankaccount.security.persistence.crud.VerificationTokenCrudRepository;
import com.bankaccount.security.persistence.entity.AccountEntity;
import com.bankaccount.security.persistence.entity.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public class AccountRepositoryImpl implements AccountRepository {

    @Autowired
    private AccountCrudRepository accountCrudRepository;

    @Autowired
    private VerificationTokenCrudRepository tokenCrudRepository;

    @Override
    public boolean emailExist(String email) {
        return accountCrudRepository.existsByEmail(email);
    }

    @Override
    public Optional<AccountEntity> getAccountByEmail(String email) {
        return accountCrudRepository.findByEmail(email);
    }

    @Override
    public AccountEntity saveAccount(AccountEntity accountEntity) {
        return accountCrudRepository.save(accountEntity);
    }

    @Override
    public void updateStatus(long id) {
        accountCrudRepository.updateStatusById(id);
    }

    @Override
    public void saveVerificationToken(String token, AccountEntity accountEntity) {
        VerificationToken verificationToken = VerificationToken.builder()
                .accountEntity(accountEntity)
                .token(token)
                .build();

        tokenCrudRepository.save(verificationToken);
    }

    @Override
    public void updatePassword(String newPassword, long id) {
        accountCrudRepository.updatePassword(newPassword, id);
    }
}
