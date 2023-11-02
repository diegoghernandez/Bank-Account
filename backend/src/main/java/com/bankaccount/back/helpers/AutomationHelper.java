package com.bankaccount.back.helpers;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.domain.service.TransactionTypeService;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.web.dto.TransactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

/**
 * Class in charge of execute the active automations
 */
@Component
public class AutomationHelper {

   @Autowired
   private AutomationRepository automationRepository;

   @Autowired
   private TransactionTypeService transactionTypeService;

   /**
    * Check every automation to know if is time to execute it,
    * otherwise if either ran out of money or the accounts don't exist,
    * the automation will be disabled
    * @param list the value to start a loop
    */
   public void useAutomations(List<AutomationEntity> list) {
      for (var automation : list) {
         if (automation.getExecutionTime().isBefore(LocalDateTime.now())) {
            try {
               transactionTypeService.saveTransaction(new TransactionDto(
                       automation.getIdAccount(),
                       automation.getIdTransferAccount(),
                       automation.getAmount(),
                       TransactionType.WIRE_TRANSFER), true, Locale.getDefault());

               automationRepository.updateExecutionTimeById(
                       automation.getExecutionTime().plusHours(automation.getHoursToNextExecution()), automation.getIdAutomation());
            } catch (NotAllowedException | NotFoundException e) {
               automationRepository.updateStatusById(false, automation.getIdAutomation());
            }
         }
      }
   }
}
