package com.bankaccount.back.domain.service;

import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.helpers.AutomationHelper;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.AutomationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class AutomationService {

   @Autowired
   private AutomationRepository automationRepository;

   @Autowired
   private AutomationHelper automationHelper;

   @Autowired
   private AccountRepository accountRepository;

   public Optional<AutomationEntity> getAutomationById(long id) {
      return automationRepository.getAutomationById(id);
   }

   public List<AutomationEntity> getByIdAccount(int idAccount) {
      automationHelper.useAutomations(automationRepository.getByIdAccountAndStatus(idAccount, true));

      return automationRepository.getByIdAccount(idAccount);
   }

   public void saveAutomation(AutomationDto automationDto, Locale locale) throws NotFoundException {
      Optional<AccountEntity> isAccount = accountRepository.getAccountById(automationDto.idAccount());
      Optional<AccountEntity> isAccountTransfer = accountRepository.getAccountById(automationDto.idTransferAccount());

      if (isAccount.isEmpty() || isAccountTransfer.isEmpty()) throw new NotFoundException("account.error", locale);

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

      automationRepository.saveAutomation(automationEntity);
   }

   public void updateAutomation(AutomationEntity automationEntity, Locale locale) throws NotFoundException {
      if (!automationRepository.existsById(automationEntity.getIdAutomation()))
         throw new NotFoundException("service.automation.error.automation", locale);
      else if (!accountRepository.idExist(automationEntity.getIdAccount()) || !accountRepository.idExist(automationEntity.getIdTransferAccount()))
         throw new NotFoundException("account.error", locale);

      AutomationEntity automationBuilder = AutomationEntity.builder()
              .idAutomation(automationEntity.getIdAutomation())
              .idAccount(automationEntity.getIdAccount())
              .name(automationEntity.getName())
              .amount(automationEntity.getAmount())
              .idTransferAccount(automationEntity.getIdTransferAccount())
              .hoursToNextExecution(automationEntity.getHoursToNextExecution())
              .executionTime(automationEntity.getExecutionTime())
              .status(automationEntity.getStatus())
              .build();

      automationRepository.saveAutomation(automationBuilder);
   }

   public void deleteById(long id, Locale locale) throws NotFoundException {
      if (!automationRepository.existsById(id))
         throw new NotFoundException("service.automation.error.automation", locale);

      automationRepository.deleteById(id);
   }
}
