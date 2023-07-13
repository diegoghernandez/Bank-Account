package com.bankaccount.back.crud;

import com.bankaccount.back.persistence.crud.AutomationCrudRepository;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("dev")
public class AutomationCrudRepositoryTest {

    @Autowired
    private AutomationCrudRepository automationCrudRepository;

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return a automationEntity with a specific id of the data.sql")
    public void findById() {
        AutomationEntity automationEntity = automationCrudRepository.findById(1L).get();

        Optional<AutomationEntity> errorAutomationEntity = automationCrudRepository.findById(453L);

        assertAll(
                () -> assertFalse(errorAutomationEntity.isPresent()),
                () -> assertThat(automationEntity.getIdAutomation()).isEqualTo(1L),
                () -> assertThat(automationEntity.getIdAccount()).isEqualTo(3),
                () -> assertThat(automationEntity.getName()).isEqualTo("Automation"),
                () -> assertThat(automationEntity.getIdTransferAccount()).isEqualTo(43),
                () -> assertThat(automationEntity.getHoursToNextExecution()).isEqualTo(12),
                () -> assertThat(automationEntity.getLastExecution()).isEqualTo(
                        LocalDateTime.of(2023, 10, 9, 20, 10, 12)
                ),
                () -> assertThat(automationEntity.getStatus()).isEqualTo(true)
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return all automationEntity with a specific id of the data.sql")
    public void findByIdAccount() {
        List<AutomationEntity> automationEntityList = automationCrudRepository.findByIdAccount(2);

        List<AutomationEntity> errorAutomationEntity = automationCrudRepository.findByIdAccount(453);

        assertAll(
                () -> assertTrue(errorAutomationEntity.isEmpty()),
                () -> assertEquals(List.of(2L, 3L, 4L, 7L),
                        automationEntityList.stream().map(AutomationEntity::getIdAutomation).toList()),
                () -> assertEquals(List.of(2, 2, 2, 2),
                        automationEntityList.stream().map(AutomationEntity::getIdAccount).toList()),
                () -> assertEquals(List.of("Automation", "Automation", "Automation", "Automation"),
                        automationEntityList.stream().map(AutomationEntity::getName).toList()),
                () -> assertEquals(List.of(43, 43, 43, 43),
                        automationEntityList.stream().map(AutomationEntity::getIdTransferAccount).toList()),
                () -> assertEquals(List.of(12, 32, 2, 62),
                        automationEntityList.stream().map(AutomationEntity::getHoursToNextExecution).toList()),
                () -> assertEquals(List.of(
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12)),
                        automationEntityList.stream().map(AutomationEntity::getLastExecution).toList()),
                () -> assertEquals(List.of(true, true, false, true),
                        automationEntityList.stream().map(AutomationEntity::getStatus).toList())
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return all automationEntity with a specific status of the data.sql")
    public void findByStatus() {
        List<AutomationEntity> automationEntityFalse = automationCrudRepository.findByStatus(false);
        List<AutomationEntity> automationEntityTrue = automationCrudRepository.findByStatus(true);

        assertAll(
                () -> assertEquals(2, automationEntityFalse.size()),
                () -> assertEquals(5, automationEntityTrue.size()),
                () -> assertEquals(List.of(4L, 6L),
                        automationEntityFalse.stream().map(AutomationEntity::getIdAutomation).toList()),
                () -> assertEquals(List.of(2, 3),
                        automationEntityFalse.stream().map(AutomationEntity::getIdAccount).toList()),
                () -> assertEquals(List.of("Automation", "Automation"),
                        automationEntityFalse.stream().map(AutomationEntity::getName).toList()),
                () -> assertEquals(List.of(43, 43),
                        automationEntityFalse.stream().map(AutomationEntity::getIdTransferAccount).toList()),
                () -> assertEquals(List.of(2, 12),
                        automationEntityFalse.stream().map(AutomationEntity::getHoursToNextExecution).toList()),
                () -> assertEquals(List.of(
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12)),
                        automationEntityFalse.stream().map(AutomationEntity::getLastExecution).toList()),
                () -> assertEquals(List.of(false, false),
                        automationEntityFalse.stream().map(AutomationEntity::getStatus).toList())
        );
    }
    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return all automationEntity with a specific id and status of the data.sql")
    public void findByIdAccountAndStatus() {
        List<AutomationEntity> automationEntityList = automationCrudRepository.findByIdAccountAndStatus(3, true);
        List<AutomationEntity> automationEntityListFalse = automationCrudRepository.findByIdAccountAndStatus(3, false);

        assertAll(
                () -> assertEquals(2, automationEntityList.size()),
                () -> assertEquals(1, automationEntityListFalse.size()),
                () -> assertEquals(List.of(1L, 5L),
                        automationEntityList.stream().map(AutomationEntity::getIdAutomation).toList()),
                () -> assertEquals(List.of(3, 3),
                        automationEntityList.stream().map(AutomationEntity::getIdAccount).toList()),
                () -> assertEquals(List.of("Automation", "Automation"),
                        automationEntityList.stream().map(AutomationEntity::getName).toList()),
                () -> assertEquals(List.of(43, 43),
                        automationEntityList.stream().map(AutomationEntity::getIdTransferAccount).toList()),
                () -> assertEquals(List.of(12, 52),
                        automationEntityList.stream().map(AutomationEntity::getHoursToNextExecution).toList()),
                () -> assertEquals(List.of(
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12),
                                LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12)),
                        automationEntityList.stream().map(AutomationEntity::getLastExecution).toList()),
                () -> assertEquals(List.of(true, true),
                        automationEntityList.stream().map(AutomationEntity::getStatus).toList())
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should update the lastExecution date from a specific automationEntity with a specific id of the data.sql")
    public void updateLastExecutionById() {
        LocalDateTime timeStamp = LocalDateTime.now();
        automationCrudRepository.updateLastExecutionById(timeStamp, 1);

        AutomationEntity automationEntity = automationCrudRepository.findById(1L).get();

        assertAll(
                () -> assertThat(automationEntity.getIdAutomation()).isEqualTo(1L),
                () -> assertThat(automationEntity.getIdAccount()).isEqualTo(3),
                () -> assertThat(automationEntity.getName()).isEqualTo("Automation"),
                () -> assertThat(automationEntity.getIdTransferAccount()).isEqualTo(43),
                () -> assertThat(automationEntity.getHoursToNextExecution()).isEqualTo(12),
                () -> assertThat(automationEntity.getLastExecution()).isEqualToIgnoringNanos(timeStamp),
                () -> assertThat(automationEntity.getStatus()).isEqualTo(true)
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should update the status from a specific automationEntity with a specific id of the data.sql")
    public void updateStatusById() {
        automationCrudRepository.updateStatusById(false, 7);

        AutomationEntity automationEntity = automationCrudRepository.findById(7L).get();

        assertAll(
                () -> assertThat(automationEntity.getIdAutomation()).isEqualTo(7L),
                () -> assertThat(automationEntity.getIdAccount()).isEqualTo(2),
                () -> assertThat(automationEntity.getName()).isEqualTo("Automation"),
                () -> assertThat(automationEntity.getIdTransferAccount()).isEqualTo(43),
                () -> assertThat(automationEntity.getHoursToNextExecution()).isEqualTo(62),
                () -> assertThat(automationEntity.getLastExecution()).isEqualTo(
                        LocalDateTime.of(2023, Month.OCTOBER, 9, 20, 10, 12)),
                () -> assertThat(automationEntity.getStatus()).isEqualTo(false)
        );
    }

    @Test
    @DisplayName("Should save an automation in the database")
    public void saveAutomation() {
        LocalDateTime localDateTime = LocalDateTime.now();

        AutomationEntity automationEntity = AutomationEntity.builder()
                .idAccount(32)
                .name("For testing")
                .idTransferAccount(12)
                .hoursToNextExecution(4)
                .lastExecution(localDateTime)
                .status(true)
                .build();

        AutomationEntity saveAutomation = automationCrudRepository.save(automationEntity);

        assertAll(
                () -> assertThat(saveAutomation.getIdAutomation()).isEqualTo(1L),
                () -> assertThat(saveAutomation.getIdAccount()).isEqualTo(automationEntity.getIdAccount()),
                () -> assertThat(saveAutomation.getName()).isEqualTo(automationEntity.getName()),
                () -> assertThat(saveAutomation.getIdTransferAccount()).isEqualTo(automationEntity.getIdTransferAccount()),
                () -> assertThat(saveAutomation.getHoursToNextExecution()).isEqualTo(automationEntity.getHoursToNextExecution()),
                () -> assertThat(saveAutomation.getLastExecution()).isEqualTo(automationEntity.getLastExecution()),
                () -> assertThat(saveAutomation.getStatus()).isEqualTo(automationEntity.getStatus())
        );
    }
}
