package com.bankaccount.oauthauthorization.service;

import com.bankaccount.oauthauthorization.crud.AccountCrudRepository;
import com.bankaccount.oauthauthorization.entity.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountCrudRepository accountCrudRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<AccountEntity> account = accountCrudRepository.findByEmail(email);

        if (!account.isPresent()) {
            throw new UsernameNotFoundException("No Account Found");
        }
        return new User(
                account.get().getEmail(),
                account.get().getPassword(),
                account.get().getEnabled(),
                true,
                true,
                true,
                getAuthorities(Arrays.asList(account.get().getRole()))
        );
    }

    private Collection<? extends GrantedAuthority> getAuthorities(List<String> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }

        return authorities;
    }
}
