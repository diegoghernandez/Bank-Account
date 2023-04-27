package com.bankaccount.oauthresource.persistence.mapper;

import com.bankaccount.oauthresource.domain.TransactionDomain;
import com.bankaccount.oauthresource.persistence.entity.TransactionEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-26T20:48:08-0600",
    comments = "version: 1.5.3.Final, compiler: Eclipse JDT (IDE) 3.33.0.v20230218-1114, environment: Java 17.0.6 (Eclipse Adoptium)"
)
@Component
public class TransactionMapperImpl implements TransactionMapper {

    @Override
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

    @Override
    public List<TransactionDomain> toTransactionDomains(List<TransactionEntity> transactionEntities) {
        if ( transactionEntities == null ) {
            return null;
        }

        List<TransactionDomain> list = new ArrayList<TransactionDomain>( transactionEntities.size() );
        for ( TransactionEntity transactionEntity : transactionEntities ) {
            list.add( toTransactionDomain( transactionEntity ) );
        }

        return list;
    }

    @Override
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
