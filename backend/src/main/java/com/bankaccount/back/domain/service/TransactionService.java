package com.bankaccount.back.domain.service;

import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<TransactionEntity> getByIdAccountAndYear(int idAccount, int year) {
        return transactionRepository.getByIdAccountAndYear(idAccount, year);
    }
}
