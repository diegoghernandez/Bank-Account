package com.bankaccount.back.domain.event.listener;

import com.bankaccount.back.domain.event.RegistrationCompleteEvent;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.service.EmailService;
import com.bankaccount.back.persistence.entity.AccountEntity;
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

   @Autowired
   private EmailService emailService;

   @Override
   public void onApplicationEvent(RegistrationCompleteEvent event) {
      AccountEntity accountEntity = event.getAccountEntity();
      String token = UUID.randomUUID().toString();
      accountRepository.saveVerificationToken(token, accountEntity);

      String url = event.getApplicationUrl() + "/auth/verify-registration?token=" + token;

      emailService.sendEmail(
              accountEntity.getEmail(),
              "Verify account",
              "Click the link to verify your account: " + url);
   }
}
