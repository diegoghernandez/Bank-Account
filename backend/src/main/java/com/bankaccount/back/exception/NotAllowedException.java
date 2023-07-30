package com.bankaccount.back.exception;

public class NotAllowedException extends Exception {

    private final String field;

    public NotAllowedException(String field, String message) {
        super(message);
        this.field = field;
    }

    public String getField() {
        return this.field;
    }
}
