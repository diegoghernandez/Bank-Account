package com.bankaccount.back.domain.repository;

import com.bankaccount.back.persistence.entity.AutomationEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Automation repository API.
 */
public interface AutomationRepository {

   boolean existsById(long id);

   Optional<AutomationEntity> getAutomationById(long id);

   List<AutomationEntity> getByIdAccount(int idAccount);

   List<AutomationEntity> getByStatus(boolean status);

   List<AutomationEntity> getByIdAccountAndStatus(int idAccount, boolean status);

   void saveAutomation(AutomationEntity automationEntity);

   void updateExecutionTimeById(LocalDateTime newTime, long id);

   void updateStatusById(boolean status, long id);

   void deleteById(long id);
}
