package com.bankaccount.back.repository;

import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.persistence.crud.AutomationCrudRepository;
import com.bankaccount.back.persistence.entity.AutomationEntity;
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
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("dev")
public class AutomationRepositoryImplTest {

   @Autowired
   private AutomationRepository automationRepository;

   @MockBean
   private AutomationCrudRepository automationCrudRepository;

   private List<AutomationEntity> automationEntityList;

   @BeforeEach
   void setUp() {
      AutomationEntity automationEntity1 = AutomationEntity.builder()
              .idAutomation(43L)
              .idAccount(32)
              .name("For testing")
              .idTransferAccount(12)
              .hoursToNextExecution(4)
              .executionTime(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 0))
              .status(true)
              .build();

      AutomationEntity automationEntity2 = AutomationEntity.builder()
              .idAutomation(12L)
              .idAccount(32)
              .name("For testing")
              .idTransferAccount(12)
              .hoursToNextExecution(4)
              .executionTime(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 0))
              .status(false)
              .build();

      AutomationEntity automationEntity3 = AutomationEntity.builder()
              .idAutomation(23L)
              .idAccount(32)
              .name("For testing")
              .idTransferAccount(12)
              .hoursToNextExecution(4)
              .executionTime(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 0))
              .status(false)
              .build();

      AutomationEntity automationEntity4 = AutomationEntity.builder()
              .idAutomation(76L)
              .idAccount(23)
              .name("For testing")
              .idTransferAccount(12)
              .hoursToNextExecution(4)
              .executionTime(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 0))
              .status(true)
              .build();

      automationEntityList = List.of(automationEntity1, automationEntity2, automationEntity3, automationEntity4);
   }

   @Test
   @DisplayName("Should return one automationEntity with the specific id of the database")
   void getAutomationById() {
      Mockito.when(automationCrudRepository.findById(23L))
              .thenReturn(Optional.of(automationEntityList.get(2)));

      AutomationEntity automationEntity = automationRepository.getAutomationById(23L).get();

      assertEquals(23L, automationEntity.getIdAutomation());
   }

   @Test
   @DisplayName("Should return all automationEntity with the specific idAccount of the database")
   void getByIdAccount() {
      Mockito.when(automationCrudRepository.findByIdAccount(32))
              .thenReturn(List.of(automationEntityList.get(0), automationEntityList.get(1), automationEntityList.get(2)));

      List<AutomationEntity> automationEntityByAccount = automationRepository.getByIdAccount(32);

      assertAll(
              () -> assertThat(automationEntityByAccount.size()).isEqualTo(3),
              () -> assertEquals(List.of(43L, 12L, 23L), automationEntityByAccount.stream().map(AutomationEntity::getIdAutomation).toList()),
              () -> assertEquals(List.of(32, 32, 32), automationEntityByAccount.stream().map(AutomationEntity::getIdAccount).toList())
      );
   }

   @Test
   @DisplayName("Should return all automationEntity by status of the database")
   void getByStatus() {
      Mockito.when(automationCrudRepository.findByStatus(true))
              .thenReturn(List.of(automationEntityList.get(0), automationEntityList.get(3)));

      Mockito.when(automationCrudRepository.findByStatus(false))
              .thenReturn(List.of(automationEntityList.get(1), automationEntityList.get(2)));

      List<AutomationEntity> automationEntityTrue = automationRepository.getByStatus(true);
      List<AutomationEntity> automationEntityFalse = automationRepository.getByStatus(false);

      assertAll(
              () -> assertThat(automationEntityTrue.size()).isEqualTo(2),
              () -> assertThat(automationEntityFalse.size()).isEqualTo(2),
              () -> assertEquals(List.of(43L, 76L), automationEntityTrue.stream().map(AutomationEntity::getIdAutomation).toList()),
              () -> assertEquals(List.of(true, true), automationEntityTrue.stream().map(AutomationEntity::getStatus).toList()),
              () -> assertEquals(List.of(12L, 23L), automationEntityFalse.stream().map(AutomationEntity::getIdAutomation).toList()),
              () -> assertEquals(List.of(false, false), automationEntityFalse.stream().map(AutomationEntity::getStatus).toList())
      );
   }

   @Test
   @DisplayName("Should return all automationEntity by idAccount and status of the database")
   void getByIdAccountAndStatus() {
      Mockito.when(automationCrudRepository.findByIdAccountAndStatus(32, false))
              .thenReturn(List.of(automationEntityList.get(1), automationEntityList.get(2)));

      List<AutomationEntity> automationEntities = automationRepository.getByIdAccountAndStatus(32, false);

      assertAll(
              () -> assertThat(automationEntities.size()).isEqualTo(2),
              () -> assertEquals(List.of(12L, 23L), automationEntities.stream().map(AutomationEntity::getIdAutomation).toList()),
              () -> assertEquals(List.of(32, 32), automationEntities.stream().map(AutomationEntity::getIdAccount).toList()),
              () -> assertEquals(List.of(false, false), automationEntities.stream().map(AutomationEntity::getStatus).toList())
      );
   }

   @Test
   @DisplayName("Should save one automationEntity in the database and return it")
   void saveAutomation() {
      AutomationEntity automationEntity = AutomationEntity.builder()
              .idAutomation(3123L)
              .idAccount(54)
              .name("For testing")
              .amount(new BigDecimal("4324.43"))
              .idTransferAccount(321)
              .hoursToNextExecution(213)
              .executionTime(LocalDateTime.of(2023, Month.DECEMBER, 11, 13, 12, 0))
              .status(true)
              .build();

      Mockito.when(automationCrudRepository.save(ArgumentMatchers.any())).thenReturn(automationEntity);

      automationRepository.saveAutomation(automationEntity);

      assertAll(
              () -> Mockito.verify(automationCrudRepository, Mockito.times(1)).save(automationEntity)
      );
   }

   @Test
   @DisplayName("Should update the executionTime of an automationEntity by id in the database")
   void updateExecutionTimeById() {
      LocalDateTime time = LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 0);

      Mockito.doNothing().when(automationCrudRepository).updateExecutionTimeById(Mockito.isA(LocalDateTime.class), Mockito.isA(Long.class));

      automationRepository.updateExecutionTimeById(time, 76L);

      Mockito.verify(automationCrudRepository, Mockito.times(1)).updateExecutionTimeById(time, 76L);
   }

   @Test
   @DisplayName("Should update the status of an automationEntity by id in the database")
   void updateStatusById() {
      Mockito.doNothing().when(automationCrudRepository).updateStatusById(Mockito.isA(Boolean.class), Mockito.isA(Long.class));

      automationRepository.updateStatusById(false, 76L);

      Mockito.verify(automationCrudRepository, Mockito.times(1)).updateStatusById(false, 76L);
   }

   @Test
   @DisplayName("Should delete an automationEntity by id in the database")
   void deleteById() {
      Mockito.doNothing().when(automationCrudRepository).deleteById(Mockito.isA(Long.class));

      automationRepository.deleteById(76L);

      Mockito.verify(automationCrudRepository, Mockito.times(1)).deleteById(76L);
   }
}

