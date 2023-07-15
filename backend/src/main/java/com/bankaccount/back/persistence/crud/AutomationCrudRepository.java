package com.bankaccount.back.persistence.crud;

import com.bankaccount.back.persistence.entity.AutomationEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

public interface AutomationCrudRepository extends CrudRepository<AutomationEntity, Long> {

    List<AutomationEntity> findByIdAccount(int idAccount);

    List<AutomationEntity> findByStatus(boolean status);

    List<AutomationEntity> findByIdAccountAndStatus(int idAccount, boolean status);

    @Modifying
    @Transactional
    @Query("UPDATE AutomationEntity AS aut SET aut.executionTime = :new WHERE aut.idAutomation = :id")
    void updateExecutionTimeById(@Param("new") LocalDateTime newExecutionTime, long id);

    @Modifying
    @Transactional
    @Query("UPDATE AutomationEntity AS aut SET aut.status = :status WHERE aut.idAutomation = :id")
    void updateStatusById(boolean status, long id);
}
