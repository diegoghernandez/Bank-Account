package com.bankaccount.oauthresource.persistence.mapper;

import com.bankaccount.oauthresource.domain.AccountDomain;
import com.bankaccount.oauthresource.persistence.entity.AccountEntity;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-04-26T20:48:08-0600",
    comments = "version: 1.5.3.Final, compiler: Eclipse JDT (IDE) 3.33.0.v20230218-1114, environment: Java 17.0.6 (Eclipse Adoptium)"
)
@Component
public class AccountMapperImpl implements AccountMapper {

    @Override
    public AccountDomain toAccountDomain(AccountEntity accountEntity) {
        if ( accountEntity == null ) {
            return null;
        }

        AccountDomain.AccountDomainBuilder accountDomain = AccountDomain.builder();

        accountDomain.accountName( accountEntity.getAccountName() );
        accountDomain.currentBalance( accountEntity.getCurrentBalance() );
        accountDomain.email( accountEntity.getEmail() );
        if ( accountEntity.getIdAccount() != null ) {
            accountDomain.idAccount( accountEntity.getIdAccount() );
        }

        return accountDomain.build();
    }

    @Override
    public AccountEntity toAccountEntity(AccountDomain accountDomain) {
        if ( accountDomain == null ) {
            return null;
        }

        AccountEntity.AccountEntityBuilder accountEntity = AccountEntity.builder();

        accountEntity.accountName( accountDomain.getAccountName() );
        accountEntity.currentBalance( accountDomain.getCurrentBalance() );
        accountEntity.email( accountDomain.getEmail() );
        accountEntity.idAccount( accountDomain.getIdAccount() );

        return accountEntity.build();
    }
}
