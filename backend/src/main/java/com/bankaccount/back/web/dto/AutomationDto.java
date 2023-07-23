package com.bankaccount.back.web.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

public record AutomationDto(
   @NotNull int idAccount,
   @NotBlank String name,
   @NotNull BigDecimal amount,
   @NotNull int idTransferAccount,
   @NotNull int hoursToNextExecution
) {}
