package com.bankaccount.oauthresource.domain.service;

import com.bankaccount.oauthresource.constants.TransactionType;
import com.bankaccount.oauthresource.domain.TransactionDomain;
import com.bankaccount.oauthresource.domain.repository.AccountRepository;
import com.bankaccount.oauthresource.domain.repository.TransactionRepository;
import com.bankaccount.oauthresource.persistence.entity.TransactionEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class TransactionTypeService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    public TransactionDomain saveDepositTransaction(long id, BigDecimal amount) {
        TransactionEntity transactionEntity = TransactionEntity.builder()
                .idAccount(id)
                .transactionAmount(amount)
                .transactionType(TransactionType.DEPOSIT)
                .build();

        BigDecimal currentBalance = accountRepository.getAccountById(id).get().getCurrentBalance();
        currentBalance = currentBalance.add(amount);

        accountRepository.updateBalance(currentBalance, id);

        return transactionRepository.saveTransaction(transactionEntity);
    }

    public TransactionDomain saveCheckTransaction(long id) {
        TransactionEntity transactionEntity = TransactionEntity.builder()
                .idAccount(id)
                .transactionAmount(new BigDecimal("0.00"))
                .transactionType(TransactionType.CHECK)
                .build();

        return transactionRepository.saveTransaction(transactionEntity);
    }

    public TransactionDomain saveOnlinePaymentTransaction(long id, BigDecimal amount) {
        TransactionEntity transactionEntity = TransactionEntity.builder()
                .idAccount(id)
                .transactionAmount(amount)
                .transactionType(TransactionType.ONLINE_PAYMENT)
                .build();

        BigDecimal currentBalance = accountRepository.getAccountById(id).get().getCurrentBalance();
        currentBalance = currentBalance.subtract(amount);

        accountRepository.updateBalance(currentBalance, id);

        return transactionRepository.saveTransaction(transactionEntity);
    }

    public TransactionDomain saveWireTransferTransaction(long id, BigDecimal amount) {
        TransactionEntity transactionEntity = TransactionEntity.builder()
                .idAccount(id)
                .transactionAmount(amount)
                .transactionType(TransactionType.WIRE_TRANSFER)
                .build();

        BigDecimal currentBalance = accountRepository.getAccountById(id).get().getCurrentBalance();
        currentBalance = currentBalance.subtract(amount);

        accountRepository.updateBalance(currentBalance, id);

        return transactionRepository.saveTransaction(transactionEntity);
    }
}
