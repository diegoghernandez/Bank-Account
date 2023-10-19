package com.bankaccount.back.web.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties("env")
public record EnvConfigProperties(
   String email,
   List<String> allowedOrigins,
   String jwtSecretKey,
   String jwtIssuer
) {}
