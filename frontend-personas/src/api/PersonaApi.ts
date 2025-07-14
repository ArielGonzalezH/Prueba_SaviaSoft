import { Persona } from '../models/Persona';

const API_URL = 'http://localhost:8080/personas';

export const getPersonas = async (): Promise<Persona[]> => {
    const response = await fetch(API_URL, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Error fetching personas');
    };

    return response.json();
};

export const getPersonaById = async (id: number): Promise<Persona> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET'
    });

    if (!response.ok) {
        throw new Error('Error fetching persona by ID');
    }

    return response.json();
};

export const createPersona = async (persona: Omit<Persona, 'id'>): Promise<Persona> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona)
    });

    if (!response.ok) {
        throw new Error('Error creating persona');
    }

    return response.json();
};

export const updatePersona = async (persona: Persona): Promise<Persona> => {
    const response = await fetch(`${API_URL}/${persona.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(persona)
    });

    if (!response.ok) {
        throw new Error('Error updating persona');
    }

    return response.json();
};

export const deletePersona = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error('Error deleting persona');
    }
};

export const searchPersonas = async (texto: string): Promise<Persona[]> => {
    const response = await fetch(`${API_URL}/buscar?texto=${encodeURIComponent(texto)}`);
    if (!response.ok) {
        throw new Error('Error searching personas');
    }
    return response.json();
};