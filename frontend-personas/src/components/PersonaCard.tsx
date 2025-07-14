import React from "react";
import { Persona } from "../models/Persona";

interface PersonaCardProps {
  persona: Persona;
  onEdit: (persona: Persona) => void;
  onDelete: (id: number) => void;
}

const PersonaCard: React.FC<PersonaCardProps> = ({
  persona,
  onEdit,
  onDelete,
}) => {
  const handleDelete = () => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar a ${persona.nombre} ${persona.apellidos}?`
      )
    ) {
      onDelete(persona.id);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
            {persona.nombre} {persona.apellidos}
          </h3>
          <p style={{ margin: "0.25rem 0", color: "#666" }}>
            <strong>Email:</strong> {persona.email}
          </p>
          <p style={{ margin: "0.25rem 0", color: "#666" }}>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {new Date(
              persona.fechaNacimiento + "T00:00:00"
            ).toLocaleDateString()}
          </p>
          <p style={{ margin: "0.25rem 0", color: "#666" }}>
            <strong>Salario:</strong> ${persona.salario.toLocaleString()}
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => onEdit(persona)}
            style={{
              padding: "0.25rem 0.5rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: "0.25rem 0.5rem",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonaCard;
