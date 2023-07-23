package com.bankaccount.back.controller;

import com.bankaccount.back.constants.AccountRoles;
import com.bankaccount.back.domain.service.AutomationService;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.web.AutomationController;
import com.bankaccount.back.web.config.JwtUtil;
import com.bankaccount.back.web.dto.AutomationDto;
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
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles("dev")
@WebMvcTest(AutomationController.class)
public class AutomationControllerTest {

    private static final String ADMIN = AccountRoles.ADMIN.toString();
    private static final String USER = AccountRoles.USER.toString();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AutomationService automationService;

    @MockBean
    private JwtUtil jwtUtil;

    private List<AutomationEntity> automationEntityList;

    @BeforeEach
    void setUp() {
        AutomationEntity automationEntity1 = AutomationEntity.builder()
                .idAutomation(43L)
                .idAccount(32)
                .name("For testing")
                .idTransferAccount(12)
                .hoursToNextExecution(4)
                .executionTime(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 23))
                .status(true)
                .build();

        AutomationEntity automationEntity2 = AutomationEntity.builder()
                .idAutomation(12L)
                .idAccount(32)
                .name("For testing")
                .idTransferAccount(12)
                .hoursToNextExecution(4)
                .executionTime(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 22))
                .status(false)
                .build();

        AutomationEntity automationEntity3 = AutomationEntity.builder()
                .idAutomation(23L)
                .idAccount(32)
                .name("For testing")
                .idTransferAccount(12)
                .hoursToNextExecution(4)
                .executionTime(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 43))
                .status(false)
                .build();

        AutomationEntity automationEntity4 = AutomationEntity.builder()
                .idAutomation(76L)
                .idAccount(32)
                .name("For testing")
                .idTransferAccount(12)
                .hoursToNextExecution(4)
                .executionTime(LocalDateTime.of(2022, Month.DECEMBER, 11, 13, 12, 37))
                .status(true)
                .build();

        automationEntityList = List.of(automationEntity1, automationEntity2, automationEntity3, automationEntity4);
    }

    @Test
    @DisplayName("Should return one automationEntity in json format with a specific id using the service or return a not found if authorized")
    void getAutomationById() {
        AutomationEntity automationEntity = automationEntityList.get(1);

        Mockito.when(automationService.getAutomationById(12L))
                .thenReturn(Optional.of(automationEntity));

        assertAll(
                () -> mockMvc.perform(get("/automations/12")
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(user("user").roles(ADMIN)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$.idAutomation")
                                .value(automationEntity.getIdAutomation()))
                        .andExpect(jsonPath("$.name")
                                .value(automationEntity.getName()))
                        .andExpect(jsonPath("$.amount")
                                .value(automationEntity.getAmount()))
                        .andExpect(jsonPath("$.idTransferAccount")
                                .value(automationEntity.getIdTransferAccount()))
                        .andExpect(jsonPath("$.hoursToNextExecution")
                                .value(automationEntity.getHoursToNextExecution()))
                        .andExpect(jsonPath("$.executionTime")
                                .value(automationEntity.getExecutionTime().toString()))
                        .andExpect(jsonPath("$.status")
                                .value(automationEntity.getStatus())),

                () -> mockMvc.perform(get("/automations/423423")
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(user("user").roles(ADMIN)))
                        .andExpect(status().isNotFound()),

                () -> mockMvc.perform(get("/automations/543432")
                                .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isUnauthorized())
        );
    }

    @Test
    @DisplayName("Should return all automationEntities in json format with a specific idAccount using the service or return a not found if authorized")
    void getByIdAccount() throws Exception {
        Mockito.when(automationService.getByIdAccount(32))
                .thenReturn(List.of(automationEntityList.get(0), automationEntityList.get(3)));

        assertAll(
                () -> mockMvc.perform(get("/automations/account")
                                .contentType(MediaType.APPLICATION_JSON)
                                .param("id", "32")
                                .with(user("user").roles(USER)))
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$[0].idAutomation")
                                .value(automationEntityList.get(0).getIdAutomation()))
                        .andExpect(jsonPath("$[0].name")
                                .value(automationEntityList.get(0).getName()))
                        .andExpect(jsonPath("$[0].amount")
                                .value(automationEntityList.get(0).getAmount()))
                        .andExpect(jsonPath("$[0].idTransferAccount")
                                .value(automationEntityList.get(0).getIdTransferAccount()))
                        .andExpect(jsonPath("$[0].hoursToNextExecution")
                                .value(automationEntityList.get(0).getHoursToNextExecution()))
                        .andExpect(jsonPath("$[0].executionTime")
                                .value(automationEntityList.get(0).getExecutionTime().toString()))
                        .andExpect(jsonPath("$[0].status")
                                .value(automationEntityList.get(0).getStatus()))

                        .andExpect(jsonPath("$[1].idAutomation")
                                .value(automationEntityList.get(3).getIdAutomation()))
                        .andExpect(jsonPath("$[1].name")
                                .value(automationEntityList.get(3).getName()))
                        .andExpect(jsonPath("$[1].amount")
                                .value(automationEntityList.get(3).getAmount()))
                        .andExpect(jsonPath("$[1].idTransferAccount")
                                .value(automationEntityList.get(3).getIdTransferAccount()))
                        .andExpect(jsonPath("$[1].hoursToNextExecution")
                                .value(automationEntityList.get(3).getHoursToNextExecution()))
                        .andExpect(jsonPath("$[1].executionTime")
                                .value(automationEntityList.get(3).getExecutionTime().toString()))
                        .andExpect(jsonPath("$[1].status")
                                .value(automationEntityList.get(3).getStatus())),

                () -> mockMvc.perform(get("/automations/account")
                                .param("id", "432")
                                .contentType(MediaType.APPLICATION_JSON)
                                .with(user("user").roles(ADMIN)))
                        .andExpect(status().isNotFound()),

                () -> mockMvc.perform(get("/automations/account")
                                .param("id", "3245325")
                                .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isUnauthorized())
        );
    }

    @Test
    @DisplayName("Should update one automationEntity with a specific id and status using the service if authorized")
    void updateStatusById() throws Exception {
        assertAll(
                () -> mockMvc.perform(put("/automations/status")
                                .contentType(MediaType.APPLICATION_JSON)
                                .param("id", "32")
                                .param("status", "true")
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isOk()),
                () -> Mockito.verify(automationService, Mockito.times(1)).updateStatusById(true, 32L),

                () -> mockMvc.perform(get("/automations/status")
                                .param("id", "3245325")
                                .param("status", "true")
                                .contentType(MediaType.APPLICATION_JSON))
                        .andExpect(status().isUnauthorized())
        );
    }

    @Test
    @DisplayName("Should return one automationDto using the service or return an unauthorized if doesn't have permission")
    void saveAutomation() throws NotFoundException {
        AutomationDto automationDto = new AutomationDto(
                234,
                "New fr fr",
                new BigDecimal("4324.00"),
                321,
                54
        );

        Mockito.when(automationService.saveAutomation(ArgumentMatchers.any()))
                .thenReturn(AutomationEntity.builder().build());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        assertAll(
                () -> mockMvc.perform(MockMvcRequestBuilders.post("/automations/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(automationDto))
                                .with(user("user").roles(USER))
                                .with(csrf()))
                        .andExpect(status().isCreated()),

                () -> mockMvc.perform(MockMvcRequestBuilders.post("/automations/save")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(automationDto))
                                .with(csrf()))
                        .andExpect(status().isUnauthorized())
        );
    }
}
