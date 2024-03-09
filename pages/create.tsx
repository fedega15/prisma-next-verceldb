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
      <div>
        <form onSubmit={submitData}>
          <h1>Cargar Nuevo</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Monto y tipo de movimiento  "
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
          <input disabled={!content || !title} type="submit" value="Crear Movimiento " />
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
