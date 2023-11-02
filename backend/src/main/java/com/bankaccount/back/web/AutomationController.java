package com.bankaccount.back.web;

import com.bankaccount.back.domain.service.AutomationService;
import com.bankaccount.back.exception.NotFoundException;
import com.bankaccount.back.helpers.Messages;
import com.bankaccount.back.persistence.entity.AutomationEntity;
import com.bankaccount.back.web.dto.AutomationDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Automation", description = "The automation API")
public class AutomationController {

   @Autowired
   private AutomationService automationService;

   @Operation(
           summary = "Get by id",
           description = "Get the automation with the specific id",
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success",
                           content = @Content(
                                           mediaType = "application/json",
                                           schema = @Schema(implementation = AutomationEntity.class)
                           )
                   ),
                   @ApiResponse(
                           responseCode = "404",
                           description = "Automation not found",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @GetMapping(value = "/{id}", produces = {"application/json"})
   public ResponseEntity<AutomationEntity> getAutomationById(
           @Parameter(description = "id of automation to be searched") @PathVariable long id) {
      return automationService.getAutomationById(id)
              .map(automation -> new ResponseEntity<>(automation, HttpStatus.OK))
              .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
   }

   @Operation(
           summary = "Get all automation by account id",
           description = "Get all automation with the specific account id",
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success"
                   ),
                   @ApiResponse(
                           responseCode = "404",
                           description = "Automations not found",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @GetMapping(value = "/account", produces = {"application/json"})
   public ResponseEntity<List<AutomationEntity>> getByIdAccount(
           @Parameter(description = "account id of automations to be searched") @RequestParam(name = "id") int idAccount) {
      List<AutomationEntity> automationList = automationService.getByIdAccount(idAccount);

      if (!automationList.isEmpty()) {
         return new ResponseEntity<>(automationList, HttpStatus.OK);
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
   }

   @Operation(
           summary = "Save an automation",
           description = "Save all data from AutomationDto and return a success message",
           parameters = @Parameter(
                   name = HttpHeaders.ACCEPT_LANGUAGE,
                   in = ParameterIn.HEADER,
                   required = true,
                   description = "header for get the message according to the language",
                   content = @Content(
                           schema = @Schema(type = "string"),
                           examples = @ExampleObject( value = "en")
                   )
           ),
           responses = {
                   @ApiResponse(
                           responseCode = "201",
                           description = "Success",
                           content = @Content(
                                   schema = @Schema(type = "string"),
                                   examples = @ExampleObject( value = "Automation created successfully")
                           )
                   ),
                   @ApiResponse(
                           responseCode = "400",
                           description = "Bad format",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @PostMapping(value = "/save", consumes = {"application/json"})
   public ResponseEntity<String> saveAutomation(
           @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
           @RequestBody @Valid AutomationDto automationDto) throws NotFoundException {
      automationService.saveAutomation(automationDto, locale);
      return new ResponseEntity<>(
              Messages.getMessageForLocale("controller.automation.save", locale),
              HttpStatus.CREATED);
   }

   @Operation(
           summary = "Update an automation",
           description = "Update an automation with the data from Automation object to return a success message",
           parameters = @Parameter(
                   name = HttpHeaders.ACCEPT_LANGUAGE,
                   in = ParameterIn.HEADER,
                   required = true,
                   description = "header for get the message according to the language",
                   content = @Content(
                           schema = @Schema(type = "string"),
                           examples = @ExampleObject( value = "en")
                   )
           ),
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success",
                           content = @Content(
                                   schema = @Schema(type = "string"),
                                   examples = @ExampleObject( value = "Automation updated successfully")
                           )
                   ),
                   @ApiResponse(
                           responseCode = "400",
                           description = "Bad format",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @PutMapping(value = "/update", consumes = {"application/json"})
   public ResponseEntity<String> updateAutomation(
           @RequestHeader(HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
           @RequestBody AutomationEntity automationEntity) throws NotFoundException {

      automationService.updateAutomation(automationEntity, locale);

      return new ResponseEntity<>(Messages.getMessageForLocale("controller.automation.update", locale),
              HttpStatus.OK);
   }

   @Operation(
           summary = "Delete an automation",
           description = "Delete an automation with the specific id and return a success message",
           parameters = @Parameter(
                   name = HttpHeaders.ACCEPT_LANGUAGE,
                   in = ParameterIn.HEADER,
                   required = true,
                   description = "header for get the message according to the language",
                   content = @Content(
                           schema = @Schema(type = "string"),
                           examples = @ExampleObject( value = "en")
                   )
           ),
           responses = {
                   @ApiResponse(
                           responseCode = "200",
                           description = "Success",
                           content = @Content(
                                   schema = @Schema(type = "string"),
                                   examples = @ExampleObject( value = "Automation deleted successfully")
                           )
                   ),
                   @ApiResponse(
                           responseCode = "400",
                           description = "Bad format",
                           content = @Content
                   ),
                   @ApiResponse(
                           responseCode = "403",
                           description = "Unauthorized | Invalid Token",
                           content = @Content
                   )
           }
   )
   @DeleteMapping("/delete")
   public ResponseEntity<String> deleteById(
           @RequestHeader(name = HttpHeaders.ACCEPT_LANGUAGE) final Locale locale,
           @Parameter(description = "id of automation to be searched") @RequestParam long id) throws NotFoundException {

      automationService.deleteById(id, locale);

      return new ResponseEntity<>(Messages.getMessageForLocale("controller.automation.delete", locale),
              HttpStatus.OK);
   }
}
