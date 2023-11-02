package com.bankaccount.back.web.dto;

import org.springframework.lang.Nullable;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * Record to handle the data for some auth methods
 * @param idAccount
 * @param email
 * @param oldPassword
 * @param newPassword
 */
public record PasswordDto(
        @Nullable int idAccount,
        @Email @Nullable String email,
        @Nullable String oldPassword,
        @NotBlank String newPassword
) {}
