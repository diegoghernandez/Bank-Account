package com.bankaccount.back.domain.repository;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.DateDto;
import org.springframework.data.domain.Page;

import java.time.Month;
import java.util.Optional;

public interface TransactionRepository {

   Optional<TransactionEntity> getTransactionById(long id);

   Optional<Page<TransactionEntity>> getByIdAccount(int idAccount, int page);

   Optional<Page<TransactionEntity>> getByIdAccountAndName(int idAccount, TransactionType transactionType, String name, int page);

   Optional<Page<TransactionEntity>> getByIdAccountAndTypeAndNameAndDate(
           int idAccount, TransactionType transactionType, String name, DateDto dateDto, int page);

   void saveTransaction(TransactionEntity transactionEntity);

   void updateTransactionsName(int id, String name);
}
