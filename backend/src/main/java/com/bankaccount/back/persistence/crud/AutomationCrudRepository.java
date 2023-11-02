package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.AutomationEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Automation crud API
 */
public interface AutomationCrudRepository extends CrudRepository<AutomationEntity, Long> {

   /**
    * Search all Automations by account id in the database
    * @param idAccount the account id of the desire automations
    * @return a {@code List} of {@link AutomationEntity}
    */
   List<AutomationEntity> findByIdAccount(int idAccount);

   /**
    * Search all Automations by status in the database
    * @param status the value of the desire automations
    * @return a {@code List} of {@link AutomationEntity}
    */
   List<AutomationEntity> findByStatus(boolean status);

   /**
    * Search all Automations by account id and status in the database
    * @param idAccount the account id of the desire automations
    * @param status the value of the desire automations
    * @return a {@code List} of {@link AutomationEntity}
    */
   List<AutomationEntity> findByIdAccountAndStatus(int idAccount, boolean status);

   /**
    * Update the executionTime parameter of an existing Automation in the database
    * @param newExecutionTime the value for update
    * @param id the id to find
    */
   @Modifying
   @Transactional
   @Query("UPDATE AutomationEntity AS aut SET aut.executionTime = :new WHERE aut.idAutomation = :id")
   void updateExecutionTimeById(@Param("new") LocalDateTime newExecutionTime, long id);

   /**
    * Update the status parameter of an existing Automation in the database
    * @param status the value for update
    * @param id the id to find
    */
   @Modifying
   @Transactional
   @Query("UPDATE AutomationEntity AS aut SET aut.status = :status WHERE aut.idAutomation = :id")
   void updateStatusById(boolean status, long id);
}
