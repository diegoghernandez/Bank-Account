package com.bankaccount.back.persistence;

import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.persistence.crud.TransactionCrudRepository;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.temporal.TemporalAdjusters;
import java.util.Optional;

@Repository
public class TransactionRepositoryImpl implements TransactionRepository {

   @Autowired
   private TransactionCrudRepository transactionCrudRepository;

   @Override
   public Optional<TransactionEntity> getTransactionById(long id) {
      return transactionCrudRepository.findById(id);
   }

   @Override
   public Optional<Page<TransactionEntity>> getByIdAccount(int idAccount, int page) {
      Pageable pageRequest = PageRequest.of(page, 10);
      return Optional.of(transactionCrudRepository.findByIdAccount(idAccount, pageRequest));
   }

   @Override
   public Optional<Page<TransactionEntity>> getByIdAccountAndName(int idAccount, String name, int page) {
      Pageable pageRequest = PageRequest.of(page, 10);
      return Optional.of(transactionCrudRepository.findByIdAccountAndReceiverNameContainingIgnoreCase(idAccount, name, pageRequest));
   }

   @Override
   public Optional<Page<TransactionEntity>> getByIdAccountAndDateAndName(int idAccount, int year, Optional<Month> month, String name, int page) {
      LocalDateTime startDate;
      LocalDateTime endDate;
      if (month.isPresent()) {
         startDate = LocalDateTime.of(year, month.get(), 1, 0, 0, 0);
         endDate = startDate.with(TemporalAdjusters.lastDayOfMonth());
      } else {
         startDate = LocalDateTime.of(year, Month.JANUARY, 1, 0, 0, 0);
         endDate = LocalDateTime.of(year + 1, Month.JANUARY, 1, 0, 0, 0);
      }
      Pageable pageRequest = PageRequest.of(page, 10);

      return Optional.of(transactionCrudRepository.findByIdAccountAndTransactionTimestampBetweenAndReceiverNameContainingIgnoreCase(
              idAccount, startDate, endDate, name, pageRequest));
   }

   @Override
   public void saveTransaction(TransactionEntity transactionEntity) {
      transactionCrudRepository.save(transactionEntity);
   }

   @Override
   public void updateTransactionsName(int id, String name) {
      transactionCrudRepository.updateNameByIdAccount(id, name);
      transactionCrudRepository.updateNameByIdTransferAccount(id, name);
   }
}
