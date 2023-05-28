package com.bankaccount.oauthresource.persistence.mapper;

import com.bankaccount.oauthresource.domain.TransactionDomain;
import com.bankaccount.oauthresource.persistence.entity.TransactionEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class TransactionMapper {

    public TransactionDomain toTransactionDomain(TransactionEntity transactionEntity) {
        if ( transactionEntity == null ) {
            return null;
        }

        TransactionDomain.TransactionDomainBuilder transactionDomain = TransactionDomain.builder();

        if ( transactionEntity.getIdAccount() != null ) {
            transactionDomain.idAccount( transactionEntity.getIdAccount() );
        }
        if ( transactionEntity.getIdTransaction() != null ) {
            transactionDomain.idTransaction( transactionEntity.getIdTransaction() );
        }
        transactionDomain.transactionAmount( transactionEntity.getTransactionAmount() );
        transactionDomain.transactionTimestamp( transactionEntity.getTransactionTimestamp() );

        return transactionDomain.build();
    }

    public List<TransactionDomain> toTransactionDomains(List<TransactionEntity> transactionEntities){
        if ( transactionEntities == null ) {
            return null;
        }

        List<TransactionDomain> list = new ArrayList<TransactionDomain>( transactionEntities.size() );
        for ( TransactionEntity transactionEntity : transactionEntities ) {
            list.add( toTransactionDomain( transactionEntity ) );
        }

        return list;
    }

    public TransactionEntity toTransactionEntity(TransactionDomain transactionDomain) {
        if ( transactionDomain == null ) {
            return null;
        }

        TransactionEntity.TransactionEntityBuilder transactionEntity = TransactionEntity.builder();

        transactionEntity.idAccount( transactionDomain.getIdAccount() );
        transactionEntity.idTransaction( transactionDomain.getIdTransaction() );
        transactionEntity.transactionAmount( transactionDomain.getTransactionAmount() );
        transactionEntity.transactionTimestamp( transactionDomain.getTransactionTimestamp() );

        return transactionEntity.build();
    }
}
