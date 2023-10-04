package com.bankaccount.back.domain.repository;

import com.bankaccount.back.persistence.entity.VerificationToken;

public interface VerificationTokenRepository {

   VerificationToken getByToken(String token);

   void delete(VerificationToken verificationToken);

   void deleteByToken(String token);

   VerificationToken updateToken(String newToken, String oldToken);
}
