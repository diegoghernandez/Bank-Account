package com.bankaccount.back.domain.service;

import com.bankaccount.back.persistence.crud.AccountCrudRepository;
import com.bankaccount.back.persistence.entity.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Class in charge from create the User for security.
 * <p>Extends {@link UserDetailsService}
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

   @Autowired
   private AccountCrudRepository accountCrudRepository;

   @Override
   public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      AccountEntity accountEntity = accountCrudRepository.findByEmail(email)
              .orElseThrow(() -> new UsernameNotFoundException("User " + email + " not found"));

      String[] roles = accountEntity.getRoles().stream()
              .map(account -> account.getRole().toString()).toArray(String[]::new);


      return User.builder()
              .username(accountEntity.getEmail())
              .password(accountEntity.getPassword())
              .disabled(!accountEntity.getEnabled())
              .authorities(this.grantedAuthorities(roles))
              .build();
   }

   /*private String[] getAuthorities(String role) {
      if ("ADMIN".equals(role) || "USER".equals(role)) {
         return new String[]{"random_user"};
      }

      return new String[]{};
   }*/

   /**
    * Get all roles from the user to transform them in {@link GrantedAuthority} and return them.
    * @param roles the roles to transform in authorities
    * @return a {@code List} of the {@link GrantedAuthority} from the user
    */
   private List<GrantedAuthority> grantedAuthorities(String[] roles) {
      List<GrantedAuthority> authorities = new ArrayList<>(roles.length);

      for (String role : roles) {
         authorities.add(new SimpleGrantedAuthority("ROLE_" + role));

         /*for (String authority : this.getAuthorities(role)) {
            authorities.add(new SimpleGrantedAuthority(authority));
         }*/
      }

      return authorities;
   }
}
