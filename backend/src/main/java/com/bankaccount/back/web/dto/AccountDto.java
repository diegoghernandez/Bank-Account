package com.bankaccount.back.web.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

/**
 * Record to handle the data to create an {{@link com.bankaccount.back.persistence.entity.AccountEntity}}
 * @param name
 * @param password
 * @param matchingPassword
 * @param email
 */
public record AccountDto(
        @NotBlank String name,
        @NotBlank String password,
        @NotBlank String matchingPassword,
        @Email String email
) {
}
