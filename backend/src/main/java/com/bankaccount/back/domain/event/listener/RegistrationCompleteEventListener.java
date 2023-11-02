package com.bankaccount.back.domain.event.listener;

import com.bankaccount.back.domain.event.RegistrationCompleteEvent;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.service.EmailService;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.web.config.EnvConfigProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.UUID;


/**
 * Class listener for {@link RegistrationCompleteEvent}.
 * <p>Extends {@link ApplicationListener}
 */
@Component
public class RegistrationCompleteEventListener implements ApplicationListener<RegistrationCompleteEvent> {

   @Autowired
   private AccountRepository accountRepository;

   @Autowired
   private EmailService emailService;

   @Autowired
   private EnvConfigProperties configProperties;

   /**
    * Send email to verify the account, using the account email, the token,
    * and the url of the client.
    * @param event the event to respond to {@link RegistrationCompleteEvent}
    */
   @Override
   public void onApplicationEvent(RegistrationCompleteEvent event) {
      AccountEntity accountEntity = event.getAccountEntity();
      String token = UUID.randomUUID().toString();
      accountRepository.saveToken(token, accountEntity);

      String url = configProperties.client() + "/verify-registration?token=" + token +
              "&traduction=TOKEN_REGISTER&email=" + accountEntity.getEmail();

      emailService.sendEmail(
              accountEntity.getEmail(),
              "Verify account",
              "Click the link to verify your account: " + url);
   }
}
