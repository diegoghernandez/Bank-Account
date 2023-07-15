package com.bankaccount.back.domain.schedule;

import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.helpers.AutomationHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class AutomationSchedule {

    @Autowired
    private AutomationRepository automationRepository;

    @Scheduled(fixedRateString = "PT1H")
    public void executeAutomationHelper() throws Exception {
        AutomationHelper automationHelper = new AutomationHelper();
        automationHelper.useAutomations(automationRepository.getByStatus(true));
    }
}
