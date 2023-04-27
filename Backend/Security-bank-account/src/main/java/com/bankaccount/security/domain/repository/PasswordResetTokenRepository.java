package com.bankaccount.security.domain.repository;

import com.bankaccount.security.persistence.entity.PasswordResetToken;

public interface PasswordResetTokenRepository {

    PasswordResetToken getByToken(String token);

    PasswordResetToken savePasswordResetToken(PasswordResetToken passwordResetToken);

    void delete(PasswordResetToken passwordResetToken);
}
