package com.bankaccount.back.controller;

import com.bankaccount.back.constants.AccountRoles;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.web.AccountController;
import com.bankaccount.back.web.config.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("dev")
@WebMvcTest(AccountController.class)
public class AccountControllerTest {

   private static final String ADMIN = AccountRoles.ADMIN.toString();

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private AccountService accountService;

   @MockBean
   private JwtUtil jwtUtil;

   private List<AccountEntity> accountEntityList;

   @BeforeEach
   void setUp() {
      AccountEntity accountEntity1 = AccountEntity.builder()
              .idAccount(687452786)
              .accountName("Random634675")
              .email("random@names.com")
              .password("1234567")
              .currentBalance(new BigDecimal("654316.76"))
              .build();

      AccountEntity accountEntity2 = AccountEntity.builder()
              .idAccount(75347)
              .accountName("Random345778")
              .email("user@names.com")
              .password("1234567")
              .currentBalance(new BigDecimal("543256.0"))
              .build();

      accountEntityList = Arrays.asList(accountEntity1, accountEntity2);
   }

   @Test
   @DisplayName("Should return one accountDomain in json format with a specific id using the service or return a not found")
   void getAccountById() {
      Mockito.when(accountService.getAccountById(75347))
              .thenReturn(Optional.of(accountEntityList.get(1)));

      assertAll(
              () -> mockMvc.perform(get("/accounts/id/75347")
                              .contentType(MediaType.APPLICATION_JSON)
                              .with(user("user").roles(ADMIN)))
                      .andExpect(status().isOk())
                      .andExpect(jsonPath("$.idAccount")
                              .value(accountEntityList.get(1).getIdAccount()))
                      .andExpect(jsonPath("$.accountName")
                              .value(accountEntityList.get(1).getAccountName()))
                      .andExpect(jsonPath("$.email")
                              .value(accountEntityList.get(1).getEmail()))
                      .andExpect(jsonPath("$.currentBalance")
                              .value(accountEntityList.get(1).getCurrentBalance().toString())),

              () -> mockMvc.perform(get("/accounts/id/54")
                              .contentType(MediaType.APPLICATION_JSON)
                              .with(user("user").roles(ADMIN)))
                      .andExpect(status().isNotFound()),

              () -> mockMvc.perform(get("/accounts/id/54")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(status().isUnauthorized())
      );
   }

   @Test
   @DisplayName("Should return one accountDomain in json format with a specific email using the service or return a not found")
   void getAccountByEmail() {
      Mockito.when(accountService.getAccountByEmail("random@names.com"))
              .thenReturn(Optional.of(accountEntityList.get(0)));

      assertAll(
              () -> mockMvc.perform(get("/accounts/email/random@names.com")
                              .contentType(MediaType.APPLICATION_JSON)
                              .with(user("user").roles(ADMIN)))
                      .andExpect(status().isOk())
                      .andExpect(jsonPath("$.idAccount")
                              .value(accountEntityList.get(0).getIdAccount()))
                      .andExpect(jsonPath("$.accountName")
                              .value(accountEntityList.get(0).getAccountName()))
                      .andExpect(jsonPath("$.email")
                              .value(accountEntityList.get(0).getEmail()))
                      .andExpect(jsonPath("$.currentBalance")
                              .value(accountEntityList.get(0).getCurrentBalance().toString())),

              () -> mockMvc.perform(get("/accounts/email/ewtewtre@names.com")
                              .contentType(MediaType.APPLICATION_JSON)
                              .with(user("user").roles(ADMIN)))
                      .andExpect(status().isNotFound()),

              () -> mockMvc.perform(get("/accounts/email/ewtewtre@names.com")
                              .contentType(MediaType.APPLICATION_JSON))
                      .andExpect(status().isUnauthorized())
      );
   }
}
