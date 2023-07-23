package com.bankaccount.back.helpers;

import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.domain.service.TransactionTypeService;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.web.dto.TransactionDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.time.Month;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertAll;

@SpringBootTest
@ActiveProfiles("dev")
public class AutomationHelperTest {

    @Autowired
    private AutomationHelper automationHelper;

    @MockBean
    private AutomationRepository automationRepository;

    @MockBean
    private TransactionTypeService transactionTypeService;

    @Test
    @DisplayName("Should receive a list of automationEntities, and check one by one if satisfy the condition to execute the logic")
    void useAutomations() {
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
                .executionTime(LocalDateTime.of(2024, Month.DECEMBER, 11, 13, 12, 0))
                .status(false)
                .build();

        AutomationEntity automationEntity4 = AutomationEntity.builder()
                .idAutomation(76L)
                .idAccount(23)
                .name("For testing")
                .idTransferAccount(12)
                .hoursToNextExecution(4)
                .executionTime(LocalDateTime.of(2024, Month.DECEMBER, 11, 13, 12, 0))
                .status(true)
                .build();

        List<AutomationEntity> automationEntities = List.of(automationEntity1, automationEntity2, automationEntity3, automationEntity4);

        automationHelper.useAutomations(automationEntities);

        assertAll(
                () -> Mockito.verify(transactionTypeService, Mockito.times(2))
                        .saveTransaction(Mockito.isA(TransactionDto.class), Mockito.eq(true)),
                () -> Mockito.verify(automationRepository, Mockito.times(2))
                        .updateExecutionTimeById(Mockito.isA(LocalDateTime.class), Mockito.isA(Long.class)),

                () -> Mockito.verify(automationRepository, Mockito.times(1))
                        .updateExecutionTimeById(LocalDateTime.of(2022, Month.DECEMBER, 11, 17, 12, 0), 43L),
                () -> Mockito.verify(automationRepository, Mockito.times(1))
                        .updateExecutionTimeById(LocalDateTime.of(2022, Month.DECEMBER, 11, 17, 12, 0), 12L)

        );
    }
}
