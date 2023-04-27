package com.bankaccount.oauthresource.domain.repository;


import com.bankaccount.oauthresource.domain.AccountDomain;

import java.math.BigDecimal;
import java.util.Optional;

public interface AccountRepository {

    Optional<AccountDomain> getAccountById(long id);

    Optional<AccountDomain> getAccountByEmail(String email);

    void updateBalance(BigDecimal bigDecimal, long id);
}
