package com.bankaccount.oauthresource.persistence;

import com.bankaccount.oauthresource.domain.TransactionDomain;
import com.bankaccount.oauthresource.domain.repository.TransactionRepository;
import com.bankaccount.oauthresource.persistence.crud.TransactionCrudRepository;
import com.bankaccount.oauthresource.persistence.entity.TransactionEntity;
import com.bankaccount.oauthresource.persistence.mapper.TransactionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public class TransactionRepositoryImpl implements TransactionRepository {

    @Autowired
    private TransactionCrudRepository transactionCrudRepository;

    @Autowired
    private TransactionMapper transactionMapper;

    @Override
    public Optional<TransactionDomain> getTransactionById(long id) {
        return transactionCrudRepository.findById(id)
                .map(transaction -> transactionMapper.toTransactionDomain(transaction));
    }

    @Override
    public List<TransactionDomain> getByIdAccount(long idAccount) {
        List<TransactionEntity> transactionEntities = transactionCrudRepository.findByIdAccount(idAccount);
        return transactionMapper.toTransactionDomains(transactionEntities);
    }

    @Override
    public List<TransactionDomain> getByTimeAndIdAccount(Instant timestamp, long idAccount) {
        List<TransactionEntity> transactionEntities = transactionCrudRepository.findByTransactionTimestampAfterAndIdAccount(timestamp, idAccount);
        return transactionMapper.toTransactionDomains(transactionEntities);
    }

    @Override
    public TransactionDomain saveTransaction(TransactionEntity transactionEntity) {
        return transactionMapper.toTransactionDomain(transactionCrudRepository.save(transactionEntity));
    }
}
