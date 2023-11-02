package com.bankaccount.back.persistence;

import com.bankaccount.back.domain.repository.TokenRepository;
import com.bankaccount.back.persistence.crud.TokenCrudRepository;
import com.bankaccount.back.persistence.entity.TokenEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * Token repository implementation API.
 * <p>Implements {@link TokenRepository}
 */
@Service
public class TokenRepositoryImpl implements TokenRepository {

   @Autowired
   private TokenCrudRepository tokenCrudRepository;


   @Override
   public TokenEntity getByToken(String token) {
      return tokenCrudRepository.findByToken(token);
   }

   @Override
   public void delete(TokenEntity tokenEntity) {
      tokenCrudRepository.delete(tokenEntity);
   }

   @Override
   public void deleteByToken(String token) {
      tokenCrudRepository.deleteByToken(token);
   }


   @Override
   public TokenEntity updateToken(String newToken, Date date, String oldToken) {
      tokenCrudRepository.updateTokenByToken(newToken, date, oldToken);

      return tokenCrudRepository.findByToken(newToken);
   }
}
