package com.bankaccount.back.domain.repository;

import com.bankaccount.back.persistence.entity.AutomationEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface AutomationRepository {

    Optional<AutomationEntity> getAutomationById(long id);

    List<AutomationEntity> getByIdAccount(int idAccount);

    List<AutomationEntity> getByStatus(boolean status);

    List<AutomationEntity> getByIdAccountAndStatus(int idAccount, boolean status);

    void updateLastExecutionById(LocalDateTime newTime, long id);

    void updateStatusById(boolean status, long id);

    AutomationEntity saveAutomation(AutomationEntity automationEntity);
}
