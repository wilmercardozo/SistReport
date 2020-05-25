package com.uan.sistreport.controller;

import com.uan.sistreport.service.EstadoRegistroService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
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
