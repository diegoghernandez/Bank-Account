package com.bankaccount.security.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountModel {

    private String accountName;
    private String email;
    private String password;
    private String matchingPassword;
}
