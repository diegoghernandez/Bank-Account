package com.bankaccount.back.repository;

import com.bankaccount.back.persistence.PasswordResetTokenRepositoryImpl;
import com.bankaccount.back.persistence.crud.PasswordResetTokenCrudRepository;
import com.bankaccount.back.persistence.entity.PasswordResetToken;
import com.bankaccount.back.persistence.entity.VerificationToken;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("dev")
public class PasswordResetTokenRepositoryImplTest {

   @Autowired
   private PasswordResetTokenRepositoryImpl passwordResetTokenRepository;

   @MockBean
   private PasswordResetTokenCrudRepository passwordResetTokenCrud;

   private List<PasswordResetToken> passwordResetTokenList;

   @BeforeEach
   void setUp() {
      PasswordResetToken passwordResetToken1 = PasswordResetToken.builder()
              .idPasswordToken(5435L)
              .token("er143ge8-9b58-41ae-8723-29d7ff675a30")
              .build();

      PasswordResetToken passwordResetToken2 = PasswordResetToken.builder()
              .idPasswordToken(63987L)
              .token("er143ge8-34gr-41ae-8723-237a3f675a30")
              .build();

      passwordResetTokenList = Arrays.asList(passwordResetToken1, passwordResetToken2);
   }

   @Test
   @DisplayName("Should return a passwordResetToken with the specific token value of the database")
   void getByToken() {
      Mockito.when(passwordResetTokenCrud.findByToken("er143ge8-34gr-41ae-8723-237a3f675a30"))
              .thenReturn(passwordResetTokenList.get(1));

      PasswordResetToken passwordResetToken = passwordResetTokenRepository.getByToken("er143ge8-34gr-41ae-8723-237a3f675a30");

      assertAll(
              () -> assertEquals(63987L, passwordResetToken.getIdPasswordToken()),
              () -> assertEquals("er143ge8-34gr-41ae-8723-237a3f675a30", passwordResetToken.getToken())
      );
   }

   @Test
   @DisplayName("Should save a passwordResetToken in the database")
   void savePasswordResetToken() {
      PasswordResetToken passwordResetTokenSave = PasswordResetToken.builder()
              .idPasswordToken(423423L)
              .token("er143ge8-34gr-41ae-f4d3-237a3f675a30")
              .build();

      Mockito.when(passwordResetTokenCrud.save(passwordResetTokenSave)).thenReturn(passwordResetTokenSave);

      passwordResetTokenRepository.savePasswordResetToken(passwordResetTokenSave);

      Mockito.verify(passwordResetTokenCrud, Mockito.times(1)).save(Mockito.isA(PasswordResetToken.class));
   }

   @Test
   @DisplayName("Should delete a passwordResetToken with the specific id in the database")
   void delete() {
      Mockito.doNothing().when(passwordResetTokenCrud)
              .delete(passwordResetTokenList.get(0));

      passwordResetTokenRepository.delete(passwordResetTokenList.get(0));

      Mockito.verify(passwordResetTokenCrud, Mockito.times(1)).delete(passwordResetTokenList.get(0));
   }

   @Test
   @DisplayName("Should delete a passwordResetToken with the specific token in the database")
   void deleteByToken() {
      Mockito.doNothing().when(passwordResetTokenCrud)
              .delete(passwordResetTokenList.get(1));

      passwordResetTokenRepository.deleteByToken("er143ge8-34gr-41ae-8723-237a3f675a30");

      Mockito.verify(passwordResetTokenCrud, Mockito.times(1)).deleteByToken("er143ge8-34gr-41ae-8723-237a3f675a30");
   }
}
