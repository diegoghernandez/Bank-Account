package com.bankaccount.back.repository;

import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.persistence.crud.TransactionCrudRepository;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("dev")
public class TransactionRepositoryImplTest {

    @Autowired
    private TransactionRepository transactionRepository;

    @MockBean
    private TransactionCrudRepository transactionCrudRepository;

    private List<TransactionEntity> transactionEntityList;

    @BeforeEach
    void setUp() {
        TransactionEntity transactionEntity1 = TransactionEntity.builder()
                .idTransaction(432L)
                .idAccount(343)
                .idTransferAccount(4324)
                .receiverName("Maria")
                .transactionAmount(new BigDecimal("87523.45"))
                .transactionTimestamp(LocalDateTime.of(2022, Month.OCTOBER, 12, 13, 12, 0))
                .build();

        TransactionEntity transactionEntity2 = TransactionEntity.builder()
                .idTransaction(342L)
                .idAccount(343)
                .idTransferAccount(4324)
                .receiverName("Maria")
                .transactionAmount(new BigDecimal("7657.75"))
                .transactionTimestamp(LocalDateTime.of(2022, Month.JANUARY, 20, 20, 12, 12))
                .build();

        TransactionEntity transactionEntity3 = TransactionEntity.builder()
                .idTransaction(6546L)
                .idAccount(84)
                .idTransferAccount(4324)
                .receiverName("Maria")
                .transactionAmount(new BigDecimal("6546734.76"))
                .transactionTimestamp(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 0))
                .build();

        transactionEntityList = Arrays.asList(transactionEntity1, transactionEntity2, transactionEntity3);
    }

    @Test
    @DisplayName("Should return one transactionEntity with the specific id of the database")
    void getTransactionById() {
        Mockito.when(transactionCrudRepository.findById(6546L))
                .thenReturn(Optional.of(transactionEntityList.get(2)));

        TransactionEntity transactionEntity = transactionRepository.getTransactionById(6546L).get();

        assertEquals(6546L, transactionEntity.getIdTransaction());
    }

    @Test
    @DisplayName("Should return all transactionEntities with the specific idAccount of the database")
    void getByIdAccount() {
        PageRequest pageable = PageRequest.of(0, 10);
        Mockito.when(transactionCrudRepository.findByIdAccount(343, pageable))
                .thenReturn(new PageImpl<>(List.of(transactionEntityList.get(0), transactionEntityList.get(1))));

        Page<TransactionEntity> transactionList = transactionRepository.getByIdAccount(343, 0).get();

        assertEquals(Arrays.asList(432L, 342L), transactionList.stream().map(TransactionEntity::getIdTransaction).toList());
    }

    @Test
    @DisplayName("Should return all transactionEntities with the specific idAccount and name of the database")
    void getByIdAccountAndName() {
        PageRequest pageable = PageRequest.of(0, 10);
        Mockito.when(transactionCrudRepository.findByIdAccountAndReceiverNameContainingIgnoreCase(343, "ma", pageable))
                .thenReturn(new PageImpl<>(List.of(transactionEntityList.get(0), transactionEntityList.get(1))));

        Page<TransactionEntity> transactionList = transactionRepository.getByIdAccountAndName(343, "ma", 0).get();

        assertAll(
                () -> assertEquals(List.of(432L, 342L), transactionList.stream().map(TransactionEntity::getIdTransaction).toList()),
                () -> assertEquals(List.of("Maria", "Maria"),
                        transactionList.stream().map(TransactionEntity::getReceiverName).toList())
        );
    }

    @Test
    @DisplayName("Should return all transactionEntities of the database with the specific idAccount and year of the database")
    void getByIdAccountAndDateAndName() {
        PageRequest pageable = PageRequest.of(0, 10);
        LocalDateTime startTime = LocalDateTime.of(2022, Month.JANUARY, 1, 0, 0, 0);
        LocalDateTime endTime = LocalDateTime.of(2022, Month.JANUARY, 31, 0, 0, 0);

        Mockito.when(transactionCrudRepository.findByIdAccountAndTransactionTimestampBetweenAndReceiverNameContainingIgnoreCase(
                343, startTime, endTime, "ma", pageable))
                .thenReturn(new PageImpl<>(Collections.singletonList(transactionEntityList.get(1))));

        Page<TransactionEntity> transactionList = transactionRepository.getByIdAccountAndDateAndName(343, 2022, Optional.of(Month.JANUARY), "ma", 0).get();

        assertAll(
                () -> assertThat(transactionList.getSize()).isEqualTo(1),
                () -> assertEquals(List.of(343), transactionList.stream().map(TransactionEntity::getIdAccount).toList()),
                () -> assertEquals(List.of(342L), transactionList.stream().map(TransactionEntity::getIdTransaction).toList()),
                () -> assertEquals(List.of("Maria"), transactionList.stream().map(TransactionEntity::getReceiverName).toList()),
                () -> assertEquals(List.of("7657.75"), transactionList.stream().map(transaction -> transaction.getTransactionAmount().toString()).toList()),
                () -> assertEquals(Collections.singletonList(transactionEntityList.get(1).getTransactionTimestamp()), transactionList.stream().map(TransactionEntity::getTransactionTimestamp).toList())
        );
    }

    @Test
    @DisplayName("Should save one transactionEntity in the database and return it")
    void saveTransaction() {
        TransactionEntity transactionEntity = TransactionEntity.builder()
                .idTransaction(87658L)
                .idAccount(34654363)
                .transactionAmount(new BigDecimal("6545643.45"))
                .transactionTimestamp(LocalDateTime.of(2065, Month.OCTOBER, 12, 13, 12, 0))
                .build();

        Mockito.when(transactionCrudRepository.save(ArgumentMatchers.any())).thenReturn(transactionEntity);

        TransactionEntity transactionSave = transactionRepository.saveTransaction(transactionEntity);

        assertAll(
                () -> assertEquals(transactionEntity.getIdTransaction(), transactionSave.getIdTransaction()),
                () -> assertEquals(transactionEntity.getTransactionAmount(), transactionSave.getTransactionAmount()),
                () -> assertEquals(transactionEntity.getTransactionTimestamp(), transactionSave.getTransactionTimestamp())
        );
    }

    @Test
    @DisplayName("Should update all receiverNames in the database with the specific id")
    void updateTransactionsName() {
        Mockito.doNothing().when(transactionCrudRepository).updateNameByIdAccount(Mockito.isA(Integer.class), Mockito.isA(String.class));
        Mockito.doNothing().when(transactionCrudRepository).updateNameByIdTransferAccount(Mockito.isA(Integer.class), Mockito.isA(String.class));

        transactionRepository.updateTransactionsName(1, "newPAss");

        assertAll(
                () -> Mockito.verify(transactionCrudRepository, Mockito.times(1)).updateNameByIdAccount(1, "newPAss"),
                () -> Mockito.verify(transactionCrudRepository, Mockito.times(1)).updateNameByIdTransferAccount(1, "newPAss")
        );
    }
}
