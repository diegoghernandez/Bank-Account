package com.bankaccount.back.web.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public record LoginDto(
        @Email String email,
        @NotBlank String password
) {
}
