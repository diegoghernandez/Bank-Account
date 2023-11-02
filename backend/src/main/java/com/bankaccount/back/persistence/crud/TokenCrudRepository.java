package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.TokenEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Date;

/**
 * Token crud API
 */
public interface TokenCrudRepository extends CrudRepository<TokenEntity, Long> {

   /**
    * Search a Token by token in the database
    * @param token the value of the desire token
    * @return a {@link TokenEntity}
    */
   TokenEntity findByToken(String token);

   /**
    * Delete a Token by token in the database
    * @param token the value of the desire token
    */
   @Transactional
   void deleteByToken(String token);

   /**
    * Update the token and expirationTime parameters of an existing Token in the database
    * @param newToken the value for update
    * @param date the value for update
    * @param oldToken the token to find
    */
   @Modifying
   @Transactional
   @Query("UPDATE TokenEntity AS vt SET vt.token = :new, vt.expirationTime = :date WHERE vt.token = :old")
   void updateTokenByToken(@Param("new") String newToken, Date date, @Param("old") String oldToken);
}
