package com.bankaccount.oauthresource.domain;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class AccountDomain {

    private long idAccount;

    private String accountName;

    private String email;

    private BigDecimal currentBalance;
}
