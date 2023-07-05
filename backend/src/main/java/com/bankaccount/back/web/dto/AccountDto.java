package com.bankaccount.back.web.dto;

import com.sun.istack.NotNull;

public record AccountDto(
       String name,
       String password,
       String matchingPassword,
       String email
) {}
