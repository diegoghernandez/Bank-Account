package com.bankaccount.back.crud;

import com.bankaccount.back.persistence.crud.PasswordResetTokenCrudRepository;
import com.bankaccount.back.persistence.entity.PasswordResetToken;
import com.bankaccount.back.persistence.entity.VerificationToken;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("dev")
@Sql("/db/bankaccount_data.sql")
public class PasswordResetTokenCrudRepositoryTest {

   @Autowired
   private PasswordResetTokenCrudRepository passwordTokenCrudRepository;

   @Test
   @DisplayName("Should return a passwordResetToken by token value of the data.sql")
   void findByToken() {
      PasswordResetToken passwordResetToken = passwordTokenCrudRepository.findByToken("7f1a71e8-9b58-41ae-8723-29d7ff675a30");

      assertAll(
              () -> assertEquals(2, passwordResetToken.getIdPasswordToken()),
              () -> assertEquals("7f1a71e8-9b58-41ae-8723-29d7ff675a30", passwordResetToken.getToken()),
              () -> assertEquals("2022-12-25 14:10:05.602", passwordResetToken.getExpirationTime().toString())
      );
   }

   @Test
   @DisplayName("Should delete a passwordResetToken by id of the data.sql")
   void deleteToken() {
      passwordTokenCrudRepository.deleteByToken("er143ge8-9b58-41ae-8723-29d7ff675a30");

      assertFalse(passwordTokenCrudRepository.existsById(1L));
   }
}
