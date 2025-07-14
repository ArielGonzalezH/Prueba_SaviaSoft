/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.prueba.demo.service;

import com.prueba.demo.model.Persona;
import com.prueba.demo.repository.PersonaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ariel
 */
@Service
public class PersonaService {
    @Autowired
    private PersonaRepository personaRepository;
    
    public List<Persona> listarPersonas() {
        return personaRepository.findAll();
    }
    
    public Persona crearPersona(Persona persona) {
        return personaRepository.save(persona);
    }
    
    public Optional<Persona> obtenerPorId(Long id) {
        return personaRepository.findById(id);
    }
    
    public Persona actualizarPersona(Persona persona) {
        return personaRepository.save(persona);
    }
    
    public void eliminarPersona(Long id) {
        personaRepository.deleteById(id);
    }
    
    public List<Persona> buscarPorNombreOApellido(String texto) {
        return personaRepository.findByNombreContainingIgnoreCaseOrApellidosContainingIgnoreCase(texto, texto);
    }
}
