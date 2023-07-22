package com.bankaccount.back.domain.service;

import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.helpers.AutomationHelper;
import com.bankaccount.back.web.dto.AutomationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AutomationService {

    @Autowired
    private AutomationRepository automationRepository;

    @Autowired
    private AutomationHelper automationHelper;

    public Optional<AutomationEntity> getAutomationById(long id) {
        return automationRepository.getAutomationById(id);
    }

    public List<AutomationEntity> getByIdAccount(int idAccount) throws Exception {
        automationHelper.useAutomations(automationRepository.getByIdAccountAndStatus(idAccount, true));

        return automationRepository.getByIdAccount(idAccount);
    }

    public void updateStatusById(boolean status, long id) {
        automationRepository.updateStatusById(status, id);
    }

    public AutomationEntity saveAutomation(AutomationDto automationDto) {
        LocalDateTime localDateTime = LocalDateTime.now().plusHours(automationDto.hoursToNextExecution());


        AutomationEntity automationEntity = AutomationEntity.builder()
                .idAccount(automationDto.idAccount())
                .name(automationDto.name())
                .amount(automationDto.amount())
                .idTransferAccount(automationDto.idTransferAccount())
                .hoursToNextExecution(automationDto.hoursToNextExecution())
                .executionTime(localDateTime)
                .status(true)
                .build();

        return automationRepository.saveAutomation(automationEntity);
    }
}
