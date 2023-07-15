package com.bankaccount.back.schedule;

import com.bankaccount.back.domain.schedule.AutomationSchedule;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.ActiveProfiles;

import java.time.Duration;

import static org.awaitility.Awaitility.await;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringBootTest
@ActiveProfiles("dev")
class AutomationScheduleTest {

    @SpyBean
    private AutomationSchedule automationSchedule;

    @Test
    void executeAutomationHelper() {
        await().atMost(Duration.ofHours(1))
                .untilAsserted(() -> verify(automationSchedule, times(1)).executeAutomationHelper());
    }
}