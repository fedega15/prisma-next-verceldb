

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
  createdAt:string
};
// components/Post.tsx
import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/")
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/")
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleDateString();

  const handlePublish = async () => {
    await publishPost(post.id);
  };

  const handleDelete = async () => {
    await deletePost(post.id);
  };

  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <p>By {post?.author?.name || "Unknown author"} On {formattedDate}</p>
      <ReactMarkdown children={post.content} />
      <div className="actions">
        {!post.published && (
          <button onClick={handlePublish}>Publicar</button>
        )}
        <button onClick={handleDelete}>Eliminar</button>
      </div>

      <style jsx>{`
        div {
          color: inherit;
          padding: 0.5rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 0.5rem 1rem;
          margin-right: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
