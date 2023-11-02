package com.bankaccount.back.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

/**
 * Config class in charge of get the environment variables
 * @param client
 * @param email
 * @param allowedOrigins
 * @param jwtSecretKey
 * @param jwtIssuer
 */
@ConfigurationProperties("env")
public record EnvConfigProperties(
   String client,
   String email,
   List<String> allowedOrigins,
   String jwtSecretKey,
   String jwtIssuer
) {}
