package com.bankaccount.back.helpers;

import java.util.Locale;
import java.util.ResourceBundle;

/**
 * Class in charge of the message logic from the bundle
 */
public class Messages {

   /**
    * Recover the message from the bundle with the desire language
    * @param messageKey the value for specific message
    * @param locale the value to choose the language of the message
    * @return the wanted message
    */
   public static String getMessageForLocale(String messageKey, Locale locale) {
      return ResourceBundle.getBundle("messages", locale)
              .getString(messageKey);
   }
}
