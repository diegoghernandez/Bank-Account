package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.AccountEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Optional;

/**
 * Account crud API
 */
public interface AccountCrudRepository extends CrudRepository<AccountEntity, Integer> {

   /**
    * Check if the email exists in the database and return the result.
    * @param email the email to be checked
    * @return a {@code boolean}
    */
   boolean existsByEmail(String email);

   /**
    * Search an Account by email in the database
    * @param email the email of the desire account
    * @return an {@code Optional} of {@link AccountEntity}
    */
   Optional<AccountEntity> findByEmail(String email);

   /**
    * Update the enabled parameter of an existing Account in the database
    * @param status the value for update
    * @param id the id to find
    */
   @Modifying
   @Transactional
   @Query("UPDATE AccountEntity AS acc SET acc.enabled = :status WHERE acc.idAccount = :id")
   void updateStatusById(boolean status, int id);

   /**
    * Update the name parameter of an existing Account in the database
    * @param newName the value for update
    * @param id the id to find
    */
   @Modifying
   @Transactional
   @Query("UPDATE AccountEntity AS acc SET acc.accountName = :newName WHERE acc.idAccount = :id")
   void updateName(@Param("newName") String newName, int id);

   /**
    * Update the password parameter of an existing Account in the database
    * @param newPassword the value for update
    * @param id the id to find
    */
   @Modifying
   @Transactional
   @Query("UPDATE AccountEntity AS acc SET acc.password = :newPassword WHERE acc.idAccount = :id")
   void updatePassword(@Param("newPassword") String newPassword, int id);

   /**
    * Update the email parameter of an existing Account in the database
    * @param newEmail the value for update
    * @param id the id to find
    */
   @Modifying
   @Transactional
   @Query("UPDATE AccountEntity AS acc SET acc.email = :newEmail WHERE acc.idAccount = :id")
   void updateEmail(@Param("newEmail") String newEmail, int id);

   /**
    * Update the currentBalance parameter of an existing Account in the database
    * @param balance the value for update
    * @param id the id to find
    */
   @Modifying
   @Transactional
   @Query("UPDATE AccountEntity AS acc SET acc.currentBalance = :bal WHERE acc.idAccount = :id")
   void updateBalanceById(@Param("bal") BigDecimal balance, int id);
}
