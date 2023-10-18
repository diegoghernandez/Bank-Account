package com.bankaccount.back;

import com.bankaccount.back.web.config.EnvConfigProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(EnvConfigProperties.class)
public class BackendApplication {

   public static void main(String[] args) {
      SpringApplication.run(BackendApplication.class, args);
   }

}
