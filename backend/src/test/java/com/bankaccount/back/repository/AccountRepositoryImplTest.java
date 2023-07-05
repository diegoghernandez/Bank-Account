package com.bankaccount.back.repository;

import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.persistence.crud.AccountCrudRepository;
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
public class AccountRepositoryImplTest {

    @Autowired
    private AccountRepository accountRepository;

    @MockBean
    private AccountCrudRepository accountCrudRepository;

    private List<AccountEntity> accountEntityList;

    @BeforeEach
    void setUp() {
        AccountEntity accountEntity1 = AccountEntity.builder()
                .idAccount(432)
                .accountName("Random1")
                .email("random@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal("8765.00"))
                .build();

        AccountEntity accountEntity2 = AccountEntity.builder()
                .idAccount(958)
                .accountName("Random2")
                .email("user@names.com")
                .currentBalance(new BigDecimal("65476.00"))
                .password("1234567")
                .build();

        accountEntityList = Arrays.asList(accountEntity1, accountEntity2);
    }

    @Test
    @DisplayName("Should return one accountEntity with the specific id of the database and the mapper should transform to accountDomain")
    void getAccountById() {
        Mockito.when(accountCrudRepository.findById(958))
                .thenReturn(Optional.of(accountEntityList.get(1)));

        AccountEntity accountEntity = accountRepository.getAccountById(958).get();

        assertEquals(958, accountEntity.getIdAccount());
    }

    @Test
    @DisplayName("Should return one accountEntity with the specific email of the database and the mapper should transform to accountDomain")
    void getAccountByEmail() {
        Mockito.when(accountCrudRepository.findByEmail("random@names.com"))
                .thenReturn(Optional.of(accountEntityList.get(0)));

        AccountEntity accountEntity = accountRepository.getAccountByEmail("random@names.com").get();

        assertEquals("random@names.com", accountEntity.getEmail());
    }

    @Test
    @DisplayName("Should update the balance of a accountEntity in the database with the specific id")
    void updateBalance() {
        Mockito.doNothing().when(accountCrudRepository).updateBalanceById(Mockito.isA(BigDecimal.class), Mockito.isA(Integer.class));

        accountRepository.updateBalance(new BigDecimal(535435), 1);

        Mockito.verify(accountCrudRepository, Mockito.times(1)).updateBalanceById(new BigDecimal(535435), 1);
    }
}
