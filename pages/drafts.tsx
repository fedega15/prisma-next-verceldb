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
    // Lógica para publicar todos los posts
    // Puedes usar un bucle para recorrer todos los drafts y publicarlos uno por uno
    for (const post of props.drafts) {
      await fetch(`/api/publish/${post.id}`, {
        method: "PUT",
      });
      await Router.push("/")
    }

    // Después de publicar todos los posts, puedes recargar la página o hacer alguna otra acción
  };

  return (
    <Layout>
      <div className="page">
        <h1>Movimientos diarios</h1>
        {props.drafts.length > 0 && (
          <button onClick={publishAllPosts}>Publicar Todos</button>
        )}
        <main>
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 0.5rem 1rem;
          margin-bottom: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
