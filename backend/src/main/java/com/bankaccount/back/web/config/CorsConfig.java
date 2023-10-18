package com.bankaccount.back.web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

   @Autowired
   private EnvConfigProperties envConfigProperties;

   @Bean
   CorsConfigurationSource corsConfigurationSource() {
      CorsConfiguration corsConfiguration = new CorsConfiguration();

      corsConfiguration.setAllowedOrigins(envConfigProperties.allowedOrigins());
      corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
      corsConfiguration.setAllowedHeaders(List.of("*"));

      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
      source.registerCorsConfiguration("/**", corsConfiguration);

      return source;
   }
}
