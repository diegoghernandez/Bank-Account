package com.bankaccount.back.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "automation")
public class AutomationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_automation")
    private Long idAutomation;

    @JsonIgnore
    @Column(name = "id_account", nullable = false)
    private Integer idAccount;

    @Column(nullable = false)
    private String name;

    @Column(name = "id_transfer_account", nullable = false)
    private Integer idTransferAccount;

    @Column(name = "hours_to_next_execution", nullable = false)
    private Integer hoursToNextExecution;

    @Column(name = "last_execution", nullable = false)
    private LocalDateTime lastExecution;

    @Column(nullable = false)
    private Boolean status;
}
