package com.bankaccount.back.persistence.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "account")
public class AccountEntity {

    @Id
    @Column(name = "id_account")
    private Integer idAccount;

    @Column(name = "account_name", length = 50, nullable = false)
    private String accountName;

    @Column(length = 100, unique = true, nullable = false)
    private String email;

    @Column(length = 60, nullable = false)
    private String password;

    @Builder.Default
    @Column(name = "current_balance", nullable = false, columnDefinition = "DECIMAL(14,2)")
    private BigDecimal currentBalance = new BigDecimal("1.00");

    @Builder.Default
    private Boolean enabled = false;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<AccountRoleEntity> roles;
}
