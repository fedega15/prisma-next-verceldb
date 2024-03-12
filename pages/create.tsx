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
      // Detectar el tipo de movimiento en función del contenido del título
      const isEgreso = title.toLowerCase().includes("egreso");
      const isIngreso = title.toLowerCase().includes("ingreso");

      // Actualizar el estado del tipo de movimiento
      setMovementType(isEgreso ? "egreso" : isIngreso ? "ingreso" : "");

      const body = { title, content };
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
      <div className="page">
        <form onSubmit={submitData}>
          <h1>Cargar Nuevo</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Monto y tipo de movimiento"
            type="text"
            value={title}
          />
          {/* Mostrar aviso según el tipo de movimiento */}
          {movementType && (
            <p className={`movement-type ${movementType}`}>
              Este movimiento es un {movementType}
            </p>
          )}
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Descripcion"
            rows={8}
            value={content}
          />
          <div className="button-container">
            <input disabled={!content || !title} type="submit" value="Crear Movimiento" />
            <a className="back" href="#" onClick={() => Router.push("/")}>
              Cancelar
            </a>
          </div>
        </form>
      </div>
      <style jsx>{`
        .page {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          font-size: 2em;
          margin-bottom: 20px;
          color: #003366; /* Azul oscuro para el título */
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 1px solid #ddd;
        }

        input[type="submit"] {
          background: #003366; /* Azul oscuro para el fondo del botón */
          color: white;
          border: 0;
          border-radius: 0.25rem;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
        }

        .back {
          margin-left: 1rem;
          color: #003366; /* Azul oscuro para el enlace de cancelar */
          text-decoration: underline;
          cursor: pointer;
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

        .button-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
