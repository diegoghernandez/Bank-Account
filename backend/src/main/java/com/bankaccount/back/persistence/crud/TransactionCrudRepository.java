package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

public interface TransactionCrudRepository extends JpaRepository<TransactionEntity, Long> {

   Page<TransactionEntity> findByIdAccount(@Param("id") int idAccount, Pageable pageable);

   @Query("SELECT t FROM TransactionEntity AS t WHERE t.idAccount = :id AND (:type IS NULL OR t.transactionType = :type)"
           + " AND (:name IS NULL OR UPPER(t.receiverName) LIKE UPPER(concat(:name, '%')))"
           + " AND ((cast(:start as timestamp) IS NULL AND cast(:end as timestamp) IS NULL) OR t.transactionTimestamp BETWEEN :start AND :end)")
   Page<TransactionEntity> findByFilter(
           @Param("id") int idAccount,
           @Param("type")TransactionType transactionType,
           @Param("name") String receiverName,
           @Param("start") LocalDateTime startTime, @Param("end") LocalDateTime endTime,
           Pageable pageable);

   @Modifying
   @Transactional
   @Query("UPDATE TransactionEntity AS tran SET tran.receiverName = :name WHERE tran.idTransferAccount = :id")
   void updateNameByIdTransferAccount(int id, String name);

   @Modifying
   @Transactional
   @Query("UPDATE TransactionEntity AS tran SET tran.receiverName = :name WHERE tran.idTransferAccount = 0 AND tran.idAccount = :id")
   void updateNameByIdAccount(int id, String name);
}
