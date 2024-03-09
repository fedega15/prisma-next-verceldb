export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  createdAt: string;
  movementType: string; // Nueva propiedad para el tipo de movimiento
};

// components/Post.tsx
import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}
const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  const handlePublish = async () => {
    await publishPost(post.id);
  };

  const handleDelete = async () => {
    await deletePost(post.id);
  };
console.log(post)
  return (
    <div
      className="post-container"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <div className="content">
        <div className="text-content">
          <h2>{post.title}</h2>
        </div>
        <div className="text-content">
          <h2>{post.movementType}</h2>
        </div>
        <div className="text-content">
          <h5>
            {post?.author?.name || "Unknown author"} - {formattedDate}
          </h5>
        </div>
        <div className="text-content">
          <ReactMarkdown children={post.content} />
        </div>
        <div className="actions">
          {!post.published && <button onClick={handlePublish}>Publicar</button>}
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      </div>

      <style jsx>{`
        .post-container {
          display: flex;
          justify-content: space-between;
          color: inherit;
          padding: 0.3rem;
          border: 1px solid #ececec;
          margin-bottom: 1rem;
        }

        .content {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .info {
          display: flex;
          flex-direction: column;
        }

        h2,
        h5 {
          margin: 0;
        }

        .text-content {
          margin-left: 1rem;
          flex-grow: 1;
        }

        .actions {
          display: flex;
          align-items: start;
        }

        button {
          margin-right:2px;
          height: 30px;
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 0.2rem 1rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
