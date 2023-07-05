package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.AccountRoleEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface AccountCrudRepository extends CrudRepository<AccountEntity, Integer> {

    boolean existsByEmail(String email);

    Optional<AccountEntity> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE AccountEntity AS acc SET acc.enabled = true WHERE acc.idAccount = :id")
    void updateStatusById(int id);

    @Modifying
    @Transactional
    @Query("UPDATE AccountEntity AS acc SET acc.password = :newPassword WHERE acc.idAccount = :id")
    void updatePassword(@Param("newPassword") String newPassword, int id);

    @Modifying
    @Transactional
    @Query("UPDATE AccountEntity AS acc SET acc.currentBalance = :bal WHERE acc.idAccount = :id")
    void updateBalanceById(@Param("bal") BigDecimal balance, int id);
}
