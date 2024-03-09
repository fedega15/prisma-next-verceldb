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
     location.reload();
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
    <div className="post-container">
      <div className="content">
        <div className="info">
          <h2>{post.title}</h2>
          <h5>
            {post?.author?.name || "Unknown author"} - {formattedDate}
          </h5>
          <ReactMarkdown children={post.content} />
        </div>
      <div className="actions">
        {!post.published && (
          <button onClick={handlePublish}>Publicar</button>
        )}
        <button onClick={handleDelete}>Eliminar</button>
      </div>
        
      </div><style jsx>{`
  .post-container {
    display: flex;
    flex-direction: column;
    color: inherit;
    padding: 0.3rem;
    border: 1px solid #ececec;
    margin-bottom: 1rem;
  }

  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .info {
    margin-bottom: 0.5rem;
    display: flex;
    flex-direction: column;  // Cambiado a columna para que los elementos se apilen verticalmente
  }

  h2,
  h5 {
    margin: 0;
    display: inline;  // Hacer que los encabezados se muestren en línea
    margin-bottom: 0.5rem;  // Añadir margen inferior entre h2 y h5
  }

  .text-content {
    margin-left: 1rem;
    flex-grow: 1;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  button {
    margin-right: 2px;
    height: 40px;
    background: #ececec;
    border: 0;
    border-radius: 0.125rem;
    padding: 0.2rem 1rem;
  }

  @media screen and (min-width: 601px) {
    .info {
      justify-content: space-between;
      flex-direction: row;  // Cambiado a fila para que los elementos se alineen horizontalmente
    }

    h2,
    h5 {
      margin-bottom: 0;  // Eliminar el margen inferior entre h2 y h5
      margin-right: 1rem;  // Añadir margen derecho entre h2 y h5
    }
  }
`}</style>
    </div>
  );
};

export default Post;
