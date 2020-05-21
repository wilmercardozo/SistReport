package com.uan.sistreport.controller;

import com.uan.sistreport.entity.Usuario;
import com.uan.sistreport.model.UsuarioDto;
import com.uan.sistreport.service.UsuarioService;
import com.uan.sistreport.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*")
public class UserController {

	@Autowired
	UsuarioService usuarioService;

	@PostMapping("createUsuario")
	public ResponseEntity<Usuario> createAuthenticationToken(@RequestBody UsuarioDto usuarioDto)  {
		usuarioDto.setPassword(SecurityUtils.bcryptPassword(usuarioDto.getPassword()));
		Usuario usuario = Usuario.builder().usuario(usuarioDto.getUsuario()).password(usuarioDto.getPassword()).build();
		usuario = usuarioService.createUser(usuario);
		return ResponseEntity.ok(usuario);
	}
}




