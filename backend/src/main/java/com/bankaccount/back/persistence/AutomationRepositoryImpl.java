package com.bankaccount.back.persistence;

import com.bankaccount.back.domain.repository.AutomationRepository;
import com.bankaccount.back.persistence.crud.AutomationCrudRepository;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class AutomationRepositoryImpl implements AutomationRepository {

   @Autowired
   private AutomationCrudRepository automationCrudRepository;

   @Override
   public boolean existsById(long id) {
      return automationCrudRepository.existsById(id);
   }

   @Override
   public Optional<AutomationEntity> getAutomationById(long id) {
      return automationCrudRepository.findById(id);
   }

   @Override
   public List<AutomationEntity> getByIdAccount(int idAccount) {
      return automationCrudRepository.findByIdAccount(idAccount);
   }

   @Override
   public List<AutomationEntity> getByStatus(boolean status) {
      return automationCrudRepository.findByStatus(status);
   }

   @Override
   public List<AutomationEntity> getByIdAccountAndStatus(int idAccount, boolean status) {
      return automationCrudRepository.findByIdAccountAndStatus(idAccount, status);
   }

   @Override
   public void updateExecutionTimeById(LocalDateTime newTime, long id) {
      automationCrudRepository.updateExecutionTimeById(newTime, id);
   }

   @Override
   public void updateStatusById(boolean status, long id) {
      automationCrudRepository.updateStatusById(status, id);
   }

   @Override
   public void saveAutomation(AutomationEntity automationEntity) {
      automationCrudRepository.save(automationEntity);
   }
}
