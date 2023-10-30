package com.bankaccount.back.domain.service;

import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.helpers.Messages;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.TokenEntity;
import com.bankaccount.back.web.dto.AccountDto;
import com.bankaccount.back.web.dto.PasswordDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

@Service
public class AccountService {

   @Autowired
   private AccountRepository accountRepository;

   @Autowired
   private TransactionRepository transactionRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   public Optional<AccountEntity> getAccountById(int id) {
      return accountRepository.getAccountById(id);
   }

   public Optional<AccountEntity> getAccountByEmail(String email) {
      return accountRepository.getAccountByEmail(email);
   }

   public AccountEntity saveAccount(AccountDto accountDto, Locale locale) throws NotAllowedException {
      if (accountRepository.emailExist(accountDto.email())) {
         throw new NotAllowedException("email", "service.account.error.email", locale);
      }
      AccountEntity accountEntity = AccountEntity.builder()
              .idAccount(idGenerator())
              .accountName(accountDto.name())
              .email(accountDto.email())
              .password(passwordEncoder.encode(accountDto.password()))
              .build();

      return accountRepository.saveAccount(accountEntity);
   }

   public void saveToken(String token, AccountEntity accountEntity) {
      accountRepository.saveToken(token, accountEntity);
   }

   public String changeName(String newName, PasswordDto passwordDto, Locale locale) throws NotFoundException {
      int idAccount = passwordDto.idAccount();

      if (checkIfValidPassword(idAccount, passwordDto.newPassword())) {
         accountRepository.updateName(newName, idAccount);
         transactionRepository.updateTransactionsName(idAccount, newName);
         return Messages.getMessageForLocale("service.account.change-name.success", locale);
      } else {
         return Messages.getMessageForLocale("service.account.error.password", locale);
      }
   }

   public String changePassword(PasswordDto passwordDto, Locale locale) throws NotFoundException {
      int idAccount = passwordDto.idAccount();

      if (checkIfValidPassword(idAccount, passwordDto.oldPassword())) {
         updatePassword(passwordDto.newPassword(), idAccount);
         return Messages.getMessageForLocale("service.account.change-password.success", locale);
      } else {
         return Messages.getMessageForLocale("service.account.change-password.error", locale);
      }
   }

   public String changeEmail(PasswordDto passwordDto, Locale locale) throws NotFoundException, NotAllowedException {
      int idAccount = passwordDto.idAccount();
      String newEmail = passwordDto.email();

      if (!accountRepository.emailExist(newEmail)) {
         if (checkIfValidPassword(idAccount, passwordDto.newPassword())) {
            accountRepository.updateStatus(false, idAccount);
            accountRepository.updateEmail(newEmail, idAccount);
            return Messages.getMessageForLocale("service.account.change-email.success", locale);
         } else {
            return Messages.getMessageForLocale("service.account.error.password", locale);
         }
      } else {
         throw new NotAllowedException("email", "service.account.error.email", locale);
      }
   }

   public void updateStatus(boolean status, int id) {
      accountRepository.updateStatus(status, id);
   }

   public void updatePassword(String newPassword, int id) {
      accountRepository.updatePassword(passwordEncoder.encode(newPassword), id);
   }

   private boolean checkIfValidPassword(int id, String password) throws NotFoundException {
      Optional<AccountEntity> accountEntity = accountRepository.getAccountById(id);

      if (accountEntity.isPresent()) {
         return passwordEncoder.matches(password, accountEntity.get().getPassword());
      } else {
         throw new NotFoundException("account.error");
      }

   }

   private int idGenerator() {
      int id = (int) (Math.random() * (999999999 - 100000000 + 1) + 100000000);

      while (accountRepository.idExist(id)) {
         id = (int) (Math.random() * (999999999 - 100000000 + 1) + 100000000);
      }

      return id;
   }
}
