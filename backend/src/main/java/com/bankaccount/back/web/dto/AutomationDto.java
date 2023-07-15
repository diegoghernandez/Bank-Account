package com.bankaccount.back.web.dto;

import java.math.BigDecimal;

public record AutomationDto(
   int idAccount,
   String name,
   BigDecimal amount,
   int idTransferAccount,
   int hoursToNextExecution
) {}
