package com.bankaccount.back.persistence;

import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.persistence.crud.AccountCrudRepository;
import com.bankaccount.back.persistence.crud.TokenCrudRepository;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.TokenEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public class AccountRepositoryImpl implements AccountRepository {

   @Autowired
   private AccountCrudRepository accountCrudRepository;

   @Autowired
   private TokenCrudRepository tokenCrudRepository;

   @Override
   public Optional<AccountEntity> getAccountById(int id) {
      return accountCrudRepository.findById(id);
   }

   @Override
   public Optional<AccountEntity> getAccountByEmail(String email) {
      return accountCrudRepository.findByEmail(email);
   }

   @Override
   public void updateBalance(BigDecimal bigDecimal, int id) {
      accountCrudRepository.updateBalanceById(bigDecimal, id);
   }

   @Override
   public void updateStatus(boolean status, int id) {
      accountCrudRepository.updateStatusById(status, id);
   }

   @Override
   public void updateName(String newName, int id) {
      accountCrudRepository.updateName(newName, id);
   }

   @Override
   public void updatePassword(String newPassword, int id) {
      accountCrudRepository.updatePassword(newPassword, id);
   }

   @Override
   public void updateEmail(String newEmail, int id) {
      accountCrudRepository.updateEmail(newEmail, id);
   }

   @Override
   public AccountEntity saveAccount(AccountEntity accountEntity) {
      return accountCrudRepository.save(accountEntity);
   }

   @Override
   public void saveToken(String token, AccountEntity accountEntity) {
      TokenEntity tokenEntity = TokenEntity.builder()
              .accountEntity(accountEntity)
              .token(token)
              .build();

      tokenCrudRepository.save(tokenEntity);
   }

   @Override
   public boolean emailExist(String email) {
      return accountCrudRepository.existsByEmail(email);
   }

   @Override
   public boolean idExist(int id) {
      return accountCrudRepository.existsById(id);
   }
}
