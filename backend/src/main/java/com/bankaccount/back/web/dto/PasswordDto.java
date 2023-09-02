package com.bankaccount.back.web.dto;

import org.springframework.lang.Nullable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

public record PasswordDto(

        @Nullable int idAccount,
        @Email @NotEmpty String email,
        @Nullable String oldPassword,
        @NotBlank String newPassword
) {}
