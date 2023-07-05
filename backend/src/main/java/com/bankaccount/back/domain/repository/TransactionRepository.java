package com.bankaccount.back.domain.repository;

import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository {

    Optional<TransactionEntity> getTransactionById(long id);

    Optional<Page<TransactionEntity>> getByIdAccount(int idAccount, int page);

    List<TransactionEntity> getByIdAccountAndYear(int idAccount, int year);

    TransactionEntity saveTransaction(TransactionEntity transactionEntity);
}
