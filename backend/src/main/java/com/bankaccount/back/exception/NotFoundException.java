package com.bankaccount.back.exception;

import com.bankaccount.back.helpers.Messages;

import java.util.Locale;

/**
 * Exception to be thrown when the element wanted doesn't exist.
 * <p>Extends {@code Exception}
 */
public class NotFoundException extends Exception {

   private final String messageKey;
   private final Locale locale;

   /**
    * Constructor for {@link NotFoundException}.
    * @param messageKey the message desired to show
    */
   public NotFoundException(String messageKey) {
      this(messageKey, Locale.getDefault());
   }

   /**
    * Constructor for {@link NotFoundException}.
    * @param messageKey the message desired to show
    * @param locale the parameter used to choose the language of the message
    */
   public NotFoundException(String messageKey, Locale locale) {
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
