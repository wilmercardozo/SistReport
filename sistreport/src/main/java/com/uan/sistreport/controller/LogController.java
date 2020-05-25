package com.uan.sistreport.controller;

import com.uan.sistreport.service.LogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class LogController {

    private static final Logger logger = LoggerFactory.getLogger(LogController.class);

    @Autowired
    LogService logService;

    @GetMapping("log")
    public @ResponseBody ResponseEntity getAllLog(){
        logger.info("TennisDevoluciones  - LogController - getLogById ");
        return new ResponseEntity<>(logService.getAllLogs(), HttpStatus.OK);
    }


}