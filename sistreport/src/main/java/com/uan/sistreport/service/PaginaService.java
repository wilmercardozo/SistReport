package com.uan.sistreport.service;

import java.util.*;
import com.uan.sistreport.entity.Pagina;
import com.uan.sistreport.entity.Ruta;
import com.uan.sistreport.model.PaginaModel;
import com.uan.sistreport.model.RutaModel;
import com.uan.sistreport.repository.PaginaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaginaService {

    @Autowired
    PaginaRepository repository;

    public List<PaginaModel> findAll(){
        List<PaginaModel> paginaModels = new ArrayList<>();

        List<Pagina> paginas = repository.findAll();

        for(Pagina pagina : paginas){
            List<RutaModel> rutaModels = new ArrayList<>();
            for(Ruta ruta : pagina.getRutas()){
                RutaModel rutaModel = new RutaModel();
                rutaModel = RutaModel.builder()
                        .clase(ruta.getClase())
                        .icon(ruta.getIcon())
                        .path(ruta.getPath())
                        .title(ruta.getTitle())
                        .build();
                rutaModels.add(rutaModel);
            }
            PaginaModel paginaModel = new PaginaModel();
            paginaModel = PaginaModel.builder()
                    .icon(pagina.getIcon())
                    .isCollapsed(pagina.isCollapsed())
                    .rol(pagina.getRol().getNombreRol())
                    .paginas( rutaModels)
                    .build();
            paginaModels.add(paginaModel);
        }
        return paginaModels;
    }

    public Pagina setPagina(Pagina pagina){
        return repository.save(pagina);
    }
}
