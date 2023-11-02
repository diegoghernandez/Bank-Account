package com.bankaccount.back.domain.repository;

import com.bankaccount.back.persistence.entity.TokenEntity;

import java.util.Date;

/**
 * Token repository API.
 */
public interface TokenRepository {

   TokenEntity getByToken(String token);

   void delete(TokenEntity tokenEntity);

   void deleteByToken(String token);

   TokenEntity updateToken(String newToken, Date date, String oldToken);
}
