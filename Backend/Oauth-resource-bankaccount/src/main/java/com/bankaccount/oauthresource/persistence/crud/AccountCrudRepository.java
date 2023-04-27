package com.bankaccount.oauthresource.persistence.crud;

import com.bankaccount.oauthresource.persistence.entity.AccountEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.Optional;

public interface AccountCrudRepository extends CrudRepository<AccountEntity, Long> {

    Optional<AccountEntity> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE AccountEntity AS acc SET acc.currentBalance = :bal WHERE acc.idAccount = :id")
    void updateBalanceById(@Param("bal") BigDecimal balance, @Param("id") long id);
}
