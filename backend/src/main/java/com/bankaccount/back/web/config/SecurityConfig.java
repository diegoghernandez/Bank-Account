package com.bankaccount.back.web.config;

import com.bankaccount.back.constants.AccountRoles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
   private static final String DEMO = AccountRoles.DEMO.toString();

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
   public SecurityFilterChain filterChain(HttpSecurity http, CustomAuthorizationManager customAuthorizationManager) throws Exception {
      http
              .csrf().disable()
              .cors().and()
              .sessionManagement()
              .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
              .authorizeHttpRequests(requests -> requests
                      .antMatchers("/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                      .antMatchers("/auth/secure/**").hasAnyRole(ADMIN, USER)
                      .antMatchers("/auth/secure/**").access(customAuthorizationManager)
                      .antMatchers("/auth/**").permitAll()
                      .antMatchers("/transactions/**").hasAnyRole(ADMIN, USER, DEMO)
                      .antMatchers("/transactions/{id}").hasRole(ADMIN)
                      .antMatchers("/transactions/**").access(customAuthorizationManager)
                      .antMatchers(HttpMethod.GET, "/automations/**").hasAnyRole(ADMIN, USER, DEMO)
                      .antMatchers(HttpMethod.PUT, "/automations/**").hasAnyRole(ADMIN, USER, DEMO)
                      .antMatchers("/automations/**").hasAnyRole(ADMIN, USER)
                      .antMatchers("/automations/{id}").hasRole(ADMIN)
                      .antMatchers("/automations/**").access(customAuthorizationManager)
                      .antMatchers("/accounts/id/**").hasRole(ADMIN)
                      .antMatchers("/accounts/email/{email}").hasAnyRole(ADMIN, USER, DEMO)
                      .antMatchers("/accounts/email/{email}").access(customAuthorizationManager)
                      .anyRequest()
                      .authenticated()
              )
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
