package com.bankaccount.back.controller;

import com.bankaccount.back.constants.AccountRoles;
import com.bankaccount.back.constants.TransactionType;
import com.bankaccount.back.domain.service.TransactionService;
import com.bankaccount.back.domain.service.TransactionTypeService;
import com.bankaccount.back.persistence.entity.TransactionEntity;
import com.bankaccount.back.web.TransactionController;
import com.bankaccount.back.web.config.JwtUtil;
import com.bankaccount.back.web.dto.TransactionDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("dev")
@WebMvcTest(TransactionController.class)
public class TransactionControllerForTypesTest {

    private static final String USER = AccountRoles.USER.toString();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionService transactionService;

    @MockBean
    private TransactionTypeService transactionTypeService;

    @MockBean
    private JwtUtil jwtUtil;

    private List<TransactionDto> transactionDtoList;

    private final TransactionEntity.TransactionEntityBuilder transactionEntity = TransactionEntity.builder();

    @BeforeEach
    void setUp() {
        transactionEntity.idTransaction(564326L)
                .idTransferAccount(312421)
                .transactionAmount(new BigDecimal("87523.45"));

        TransactionDto transactionDto1 = new TransactionDto(
                564326,
                312421,
                new BigDecimal("87523.45"),
                TransactionType.DEPOSIT);

        TransactionDto transactionDto2 = new TransactionDto(
                564326,
                312421,
                new BigDecimal("87523.45"),
                TransactionType.ONLINE_PAYMENT);

        TransactionDto transactionDto3 = new TransactionDto(
                564326,
                312421,
                new BigDecimal("87523.45"),
                TransactionType.WIRE_TRANSFER);

        transactionDtoList = List.of(transactionDto1, transactionDto2, transactionDto3);
    }

    @Test
    @DisplayName("Should throw an error if doesn't get any id account")
    void getIdAccountException() throws Exception {
        TransactionDto transactionDto = new TransactionDto(
                0,
                0,
                new BigDecimal("3245523.00"),
                TransactionType.DEPOSIT
        );

        Mockito.when(transactionTypeService.saveTransaction(transactionDto, false))
                .thenThrow(new Exception());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDto))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isNotFound())
        );
    }

    @Test
    @DisplayName("Should save one DEPOSIT transactionDto in json format using the service or return an unauthorized if doesn't have permission")
    void saveDepositTransaction() throws Exception {
        Mockito.when(transactionTypeService.saveTransaction(transactionDtoList.get(0), false))
                .thenReturn(transactionEntity.build());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDtoList.get(0)))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isCreated()),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDtoList.get(0)))
                                .with(csrf()))
                        .andExpect(status().isUnauthorized())
        );
    }

    @Test
    @DisplayName("Should save one ONLINE_PAYMENT transactionDto in json format using the service or return an unauthorized if doesn't have permission")
    void saveOnlinePaymentTransaction() throws Exception {
        Mockito.when(transactionTypeService.saveTransaction(transactionDtoList.get(1), false))
                .thenReturn(transactionEntity.build());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDtoList.get(1)))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isCreated()),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDtoList.get(1)))
                                .with(csrf()))
                        .andExpect(status().isUnauthorized())
        );
    }

    @Test
    @DisplayName("Should save one WIRE_TRANSFER transactionDto in json format using the service or return an unauthorized if doesn't have permission")
    void saveWireTransferTransaction() throws Exception {
        Mockito.when(transactionTypeService.saveTransaction(transactionDtoList.get(2), false))
                .thenReturn(transactionEntity.build());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDtoList.get(2)))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isCreated()),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDtoList.get(2)))
                                .with(csrf()))
                        .andExpect(status().isUnauthorized())
        );
    }
}
