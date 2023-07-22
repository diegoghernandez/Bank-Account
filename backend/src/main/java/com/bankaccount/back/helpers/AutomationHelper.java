package com.bankaccount.back.helpers;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.domain.service.TransactionTypeService;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.web.dto.TransactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class AutomationHelper {

    @Autowired
    private AutomationRepository automationRepository;

    @Autowired
    private TransactionTypeService transactionTypeService;

    public void useAutomations(List<AutomationEntity> list) throws Exception {
        for (var automation : list) {
            if (automation.getExecutionTime().isBefore(LocalDateTime.now())) {
                transactionTypeService.saveTransaction(new TransactionDto(
                        automation.getIdAccount(),
                        automation.getIdTransferAccount(),
                        automation.getAmount(),
                        TransactionType.WIRE_TRANSFER), true);

                automationRepository.updateExecutionTimeById(
                        automation.getExecutionTime().plusHours(automation.getHoursToNextExecution()), automation.getIdAutomation());
            }
        }
    }
}
