package com.bankaccount.back.domain.service;

import com.bankaccount.back.web.config.EnvConfigProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

/**
 * Class in charge from the email logic
 */
@Component
public class EmailService {

   @Autowired
   private JavaMailSender emailSender;

   @Autowired
   private EnvConfigProperties envConfigProperties;

   /**
    * Send the email with the desire content to the respective user
    * @param to the value to who send
    * @param subject the value for the summary of the content
    * @param text the value for the content of the email
    */
   public void sendEmail(String to, String subject, String text) {
      SimpleMailMessage message = new SimpleMailMessage();

      message.setFrom(envConfigProperties.email());
      message.setTo(to);
      message.setSubject(subject);
      message.setText(text);

      emailSender.send(message);
   }
}
