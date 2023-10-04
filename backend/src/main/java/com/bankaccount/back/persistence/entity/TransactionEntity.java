package com.bankaccount.back.persistence.entity;

import com.bankaccount.back.constants.TransactionType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transaction")
public class TransactionEntity {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(name = "id_transaction")
   private Long idTransaction;

   @JsonIgnore
   @Column(name = "id_account", nullable = false)
   private Integer idAccount;

   @Column(name = "id_transfer_account")
   private Integer idTransferAccount;

   @Column(name = "receiver_name", nullable = false)
   private String receiverName;

   @Column(name = "transaction_amount", nullable = false, columnDefinition = "DECIMAL(14,2)")
   private BigDecimal transactionAmount;

   @Enumerated(EnumType.STRING)
   @Column(name = "transaction_type", nullable = false)
   private TransactionType transactionType;

   @Builder.Default
   @Column(name = "transaction_timestamp", nullable = false)
   private LocalDateTime transactionTimestamp = LocalDateTime.now();

   @Column(name = "is_automated")
   private Boolean isAutomated;
}
