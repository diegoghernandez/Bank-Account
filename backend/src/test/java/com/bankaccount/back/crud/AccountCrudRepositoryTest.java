package com.bankaccount.back.crud;

import com.bankaccount.back.constants.AccountRoles;
import com.bankaccount.back.persistence.crud.AccountCrudRepository;
import com.bankaccount.back.persistence.entity.AccountEntity;
import com.bankaccount.back.persistence.entity.AccountRoleEntity;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("dev")
public class AccountCrudRepositoryTest {

    @Autowired
    private AccountCrudRepository accountCrudRepository;

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return a accountEntity with a specific id of the data.sql")
    public void findById() {
        AccountEntity accountEntity = accountCrudRepository.findById(1).get();

        Optional<AccountEntity> errorAccountEntity = accountCrudRepository.findById(453);

        assertAll(
                () -> assertFalse(errorAccountEntity.isPresent()),
                () -> assertThat(accountEntity.getIdAccount()).isEqualTo(1),
                () -> assertThat(accountEntity.getAccountName()).isEqualTo("Random1"),
                () -> assertThat(accountEntity.getEmail()).isEqualTo("random1@names.com"),
                () -> assertThat(accountEntity.getPassword()).isEqualTo("123456"),
                () -> assertThat(accountEntity.getCurrentBalance().toString()).isEqualTo("10000.00"),
                () -> assertThat(accountEntity.getEnabled()).isEqualTo(true)
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should return a accountEntity with a specific email of the data.sql")
    public void findByEmail() {
        AccountEntity accountEntity = accountCrudRepository.findByEmail("random3@names.com").get();

        Optional<AccountEntity> errorAccountEntity = accountCrudRepository.findByEmail("ranfagrsgh@names.com");

        assertAll(
                () -> assertFalse(errorAccountEntity.isPresent()),
                () -> assertThat(accountEntity.getIdAccount()).isEqualTo(3),
                () -> assertThat(accountEntity.getAccountName()).isEqualTo("Random3"),
                () -> assertThat(accountEntity.getEmail()).isEqualTo("random3@names.com"),
                () -> assertThat(accountEntity.getPassword()).isEqualTo("123456"),
                () -> assertThat(accountEntity.getCurrentBalance().toString()).isEqualTo("4000.00"),
                () -> assertThat(accountEntity.getEnabled()).isEqualTo(true)
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should update the balance of a specific account with its id in the database")
    public void updateBalance() {
        BigDecimal currentBalance = new BigDecimal("4000.00");
        currentBalance = currentBalance.subtract(new BigDecimal("1000.00"));

        accountCrudRepository.updateBalanceById(currentBalance, 3);

        AccountEntity accountEntity = accountCrudRepository.findById(3).get();

        assertAll(
                () -> assertThat(accountEntity.getIdAccount()).isEqualTo(3),
                () -> assertThat(accountEntity.getCurrentBalance().toString()).isEqualTo("3000.00")
        );
    }
    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should update the name of a specific account with its id in the database")
    public void updateName() {
        accountCrudRepository.updateName("newTest", 1);

        AccountEntity accountEntity = accountCrudRepository.findById(1).get();

        assertAll(
                () -> assertThat(accountEntity.getIdAccount()).isEqualTo(1),
                () -> assertThat(accountEntity.getAccountName()).isEqualTo("newTest")
        );
    }


    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should update the password of a specific account with its id in the database")
    public void updatePassword() {
        accountCrudRepository.updatePassword("test", 3);

        AccountEntity accountEntity = accountCrudRepository.findById(3).get();

        assertAll(
                () -> assertThat(accountEntity.getIdAccount()).isEqualTo(3),
                () -> assertThat(accountEntity.getPassword()).isEqualTo("test")
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should update the email of a specific account with its id in the database")
    public void updateEmail() {
        accountCrudRepository.updateEmail("test@test.com", 5);

        AccountEntity accountEntity = accountCrudRepository.findById(5).get();

        assertAll(
                () -> assertThat(accountEntity.getIdAccount()).isEqualTo(5),
                () -> assertThat(accountEntity.getEmail()).isEqualTo("test@test.com")
        );
    }

    @Test
    @Sql("/db/bankaccount_data.sql")
    @DisplayName("Should update the status of a specific account with its id in the database")
    public void updateStatus() {
        accountCrudRepository.updateStatusById(5);

        AccountEntity accountEntity = accountCrudRepository.findById(5).get();

        assertAll(
                () -> Assertions.assertThat(accountEntity.getIdAccount()).isEqualTo(5),
                () -> Assertions.assertThat(accountEntity.getEnabled()).isEqualTo(true)
        );
    }

    @Test
    @DisplayName("Should save an account in the database")
    public void saveAccount() {
        AccountEntity accountEntity = AccountEntity.builder()
                .idAccount(12423144)
                .accountName("Random6")
                .email("random6@names.com")
                .password("1234567")
                .build();

        AccountEntity accountSave = accountCrudRepository.save(accountEntity);

        assertAll(
                () -> assertEquals(accountEntity.getIdAccount(), accountSave.getIdAccount()),
                () -> assertEquals(accountEntity.getAccountName(), accountSave.getAccountName()),
                () -> assertEquals(accountEntity.getEmail(), accountSave.getEmail()),
                () -> assertEquals(accountEntity.getPassword(), accountSave.getPassword()),
                () -> assertEquals(accountEntity.getCurrentBalance(), accountSave.getCurrentBalance()),
                () -> assertThat(accountEntity.getEnabled()).isEqualTo(false)
        );
    }
}
