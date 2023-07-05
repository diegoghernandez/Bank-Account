package com.bankaccount.back.persistence.entity;

import com.bankaccount.back.constants.AccountRoles;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountRoleId implements Serializable {
    private Integer idAccount;
    private AccountRoles role;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AccountRoleId that = (AccountRoleId) o;
        return Objects.equals(idAccount, that.idAccount) && role == that.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(idAccount, role);
    }
}
