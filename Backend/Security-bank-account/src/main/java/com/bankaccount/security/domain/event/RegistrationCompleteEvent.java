package com.bankaccount.security.domain.event;

import com.bankaccount.security.persistence.entity.AccountEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {

    private AccountEntity accountEntity;

    private String applicationUrl;

    public RegistrationCompleteEvent(AccountEntity accountEntity, String applicationUrl) {
        super(accountEntity);
        this.accountEntity = accountEntity;
        this.applicationUrl = applicationUrl;
    }
}
