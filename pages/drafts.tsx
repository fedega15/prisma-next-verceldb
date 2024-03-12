// pages/drafts.tsx
import React from "react";
import Router from "next/router";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import { useSession, getSession } from "next-auth/react";
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  const publishAllPosts = async () => {
    for (const post of props.drafts) {
      await fetch(`/api/publish/${post.id}`, {
        method: "PUT",
      });
      await Router.push("/");
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1>Movimientos diarios</h1>
        {props.drafts.length > 0 && (
          <button className="publish-all" onClick={publishAllPosts}>
            Publicar Todos
          </button>
        )}
        <main>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {props.drafts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{post.author.name}</td>
                  <td>
                    <PostActions post={post} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      <style jsx>{`
        .page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        h1 {
          font-size: 2em;
          margin-bottom: 20px;
          color: #003366; /* Azul oscuro para el título */
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
          border: 1px solid #ddd;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        }

        th,
        td {
          border: 1px solid #ddd;
          padding: 15px;
          text-align: left;
        }

        th {
          background-color: #003366; /* Azul oscuro para el fondo del encabezado de la tabla */
          color: white;
        }

        button {
          background: #001a33; /* Azul oscuro para el fondo del botón por defecto */
          color: white;
          border: 0;
          border-radius: 0.25rem;
          padding: 0.75rem 1.5rem;
          margin-right: 0.5rem;
          margin-bottom: 1rem;
          cursor: pointer;
        }

        button.publish-all {
          background: #003366; /* Verde para el fondo del botón de publicar todos */
        }

        button:hover {
          background: #436b95; /* Azul claro para el hover */
        }
        .delete {
          background: red; 
        }
      `}</style>
    </Layout>
  );
};

const PostActions: React.FC<{ post: PostProps }> = ({ post }) => {
  const handlePublish = async () => {
    await fetch(`/api/publish/${post.id}`, {
      method: "PUT",
    });
  };

  const handleDelete = async () => {
    await fetch(`/api/post/${post.id}`, {
      method: "DELETE",
    });
    await location.reload();
  };

  return (
    <>{!post.published && (
      <button className="publish" onClick={handlePublish}>
        Publicar
      </button>
    )}
    <button className="delete" onClick={handleDelete}>
      Eliminar
    </button>
    
    <style jsx>{`
      .publish {
        background-color: darkblue; /* Puedes cambiar el color según tus preferencias */
        color: black; /* Puedes ajustar el color del texto según tus preferencias */
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
      }
    
      .delete {
        background-color: red;
        color: BLACK;
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    
      /* Otros estilos que puedas necesitar */
    `}</style>
    
    </>
  );
};

export default Drafts;
