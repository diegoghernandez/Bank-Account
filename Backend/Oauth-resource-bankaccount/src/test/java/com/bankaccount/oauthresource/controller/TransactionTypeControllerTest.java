package com.bankaccount.oauthresource.controller;

import com.bankaccount.oauthresource.domain.TransactionDomain;
import com.bankaccount.oauthresource.domain.service.TransactionTypeService;
import com.bankaccount.oauthresource.web.TransactionTypeController;
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
import java.time.LocalDateTime;
import java.time.Month;
import java.time.ZoneId;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//TODO: Post methodos no trabajan sin csrf, necesito revisar por que ocurre
@ActiveProfiles("dev")
@WebMvcTest(TransactionTypeController.class)
class TransactionTypeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionTypeService transactionTypeService;

    private TransactionDomain transactionDomain;

    @BeforeEach
    void setUp() {
        transactionDomain = TransactionDomain.builder()
                .idAccount(885748l)
                .transactionAmount(new BigDecimal("87523.45"))
                .transactionTimestamp(LocalDateTime.of(2022, Month.OCTOBER, 12, 13, 12, 00)
                        .atZone(ZoneId.of("America/Mexico_City")).toInstant())
                .build();
    }

    @Test
    @DisplayName("Should save one transactionDomain in json format using the service or return a bad request if is authorized")
    void saveDepositTransaction() throws Exception {
        Mockito.when(transactionTypeService.saveDepositTransaction(885748l, new BigDecimal("87523.45")))
                .thenReturn(transactionDomain);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions-type/885748/save-deposit/100.00")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDomain))
                                .with(csrf())
                                .with(user("user").roles("USER")))
                        .andExpect(status().isCreated()),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions-type/423/save-deposit/100.00")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDomain))
                                .with(csrf()))
                        .andExpect(status().isUnauthorized())
        );
    }

    @Test
    @DisplayName("Should save one transactionDomain in json format using the service or return a bad request if is authorized")
    void saveCheckTransaction() throws Exception {
        Mockito.when(transactionTypeService.saveCheckTransaction(885748l))
                .thenReturn(transactionDomain);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions-type/885748/save-check")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDomain))
                                .with(jwt())
                                .with(user("user").roles("USER")))
                        .andExpect(status().isCreated()),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions-type/534/save-check")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDomain))
                                .with(jwt()))
                        .andExpect(status().isUnauthorized())
        );
    }

    @Test
    @DisplayName("Should save one transactionDomain in json format using the service or return a bad request if is authorized")
    void saveOnlinePaymentTransaction() throws Exception {
        Mockito.when(transactionTypeService.saveOnlinePaymentTransaction(885748l, new BigDecimal("87523.45")))
                .thenReturn(transactionDomain);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions-type/885748/save-online-payment/100.00")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDomain))
                                //.with(csrf())
                                .with(user("user").roles("USER")))
                        .andExpect(status().isCreated()),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions-type/543/save-online-payment/100.00")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDomain)))
                        //.with(csrf()))
                        .andExpect(status().isUnauthorized())
        );
    }

    @Test
    @DisplayName("Should save one transactionDomain in json format using the service or return a bad request if is authorized")
    void saveWireTransferTransaction() throws Exception {
        Mockito.when(transactionTypeService.saveWireTransferTransaction(885748l, new BigDecimal("87523.45")))
                .thenReturn(transactionDomain);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions-type/885748/save-transfer/100.00")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDomain))
                                //.with(csrf())
                                .with(user("user").roles("USER")))
                        .andExpect(status().isCreated()),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/transactions-type/534/save-transfer/100.00")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(transactionDomain)))
                        //.with(csrf()))
                        .andExpect(status().isUnauthorized())
        );
    }
}