package com.bankaccount.back.domain.schedule;

import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.helpers.AutomationHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

/**
 * Automation schedule is in charge of execute periodically
 * the desire methods for Automation
 */
@Configuration
@EnableScheduling
public class AutomationSchedule {

   @Autowired
   private AutomationRepository automationRepository;

   @Autowired
   private AutomationHelper automationHelper;

   /**
    * Execute each hour the useAutomations method
    */
   @Scheduled(fixedRateString = "PT1H")
   public void executeAutomationHelper() {
      automationHelper.useAutomations(automationRepository.getByStatus(true));
   }
}
