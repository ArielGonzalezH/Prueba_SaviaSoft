import React, { useState, useEffect } from 'react';
import { Persona } from '../models/Persona';

interface PersonaFormProps {
    persona?: Persona; 
    onSubmit: (persona: Omit<Persona, 'id'>) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const PersonaForm: React.FC<PersonaFormProps> = ({ persona, onSubmit, onCancel, isLoading }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        fechaNacimiento: '',
        salario: 0
    });

    useEffect(() => {
        if (persona) {
            setFormData({
                nombre: persona.nombre,
                apellidos: persona.apellidos,
                email: persona.email,
                fechaNacimiento: persona.fechaNacimiento,
                salario: persona.salario
            });
        }
    }, [persona]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    return (
        <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div style={{ 
                backgroundColor: 'white', 
                padding: '2rem', 
                borderRadius: '8px', 
                minWidth: '400px',
                maxWidth: '500px'
            }}>
                <h2>{persona ? 'Editar Persona' : 'Nueva Persona'}</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Apellidos:</label>
                        <input
                            type="text"
                            name="apellidos"
                            value={formData.apellidos}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            name="fechaNacimiento"
                            value={formData.fechaNacimiento}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                        <label>Salario:</label>
                        <input
                            type="number"
                            name="salario"
                            value={formData.salario}
                            onChange={handleChange}
                            required
                            min="0"
                            step="0.01"
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isLoading ? 'Guardando...' : (persona ? 'Actualizar' : 'Crear')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonaForm;