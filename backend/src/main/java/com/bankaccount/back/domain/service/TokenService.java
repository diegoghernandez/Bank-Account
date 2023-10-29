package com.bankaccount.back.domain.service;

import com.bankaccount.back.constants.AccountRoles;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.TokenRepository;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.AccountRoleEntity;
import com.bankaccount.back.persistence.entity.TokenEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TokenService {

   @Autowired
   private AccountRepository accountRepository;

   @Autowired
   private TokenRepository tokenRepository;

   public String validateVerification(String token) {
      TokenEntity tokenEntity = tokenRepository.getByToken(token);

      if (tokenEntity == null) {
         return "invalid";
      }

      AccountEntity accountEntity = tokenEntity.getAccountEntity();
      Calendar cal = Calendar.getInstance();

      if ((tokenEntity.getExpirationTime().getTime() - cal.getTime().getTime()) <= 0) {
         return "expired";
      }

      accountRepository.saveAccount(AccountEntity.builder()
              .idAccount(accountEntity.getIdAccount())
              .accountName(accountEntity.getAccountName())
              .email(accountEntity.getEmail())
              .password(accountEntity.getPassword())
              .currentBalance(accountEntity.getCurrentBalance())
              .enabled(true)
              .roles(List.of(AccountRoleEntity.builder()
                      .idAccount(accountEntity.getIdAccount())
                      .role(AccountRoles.USER)
                      .account(accountEntity)
                      .build()))
              .build());
      return "valid";
   }

   public TokenEntity generateNewToken(String oldToken) {
      Calendar calendar = Calendar.getInstance();
      calendar.setTimeInMillis(new Date().getTime());
      calendar.add(Calendar.MINUTE, 10);

      return tokenRepository.updateToken(
              UUID.randomUUID().toString(), new Date(calendar.getTime().getTime()), oldToken);
   }

   public void deleteToken(String token) {
      tokenRepository.deleteByToken(token);
   }

   public String validateToken(String token) {
      TokenEntity tokenEntity = tokenRepository.getByToken(token);

      if (tokenEntity == null) {
         return "invalid";
      }

      Calendar cal = Calendar.getInstance();

      if ((tokenEntity.getExpirationTime().getTime() - cal.getTime().getTime()) <= 0) {
         return "expired";
      }

      return "valid";
   }

   public Optional<AccountEntity> getAccountByToken(String token) {
      return Optional.ofNullable(tokenRepository.getByToken(token).getAccountEntity());
   }
}
