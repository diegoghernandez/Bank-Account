package com.bankaccount.back.web.dto;

public record PasswordDto(
        String email,
        String oldPassword,
        String newPassword
) {}
