package com.uan.sistreport.controller;

import com.alibaba.fastjson.serializer.JSONSerializer;
import com.uan.sistreport.entity.Pagina;
import com.uan.sistreport.entity.Usuario;
import com.uan.sistreport.model.Registro;
import com.uan.sistreport.model.Respuesta;
import com.uan.sistreport.model.UsuarioDto;
import com.uan.sistreport.service.PaginaService;
import com.uan.sistreport.service.UsuarioService;
import com.uan.sistreport.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT})
public class PaginaController {

    @Autowired
    PaginaService paginaService;

    @Autowired
    UsuarioService usuarioService;

    @PostMapping("home/ObtenerMenu")
    public @ResponseBody ResponseEntity obtenerMenu(@RequestBody Registro registro)  {
        Respuesta respuesta = new Respuesta();
        respuesta.setEstado(true);
        respuesta.setMensaje1(paginaService.findAll().toString());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }

    @PostMapping("home/ObtenerNombreUsuario")
    public @ResponseBody ResponseEntity obtenerNombreUsuario(@RequestBody Registro registro)  {
        Respuesta respuesta = new Respuesta();
        Usuario usuario = usuarioService.getUsusarioByUsuario(registro.getParametro1());
        respuesta.setEstado(true);
        respuesta.setMensaje1(usuario.getNombres());
        return new ResponseEntity<>(respuesta, HttpStatus.OK);
    }
}
