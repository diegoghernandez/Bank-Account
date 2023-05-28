package com.bankaccount.security.domain.repository;

import com.bankaccount.security.persistence.entity.VerificationToken;

public interface VerificationTokenRepository {
    VerificationToken getByToken(String token);

    void delete(VerificationToken verificationToken);

    VerificationToken updateToken(String newToken, String oldToken);
}
