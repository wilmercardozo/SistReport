package com.uan.sistreport.sistreport.controller;

import com.uan.sistreport.sistreport.entity.log.Log;
import com.uan.sistreport.sistreport.service.LogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LogController {

    private static final Logger logger = LoggerFactory.getLogger(LogController.class);

    @Autowired
    LogService logService;

    @GetMapping("log")
    public List<Log> getAllLog(){
        logger.info("TennisDevoluciones  - LogController - getLogById ");
        return logService.getAllLogs();
    }


}