package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.TokenEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Date;

public interface TokenCrudRepository extends CrudRepository<TokenEntity, Long> {

   TokenEntity findByToken(String token);

   @Transactional
   void deleteByToken(String token);

   @Modifying
   @Transactional
   @Query("UPDATE TokenEntity AS vt SET vt.token = :new, vt.expirationTime = :date WHERE vt.token = :old")
   void updateTokenByToken(@Param("new") String newToken, Date date, @Param("old") String oldToken);
}
