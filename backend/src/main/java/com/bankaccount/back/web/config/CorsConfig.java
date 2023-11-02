package com.bankaccount.back.web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Config class in charge of the cors configuration
 */
@Configuration
public class CorsConfig {

   @Autowired
   private EnvConfigProperties envConfigProperties;

   /**
    * Set what cors will allow
    * @return the cors configuration
    */
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
