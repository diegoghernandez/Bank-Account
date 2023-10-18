package com.bankaccount.back.web.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Null;
import java.time.Month;

public record DateDto(
   int year,
   Month month,
   @Min(1) @Max(31) Integer day
) {}
