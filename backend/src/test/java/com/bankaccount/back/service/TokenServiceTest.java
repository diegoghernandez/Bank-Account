package com.bankaccount.back.service;

import com.bankaccount.back.constants.AccountRoles;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.TokenRepository;
import com.bankaccount.back.domain.service.TokenService;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.AccountRoleEntity;
import com.bankaccount.back.persistence.entity.TokenEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("dev")
public class TokenServiceTest {

   @Autowired
   private TokenService tokenService;

   @MockBean
   private TokenRepository tokenRepository;

   @MockBean
   private AccountRepository accountRepository;

   private List<TokenEntity> tokenEntityList;

   @BeforeEach
   void setUp() {
      TokenEntity tokenEntity1 = TokenEntity.builder()
              .idToken(1L)
              .token("er143ge8-9b58-41ae-8723-29d7ff675a30")
              .accountEntity(AccountEntity.builder()
                      .idAccount(435456)
                      .accountName("RandomSave")
                      .email("saveaccount@names.com")
                      .password("452353425")
                      .currentBalance(new BigDecimal("4376.00"))
                      .build())
              .build();

      TokenEntity tokenEntity2 = TokenEntity.builder()
              .idToken(2L)
              .token("7f1a71e8-9b58-41ae-8723-29d7ff675a30")
              .accountEntity(AccountEntity.builder()
                      .idAccount(765355)
                      .accountName("RandomSave")
                      .email("saveaccount@names.com")
                      .password("452353425")
                      .currentBalance(new BigDecimal("4376.00"))
                      .build())
              .build();

      tokenEntityList = Arrays.asList(tokenEntity1, tokenEntity2);
   }

   @Test
   @DisplayName("Should return a string with the value 'invalid' if the token doesn't exist")
   void validateVerificationToken_invalid() {
      Mockito.when(tokenRepository.getByToken("GRSEDGSGS"))
              .thenReturn(null);

      String invalid = tokenService.validateVerification("GRSEDGSGS");

      assertThat(invalid).isEqualTo("invalid");
   }

   @Test
   @DisplayName("Should return a string with the value 'valid' if the token exist")
   void validateVerificationToken_valid() {
      LocalDateTime now = LocalDateTime.now();
      AccountEntity accountEntity = AccountEntity.builder()
              .idAccount(435456)
              .accountName("RandomSave")
              .email("saveaccount@names.com")
              .password("452353425")
              .currentBalance(new BigDecimal("4376.00"))
              .enabled(true)
              .roles(List.of(AccountRoleEntity.builder()
                      .idAccount(435456)
                      .role(AccountRoles.USER)
                      .grantedDate(now)
                      .build()))
              .build();


      Mockito.when(tokenRepository.getByToken("er143ge8-9b58-41ae-8723-29d7ff675a30"))
              .thenReturn(tokenEntityList.get(0));

      String valid = tokenService.validateVerification("er143ge8-9b58-41ae-8723-29d7ff675a30");

      assertThat(valid).isEqualTo("valid");
   }

   @Test
   @DisplayName("Should deleteToken be called one time")
   void deleteToken() {
      Mockito.doNothing().when(tokenRepository).deleteByToken("po43do45-34gr-41ae-8723-237a3f675a30");

      tokenService.deleteToken("po43do45-34gr-41ae-8723-237a3f675a30");

      Mockito.verify(tokenRepository, Mockito.times(1)).deleteByToken("po43do45-34gr-41ae-8723-237a3f675a30");
   }

   @Test
   @DisplayName("Should return a new TokenEntity with the old token give it")
   void generateNewToken() {
      TokenEntity newTokenEntity = TokenEntity.builder()
              .idToken(2L)
              .token("po43do45-34gr-41ae-8723-237a3f675a30")
              .accountEntity(AccountEntity.builder()
                      .idAccount(765355)
                      .accountName("RandomSave")
                      .email("saveaccount@names.com")
                      .password("452353425")
                      .currentBalance(new BigDecimal("4376.00"))
                      .build())
              .build();

      Mockito.when(tokenRepository.updateToken(
                      Mockito.isA(String.class), Mockito.isA(Date.class), ArgumentMatchers.eq("7f1a71e8-9b58-41ae-8723-29d7ff675a30")))
              .thenReturn(newTokenEntity);

      TokenEntity tokenEntity = tokenService.generateNewToken("7f1a71e8-9b58-41ae-8723-29d7ff675a30");

      assertAll(
              () -> assertEquals(newTokenEntity.getIdToken(), tokenEntity.getIdToken()),
              () -> assertEquals(newTokenEntity.getToken(), tokenEntity.getToken()),
              () -> assertEquals(newTokenEntity.getAccountEntity(), tokenEntity.getAccountEntity())
      );
   }
}
