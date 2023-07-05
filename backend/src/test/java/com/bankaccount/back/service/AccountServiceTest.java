package com.bankaccount.back.service;

import com.bankaccount.back.domain.AccountDomain;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.persistence.entity.AccountEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("dev")
public class AccountServiceTest {

    @Autowired
    private AccountService accountService;

    @MockBean
    private AccountRepository accountRepository;

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
                .currentBalance(new BigDecimal("543256.00"))
                .build();

        accountEntityList = Arrays.asList(accountEntity1, accountEntity2);
    }

    @Test
    @DisplayName("Should return one accountDomain with the specific id' using the repository")
    void getAccountById() {
        Mockito.when(accountRepository.getAccountById(687452786))
                .thenReturn(Optional.of(accountEntityList.get(0)));

        AccountEntity accountEntity = accountService.getAccountById(687452786).get();

        assertEquals(687452786, accountEntity.getIdAccount());
    }

    @Test
    @DisplayName("Should return one accountDomain with the specific email using the repository")
    void getAccountByEmail() {
        Mockito.when(accountRepository.getAccountByEmail("user@names.com"))
                .thenReturn(Optional.of(accountEntityList.get(1)));

        AccountEntity accountEntity = accountService.getAccountByEmail("user@names.com").get();

        assertEquals("user@names.com", accountEntity.getEmail());
    }
}
