package com.bankaccount.back.repository;

import com.bankaccount.back.domain.repository.VerificationTokenRepository;
import com.bankaccount.back.persistence.crud.VerificationTokenCrudRepository;
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
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("dev")
public class VerificationTokenRepositoryImplTest {

   @Autowired
   private VerificationTokenRepository verificationTokenRepository;

   @MockBean
   private VerificationTokenCrudRepository verificationTokenCrud;

   private List<VerificationToken> verificationTokenList;

   @BeforeEach
   void setUp() {
      VerificationToken verificationToken1 = VerificationToken.builder()
              .idToken(5435L)
              .token("er143ge8-9b58-41ae-8723-29d7ff675a30")
              .build();

      VerificationToken verificationToken2 = VerificationToken.builder()
              .idToken(63987L)
              .token("er143ge8-34gr-41ae-8723-237a3f675a30")
              .build();

      verificationTokenList = Arrays.asList(verificationToken1, verificationToken2);
   }

   @Test
   @DisplayName("Should return a verificationToken with the specific token value of the database")
   void getByToken() {
      Mockito.when(verificationTokenCrud.findByToken("er143ge8-34gr-41ae-8723-237a3f675a30"))
              .thenReturn(verificationTokenList.get(1));

      VerificationToken verificationToken = verificationTokenRepository.getByToken("er143ge8-34gr-41ae-8723-237a3f675a30");

      assertAll(
              () -> assertEquals(63987L, verificationToken.getIdToken()),
              () -> assertEquals("er143ge8-34gr-41ae-8723-237a3f675a30", verificationToken.getToken())
      );
   }

   @Test
   @DisplayName("Should delete a verificationToken with the specific id in the database")
   void delete() {
      Mockito.doNothing().when(verificationTokenCrud)
              .delete(verificationTokenList.get(0));

      verificationTokenRepository.delete(verificationTokenList.get(0));

      Mockito.verify(verificationTokenCrud, Mockito.times(1)).delete(verificationTokenList.get(0));
   }

   @Test
   @DisplayName("Should delete a verificationToken with the specific token in the database")
   void deleteByToken() {
      Mockito.doNothing().when(verificationTokenCrud)
              .deleteByToken("er143ge8-34gr-41ae-8723-456");

      verificationTokenRepository.deleteByToken("er143ge8-34gr-41ae-8723-237a3f675a30");

      Mockito.verify(verificationTokenCrud, Mockito.times(1)).deleteByToken("er143ge8-34gr-41ae-8723-237a3f675a30");
   }

   @Test
   @DisplayName("Should update a verificationToken with the specific token value and the new token in the database")
   void updateToken() {
      Calendar calendar = Calendar.getInstance();
      calendar.setTimeInMillis(new Date().getTime());
      calendar.add(Calendar.MINUTE, 10);
      Date date = new Date(calendar.getTime().getTime());

      Mockito.doNothing().when(verificationTokenCrud)
              .updateTokenByToken(Mockito.isA(String.class), Mockito.eq(date), Mockito.eq("er143ge8-34gr-41ae-8723-237a3f675a30"));

      VerificationToken verificationTokenById = VerificationToken.builder()
              .idToken(63987L)
              .token("po43do45-34gr-41ae-8723-237a3f675a30")
              .build();

      Mockito.when(verificationTokenCrud.findByToken("po43do45-34gr-41ae-8723-237a3f675a30"))
              .thenReturn(verificationTokenById);

      VerificationToken verificationToken = verificationTokenRepository.updateToken("po43do45-34gr-41ae-8723-237a3f675a30", date, "er143ge8-34gr-41ae-8723-237a3f675a30");

      assertAll(
              () -> Mockito.verify(verificationTokenCrud, Mockito.times(1))
                      .updateTokenByToken(Mockito.isA(String.class), Mockito.eq(date), Mockito.eq("er143ge8-34gr-41ae-8723-237a3f675a30")),
              () -> assertEquals(verificationTokenById.getIdToken(), verificationToken.getIdToken()),
              () -> assertEquals(verificationTokenById.getToken(), verificationToken.getToken())
      );
   }
}
