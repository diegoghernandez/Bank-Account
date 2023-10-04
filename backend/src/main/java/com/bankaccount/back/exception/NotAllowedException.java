package com.bankaccount.back.exception;

import com.bankaccount.back.helpers.Messages;
import lombok.Getter;

import java.util.Locale;

public class NotAllowedException extends Exception {

   @Getter
   private final String field;
   private final String messageKey;
   private final Locale locale;

   public NotAllowedException(String field, String messageKey) {
      this(field, messageKey, Locale.getDefault());
   }

   public NotAllowedException(String field, String messageKey, Locale locale) {
      this.field = field;
      this.messageKey = messageKey;
      this.locale = locale;
   }

   public String getMessage() {
      return getLocalizedMessage();
   }

   public String getLocalizedMessage() {
      return Messages.getMessageForLocale(messageKey, locale);
   }
}
