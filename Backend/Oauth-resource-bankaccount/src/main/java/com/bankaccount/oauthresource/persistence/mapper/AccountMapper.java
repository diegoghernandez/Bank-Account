package com.bankaccount.oauthresource.persistence.mapper;

import com.bankaccount.oauthresource.domain.AccountDomain;
import com.bankaccount.oauthresource.persistence.entity.AccountEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface AccountMapper {

    AccountDomain toAccountDomain(AccountEntity accountEntity);

    @InheritInverseConfiguration
    @Mappings({
            @Mapping(target = "password", ignore = true),
            @Mapping(target = "role", ignore = true),
            @Mapping(target = "enabled", ignore = true),
            @Mapping(target = "transactionEntities", ignore = true)
    })
    AccountEntity toAccountEntity(AccountDomain accountDomain);
}
