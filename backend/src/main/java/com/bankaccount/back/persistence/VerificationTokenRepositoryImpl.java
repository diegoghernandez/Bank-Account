package com.bankaccount.back.persistence;

import com.bankaccount.back.domain.repository.VerificationTokenRepository;
import com.bankaccount.back.persistence.crud.VerificationTokenCrudRepository;
import com.bankaccount.back.persistence.entity.VerificationToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class VerificationTokenRepositoryImpl implements VerificationTokenRepository {

   @Autowired
   private VerificationTokenCrudRepository verificationTokenCrud;


   @Override
   public VerificationToken getByToken(String token) {
      return verificationTokenCrud.findByToken(token);
   }

   @Override
   public void delete(VerificationToken verificationToken) {
      verificationTokenCrud.delete(verificationToken);
   }

   @Override
   public void deleteByToken(String token) {
      verificationTokenCrud.deleteByToken(token);
   }


   @Override
   public VerificationToken updateToken(String newToken, Date date, String oldToken) {
      verificationTokenCrud.updateTokenByToken(newToken, date, oldToken);

      return verificationTokenCrud.findByToken(newToken);
   }
}
