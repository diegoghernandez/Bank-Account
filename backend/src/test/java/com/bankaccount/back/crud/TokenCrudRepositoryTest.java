package com.bankaccount.back.crud;

import com.bankaccount.back.persistence.crud.TokenCrudRepository;
import com.bankaccount.back.persistence.entity.TokenEntity;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("dev")
@Sql("/db/bankaccount_data.sql")
public class TokenCrudRepositoryTest {

   @Autowired
   private TokenCrudRepository tokenCrudRepository;

   @Test
   @DisplayName("Should return a TokenEntity by token value of the data.sql")
   void findByToken() {
      TokenEntity tokenEntity = tokenCrudRepository.findByToken("7f1a71e8-9b58-41ae-8723-29d7ff675a30");

      assertAll(
              () -> assertEquals(2, tokenEntity.getIdToken()),
              () -> assertEquals("7f1a71e8-9b58-41ae-8723-29d7ff675a30", tokenEntity.getToken()),
              () -> assertEquals("2022-12-25 14:10:05.602", tokenEntity.getExpirationTime().toString())
      );
   }

   @Test
   @DisplayName("Should delete a TokenEntity by id of the data.sql")
   void deleteToken() {
      TokenEntity tokenEntity = tokenCrudRepository.findById(1L).get();

      tokenCrudRepository.delete(tokenEntity);

      assertFalse(tokenCrudRepository.existsById(1L));
   }

   @Test
   @DisplayName("Should update a TokenEntity by token value of the data.sql")
   void updateToken() {
      Calendar calendar = Calendar.getInstance();
      calendar.setTimeInMillis(new Date().getTime());
      calendar.add(Calendar.MINUTE, 10);
      Date date = new Date(calendar.getTime().getTime());
      String newToken = UUID.randomUUID().toString();

      tokenCrudRepository.updateTokenByToken(newToken, date, "7f1a71e8-9b58-41ae-8723-29d7ff675a30");

      TokenEntity tokenEntity = tokenCrudRepository.findByToken(newToken);

      assertAll(
              () -> assertEquals(2, tokenEntity.getIdToken()),
              () -> assertEquals(newToken, tokenEntity.getToken()),
              () -> assertEquals(date, tokenEntity.getExpirationTime())
      );
   }
}
