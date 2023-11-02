package com.bankaccount.back.domain.service;

import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.repository.AccountRepository;
import com.bankaccount.back.domain.repository.TransactionRepository;
import com.bankaccount.back.exception.NotAllowedException;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.dto.TransactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Locale;
import java.util.Optional;

/**
 * A class in charge of the type logic of transactions
 */
@Service
public class TransactionTypeService {

   @Autowired
   private TransactionRepository transactionRepository;

   @Autowired
   private AccountRepository accountRepository;

   /**
    * Save a transaction with the data of {@code transactionDto} and return it, otherwise throw an exception.
    * @param transactionDto the value to extract the transaction data
    * @param isAutomated the value to know if is invoked for an automation
    * @param locale the value to choose the language of the message
    * @throws NotFoundException if neither the account nor the transfer account exists
    * @throws NotAllowedException it either there is a balance error or the type is not supported
    */
   public void saveTransaction(TransactionDto transactionDto, boolean isAutomated, Locale locale) throws NotFoundException, NotAllowedException {
      int id = transactionDto.idAccount();
      int idTransfer = transactionDto.idTransferAccount();
      BigDecimal amount = transactionDto.amount();
      TransactionType type = transactionDto.transactionType();

      Optional<AccountEntity> isAccount = accountRepository.getAccountById(id);
      Optional<AccountEntity> isAccountTransfer = accountRepository.getAccountById(idTransfer);

      if (isAccount.isEmpty()) throw new NotFoundException("account.error", locale);
      else if (idTransfer != 0 && isAccountTransfer.isEmpty())
         throw new NotFoundException("service.transaction-type.error.transfer", locale);

      AccountEntity account = isAccount.get();

      String name = (isAccountTransfer.isPresent()) ?
              isAccountTransfer.get().getAccountName() : account.getAccountName();

      TransactionEntity.TransactionEntityBuilder transactionEntity = TransactionEntity.builder();
      transactionEntity.idAccount(id);
      transactionEntity.idTransferAccount(idTransfer);
      transactionEntity.receiverName(name);
      transactionEntity.transactionAmount(amount);
      transactionEntity.transactionType(type);
      transactionEntity.isAutomated(isAutomated);

      switch (type) {
         case DEPOSIT -> {
            BigDecimal currentBalance = account.getCurrentBalance();

            currentBalance = currentBalance.add(amount);

            accountRepository.updateBalance(currentBalance, id);
         }
         case WIRE_TRANSFER, ONLINE_PAYMENT -> {
            BigDecimal currentBalance = account.getCurrentBalance();

            if (currentBalance.compareTo(amount) < 0) {
               throw new NotAllowedException("amount", "service.transaction-type.error.balance", locale);
            } else {
               currentBalance = currentBalance.subtract(amount);

               accountRepository.updateBalance(currentBalance, id);

               saveTransaction(new TransactionDto(
                       idTransfer, id, amount, TransactionType.DEPOSIT), false, locale);
            }
         }
         default -> throw new NotAllowedException("type", "service.transaction-type.error.support", locale);
      }

      transactionRepository.saveTransaction(transactionEntity.build());
   }
}
