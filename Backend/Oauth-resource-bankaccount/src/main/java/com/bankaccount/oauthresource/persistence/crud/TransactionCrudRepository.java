package com.bankaccount.oauthresource.persistence.crud;

import com.bankaccount.oauthresource.persistence.entity.TransactionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;

public interface TransactionCrudRepository extends JpaRepository<TransactionEntity, Long> {

    List<TransactionEntity> findByIdAccount(long idAccount);

    List<TransactionEntity> findByTransactionTimestampAfterAndIdAccount(Instant transactionTimestamp, long idAccount);
}
