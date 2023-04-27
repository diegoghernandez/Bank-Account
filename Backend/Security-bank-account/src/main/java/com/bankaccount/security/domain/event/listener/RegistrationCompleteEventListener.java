package com.bankaccount.security.domain.event.listener;

import com.bankaccount.security.domain.event.RegistrationCompleteEvent;
import com.bankaccount.security.domain.repository.AccountRepository;
import com.bankaccount.security.persistence.entity.AccountEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void onApplicationEvent(RegistrationCompleteEvent event) {
        AccountEntity accountEntity = event.getAccountEntity();
        String token = UUID.randomUUID().toString();
        accountRepository.saveVerificationToken(token, accountEntity);

        String url = event.getApplicationUrl() + "/verify-registration?token=" + token;

        log.info("Click the link to verify your account: {}", url);
    }
}
