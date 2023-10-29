package com.bankaccount.back.repository;

import com.bankaccount.back.domain.repository.TokenRepository;
import com.bankaccount.back.persistence.crud.TokenCrudRepository;
import com.bankaccount.back.persistence.entity.TokenEntity;
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
public class TokenRepositoryImplTest {

   @Autowired
   private TokenRepository tokenRepository;

   @MockBean
   private TokenCrudRepository tokenCrudRepository;

   private List<TokenEntity> tokenEntityList;

   @BeforeEach
   void setUp() {
      TokenEntity tokenEntity1 = TokenEntity.builder()
              .idToken(5435L)
              .token("er143ge8-9b58-41ae-8723-29d7ff675a30")
              .build();

      TokenEntity tokenEntity2 = TokenEntity.builder()
              .idToken(63987L)
              .token("er143ge8-34gr-41ae-8723-237a3f675a30")
              .build();

      tokenEntityList = Arrays.asList(tokenEntity1, tokenEntity2);
   }

   @Test
   @DisplayName("Should return a TokenEntity with the specific token value of the database")
   void getByToken() {
      Mockito.when(tokenCrudRepository.findByToken("er143ge8-34gr-41ae-8723-237a3f675a30"))
              .thenReturn(tokenEntityList.get(1));

      TokenEntity tokenEntity = tokenRepository.getByToken("er143ge8-34gr-41ae-8723-237a3f675a30");

      assertAll(
              () -> assertEquals(63987L, tokenEntity.getIdToken()),
              () -> assertEquals("er143ge8-34gr-41ae-8723-237a3f675a30", tokenEntity.getToken())
      );
   }

   @Test
   @DisplayName("Should delete a TokenEntity with the specific id in the database")
   void delete() {
      Mockito.doNothing().when(tokenCrudRepository)
              .delete(tokenEntityList.get(0));

      tokenRepository.delete(tokenEntityList.get(0));

      Mockito.verify(tokenCrudRepository, Mockito.times(1)).delete(tokenEntityList.get(0));
   }

   @Test
   @DisplayName("Should delete a TokenEntity with the specific token in the database")
   void deleteByToken() {
      Mockito.doNothing().when(tokenCrudRepository)
              .deleteByToken("er143ge8-34gr-41ae-8723-456");

      tokenRepository.deleteByToken("er143ge8-34gr-41ae-8723-237a3f675a30");

      Mockito.verify(tokenCrudRepository, Mockito.times(1)).deleteByToken("er143ge8-34gr-41ae-8723-237a3f675a30");
   }

   @Test
   @DisplayName("Should update a TokenEntity with the specific token value and the new token in the database")
   void updateToken() {
      Calendar calendar = Calendar.getInstance();
      calendar.setTimeInMillis(new Date().getTime());
      calendar.add(Calendar.MINUTE, 10);
      Date date = new Date(calendar.getTime().getTime());

      Mockito.doNothing().when(tokenCrudRepository)
              .updateTokenByToken(Mockito.isA(String.class), Mockito.eq(date), Mockito.eq("er143ge8-34gr-41ae-8723-237a3f675a30"));

      TokenEntity tokenEntityById = TokenEntity.builder()
              .idToken(63987L)
              .token("po43do45-34gr-41ae-8723-237a3f675a30")
              .build();

      Mockito.when(tokenCrudRepository.findByToken("po43do45-34gr-41ae-8723-237a3f675a30"))
              .thenReturn(tokenEntityById);

      TokenEntity tokenEntity = tokenRepository.updateToken("po43do45-34gr-41ae-8723-237a3f675a30", date, "er143ge8-34gr-41ae-8723-237a3f675a30");

      assertAll(
              () -> Mockito.verify(tokenCrudRepository, Mockito.times(1))
                      .updateTokenByToken(Mockito.isA(String.class), Mockito.eq(date), Mockito.eq("er143ge8-34gr-41ae-8723-237a3f675a30")),
              () -> assertEquals(tokenEntityById.getIdToken(), tokenEntity.getIdToken()),
              () -> assertEquals(tokenEntityById.getToken(), tokenEntity.getToken())
      );
   }
}
