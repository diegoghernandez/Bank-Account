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

/**
 * Transaction crud API
 */
public interface TransactionCrudRepository extends JpaRepository<TransactionEntity, Long> {

   /**
    * Search all Transactions by account id in the database
    * @param idAccount the account id of the desire transactions
    * @param pageable the value to access to certain page
    * @return an {@link Page} of {@link TransactionEntity}
    */
   Page<TransactionEntity> findByIdAccount(@Param("id") int idAccount, Pageable pageable);

   /**
    * Search all Transactions by account id and multiple parameters nullables in the database
    * @param idAccount the account id of the desire transactions
    * @param transactionType the type of the desire transactions
    * @param receiverName the name of the desire transactions
    * @param startTime the start date of the desire transactions
    * @param endTime the end date of the desire transactions
    * @param pageable the value to access to certain page
    * @return an {@link Page} of {@link TransactionEntity}
    */
   @Query("SELECT t FROM TransactionEntity AS t WHERE t.idAccount = :id AND (:type IS NULL OR t.transactionType = :type)"
           + " AND (:name IS NULL OR UPPER(t.receiverName) LIKE UPPER(concat(:name, '%')))"
           + " AND ((cast(:start as timestamp) IS NULL AND cast(:end as timestamp) IS NULL) OR t.transactionTimestamp BETWEEN :start AND :end)")
   Page<TransactionEntity> findByFilter(
           @Param("id") int idAccount,
           @Param("type")TransactionType transactionType,
           @Param("name") String receiverName,
           @Param("start") LocalDateTime startTime, @Param("end") LocalDateTime endTime,
           Pageable pageable);

   /**
    * Update the receiverName parameter of all Transactions by the desire receiverName in the database
    * @param id the id to find
    * @param name the value for update
    */
   @Modifying
   @Transactional
   @Query("UPDATE TransactionEntity AS tran SET tran.receiverName = :name WHERE tran.idTransferAccount = :id")
   void updateNameByIdTransferAccount(int id, String name);

   /**
    * Update the receiverName parameter of all Transactions by the desire account id in the database
    * @param id the id to find
    * @param name the value for update
    */
   @Modifying
   @Transactional
   @Query("UPDATE TransactionEntity AS tran SET tran.receiverName = :name WHERE tran.idTransferAccount = 0 AND tran.idAccount = :id")
   void updateNameByIdAccount(int id, String name);
}
