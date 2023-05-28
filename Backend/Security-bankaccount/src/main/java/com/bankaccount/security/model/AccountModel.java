package com.bankaccount.security.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountModel {

    private String accountName;
    private String email;
    private String password;
    private String matchingPassword;
}
