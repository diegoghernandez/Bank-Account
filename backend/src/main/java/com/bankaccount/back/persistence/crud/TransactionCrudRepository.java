package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TransactionCrudRepository extends JpaRepository<TransactionEntity, Long> {

    Page<TransactionEntity> findByIdAccount(int idAccount, Pageable pageable);

    Page<TransactionEntity> findByIdAccountAndReceiverNameContaining(int idAccount, String receiverName, Pageable pageable);

    List<TransactionEntity> findByIdAccountAndTransactionTimestampBetween(int idAccount, LocalDateTime startTime, LocalDateTime endTime);
}
