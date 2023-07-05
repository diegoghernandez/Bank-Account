package com.bankaccount.back.crud;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.persistence.crud.TransactionCrudRepository;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("dev")
public class TransactionCrudRepositoryTest {

    @Autowired
    private TransactionCrudRepository transactionCrudRepository;

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return a transactionEntity with a specific id of the data.sql")
    public void findById() {
        TransactionEntity transactionEntity = transactionCrudRepository.findById(3L).get();

        Optional<TransactionEntity> errorTransactionEntity = transactionCrudRepository.findById(453L);

        assertAll(
                () -> assertFalse(errorTransactionEntity.isPresent()),
                () -> assertThat(transactionEntity.getIdTransaction()).isEqualTo(3L),
                () -> assertThat(transactionEntity.getIdAccount()).isEqualTo(1),
                () -> assertThat(transactionEntity.getReceiverName()).isEqualTo("Maria"),
                () -> assertThat(transactionEntity.getTransactionAmount().toString()).isEqualTo("400.00"),
                () -> Assertions.assertThat(transactionEntity.getTransactionType()).isEqualTo(TransactionType.ONLINE_PAYMENT),
                () -> assertThat(transactionEntity.getTransactionTimestamp()).isEqualTo(
                        LocalDateTime.of(2023, 10, 9, 20, 10, 12))
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return all transactionEntities with a specific idAccount of the data.sql")
    void findByIdAccount() {
        PageRequest pageable = PageRequest.of(0, 5);

        Page<TransactionEntity> transactionEntityList = transactionCrudRepository.findByIdAccount(1, pageable);

        Page<TransactionEntity> errorTransactionEntity = transactionCrudRepository.findByIdAccount(453, pageable);

        assertAll(
                () -> assertTrue(errorTransactionEntity.isEmpty()),
                () -> assertThat(transactionEntityList.getTotalPages()).isEqualTo(3),
                () -> assertFalse(transactionEntityList.isLast()),
                () -> assertThat(transactionEntityList.getSize()).isEqualTo(5),
                () -> assertThat(transactionEntityList.getSize()).isEqualTo(5),
                () -> assertThat(transactionEntityList.getTotalElements()).isEqualTo(11),

                () -> assertEquals(List.of(1, 1, 1, 1, 1),
                        transactionEntityList.stream().map(TransactionEntity::getIdAccount).toList()),

                () -> assertEquals(Arrays.asList(2, 2, 2, null, 2),
                        transactionEntityList.stream().map(TransactionEntity::getIdTransferAccount).collect(Collectors.toList())),

                () -> assertEquals(List.of("Maria", "Maria", "Maria", "Pedro", "Luisa"),
                        transactionEntityList.stream().map(TransactionEntity::getReceiverName).toList()),

                () -> assertEquals(List.of("6000.00", "400.00", "300.00", "6000.00", "2000.00"),
                        transactionEntityList.stream().map(transaction -> transaction.getTransactionAmount().toString()).toList()),

                () -> assertEquals(List.of(
                        TransactionType.WIRE_TRANSFER, TransactionType.ONLINE_PAYMENT, TransactionType.ONLINE_PAYMENT, TransactionType.DEPOSIT, TransactionType.WIRE_TRANSFER),
                        transactionEntityList.stream().map(TransactionEntity::getTransactionType).toList()),

                () -> assertEquals(List.of(
                        LocalDateTime.of(2022, Month.OCTOBER, 9, 20, 10, 12),
                        LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                        LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                        LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                        LocalDateTime.of(2022, Month.OCTOBER, 9, 20, 10, 12)),
                        transactionEntityList.stream().map(TransactionEntity::getTransactionTimestamp).toList())
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return all transactionEntities with a specific idAccount of the data.sql")
    void findByIdAccountAndNameContaining() {
        PageRequest pageable = PageRequest.of(0, 5);

        Page<TransactionEntity> transactionEntityList = transactionCrudRepository.findByIdAccountAndReceiverNameContaining(1, "Ma", pageable);

        Page<TransactionEntity> errorTransactionEntity = transactionCrudRepository.findByIdAccountAndReceiverNameContaining(453, "Ma", pageable);

        assertAll(
                () -> assertTrue(errorTransactionEntity.isEmpty()),
                () -> assertThat(transactionEntityList.getTotalPages()).isEqualTo(2),
                () -> assertFalse(transactionEntityList.isLast()),
                () -> assertThat(transactionEntityList.getSize()).isEqualTo(5),
                () -> assertThat(transactionEntityList.getNumberOfElements()).isEqualTo(5),
                () -> assertThat(transactionEntityList.getTotalElements()).isEqualTo(6L),

                () -> assertEquals(List.of(1, 1, 1, 1, 1),
                        transactionEntityList.stream().map(TransactionEntity::getIdAccount).toList()),

                () -> assertEquals(List.of(2, 2, 2, 2, 2),
                        transactionEntityList.stream().map(TransactionEntity::getIdTransferAccount).toList()),

                () -> assertEquals(List.of("Maria", "Maria", "Maria", "Maria", "Maria"),
                        transactionEntityList.stream().map(TransactionEntity::getReceiverName).toList()),

                () -> assertEquals(List.of("6000.00", "400.00", "300.00", "400.00", "400.00"),
                        transactionEntityList.stream().map(transaction -> transaction.getTransactionAmount().toString()).toList()),

                () -> assertEquals(List.of(
                                TransactionType.WIRE_TRANSFER, TransactionType.ONLINE_PAYMENT, TransactionType.ONLINE_PAYMENT, TransactionType.ONLINE_PAYMENT, TransactionType.ONLINE_PAYMENT),
                        transactionEntityList.stream().map(TransactionEntity::getTransactionType).toList()),

                () -> assertEquals(List.of(
                                LocalDateTime.of(2022, Month.OCTOBER, 9, 20, 10, 12),
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                                LocalDateTime.of(2022, Month.OCTOBER, 9, 20, 10, 12),
                                LocalDateTime.of(2022, Month.OCTOBER, 9, 20, 10, 12)),
                        transactionEntityList.stream().map(TransactionEntity::getTransactionTimestamp).toList())
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return all transactionEntities by idAccount by year in the data.sql")
    void findByIdAccountAndTransactionTimestampBetween() {
        LocalDateTime startTime = LocalDateTime.of(2023, Month.JANUARY, 10, 20, 10, 0);
        LocalDateTime endTime = LocalDateTime.of(2024, Month.JANUARY, 10, 20, 10, 0);

        PageRequest pageable = PageRequest.of(0, 5);

        List<TransactionEntity> transactionEntityList = transactionCrudRepository.findByIdAccountAndTransactionTimestampBetween(
                1, startTime, endTime);


        List<TransactionEntity> errorTransactionEntity = transactionCrudRepository.findByIdAccountAndTransactionTimestampBetween(3243,
                LocalDateTime.of(2026, Month.OCTOBER, 9, 20, 10, 0),
                LocalDateTime.of(2026, Month.OCTOBER, 9, 20, 10, 0));

        assertAll(
                () -> assertTrue(errorTransactionEntity.isEmpty()),
                () -> assertThat(transactionEntityList.size()).isEqualTo(3),
                () -> assertEquals(List.of(1, 1, 1), transactionEntityList.stream().map(TransactionEntity::getIdAccount).toList()),
                () -> assertEquals(Arrays.asList(2, 2, null), transactionEntityList.stream().map(TransactionEntity::getIdTransferAccount).collect(Collectors.toList())),
                () -> assertEquals(List.of("Maria", "Maria", "Pedro"), transactionEntityList.stream().map(TransactionEntity::getReceiverName).toList()),
                () -> assertEquals(List.of("400.00", "300.00", "6000.00"), transactionEntityList.stream().map(transaction -> transaction.getTransactionAmount().toString()).toList()),
                () -> assertEquals(List.of(TransactionType.ONLINE_PAYMENT, TransactionType.ONLINE_PAYMENT, TransactionType.DEPOSIT),
                        transactionEntityList.stream().map(TransactionEntity::getTransactionType).toList()),
                () -> assertTrue(transactionEntityList.stream().map((transaction) ->
                        transaction.getTransactionTimestamp().getYear()).allMatch((year) -> year == 2023))
        );
    }

    @Test
    @DisplayName("Should save a transaction in the database")
    public void saveAccount() {
        TransactionEntity transactionEntity = TransactionEntity.builder()
                .idAccount(5)
                .idTransferAccount(2)
                .receiverName("User1")
                .transactionAmount(new BigDecimal("333.12"))
                .transactionType(TransactionType.DEPOSIT)
                .build();

        TransactionEntity transactionSave = transactionCrudRepository.save(transactionEntity);

        assertAll(
                () -> assertEquals(transactionEntity.getIdAccount(), transactionSave.getIdAccount()),
                () -> assertEquals(transactionEntity.getIdTransferAccount(), transactionSave.getIdTransferAccount()),
                () -> assertEquals(transactionEntity.getTransactionAmount(), transactionSave.getTransactionAmount()),
                () -> org.junit.jupiter.api.Assertions.assertEquals(transactionEntity.getTransactionType(), transactionSave.getTransactionType()),
                () -> assertTrue(transactionSave.getTransactionTimestamp().isBefore(LocalDateTime.now()))
        );
    }
}
