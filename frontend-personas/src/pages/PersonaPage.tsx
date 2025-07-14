import React, { useEffect, useState } from "react";
import {
  getPersonas,
  createPersona,
  updatePersona,
  deletePersona,
  searchPersonas,
} from "../api/PersonaApi";
import { Persona } from "../models/Persona";
import PersonaCard from "../components/PersonaCard";
import PersonaForm from "../components/PersonaForm";
import SearchBar from '../components/SearchBar';

const PersonasPage: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPersona, setEditingPersona] = useState<Persona | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Cargar personas al montar el componente
  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPersonas();
      setPersonas(data);
      setIsSearching(false);
    } catch (err) {
      setError("Error cargando las personas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (texto: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchPersonas(texto);
      setPersonas(data);
      setIsSearching(true);
    } catch (err) {
      setError("Error buscando personas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    loadPersonas();
  };

  const handleCreate = () => {
    setEditingPersona(null);
    setShowForm(true);
  };

  const handleEdit = (persona: Persona) => {
    setEditingPersona(persona);
    setShowForm(true);
  };

  const handleSubmit = async (personaData: Omit<Persona, "id">) => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (editingPersona) {
        const personaToUpdate: Persona = {
          ...personaData,
          id: editingPersona.id,
        };
        await updatePersona(personaToUpdate);
      } else {
        await createPersona(personaData);
      }

      setShowForm(false);
      setEditingPersona(null);

      if (isSearching) {
        loadPersonas();
      } else {
        loadPersonas();
      }
    } catch (err) {
      setError(
        editingPersona ? "Error actualizando persona" : "Error creando persona"
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setError(null);
      await deletePersona(id);

      if (isSearching) {
        loadPersonas();
      } else {
        loadPersonas();
      }
    } catch (err) {
      setError("Error eliminando persona");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPersona(null);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Cargando personas...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <h1 style={{ margin: 0, color: "#333" }}>Gestión de Personas</h1>
        <button
          onClick={handleCreate}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          + Nueva Persona
        </button>
      </div>

      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "0.75rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            border: "1px solid #f5c6cb",
          }}
        >
          {error}
        </div>
      )}

      {isSearching && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "0.5rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            border: "1px solid #c3e6cb",
          }}
        >
          Mostrando resultados de búsqueda ({personas.length} encontradas)
        </div>
      )}

      {personas.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
          {isSearching
            ? "No se encontraron personas con ese criterio de búsqueda."
            : "No hay personas registradas."}
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {personas.map((persona) => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <PersonaForm
          persona={editingPersona || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isSubmitting}
        />
      )}
    </div>
  );
};

export default PersonasPage;
