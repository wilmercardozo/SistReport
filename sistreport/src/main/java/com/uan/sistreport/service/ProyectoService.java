package com.uan.sistreport.service;

import java.util.*;
import com.uan.sistreport.entity.Proyecto;
import com.uan.sistreport.entity.Usuario;
import com.uan.sistreport.model.ParametroModel;
import com.uan.sistreport.model.ProyectoModel;
import com.uan.sistreport.model.ResponsableProyectoModel;
import com.uan.sistreport.repository.ProyectoRepository;
import com.uan.sistreport.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProyectoService {
    @Autowired
    ProyectoRepository repository;

    @Autowired
    UsuarioService usuarioService;

    public Proyecto setProyectoModel(ProyectoModel proyectoModel){

        List<ResponsableProyectoModel> responsableProyectoModel = proyectoModel.getResponsables();
        Set<Usuario> usuariosResponsables = new HashSet<>();
        for(ResponsableProyectoModel rmodel: responsableProyectoModel){
            usuariosResponsables.add(usuarioService.getUsuarioById(rmodel.getId()));
        }
        Proyecto proyecto = Proyecto.builder()
                .fechaInicio(proyectoModel.getFechaInicio())
                .activo(proyectoModel.isActivo())
                .gasto(proyectoModel.isGasto())
                .costo(proyectoModel.isCosto())
                .ingreso(proyectoModel.isIngreso())
                .clasificacion3(proyectoModel.getClasificacion3())
                .responsables(usuariosResponsables)
                .clasificacion2(proyectoModel.getClasificacion2())
                .clasificacion1(proyectoModel.getClasificacion1())
                .fechaFin(proyectoModel.getFechaFin())
                .descripcion(proyectoModel.getDescripcion())
                .proyecto(proyectoModel.getProyecto())
                .cliente(proyectoModel.getCliente())
                .registroventa(proyectoModel.getRegistroVenta())
                .build();
        return repository.save(proyecto);
    }
    public Proyecto setProyecto(Proyecto proyecto){
        return repository.save(proyecto);
    }

    public ProyectoModel getProyectoById(String id){
        return convertProyectoModel(repository.findById(id).orElse(Proyecto.builder().build()));
    }

    public List<Proyecto> findAll(){
        return repository.findAll();
    }

    public List<ProyectoModel> findAllProyecto(){
        List<ProyectoModel> proyectoModels = new ArrayList<>();
        List<Proyecto> proyectoList = repository.findAll();

        for(Proyecto proyecto: proyectoList){
            proyectoModels.add(convertProyectoModel(proyecto));

        }
        return proyectoModels;
    }

    public List<ParametroModel> findAllParametros(){
        List<ParametroModel> parametroModels = new ArrayList<>();
        List<Usuario> usuariosResponsables =  usuarioService.findAllResponsables();
        for (Usuario usuario:usuariosResponsables){
            parametroModels.add(ParametroModel.builder()
                    .tipo("Responsable")
                    .variable(usuario.getNombres())
                    .valor(usuario.getId().toString())
                    .build());
        }

        for (int i = 0; i < 20; i++){
            parametroModels.add(ParametroModel.builder()
                    .tipo("Clasificacion1")
                    .variable("Clasificacion1"+i)
                    .valor(i + "1")
                    .build());
        }

        for (int i = 0; i < 20; i++){
            parametroModels.add(ParametroModel.builder()
                    .tipo("Clasificacion2")
                    .variable("Clasificacion2"+i)
                    .valor(i + "1")
                    .build());
        }

        for (int i = 0; i < 20; i++){
            parametroModels.add(ParametroModel.builder()
                    .tipo("Clasificacion3")
                    .variable("Clasificacion3"+i)
                    .valor(i + "1")
                    .build());
        }

        return parametroModels;

    }

    public void deshabilitarProyecto(String id){
        Proyecto proyecto = repository.findById(id).orElse(null);
        proyecto.setActivo(false);
        repository.save(proyecto);

    }


    public ProyectoModel convertProyectoModel(Proyecto proyecto){
        List<ResponsableProyectoModel> responsableProyectoModels = new ArrayList<>();
        for(Usuario usuario:  proyecto.getResponsables()){
            ResponsableProyectoModel responsableProyectoModel = new ResponsableProyectoModel();
            responsableProyectoModel = ResponsableProyectoModel.builder()
                    .id(usuario.getId())
                    .nombre(usuario.getNombres())
                    .build();
            responsableProyectoModels.add(responsableProyectoModel);
        }
        ProyectoModel proyectoModel = new ProyectoModel();
        proyectoModel = ProyectoModel.builder()
                .proyecto(proyecto.getProyecto())
                .activo(proyecto.isActivo())
                .clasificacion1(proyecto.getClasificacion1())
                .clasificacion2(proyecto.getClasificacion2())
                .clasificacion3(proyecto.getClasificacion3())
                .cliente(proyecto.getCliente())
                .costo(proyecto.isCosto())
                .descripcion(proyecto.getDescripcion())
                .fechaFin(proyecto.getFechaFin())
                .fechaInicio(proyecto.getFechaInicio())
                .gasto(proyecto.isGasto())
                .ingreso(proyecto.isIngreso())
                .registroVenta(proyecto.getRegistroventa())
                .responsables(responsableProyectoModels)
                .build();
        return proyectoModel;
    }


}
