package com.uan.sistreport.controller;

import com.uan.sistreport.service.EstadoRegistroService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EstadoRegistroController {
    private static final Logger logger = LoggerFactory.getLogger(LogController.class);

    @Autowired
    EstadoRegistroService estadoRegistroService;

    @GetMapping("EstadoRegistro")
    public @ResponseBody ResponseEntity getAll(){
        logger.info("TennisDevoluciones  - LogController - getLogById ");
        return new ResponseEntity<>(estadoRegistroService.getAll(), HttpStatus.OK);
    }
}
