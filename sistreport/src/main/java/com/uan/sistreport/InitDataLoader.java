package com.uan.sistreport;

import com.uan.sistreport.entity.*;
import com.uan.sistreport.service.PaginaService;
import com.uan.sistreport.service.ProyectoService;
import com.uan.sistreport.service.RolService;
import com.uan.sistreport.service.UsuarioService;
import com.uan.sistreport.service.implementation.RutaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Component
public class InitDataLoader {

    @Autowired
    RolService rolService;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    PaginaService paginaService;

    @Autowired
    RutaService rutaService;

    @Autowired
    ProyectoService proyectoService;

    public void loadData(){
        Rol rol = new Rol();
        rol.setActivo(true);
        rol.setNombreRol("Admin");
        rol = rolService.setRol(rol);

        Rol rol1 = new Rol();
        rol1.setActivo(true);
        rol1.setNombreRol("Reporte tiempo");
        rol1 = rolService.setRol(rol1);

        Rol rol2 = new Rol();
        rol2.setActivo(true);
        rol2.setNombreRol("Valoración registros");
        rol2 = rolService.setRol(rol2);

        Rol rol3 = new Rol();
        rol3.setActivo(true);
        rol3.setNombreRol("Automatización");
        rol3 = rolService.setRol(rol3);

        Rol rol4 = new Rol();
        rol4.setActivo(true);
        rol4.setNombreRol("Seguimiento");
        rol4 = rolService.setRol(rol4);

        Rol rol5 = new Rol();
        rol5.setActivo(true);
        rol5.setNombreRol("Reportes");
        rol5 = rolService.setRol(rol5);

        Proyecto proyecto = Proyecto.builder()
                .registroventa("456-121")
                .cliente("Clente")
                .proyecto("Peroyecto seguriad cliente")
                .descripcion("el proyecto le brinda dseguridad al cliente")
                .fechaInicio(new Date())
                .fechaFin(new Date())
                .clasificacion1("")
                .clasificacion2("")
                .clasificacion3("")
                .ingreso(true)
                .costo(true)
                .gasto(true)
                .activo(true)
                .build();

        proyecto = proyectoService.setProyecto(proyecto);
        Set<Proyecto> proyectoSet = new HashSet<>();
        proyectoSet.add(proyecto);
        Usuario usuario = Usuario.builder()
                .activo(true)
                .usuario("user")
                .password("$2b$10$No6qiJKRctxcf0qWQYo9beZohabnsPpjz6uNpZdeRt.ak3.PkIGEW")
                .cargo("admin")
                .documento("12231234")
                .email("dfdsfsd.com")
                .jefeInmediato("wil")
                .nombres("Wilmer Cardozo")
                .proyectoBase("proyecto")
                .rol(rol)
                .proyecto(proyecto)
                .build();
        usuario = usuarioService.createUser(usuario);

        Pagina pagina = Pagina.builder()
                .icon("ni ni-books text-primary")
                .isCollapsed(true)
                .rol(rol)
                .build();
        pagina = paginaService.setPagina(pagina);

        Ruta ruta = Ruta.builder()
                .path("/proyectos")
                .title("Proyectos")
                .icon("ni ni-app text-primary")
                .clase("")
                .pagina(pagina)
                .build();
        ruta = rutaService.setRuta(ruta);

        pagina = Pagina.builder()
                .icon("ni ni-time-alarm text-pink")
                .isCollapsed(true)
                .rol(rol1)
                .build();
        pagina = paginaService.setPagina(pagina);

        ruta = Ruta.builder()
                .path("/parametros")
                .title("Parametros")
                .icon("ni ni-time-alarm text-pink")
                .clase("")
                .pagina(pagina)
                .build();
        ruta = rutaService.setRuta(ruta);

        pagina = Pagina.builder()
                .icon("ni ni-ruler-pencil text-orange")
                .isCollapsed(true)
                .rol(rol2)
                .build();
        pagina = paginaService.setPagina(pagina);

        ruta = Ruta.builder()
                .path("/usuarios")
                .title("Usuarios")
                .icon("ni ni-ruler-pencil text-orange")
                .clase("")
                .pagina(pagina)
                .build();
        ruta = rutaService.setRuta(ruta);

        pagina = Pagina.builder()
                .icon("fa fa-cogs text-yellow")
                .isCollapsed(true)
                .rol(rol3)
                .build();
        pagina = paginaService.setPagina(pagina);

        ruta = Ruta.builder()
                .path("/roles")
                .title("Roles")
                .icon("fa fa-cogs text-yellow")
                .clase("")
                .pagina(pagina)
                .build();
        ruta = rutaService.setRuta(ruta);

        pagina = Pagina.builder()
                .icon("fa fa-search text-red")
                .isCollapsed(true)
                .rol(rol4)
                .build();
        pagina = paginaService.setPagina(pagina);

        ruta = Ruta.builder()
                .path("/paginas")
                .title("Paginas")
                .icon("fa fa-search text-red")
                .clase("")
                .pagina(pagina)
                .build();
        ruta = rutaService.setRuta(ruta);

        pagina = Pagina.builder()
                .icon("fa fa-file text-info")
                .isCollapsed(true)
                .rol(rol5)
                .build();
        pagina = paginaService.setPagina(pagina);

        ruta = Ruta.builder()
                .path("/notificaciones")
                .title("Notificaciones")
                .icon("fa fa-file text-info")
                .clase("")
                .pagina(pagina)
                .build();
        ruta = rutaService.setRuta(ruta);



    }


}
