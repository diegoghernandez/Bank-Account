package com.bankaccount.oauthresource.persistence;

import com.bankaccount.oauthresource.domain.AccountDomain;
import com.bankaccount.oauthresource.domain.repository.AccountRepository;
import com.bankaccount.oauthresource.persistence.crud.AccountCrudRepository;
import com.bankaccount.oauthresource.persistence.mapper.AccountMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public class AccountRepositoryImpl implements AccountRepository {

    @Autowired
    private AccountCrudRepository accountCrudRepository;

    @Autowired
    private AccountMapper accountMapper;

    @Override
    public Optional<AccountDomain> getAccountById(long id) {
        return accountCrudRepository.findById(id)
                .map(account -> accountMapper.toAccountDomain(account));
    }

    @Override
    public Optional<AccountDomain> getAccountByEmail(String email) {
        return accountCrudRepository.findByEmail(email)
                .map(account -> accountMapper.toAccountDomain(account));
    }

    @Override
    public void updateBalance(BigDecimal bigDecimal, long id) {
        accountCrudRepository.updateBalanceById(bigDecimal, id);
    }
}
