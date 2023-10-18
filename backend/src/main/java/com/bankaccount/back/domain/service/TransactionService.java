package com.bankaccount.back.domain.service;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.DateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TransactionService {

   @Autowired
   private TransactionRepository transactionRepository;

   public Optional<TransactionEntity> getTransactionById(long id) {
      return transactionRepository.getTransactionById(id);
   }

   public Optional<Page<TransactionEntity>> getByIdAccount(int idAccount, int page) {
      return transactionRepository.getByIdAccount(idAccount, page);
   }

   public Optional<Page<TransactionEntity>> getByFilter(
           int idAccount, TransactionType transactionType, String name, DateDto dateDto, int page) {

      if (dateDto.year() != 0) {
         return transactionRepository.getByIdAccountAndTypeAndNameAndDate(idAccount, transactionType, name, dateDto, page);
      } else {
         return transactionRepository.getByIdAccountAndName(idAccount, transactionType, name, page);
      }
   }
}
