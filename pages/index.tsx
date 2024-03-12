// pages/blog.tsx
import React from "react";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

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
      <>
        {!post.published && (
          <button className="publish" onClick={handlePublish}>
            Publicar
          </button>
        )}
        <button className="delete" onClick={handleDelete}>
          Eliminar
        </button>
      </>
    );
  };

  return (
    <Layout>
      <div className="page">
        <h1>Agenda Semanal</h1>
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
              {session ? (
                props.feed.map((post) => (
                  <tr key={post.id} className="post">
                    <td>{post.title}</td>
                    <td>{post.author.name}</td>
                    <td>
                      <PostActions post={post} />
                    </td>
                  </tr>
                ))
              ) : (
                <div>
                  <p>Debes iniciar sesión para ver el contenido.</p>
                </div>
              )}
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

        .post {
          background: white;
          transition: box-shadow 0.3s ease-in;
        }

        .post:hover {
          box-shadow: 2px 2px 3px 2px #aaa;
        }

        .post + .post {
          margin-top: 0.5rem;
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
      `}</style>
    </Layout>
  );
};

export default Blog;
