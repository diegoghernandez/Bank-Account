package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface TransactionCrudRepository extends JpaRepository<TransactionEntity, Long> {

    Page<TransactionEntity> findByIdAccount(int idAccount, Pageable pageable);

    Page<TransactionEntity> findByIdAccountAndReceiverNameContainingIgnoreCase(int idAccount, String receiverName, Pageable pageable);

    Page<TransactionEntity> findByIdAccountAndTransactionTimestampBetweenAndReceiverNameContainingIgnoreCase(
            int idAccount, LocalDateTime startTime, LocalDateTime endTime, String receiverName, Pageable pageable);
}
