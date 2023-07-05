package com.bankaccount.back.domain.repository;

import com.bankaccount.back.persistence.entity.PasswordResetToken;

public interface PasswordResetTokenRepository {

    PasswordResetToken getByToken(String token);

    PasswordResetToken savePasswordResetToken(PasswordResetToken passwordResetToken);

    void delete(PasswordResetToken passwordResetToken);
}
