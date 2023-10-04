package com.bankaccount.back.web;

import com.bankaccount.back.domain.service.AutomationService;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.helpers.Messages;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.web.dto.AutomationDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/automations")
public class AutomationController {

   @Autowired
   private AutomationService automationService;

   @GetMapping("/{id}")
   public ResponseEntity<AutomationEntity> getAutomationById(@PathVariable long id) {
      return automationService.getAutomationById(id)
              .map(automation -> new ResponseEntity<>(automation, HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @GetMapping("/account")
   public ResponseEntity<List<AutomationEntity>> getByIdAccount(@RequestParam(name = "id") int idAccount) {
      List<AutomationEntity> automationList = automationService.getByIdAccount(idAccount);

      if (!automationList.isEmpty()) {
         return new ResponseEntity<>(automationList, HttpStatus.OK);
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }

   @PutMapping("/status")
   public ResponseEntity<Void> updateStatusById(@RequestParam boolean status, @RequestParam long id) throws NotFoundException {
      automationService.updateStatusById(status, id);

      return new ResponseEntity<>(HttpStatus.OK);
   }

   @PostMapping(value = "/save", consumes = {"application/json"})
   public ResponseEntity<String> saveAutomation(
           @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
           @RequestBody @Valid AutomationDto automationDto) throws NotFoundException {
      automationService.saveAutomation(automationDto, locale);
      return new ResponseEntity<>(
              Messages.getMessageForLocale("controller.automation.save", locale),
              HttpStatus.CREATED);
   }
}
