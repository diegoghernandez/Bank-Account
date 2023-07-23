package com.bankaccount.back.web.dto;

import com.sun.istack.NotNull;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record AccountDto(
       @NotBlank String name,
       @NotBlank String password,
       @NotBlank String matchingPassword,
       @Email String email
) {}
