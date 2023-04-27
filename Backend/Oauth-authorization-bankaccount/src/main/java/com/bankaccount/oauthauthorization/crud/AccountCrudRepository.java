package com.bankaccount.oauthauthorization.crud;

import com.bankaccount.oauthauthorization.entity.AccountEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AccountCrudRepository extends CrudRepository<AccountEntity, Long> {

    boolean existsByEmail(String email);

    Optional<AccountEntity> findByEmail(String email);
}
