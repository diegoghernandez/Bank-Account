package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.PasswordResetToken;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

public interface PasswordResetTokenCrudRepository extends CrudRepository<PasswordResetToken, Long> {

   PasswordResetToken findByToken(String token);

   @Transactional
   void deleteByToken(String token);
}
