package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

public interface TransactionCrudRepository extends JpaRepository<TransactionEntity, Long> {

    Page<TransactionEntity> findByIdAccount(int idAccount, Pageable pageable);

    Page<TransactionEntity> findByIdAccountAndReceiverNameContainingIgnoreCase(int idAccount, String receiverName, Pageable pageable);

    Page<TransactionEntity> findByIdAccountAndTransactionTimestampBetweenAndReceiverNameContainingIgnoreCase(
            int idAccount, LocalDateTime startTime, LocalDateTime endTime, String receiverName, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE TransactionEntity AS tran SET tran.receiverName = :name WHERE tran.idTransferAccount = :id")
    void updateNameByIdTransferAccount(int id, String name);

    @Modifying
    @Transactional
    @Query("UPDATE TransactionEntity AS tran SET tran.receiverName = :name WHERE tran.idTransferAccount = 0 AND tran.idAccount = :id")
    void updateNameByIdAccount(int id, String name);
}
