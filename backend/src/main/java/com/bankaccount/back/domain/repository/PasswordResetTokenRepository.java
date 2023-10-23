package com.bankaccount.back.domain.repository;

import com.bankaccount.back.persistence.entity.PasswordResetToken;

public interface PasswordResetTokenRepository {

   PasswordResetToken getByToken(String token);

   void savePasswordResetToken(PasswordResetToken passwordResetToken);

   void delete(PasswordResetToken passwordResetToken);

   void deleteByToken(String token);
}
