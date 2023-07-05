package com.bankaccount.back.web.dto;

import com.bankaccount.back.constants.TransactionType;

import java.math.BigDecimal;

public record TransactionDto(
        int idAccount,
        int idTransferAccount,
        BigDecimal amount,
        TransactionType transactionType
) {}
