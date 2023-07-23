package com.bankaccount.back.web.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record PasswordDto(
        @Email String email,
        @NotBlank String oldPassword,
        @NotBlank String newPassword
) {}
