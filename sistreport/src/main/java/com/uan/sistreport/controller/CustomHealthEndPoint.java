package com.uan.sistreport.controller;

import org.springframework.boot.actuate.endpoint.annotation.*;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
@Endpoint(id="custom-health")
public class CustomHealthEndPoint {

    @ReadOperation
    public CustomHealth health() {
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("CustomHealthStatus", "Everything looks good");
        CustomHealth health = new CustomHealth();
        return health;
    }

    @ReadOperation
    public String customEndPointByName(@Selector String name) {
        return "custom-end-point";
    }

    @WriteOperation
    public void writeOperation(@Selector String name) {
        //perform write operation
    }
    @DeleteOperation
    public void deleteOperation(@Selector String name){
        //delete operation
    }
}