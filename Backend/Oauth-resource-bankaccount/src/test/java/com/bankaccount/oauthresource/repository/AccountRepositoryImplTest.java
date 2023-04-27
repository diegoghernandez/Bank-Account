package com.bankaccount.oauthresource.repository;

import com.bankaccount.oauthresource.domain.AccountDomain;
import com.bankaccount.oauthresource.domain.repository.AccountRepository;
import com.bankaccount.oauthresource.persistence.crud.AccountCrudRepository;
import com.bankaccount.oauthresource.persistence.entity.AccountEntity;
import com.bankaccount.oauthresource.persistence.mapper.AccountMapper;
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

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("dev")
class AccountRepositoryImplTest {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountMapper accountMapper;

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
    @DisplayName("Should return one accountEntity with the specific id of the database and the mapper should transform to accountDomain")
    void getAccountById() {
        Mockito.when(accountCrudRepository.findById(958l))
                .thenReturn(Optional.of(accountEntityList.get(1)));

        AccountDomain accountDomain = accountRepository.getAccountById(958l).get();

        assertEquals(958l, accountDomain.getIdAccount());
    }

    @Test
    @DisplayName("Should return one accountEntity with the specific email of the database and the mapper should transform to accountDomain")
    void getAccountByEmail() {
        Mockito.when(accountCrudRepository.findByEmail("random@names.com"))
                .thenReturn(Optional.of(accountEntityList.get(0)));

        AccountDomain accountDomain = accountRepository.getAccountByEmail("random@names.com").get();

        assertEquals("random@names.com", accountDomain.getEmail());
    }

    @Test
    @DisplayName("Should update the balance of a accountEntity in the database with the specific id")
    void updateBalance() {
        Mockito.doNothing().when(accountCrudRepository).updateBalanceById(Mockito.isA(BigDecimal.class), Mockito.isA(Long.class));

        accountRepository.updateBalance(new BigDecimal(535435), 1l);

        Mockito.verify(accountCrudRepository, Mockito.times(1)).updateBalanceById(new BigDecimal(535435), 1l);
    }
}