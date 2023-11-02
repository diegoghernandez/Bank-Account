package com.bankaccount.back.web.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.Month;

/**
 * Record to handle the data to create a new date with the wanted parameters
 * @param year
 * @param month
 * @param day
 */
public record DateDto(
   int year,
   Month month,
   @Min(1) @Max(31) Integer day
) {}
