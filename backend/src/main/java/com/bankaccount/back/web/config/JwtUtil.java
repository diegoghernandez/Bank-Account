package com.bankaccount.back.web.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {

   @Autowired
   private EnvConfigProperties envConfigProperties;

   public String create(String username) {
      return JWT.create()
              .withSubject(username)
              .withIssuer(envConfigProperties.jwtIssuer())
              .withIssuedAt(new Date())
              .withExpiresAt(new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(15)))
              .sign(Algorithm.HMAC256(envConfigProperties.jwtSecretKey()));
   }

   public boolean isValid(String jwt) {
      try {
         JWT.require(Algorithm.HMAC256(envConfigProperties.jwtSecretKey()))
                 .build()
                 .verify(jwt);

         return true;
      } catch (JWTVerificationException e) {
         return false;
      }
   }

   public String getUsername(String jwt) {
      return JWT.require(Algorithm.HMAC256(envConfigProperties.jwtSecretKey()))
              .build()
              .verify(jwt)
              .getSubject();
   }
}