package com.uan.sistreport.controller;

import com.uan.sistreport.entity.Proyecto;
import com.uan.sistreport.service.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ProyectoController {

    @Autowired
    ProyectoService proyectoService;
    @GetMapping("Proyecto/{id}")
    public @ResponseBody
    ResponseEntity getProyectoById(@PathVariable("id") String id){
        return new ResponseEntity<>(proyectoService.getProyectoById(id), HttpStatus.OK);
    }

    @PostMapping("Proyecto")
    public @ResponseBody
    ResponseEntity setroyecto(@RequestBody Proyecto proyecto){
        return new ResponseEntity<>(proyectoService.setProyecto(proyecto), HttpStatus.OK);
    }
}
