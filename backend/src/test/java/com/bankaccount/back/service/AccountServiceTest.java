package com.bankaccount.back.service;

import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.domain.service.AccountService;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.web.dto.AccountDto;
import com.bankaccount.back.web.dto.PasswordDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("dev")
public class AccountServiceTest {

    @Autowired
    private AccountService accountService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AccountRepository accountRepository;

    @MockBean
    private TransactionRepository transactionRepository;

    private PasswordDto passwordDto;

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

        passwordDto = new PasswordDto(
                1,
                "newTest@test.com",
                "1234567",
                "1234567"

        );

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

    @Test
    @DisplayName("Should update the name of an accountEntity using the repository with the specific id")
    void changeName() throws NotFoundException {
        Mockito.when(accountService.getAccountById(1))
                .thenReturn(Optional.of(AccountEntity.builder().idAccount(1).password(passwordEncoder.encode("1234567")).build()));

        Mockito.doNothing().when(accountRepository).updateName(Mockito.isA(String.class), Mockito.isA(Integer.class));
        Mockito.doNothing().when(transactionRepository).updateTransactionsName(Mockito.isA(Integer.class), Mockito.isA(String.class));
        Mockito.when(accountRepository.idExist(1)).thenReturn(true);

        String accept = accountService.changeName("newTest", passwordDto);
        String reject = accountService.changeName("newError", new PasswordDto(1, "", "", ""));

        Exception exception = assertThrows(Exception.class, () ->
                accountService.changeName("new", new PasswordDto(3, "te", "s", "t")));

        String expectedMessage = "Account not found 3";
        String actualMessage = exception.getMessage();

        assertAll(
                () -> assertThat(accept).isEqualTo("Change name successfully"),
                () -> assertThat(reject).isEqualTo("Invalid password"),
                () -> Mockito.verify(accountRepository, Mockito.times(1)).updateName("newTest", 1),
                () -> Mockito.verify(transactionRepository, Mockito.times(1)).updateTransactionsName(1, "newTest"),
                () -> assertTrue(actualMessage.contentEquals(expectedMessage))
        );
    }

    @Test
    @DisplayName("Should update the password of an accountEntity using the repository with the specific id")
    void changePassword() throws NotFoundException {
        Mockito.when(accountService.getAccountById(1))
                .thenReturn(Optional.of(AccountEntity.builder().idAccount(1).password(passwordEncoder.encode("1234567")).build()));

        Mockito.doNothing().when(accountRepository).updatePassword(Mockito.isA(String.class), Mockito.isA(Integer.class));
        Mockito.when(accountRepository.idExist(1)).thenReturn(true);

        String accept = accountService.changePassword(passwordDto);
        String reject = accountService.changePassword(new PasswordDto(1, "", "", ""));

        Exception exception = assertThrows(Exception.class, () ->
                accountService.changePassword(new PasswordDto(3, "te", "s", "t")));

        String expectedMessage = "Account not found 3";
        String actualMessage = exception.getMessage();

        assertAll(
                () -> assertThat(accept).isEqualTo("Password changed successfully"),
                () -> assertThat(reject).isEqualTo("Invalid old password"),
                () -> Mockito.verify(accountRepository, Mockito.times(1)).updatePassword(Mockito.isA(String.class), Mockito.eq( 1)),
                () -> assertTrue(actualMessage.contentEquals(expectedMessage))
        );
    }

    @Test
    @DisplayName("Should update the email of an accountEntity using the repository with the specific id")
    void changeEmail() throws NotAllowedException, NotFoundException {
        Mockito.when(accountService.getAccountById(1))
                .thenReturn(Optional.of(AccountEntity.builder().idAccount(1).password(passwordEncoder.encode("1234567")).build()));
        Mockito.doNothing().when(accountRepository).updateEmail(Mockito.isA(String.class), Mockito.isA(Integer.class));
        Mockito.when(accountRepository.idExist(1)).thenReturn(true);
        Mockito.when(accountRepository.emailExist("newTest@test.com")).thenReturn(false);
        Mockito.when(accountRepository.emailExist("error@test.com")).thenReturn(true);

        String accept = accountService.changeEmail(passwordDto);
        String reject = accountService.changeEmail(new PasswordDto(1, "newTest@test.com", "", ""));

        NotFoundException accountException = assertThrows(NotFoundException.class, () ->
                accountService.changeEmail(new PasswordDto(3, "te", "s", "t")));

        NotAllowedException emailException = assertThrows(NotAllowedException.class, () ->
                accountService.changeEmail(new PasswordDto(1, "error@test.com", "s", "t")));

        assertAll(
                () -> assertThat(accept).isEqualTo("Change email successfully"),
                () -> assertThat(reject).isEqualTo("Invalid password"),
                () -> Mockito.verify(accountRepository, Mockito.times(1)).updateEmail("newTest@test.com", 1),
                () -> assertTrue(accountException.getMessage().contentEquals("Account not found 3")),
                () -> assertTrue(emailException.getMessage().contentEquals("There is an account with that email address: error@test.com"))
        );
    }
}
