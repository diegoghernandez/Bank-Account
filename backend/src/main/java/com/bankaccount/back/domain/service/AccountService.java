package com.bankaccount.back.domain.service;

import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.helpers.Messages;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.web.dto.AccountDto;
import com.bankaccount.back.web.dto.PasswordDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;

/**
 * Account service API
 */
@Service
public class AccountService {

   @Autowired
   private AccountRepository accountRepository;

   @Autowired
   private TransactionRepository transactionRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   /**
    * @param id the id of the desire account
    * @return an {@code Optional} of {@link AccountEntity}
    */
   public Optional<AccountEntity> getAccountById(int id) {
      return accountRepository.getAccountById(id);
   }

   /**
    * @param email the email of the desire account
    * @return an {@code Optional} of {@link AccountEntity}
    */
   public Optional<AccountEntity> getAccountByEmail(String email) {
      return accountRepository.getAccountByEmail(email);
   }

   /**
    * Save an account with the data of {@code accountDto} and return it, otherwise throw an exception.
    * @param accountDto the value to extract the account data
    * @param locale the value to choose the language of the message
    * @return the account saved in the database
    * @throws NotAllowedException if the email already exists
    */
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

   /**
    * Save a token with an account.
    * @param token the value to save
    * @param accountEntity the value to save
    */
   public void saveToken(String token, AccountEntity accountEntity) {
      accountRepository.saveToken(token, accountEntity);
   }

   /**
    * According to the password, either update the name of an existing account and return the success message
    * or return the error message, otherwise thrown an exception.
    * @param newName the value to update
    * @param passwordDto the value to extract the id and the password
    * @param locale the value to choose the language of the message
    * @return the respective message
    * @throws NotFoundException if the account doesn't exist
    */
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

   /**
    * According to the password, either update the name of an existing account and return the success message
    * or return the error message, otherwise thrown an exception.
    * @param passwordDto the value to extract the id, the old password and the new password
    * @param locale the value to choose the language of the message
    * @return the respective message
    * @throws NotFoundException if the account doesn't exist
    */
   public String changePassword(PasswordDto passwordDto, Locale locale) throws NotFoundException {
      int idAccount = passwordDto.idAccount();

      if (checkIfValidPassword(idAccount, passwordDto.oldPassword())) {
         updatePassword(passwordDto.newPassword(), idAccount);
         return Messages.getMessageForLocale("service.account.change-password.success", locale);
      } else {
         return Messages.getMessageForLocale("service.account.change-password.error", locale);
      }
   }

   /**
    * According to the password, either update the email of an existing account and return the success message
    * or return the error message, otherwise thrown an exception.
    * @param passwordDto the value to extract the id, the email and the password
    * @param locale the value to choose the language of the message
    * @return the respective message
    * @throws NotFoundException if the account doesn't exist
    * @throws NotAllowedException if the email already exists
    */
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

   /**
    * Update the account status.
    * @param status the value for update
    * @param id the id to find
    */
   public void updateStatus(boolean status, int id) {
      accountRepository.updateStatus(status, id);
   }

   /**
    * Update the account password.
    * @param newPassword the value for update
    * @param id the id to find
    */
   public void updatePassword(String newPassword, int id) {
      accountRepository.updatePassword(passwordEncoder.encode(newPassword), id);
   }

   /**
    * Check if the password matches with the password of the account and return the boolean.
    * @param id the id to find the account
    * @param password the value to check
    * @return a {@code boolean}
    * @throws NotFoundException if the account doesn't exist
    */
   private boolean checkIfValidPassword(int id, String password) throws NotFoundException {
      Optional<AccountEntity> accountEntity = accountRepository.getAccountById(id);

      if (accountEntity.isPresent()) {
         return passwordEncoder.matches(password, accountEntity.get().getPassword());
      } else {
         throw new NotFoundException("account.error");
      }

   }

   /**
    * Generate an id until the id doesn't exist.
    * @return an id
    */
   private int idGenerator() {
      int id = (int) (Math.random() * (999999999 - 100000000 + 1) + 100000000);

      while (accountRepository.idExist(id)) {
         id = (int) (Math.random() * (999999999 - 100000000 + 1) + 100000000);
      }

      return id;
   }
}
