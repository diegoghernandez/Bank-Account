package com.bankaccount.back.domain.repository;

import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.springframework.data.domain.Page;

import java.time.Month;
import java.util.Optional;

public interface TransactionRepository {

   Optional<TransactionEntity> getTransactionById(long id);

   Optional<Page<TransactionEntity>> getByIdAccount(int idAccount, int page);

   Optional<Page<TransactionEntity>> getByIdAccountAndName(int idAccount, String name, int page);

   Optional<Page<TransactionEntity>> getByIdAccountAndDateAndName(int idAccount, int year, Optional<Month> month, String name, int page);

   void saveTransaction(TransactionEntity transactionEntity);

   void updateTransactionsName(int id, String name);
}
