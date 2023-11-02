package com.bankaccount.back.domain.service;

import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.helpers.AutomationHelper;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.web.dto.AutomationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * Automation service API.
 */
@Service
public class AutomationService {

   @Autowired
   private AutomationRepository automationRepository;

   @Autowired
   private AutomationHelper automationHelper;

   @Autowired
   private AccountRepository accountRepository;

   /**
    * @param id the id of the desire automation
    * @return an {@code Optional} of {@link AutomationEntity}
    */
   public Optional<AutomationEntity> getAutomationById(long id) {
      return automationRepository.getAutomationById(id);
   }

   /**
    *
    * @param idAccount the account id of the desire automations
    * @return a {@code List} of {@link AutomationEntity}
    */
   public List<AutomationEntity> getByIdAccount(int idAccount) {
      automationHelper.useAutomations(automationRepository.getByIdAccountAndStatus(idAccount, true));

      return automationRepository.getByIdAccount(idAccount);
   }

   /**
    * Save an automation with the data of {@code automationDto}, otherwise throw an exception.
    * @param automationDto the value to extract the automation data
    * @param locale the value to choose the language of the message
    * @throws NotFoundException if neither the account nor the transfer account exists
    */
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

   /**
    * Update an automation with the receiver values, otherwise thrown an error.
    * @param automationEntity the value to extract the data
    * @param locale the value to choose the language of the message
    * @throws NotFoundException if neither the account nor the transfer account exists
    */
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

   /**
    * Delete an automation by id.
    * @param id the id to find
    * @param locale the value to choose the language of the message
    * @throws NotFoundException if the automation doesn't exist
    */
   public void deleteById(long id, Locale locale) throws NotFoundException {
      if (!automationRepository.existsById(id))
         throw new NotFoundException("service.automation.error.automation", locale);

      automationRepository.deleteById(id);
   }
}
