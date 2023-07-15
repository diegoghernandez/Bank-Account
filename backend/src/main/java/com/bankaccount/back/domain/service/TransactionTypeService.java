package com.bankaccount.back.domain.service;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.TransactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class TransactionTypeService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    public TransactionEntity saveTransaction(TransactionDto transactionDto, boolean isAutomated) throws Exception {
        int id = transactionDto.idAccount();
        int idTransfer = transactionDto.idTransferAccount();
        BigDecimal amount = transactionDto.amount();
        TransactionType type = transactionDto.transactionType();

        Optional<AccountEntity> isAccount = accountRepository.getAccountById(id);
        Optional<AccountEntity> isAccountTransfer = accountRepository.getAccountById(idTransfer);

        if (isAccount.isEmpty()) throw new Exception();
        else if (idTransfer != 0 && isAccountTransfer.isEmpty()) throw new Exception();

        AccountEntity account = isAccount.get();

        String name = (isAccountTransfer.isPresent()) ?
                isAccountTransfer.get().getAccountName() : account.getAccountName();

        TransactionEntity.TransactionEntityBuilder transactionEntity = TransactionEntity.builder();
        transactionEntity.idAccount(id);
        transactionEntity.idTransferAccount(idTransfer);
        transactionEntity.receiverName(name);
        transactionEntity.transactionAmount(amount);
        transactionEntity.transactionType(type);
        transactionEntity.isAutomated(isAutomated);

        switch (type) {
            case DEPOSIT -> {
                BigDecimal currentBalance = account.getCurrentBalance();

                currentBalance = currentBalance.add(amount);

                accountRepository.updateBalance(currentBalance, id);
            }
            case WIRE_TRANSFER, ONLINE_PAYMENT -> {
                BigDecimal currentBalance = account.getCurrentBalance();

                if (currentBalance.compareTo(amount) < 0) {
                    throw new Exception("Not enough balance");
                } else {
                    currentBalance = currentBalance.subtract(amount);

                    accountRepository.updateBalance(currentBalance, id);

                    saveTransaction(new TransactionDto(
                            idTransfer, id, amount, TransactionType.DEPOSIT), false);
                }
            }
            default -> throw new Exception("Transaction not supported");
        }

        return transactionRepository.saveTransaction(transactionEntity.build());
    }
}
