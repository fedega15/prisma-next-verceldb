import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router"; // Asegúrate de tener esta importación

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [movementType, setMovementType] = useState(""); // Nuevo estado para el tipo de movimiento

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      // Verificar si se ha seleccionado un tipo de movimiento
      if (!movementType) {
        // Si no se ha seleccionado, mostrar un mensaje de error
        console.error("Selecciona un tipo de movimiento");
        return;
      }

      const body = { title, content, movementType };
      await fetch(`/api/post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Cargar Nuevo</h1>
          {/* Utilizar círculos como botones para seleccionar el tipo de movimiento */}
          <div className="circle-buttons">
            <div
              className={`circle egreso ${movementType === "egreso" ? "selected" : ""}`}
              onClick={() => setMovementType("egreso")}
            />Egreso
            <div 
              className={`circle ingreso ${movementType === "ingreso" ? "selected" : ""}`}
              onClick={() => setMovementType("ingreso")}
            />
            Ingreso
          </div>
          {/* Mostrar aviso según el tipo de movimiento */}
          {movementType && (
            <p >
              Este movimiento es un {movementType}
            </p>
          )}
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Monto "
            type="text"
            value={title}
          />
        
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Descripción"
            rows={8}
            value={content}
          />
          <input
            disabled={!content || !title || !movementType}
            type="submit"
            value="Crear Movimiento"
          />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            Cancelar
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .circle-buttons {
          display: flex;
          gap: 10px;
        }

        .circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s;
        }

        .egreso {
          background: red;
        }

        .ingreso {
          background: green;
        }

        .circle.selected {
          border: 2px solid black;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }

        /* Estilos para el aviso del tipo de movimiento */
        .movement-type {
          font-size: 14px;
          margin-top: 5px;
        }

        .egreso {
          color: red; /* Color para egresos */
        }

        .ingreso {
          color: green; /* Color para ingresos */
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
