package com.bankaccount.back.service;

import com.bankaccount.back.constants.AccountRoles;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.PasswordResetTokenRepository;
import com.bankaccount.back.domain.repository.VerificationTokenRepository;
import com.bankaccount.back.domain.service.TokenService;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.AccountRoleEntity;
import com.bankaccount.back.persistence.entity.VerificationToken;
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
   private VerificationTokenRepository verificationTokenRepository;

   @MockBean
   private AccountRepository accountRepository;

   @MockBean
   private PasswordResetTokenRepository passwordResetTokenRepository;

   private List<VerificationToken> verificationTokenList;

   @BeforeEach
   void setUp() {
      VerificationToken verificationToken1 = VerificationToken.builder()
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

      VerificationToken verificationToken2 = VerificationToken.builder()
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

      verificationTokenList = Arrays.asList(verificationToken1, verificationToken2);
   }

   @Test
   @DisplayName("Should return a string with the value 'invalid' if the token doesn't exist")
   void validateVerificationToken_invalid() {
      Mockito.when(verificationTokenRepository.getByToken("GRSEDGSGS"))
              .thenReturn(null);

      String invalid = tokenService.validateVerificationToken("GRSEDGSGS");

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


      Mockito.when(verificationTokenRepository.getByToken("er143ge8-9b58-41ae-8723-29d7ff675a30"))
              .thenReturn(verificationTokenList.get(0));

      String valid = tokenService.validateVerificationToken("er143ge8-9b58-41ae-8723-29d7ff675a30");

      assertThat(valid).isEqualTo("valid");
   }

   @Test
   @DisplayName("Should deleteVerificationToken be called one time")
   void deleteVerificationToken() {
      Mockito.doNothing().when(verificationTokenRepository).deleteByToken("po43do45-34gr-41ae-8723-237a3f675a30");

      tokenService.deleteVerificationToken("po43do45-34gr-41ae-8723-237a3f675a30");

      Mockito.verify(verificationTokenRepository, Mockito.times(1)).deleteByToken("po43do45-34gr-41ae-8723-237a3f675a30");
   }

   @Test
   @DisplayName("Should deleteVerificationToken be called one time")
   void deletePasswordToken() {
      Mockito.doNothing().when(passwordResetTokenRepository).deleteByToken("po43do45-34gr-41ae-8723-237a3f675a30");

      tokenService.deletePasswordToken("po43do45-34gr-41ae-8723-237a3f675a30");

      Mockito.verify(passwordResetTokenRepository, Mockito.times(1)).deleteByToken("po43do45-34gr-41ae-8723-237a3f675a30");
   }

   @Test
   @DisplayName("Should return a new verificationToken when an old token is given")
   void generateNewVerificationToken() {
      VerificationToken newVerificationToken = VerificationToken.builder()
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

      Mockito.when(verificationTokenRepository.updateToken(ArgumentMatchers.any(), ArgumentMatchers.eq("7f1a71e8-9b58-41ae-8723-29d7ff675a30")))
              .thenReturn(newVerificationToken);

      VerificationToken verificationToken = tokenService.generateNewVerificationToken("7f1a71e8-9b58-41ae-8723-29d7ff675a30");

      assertAll(
              () -> assertEquals(newVerificationToken.getIdToken(), verificationToken.getIdToken()),
              () -> assertEquals(newVerificationToken.getToken(), verificationToken.getToken()),
              () -> assertEquals(newVerificationToken.getAccountEntity(), verificationToken.getAccountEntity())
      );
   }
}
