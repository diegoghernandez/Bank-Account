package com.bankaccount.back.web.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.concurrent.TimeUnit;

/**
 * Config class in charge of the JWT manipulation
 */
@Component
public class JwtUtil {

   @Autowired
   private EnvConfigProperties envConfigProperties;

   /**
    * @param username the username of token
    * @return a JWT token
    */
   public String create(String username) {
      return JWT.create()
              .withSubject(username)
              .withIssuer(envConfigProperties.jwtIssuer())
              .withIssuedAt(new Date())
              .withExpiresAt(new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(15)))
              .sign(Algorithm.HMAC256(envConfigProperties.jwtSecretKey()));
   }

   /**
    * @param jwt the jwt token to be verified
    * @return the result of verification
    */
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

   /**
    * @param jwt the jwt token where extract the username
    * @return the username of jwt token
    */
   public String getUsername(String jwt) {
      return JWT.require(Algorithm.HMAC256(envConfigProperties.jwtSecretKey()))
              .build()
              .verify(jwt)
              .getSubject();
   }
}