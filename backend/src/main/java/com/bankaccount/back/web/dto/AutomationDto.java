package com.bankaccount.back.web.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public record AutomationDto(
    @NotNull int idAccount,
    @NotBlank String name,
    @NotNull @Min(1) BigDecimal amount,
    @NotNull int idTransferAccount,
    @NotNull @Min(1) int hoursToNextExecution
) {}
