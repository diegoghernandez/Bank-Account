package com.bankaccount.back.persistence;

import com.bankaccount.back.domain.repository.PasswordResetTokenRepository;
import com.bankaccount.back.persistence.crud.PasswordResetTokenCrudRepository;
import com.bankaccount.back.persistence.entity.PasswordResetToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetTokenRepositoryImpl implements PasswordResetTokenRepository {

   @Autowired
   private PasswordResetTokenCrudRepository passwordResetTokenCrud;


   @Override
   public PasswordResetToken getByToken(String token) {
      return passwordResetTokenCrud.findByToken(token);
   }

   @Override
   public PasswordResetToken savePasswordResetToken(PasswordResetToken passwordResetToken) {
      return passwordResetTokenCrud.save(passwordResetToken);
   }

   @Override
   public void delete(PasswordResetToken passwordResetToken) {
      passwordResetTokenCrud.delete(passwordResetToken);
   }
}
