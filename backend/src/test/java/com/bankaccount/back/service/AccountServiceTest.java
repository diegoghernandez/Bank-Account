package com.bankaccount.back.service;

import com.bankaccount.back.domain.AccountDomain;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.web.dto.AccountDto;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
    @DisplayName("Should return one accountEntity with the specific id using the repository")
    void getAccountById() {
        Mockito.when(accountRepository.getAccountById(687452786))
                .thenReturn(Optional.of(accountEntityList.get(0)));

        AccountEntity accountEntity = accountService.getAccountById(687452786).get();

        assertEquals(687452786, accountEntity.getIdAccount());
    }

    @Test
    @DisplayName("Should return one accountEntity with the specific email using the repository")
    void getAccountByEmail() {
        Mockito.when(accountRepository.getAccountByEmail("user@names.com"))
                .thenReturn(Optional.of(accountEntityList.get(1)));

        AccountEntity accountEntity = accountService.getAccountByEmail("user@names.com").get();

        assertEquals("user@names.com", accountEntity.getEmail());
    }

    @Test
    @DisplayName("Should convert one accountDto to accountEntity to send to the repository and return it")
    public void saveAutomation() throws NotAllowedException {
        AccountDto accountDto = new AccountDto(
                "Random634675",
                "1234567",
                "1234567",
                "random@names.com"
        );

        AccountEntity accountEntity = AccountEntity.builder()
                .idAccount(687452786)
                .accountName("Random634675")
                .email("random@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal("654316.76"))
                .build();

        Mockito.when(accountRepository.saveAccount(ArgumentMatchers.any())).thenReturn(accountEntity);

        AccountEntity accountSave = accountService.saveAccount(accountDto);

        assertAll(
                () -> assertThat(accountSave.getAccountName()).isEqualTo(accountDto.name()),
                () -> assertThat(accountSave.getPassword()).isEqualTo(accountDto.password()),
                () -> assertThat(accountSave.getEmail()).isEqualTo(accountDto.email())
        );
    }
}
