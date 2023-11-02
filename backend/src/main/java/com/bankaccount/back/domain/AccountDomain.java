package com.bankaccount.back.domain;

import java.math.BigDecimal;

/**
 * Record to transform the data from an {@link com.bankaccount.back.persistence.entity.AccountEntity} to expose to the client
 * @param idAccount
 * @param accountName
 * @param email
 * @param currentBalance
 */
public record AccountDomain(
        int idAccount,
        String accountName,
        String email,
        BigDecimal currentBalance) {
}
