package com.bankaccount.back.service;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.domain.service.TransactionService;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("dev")
public class TransactionServiceTest {

    @Autowired
    private TransactionService transactionService;

    @MockBean
    private TransactionRepository transactionRepository;

    private List<TransactionEntity> transactionEntityList;

    @BeforeEach
    void setUp() {
        TransactionEntity transactionEntity1 = TransactionEntity.builder()
                .idTransaction(564326L)
                .idTransferAccount(312421)
                .receiverName("Maria")
                .transactionAmount(new BigDecimal("87523.45"))
                .transactionTimestamp(LocalDateTime.of(2022, Month.OCTOBER, 12, 13, 12, 0))
                .build();

        TransactionEntity transactionEntity2 = TransactionEntity.builder()
                .idTransaction(87686L)
                .idTransferAccount(312421)
                .receiverName("Maria")
                .transactionAmount(new BigDecimal("7657.75"))
                .transactionTimestamp(LocalDateTime.of(2022, Month.JANUARY, 20, 20, 12, 0))
                .build();

        TransactionEntity transactionEntity3 = TransactionEntity.builder()
                .idTransaction(6546L)
                .idTransferAccount(312421)
                .receiverName("Maria")
                .transactionAmount(new BigDecimal("6546734.76"))
                .transactionType(TransactionType.ONLINE_PAYMENT)
                .transactionTimestamp(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 0))
                .build();

        TransactionEntity transactionEntity4 = TransactionEntity.builder()
                .idTransaction(67582L)
                .idTransferAccount(312421)
                .receiverName("Maria")
                .transactionAmount(new BigDecimal("5464.76"))
                .transactionType(TransactionType.DEPOSIT)
                .transactionTimestamp(LocalDateTime.of(2022, Month.FEBRUARY, 11, 13, 12, 0))
                .build();

        transactionEntityList = Arrays.asList(transactionEntity1, transactionEntity2, transactionEntity3, transactionEntity4);
    }

    @Test
    @DisplayName("Should return one transactionEntity with the specific id using the repository")
    void getTransactionById() {
        Mockito.when(transactionRepository.getTransactionById(6546L))
                .thenReturn(Optional.of(transactionEntityList.get(2)));

        TransactionEntity transactionEntity = transactionService.getTransactionById(6546L).get();

        assertEquals(6546L, transactionEntity.getIdTransaction());
    }

    @Test
    @DisplayName("Should return all transactionEntity with the specific idAccount using the repository")
    void getByIdAccount() {
        Mockito.when(transactionRepository.getByIdAccount(343, 1))
                .thenReturn(Optional.of(new PageImpl<>(
                        List.of(transactionEntityList.get(0), transactionEntityList.get(2), transactionEntityList.get(3)))));

        Page<TransactionEntity> transactionList = transactionService.getByIdAccount(343, 1).get();

        assertAll(
                () -> assertThat(transactionList.getSize()).isEqualTo(3),
                () -> assertEquals(List.of(564326L, 6546L, 67582L), transactionList.stream().map(TransactionEntity::getIdTransaction).toList())
        );
    }

    @Test
    @DisplayName("Should return all transactionEntity with the specific idAccount using the repository")
    void getByIdAccountAndName() {
        Mockito.when(transactionRepository.getByIdAccountAndName(343, "ma", 1))
                .thenReturn(Optional.of(new PageImpl<>(
                        List.of(transactionEntityList.get(1), transactionEntityList.get(2)))));

        Page<TransactionEntity> transactionList = transactionService.getByIdAccountAndName(343, "ma", 1).get();

        assertAll(
                () -> assertThat(transactionList.getSize()).isEqualTo(2),
                () -> assertEquals(List.of(87686L, 6546L), transactionList.stream().map(TransactionEntity::getIdTransaction).toList()),
                () -> assertEquals(List.of("Maria", "Maria"), transactionList.stream().map(TransactionEntity::getReceiverName).toList())
        );
    }


    @Test
    @DisplayName("Should return all transactionEntity with the specific idAccount and year using the repository")
    void getByIdAccountAndYear() {
        Mockito.when(transactionRepository.getByIdAccountAndYear(1, 2021))
                .thenReturn(Collections.singletonList(transactionEntityList.get(1)));

        List<TransactionEntity> transactionList = transactionService.getByIdAccountAndYear(1, 2021);

        assertAll(
                () -> assertThat(transactionList.size()).isEqualTo(1),
                () -> assertEquals(List.of(87686L), transactionList.stream().map(TransactionEntity::getIdTransaction).toList()),
                () -> assertEquals(List.of(312421), transactionList.stream().map(TransactionEntity::getIdTransferAccount).toList()),
                () -> assertEquals(List.of("7657.75"), transactionList.stream().map(transaction -> transaction.getTransactionAmount().toString()).toList()),
                () -> assertEquals(Collections.singletonList(transactionEntityList.get(1).getTransactionTimestamp()), transactionList.stream().map(TransactionEntity::getTransactionTimestamp).toList())
        );
    }
}
