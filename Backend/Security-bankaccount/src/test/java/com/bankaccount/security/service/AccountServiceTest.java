package com.bankaccount.security.service;

import com.bankaccount.security.domain.repository.AccountRepository;
import com.bankaccount.security.domain.service.AccountService;
import com.bankaccount.security.persistence.entity.AccountEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("dev")
class AccountServiceTest {

    @Autowired
    private AccountService accountService;

    @MockBean
    private AccountRepository accountRepository;

    private List<AccountEntity> accountEntityList;

    @BeforeEach
    void setUp() {
        AccountEntity accountEntity1 = AccountEntity.builder()
                .idAccount(687452786l)
                .accountName("Random634675")
                .email("random@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal(654316.76))
                .build();

        AccountEntity accountEntity2 = AccountEntity.builder()
                .idAccount(75347l)
                .accountName("Random345778")
                .email("user@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal(543256.00))
                .build();

        accountEntityList = Arrays.asList(accountEntity1, accountEntity2);
    }

    @Test
    @DisplayName("Should return one accountDomain with the specific email using the repository")
    void getAccountByEmail() {
        Mockito.when(accountRepository.getAccountByEmail("user@names.com"))
                .thenReturn(Optional.of(accountEntityList.get(1)));

        AccountEntity accountDomain = accountService.getAccountByEmail("user@names.com").get();

        assertEquals("user@names.com", accountDomain.getEmail());
    }

    @Test
    @DisplayName("Should pass one accountDomain to repository and return it")
    void saveAccount() throws Exception {
        AccountEntity accountEntity = AccountEntity.builder()
                .idAccount(435456l)
                .accountName("RandomSave")
                .email("saveaccount@names.com")
                .password("452353425")
                .currentBalance(new BigDecimal(4376.65))
                .build();

        Mockito.when(accountRepository.saveAccount(ArgumentMatchers.any())).thenReturn(accountEntity);

        AccountEntity accountSave = accountService.saveAccount(ArgumentMatchers.any());

        assertAll(
                () -> assertEquals(accountEntity.getIdAccount(), accountSave.getIdAccount()),
                () -> assertEquals(accountEntity.getAccountName(), accountSave.getAccountName()),
                () -> assertEquals(accountEntity.getEmail(), accountSave.getEmail()),
                () -> assertEquals(accountEntity.getPassword(), accountSave.getPassword()),
                () -> assertEquals(accountEntity.getCurrentBalance(), accountSave.getCurrentBalance())
        );
    }
}