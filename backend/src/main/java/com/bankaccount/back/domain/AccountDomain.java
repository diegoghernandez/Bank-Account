package com.bankaccount.back.domain;

import java.math.BigDecimal;

public record AccountDomain(
        int idAccount,
        String accountName,
        String email,
        BigDecimal currentBalance)
{}
