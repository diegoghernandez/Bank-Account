package com.bankaccount.security.web;

import com.bankaccount.security.model.AccountModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.annotation.RegisteredOAuth2AuthorizedClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import static org.springframework.security.oauth2.client.web.reactive.function.client.ServletOAuth2AuthorizedClientExchangeFilterFunction.oauth2AuthorizedClient;

@RestController
@RequestMapping("/api/accounts")
public class AccountWebClient {

    @Autowired
    private WebClient webClient;

    @GetMapping("/id/{id}")
    public ResponseEntity<AccountModel> getAccountById(@PathVariable long id,
            @RegisteredOAuth2AuthorizedClient("api-client-authorization-code")
            OAuth2AuthorizedClient client){
        return this.webClient
                .get()
                .uri("http://127.0.0.1:8090/api/accounts/id/{id}", id)
                .attributes(oauth2AuthorizedClient(client))
                .retrieve()
                .toEntity(AccountModel.class)
                .block();
    }
}
