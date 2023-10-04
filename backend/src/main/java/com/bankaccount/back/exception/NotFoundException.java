package com.bankaccount.back.exception;

import com.bankaccount.back.helpers.Messages;

import java.util.Locale;

public class NotFoundException extends Exception {

    private final String messageKey;
    private final Locale locale;

    public NotFoundException(String messageKey) {
        this(messageKey, Locale.getDefault());
    }

    public NotFoundException(String messageKey, Locale locale) {
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
