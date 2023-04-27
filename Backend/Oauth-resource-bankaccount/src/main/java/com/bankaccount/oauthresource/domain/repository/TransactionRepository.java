package com.bankaccount.oauthresource.domain.repository;

import com.bankaccount.oauthresource.domain.TransactionDomain;
import com.bankaccount.oauthresource.persistence.entity.TransactionEntity;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface TransactionRepository {

    Optional<TransactionDomain> getTransactionById(long id);

    List<TransactionDomain> getByIdAccount(long idAccount);

    List<TransactionDomain> getByTimeAndIdAccount(Instant timestamp, long idAccount);

    TransactionDomain saveTransaction(TransactionEntity transactionEntity);
}
