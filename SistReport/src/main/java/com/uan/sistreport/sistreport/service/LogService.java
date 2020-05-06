package com.uan.sistreport.sistreport.service;

import com.uan.sistreport.sistreport.entity.Log;
import com.uan.sistreport.sistreport.entity.LogItem;
import com.uan.sistreport.sistreport.repository.LogItemRepository;
import com.uan.sistreport.sistreport.repository.LogRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogService {
    private static final Logger logger = LoggerFactory.getLogger(LogService.class);

    @Autowired
    LogRepository logRepository;

    @Autowired
    LogItemRepository logItemRepository;


    private Log setLog(Log logDb){
        logger.info("sistreport  - LogService - addLog ");
        return logRepository.save(logDb);
    }

    public LogItem addLogItem(LogItem logItem){
        logger.info("sistreport  - LogService - addLogItem ");
        return logItemRepository.save(logItem);
    }

    public Log createLog(String proceso, List<LogItem> listLogItem){
        logger.info("sistreport  - LogService - createLog ");
        new Log();
        Log log;
        log = Log.builder().proceso(proceso).logItems(listLogItem).build();
        log = setLog(log);
        return log;
    }

    public List<Log> getAllLogs(){
        logger.info("sistreport  - LogService - getAllLogs ");
        return logRepository.findAll();
    }

}
