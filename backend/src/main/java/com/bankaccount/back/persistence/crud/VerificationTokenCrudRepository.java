package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.VerificationToken;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface VerificationTokenCrudRepository extends CrudRepository<VerificationToken, Long> {

    VerificationToken findByToken(String token);

    @Transactional
    void deleteByToken(String token);

    @Modifying
    @Transactional
    @Query("UPDATE VerificationToken AS vt SET vt.token = :newToken WHERE vt.token = :oldToken")
    void updateTokenByToken(@Param("newToken") String newToken, @Param("oldToken") String oldToken);
}
