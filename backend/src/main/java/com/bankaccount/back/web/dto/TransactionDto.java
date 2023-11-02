package com.bankaccount.back.web.dto;

import com.bankaccount.back.constants.TransactionType;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * Record to handle the data to create an {{@link com.bankaccount.back.persistence.entity.TransactionEntity}}
 * @param idAccount
 * @param idTransferAccount
 * @param amount
 * @param transactionType
 */
public record TransactionDto(
        @NotNull int idAccount,
        @NotNull int idTransferAccount,
        @NotNull @Min(1) BigDecimal amount,
        @NotNull TransactionType transactionType
) {
}
