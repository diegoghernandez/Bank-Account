package com.bankaccount.back.exception;

import com.bankaccount.back.helpers.Messages;
import lombok.Getter;

import java.util.Locale;

/**
 * Exception to be thrown when something desire can cause a problem.
 * <p>Extends {@code Exception}
 */
public class NotAllowedException extends Exception {

   @Getter
   private final String field;
   private final String messageKey;
   private final Locale locale;

   /**
    * Constructor for {@link NotAllowedException}.
    * @param field the name of the field for the message
    * @param messageKey the message desired to show
    */
   public NotAllowedException(String field, String messageKey) {
      this(field, messageKey, Locale.getDefault());
   }

   /**
    * Constructor for {@link NotAllowedException}.
    * @param field the name of the field for the message
    * @param messageKey the message desired to show
    * @param locale the parameter used to choose the language of the message
    */
   public NotAllowedException(String field, String messageKey, Locale locale) {
      this.field = field;
      this.messageKey = messageKey;
      this.locale = locale;
   }

   /**
    * @return the exception message
    */
   public String getMessage() {
      return getLocalizedMessage();
   }

   /**
    * @return the exception message with the desired language
    */
   public String getLocalizedMessage() {
      return Messages.getMessageForLocale(messageKey, locale);
   }
}
