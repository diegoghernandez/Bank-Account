package com.bankaccount.back.service;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.domain.service.TransactionTypeService;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.TransactionDto;
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
import java.time.LocalDateTime;
import java.time.Month;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("dev")
public class TransactionTypeServiceTest {

    @Autowired
    private TransactionTypeService transactionTypeService;

    @MockBean
    private TransactionRepository transactionRepository;

    @MockBean
    private AccountRepository accountRepository;

    TransactionEntity.TransactionEntityBuilder transactionEntity = TransactionEntity.builder();

    private TransactionDto transactionDto;

    @BeforeEach
    void setUp() {
        AccountEntity account = AccountEntity.builder()
                .idAccount(87658)
                .accountName("Random345778")
                .email("user@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal("20000.00"))
                .build();

        AccountEntity accountTransfer = AccountEntity.builder()
                .idAccount(321)
                .accountName("transfer")
                .email("user@names.com")
                .password("1234567")
                .currentBalance(new BigDecimal("20000.00"))
                .build();

        transactionEntity.idTransaction(1L);
        transactionEntity.idAccount(87658);
        transactionEntity.idTransferAccount(321);
        transactionEntity.receiverName("Random345778");
        transactionEntity.transactionAmount(new BigDecimal("10000.45"));
        transactionEntity.transactionTimestamp(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 0));

        Mockito.when(accountRepository.getAccountById(87658))
                .thenReturn(Optional.of(account));

        Mockito.when(accountRepository.getAccountById(321))
                .thenReturn(Optional.of(account));
    }

    @Test
    @DisplayName("Should throw an NotFoundException if the account doesn't exist")
    void getAccountError() throws Exception {
        TransactionDto transactionAccountError = new TransactionDto(
                432,
                321,
                new BigDecimal("1.11"),
                TransactionType.ONLINE_PAYMENT);

        TransactionDto transactionTransferError = new TransactionDto(
                87658,
                365421,
                new BigDecimal("1.11"),
                TransactionType.ONLINE_PAYMENT);

        Exception exceptionAccount = assertThrows(NotFoundException.class, () ->
                transactionTypeService.saveTransaction(transactionAccountError, false));

        Exception exceptionTransfer = assertThrows(NotFoundException.class, () ->
                transactionTypeService.saveTransaction(transactionTransferError, false));

        String expectedAccountMessage = "Account not found 432";
        String actualAccountMessage = exceptionAccount.getMessage();

        String expectedTransferMessage = "Account to transfer not found 365421";
        String actualTransferMessage = exceptionTransfer.getMessage();

        assertAll(
                () -> assertTrue(actualAccountMessage.contentEquals(expectedAccountMessage)),
                () -> assertTrue(actualTransferMessage.contentEquals(expectedTransferMessage))
        );
    }

    @Test
    @DisplayName("Should throw an exception if the account doesn't have enough money to do the transaction")
    void getBalanceError() throws Exception {
        TransactionDto transactionError = new TransactionDto(
                87658,
                321,
                new BigDecimal("30000.45"),
                TransactionType.ONLINE_PAYMENT);

        Exception exception = assertThrows(Exception.class, () ->
                transactionTypeService.saveTransaction(transactionError, false));

        String expectedMessage = "Not enough balance";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contentEquals(expectedMessage));
    }

    @Test
    @DisplayName("Should convert one transactionDto to transactionEntity with DEPOSIT type and save it into the repository one time, adding the respective amount to the owner")
    void saveDepositTransaction() throws Exception {
        transactionDto = new TransactionDto(
                87658,
                321,
                new BigDecimal("10000.45"),
                TransactionType.DEPOSIT);

        transactionEntity.transactionType(TransactionType.DEPOSIT);

        Mockito.doNothing().when(accountRepository).updateBalance(new BigDecimal("30000.45"), 87658);

        transactionTypeService.saveTransaction(transactionDto, false);

        assertAll(
                () -> Mockito.verify(accountRepository, Mockito.times(1)).updateBalance(new BigDecimal("30000.45"), 87658),
                () -> Mockito.verify(transactionRepository, Mockito.times(1)).saveTransaction(Mockito.any(TransactionEntity.class))
        );
    }

    @Test
    @DisplayName("Should convert one transactionDto to transactionEntity with ONLINE_PAYMENT type and save it into the repository two times, one " +
            "to subtract the amount from the owner, and the second to add it to the receiver")
    void saveOnlinePaymentTransaction() throws Exception {
        transactionDto = new TransactionDto(
                87658,
                321,
                new BigDecimal("10000.45"),
                TransactionType.ONLINE_PAYMENT);

        transactionEntity.transactionType(TransactionType.ONLINE_PAYMENT);

        Mockito.doNothing().when(accountRepository).updateBalance(new BigDecimal("9999.55"), 87658);

        transactionTypeService.saveTransaction(transactionDto, false);

        assertAll(
                () -> Mockito.verify(accountRepository, Mockito.times(1)).updateBalance(new BigDecimal("9999.55"), 87658),
                () -> Mockito.verify(transactionRepository, Mockito.times(2)).saveTransaction(Mockito.any(TransactionEntity.class))
        );
    }

    @Test
    @DisplayName("Should convert one transactionDto to transactionEntity with WIRE_TRANSFER type and save it into the repository two times, one " +
            "to subtract the amount from the owner, and the second to add it to the receiver")
    void saveWireTransferTransaction() throws Exception {
        transactionDto = new TransactionDto(
                87658,
                321,
                new BigDecimal("10000.45"),
                TransactionType.WIRE_TRANSFER);

        transactionEntity.transactionType(TransactionType.WIRE_TRANSFER);

        Mockito.doNothing().when(accountRepository).updateBalance(new BigDecimal("9999.55"), 87658);

        transactionTypeService.saveTransaction(transactionDto, false);

        assertAll(
                () -> Mockito.verify(accountRepository, Mockito.times(1)).updateBalance(new BigDecimal("9999.55"), 87658),
                () -> Mockito.verify(transactionRepository, Mockito.times(2)).saveTransaction(Mockito.any(TransactionEntity.class))
        );
    }
}
