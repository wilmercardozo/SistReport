package com.uan.sistreport;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaRepositories("com.uan.sistreport")
@EnableJpaAuditing
public class SistreportApplication implements WebMvcConfigurer {

	public static void main(String[] args) {
		SpringApplication.run(SistreportApplication.class, args);
	}

}
