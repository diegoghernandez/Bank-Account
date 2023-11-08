package com.bankaccount.back.web.config;

import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.persistence.entity.AccountEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.authorization.AuthorizationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.access.intercept.RequestAuthorizationContext;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Optional;
import java.util.function.Supplier;

/**
 * An Authorization manager which verifies a request is made with the user information
 */
@Component
public class CustomAuthorizationManager implements AuthorizationManager<RequestAuthorizationContext> {

   @Autowired
   private AccountService accountService;

   /**
    * Check the header id or the email variable to verify if the information is from the user
    * @param authenticationSupplier the {@link Supplier} of the {@link Authentication} to check
    * @param object the {@link RequestAuthorizationContext} object to check
    * @return the {@link AuthorizationDecision} with the respective result
    */
   @Override
   public AuthorizationDecision check(Supplier<Authentication> authenticationSupplier, RequestAuthorizationContext object) {
      Optional<String> accountIdHeader = Optional.ofNullable(object.getRequest().getHeader("ID"));
      Optional<String> accountEmail = Optional.ofNullable(object.getVariables().get("email"));
      Authentication authentication = (Authentication) authenticationSupplier.get();
      String principal = authentication.getPrincipal().toString();

      if (accountEmail.isPresent()) {
         return new AuthorizationDecision(principal.equals(accountEmail.get()));
      }

      int accountId;

      if (accountIdHeader.isPresent()) accountId = accountIdHeader.map(Integer::parseInt).get();
      else accountId = Integer.parseInt(object.getRequest().getQueryString().split("&")[0].split("id=")[1]);

      return new AuthorizationDecision(hasUserId(principal, accountId));
   }

   /**
    * Verify that the requested id is that of the user who made the request
    * @param principal the user who made the request
    * @param userId the requested id
    * @return a boolean with the result
    */
   public boolean hasUserId(String principal, int userId) {
      Optional<AccountEntity> accountEntity = accountService.getAccountByEmail(principal);

      return accountEntity.filter(entity -> Objects.equals(entity.getIdAccount(), userId)).isPresent();

   }
}
