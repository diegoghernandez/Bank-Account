package com.bankaccount.back.persistence.entity;

import com.bankaccount.back.constants.AccountRoles;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "account_role")
@IdClass(AccountRoleId.class)
public class AccountRoleEntity {

    @Id
    @Column(name = "id_account", nullable = false, length = 20)
    private Integer idAccount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private AccountRoles role;

    @Builder.Default
    @Column(name = "granted_date", nullable = false)
    private LocalDateTime grantedDate = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "id_account", referencedColumnName = "id_account", insertable = false, updatable = false)
    private AccountEntity account;
}
