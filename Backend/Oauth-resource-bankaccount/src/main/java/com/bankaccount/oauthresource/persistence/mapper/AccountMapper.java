package com.bankaccount.oauthresource.persistence.mapper;

import com.bankaccount.oauthresource.domain.AccountDomain;
import com.bankaccount.oauthresource.persistence.entity.AccountEntity;
import org.springframework.stereotype.Component;

@Component
public class AccountMapper {

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
