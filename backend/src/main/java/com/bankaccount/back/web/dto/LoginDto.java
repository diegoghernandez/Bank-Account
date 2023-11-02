package com.bankaccount.back.web.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * Record to handle the data to log in
 * @param email
 * @param password
 */
public record LoginDto(
        @Email String email,
        @NotBlank String password
) {
}
