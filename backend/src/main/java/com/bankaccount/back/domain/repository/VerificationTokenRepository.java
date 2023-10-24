package com.bankaccount.back.domain.repository;

import com.bankaccount.back.persistence.entity.VerificationToken;

import java.util.Date;

public interface VerificationTokenRepository {

   VerificationToken getByToken(String token);

   void delete(VerificationToken verificationToken);

   void deleteByToken(String token);

   VerificationToken updateToken(String newToken, Date date, String oldToken);
}
