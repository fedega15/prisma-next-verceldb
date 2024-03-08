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

  return (
    <Layout>
      <div className="page">
        <h1>Agenda Semanal</h1>
        <main>
          {session ? (
            props.feed.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))
          ) : (
            <div>
              <p>Debes iniciar sesión para ver el contenido.</p>
            </div>
          )}
        </main>
      </div>
      <style jsx>{`
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
      `}</style>
    </Layout>
  );
};

export default Blog;
