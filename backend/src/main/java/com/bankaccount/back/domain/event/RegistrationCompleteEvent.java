package com.bankaccount.back.domain.event;

import com.bankaccount.back.persistence.entity.AccountEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.util.Locale;

@Getter
@Setter
public class RegistrationCompleteEvent extends ApplicationEvent {

   private AccountEntity accountEntity;

   private Locale locale;

   public RegistrationCompleteEvent(AccountEntity accountEntity, Locale locale) {
      super(accountEntity);
      this.accountEntity = accountEntity;
      this.locale = locale;
   }
}
