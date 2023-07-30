package com.bankaccount.back.web.dto;

import com.bankaccount.back.constants.TransactionType;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public record TransactionDto(
        @NotNull int idAccount,
        @NotNull int idTransferAccount,
        @NotNull @Min(1) BigDecimal amount,
        @NotNull TransactionType transactionType
) {}
