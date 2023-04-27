package com.bankaccount.oauthresource.persistence.crud;

import com.bankaccount.oauthresource.persistence.entity.TransactionEntity;
import org.springframework.data.repository.CrudRepository;

import java.time.Instant;
import java.util.List;

public interface TransactionCrudRepository extends CrudRepository<TransactionEntity, Long> {

    List<TransactionEntity> findByIdAccount(long idAccount);

    List<TransactionEntity> findByTransactionTimestampAfterAndIdAccount(Instant transactionTimestamp, long idAccount);
}
