package com.bankaccount.back.web.config;

import com.bankaccount.back.constants.AccountRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Config class in charge of the basic the endpoints configuration
 */
@Configuration
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {

   private final JwtFilter jwtFilter;

   private static final String ADMIN = AccountRoles.ADMIN.toString();
   private static final String USER = AccountRoles.USER.toString();

   /**
    * Constructor for {@link SecurityConfig}.
    * @param jwtFilter class to work with the jwt logic
    */
   @Autowired
   public SecurityConfig(JwtFilter jwtFilter) {
      this.jwtFilter = jwtFilter;
   }

   /**
    * Make the configuration to what allow for each endpoint
    * @param http the value to make the configuration
    * @return an {@link HttpSecurity} with desire configuration
    * @throws Exception if {@link HttpSecurity} get an error
    */
   @Bean
   public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http
              .csrf().disable()
              .cors().and()
              .sessionManagement()
              .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
              .authorizeHttpRequests()
              .antMatchers("/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
              .antMatchers("/auth/secure/**").hasAnyRole(USER, ADMIN)
              .antMatchers("/auth/**").permitAll()
              .antMatchers("/transactions/**").hasAnyRole(USER, ADMIN)
              .antMatchers("/transactions/{id}").hasAnyRole(ADMIN)
              .antMatchers("/automations/**").hasAnyRole(USER, ADMIN)
              .antMatchers("/automations/{id}").hasAnyRole(ADMIN)
              .antMatchers("/accounts/email/**").hasAnyRole(USER, ADMIN)
              .antMatchers("/accounts/id/**").hasRole(ADMIN)
              .anyRequest()
              .authenticated()
              .and()
              .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

      return http.build();
   }

   /**
    * @param configuration the value from gets the authentication manager
    * @return an {@link AuthenticationManager}
    * @throws Exception if {@link AuthenticationConfiguration} get an error
    */
   @Bean
   public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
      return configuration.getAuthenticationManager();
   }

   /**
    * @return a {@link BCryptPasswordEncoder}
    */
   @Bean
   public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
   }
}
