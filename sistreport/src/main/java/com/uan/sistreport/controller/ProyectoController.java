package com.uan.sistreport.controller;

import com.uan.sistreport.entity.Proyecto;
import com.uan.sistreport.model.ProyectoModel;
import com.uan.sistreport.model.Registro;
import com.uan.sistreport.model.Respuesta;
import com.uan.sistreport.service.ProyectoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class ProyectoController {

    @Autowired
    ProyectoService proyectoService;

    @PostMapping("proyecto/Proyecto")
    public @ResponseBody
    ResponseEntity getProyectoById(@RequestBody Registro registro){
        Respuesta respuesta = new Respuesta();
        respuesta.setEstado(true);
        respuesta.setMensaje1(proyectoService.getProyectoById(registro.getParametro1()).toString());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PostMapping("proyecto/NuevoProyecto")
    public @ResponseBody
    ResponseEntity setProyecto(@RequestBody ProyectoModel proyecto){
        proyectoService.setProyectoModel(proyecto);
        Respuesta respuesta = new Respuesta();
        respuesta.setEstado(true);
        respuesta.setMensaje1("ok");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PostMapping("proyecto/EditarProyecto")
    public @ResponseBody
    ResponseEntity putProyecto(@RequestBody ProyectoModel proyecto){
        proyectoService.setProyectoModel(proyecto);
        Respuesta respuesta = new Respuesta();
        respuesta.setEstado(true);
        respuesta.setMensaje1("ok");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PostMapping("proyecto/Proyectos")
    public @ResponseBody
    ResponseEntity getProyectos(){
        Respuesta respuesta = new Respuesta();
        respuesta.setEstado(true);
        respuesta.setMensaje1(proyectoService.findAllProyecto().toString());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PostMapping("proyecto/Parametros")
    public @ResponseBody
    ResponseEntity getParametros(){
        Respuesta respuesta = new Respuesta();
        respuesta.setEstado(true);
        respuesta.setMensaje1(proyectoService.findAllParametros().toString());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PostMapping("proyecto/DesabilitarProyecto")
    public @ResponseBody
    ResponseEntity deshabilitarProyecto(@RequestBody Registro registro){
        proyectoService.deshabilitarProyecto(registro.getParametro1());
        Respuesta respuesta = new Respuesta();
        respuesta.setEstado(true);
        respuesta.setMensaje1("Ok");
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }


}
