package com.bankaccount.back.domain.service;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.DateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Transaction service API
 */
@Service
public class TransactionService {

   @Autowired
   private TransactionRepository transactionRepository;

   /**
    * @param id the id of the desire transaction
    * @return an {@code Optional} of {@link TransactionEntity}
    */
   public Optional<TransactionEntity> getTransactionById(long id) {
      return transactionRepository.getTransactionById(id);
   }

   /**
    * @param idAccount the account id of the desire transactions
    * @param page the value to access to certain page
    * @return an {@code Optional} of {@link Page} of {@link TransactionEntity}
    */
   public Optional<Page<TransactionEntity>> getByIdAccount(int idAccount, int page) {
      return transactionRepository.getByIdAccount(idAccount, page);
   }

   /**
    * @param idAccount the account id of the desire transactions
    * @param transactionType the type of the desire transactions
    * @param name the name of the desire transactions
    * @param dateDto the date of the desire transactions
    * @param page the value to access to certain page
    * @return an {@code Optional} of {@link Page} of {@link TransactionEntity}
    */
   public Optional<Page<TransactionEntity>> getByFilter(
           int idAccount, TransactionType transactionType, String name, DateDto dateDto, int page) {

      if (dateDto.year() != 0) {
         return transactionRepository.getByIdAccountAndTypeAndNameAndDate(idAccount, transactionType, name, dateDto, page);
      } else {
         return transactionRepository.getByIdAccountAndName(idAccount, transactionType, name, page);
      }
   }
}
