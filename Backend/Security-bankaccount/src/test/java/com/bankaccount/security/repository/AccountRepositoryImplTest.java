package com.bankaccount.security.repository;

import com.bankaccount.security.domain.repository.AccountRepository;
import com.bankaccount.security.persistence.crud.AccountCrudRepository;
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
class AccountRepositoryImplTest {

    @Autowired
    private AccountRepository accountRepository;

    @MockBean
    private AccountCrudRepository accountCrudRepository;

    private List<AccountEntity> accountEntityList;

    @BeforeEach
    void setUp() {
        AccountEntity accountEntity1 = AccountEntity.builder()
                .idAccount(432l)
                .accountName("Random1")
                .email("random@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal(8765.00))
                .build();

        AccountEntity accountEntity2 = AccountEntity.builder()
                .idAccount(958l)
                .accountName("Random2")
                .email("user@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal(65476.00))
                .build();

        accountEntityList = Arrays.asList(accountEntity1, accountEntity2);
    }

    @Test
    @DisplayName("Should return one accountEntity with the specific email of the database and the mapper should transform to accountDomain")
    void getAccountByEmail() {
        Mockito.when(accountCrudRepository.findByEmail("random@names.com"))
                .thenReturn(Optional.of(accountEntityList.get(0)));

        AccountEntity accountDomain = accountRepository.getAccountByEmail("random@names.com").get();

        assertEquals("random@names.com", accountDomain.getEmail());
    }

    @Test
    @DisplayName("Should save one accountEntity in the database and return it with the mapper to accountDomain")
    void saveAccount() {
        AccountEntity accountEntity = AccountEntity.builder()
                .idAccount(435456l)
                .accountName("RandomSave")
                .email("saveaccount@names.com")
                .password("452353425")
                .currentBalance(new BigDecimal(4376.00))
                .build();

        Mockito.when(accountCrudRepository.save(ArgumentMatchers.any())).thenReturn(accountEntity);

        AccountEntity accountSave = accountRepository.saveAccount(accountEntity);

        assertAll(
                () -> assertEquals(accountEntity.getIdAccount(), accountSave.getIdAccount()),
                () -> assertEquals(accountEntity.getAccountName(), accountSave.getAccountName()),
                () -> assertEquals(accountEntity.getEmail(), accountSave.getEmail()),
                () -> assertEquals(accountEntity.getPassword(), accountSave.getPassword()),
                () -> assertEquals(accountEntity.getCurrentBalance(), accountSave.getCurrentBalance())
        );
    }
}