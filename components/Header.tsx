import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/" legacyBehavior>
        <a className="bold" data-active={isActive("/")}>
          Agenda Semanal
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Agenda Semanal
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin" legacyBehavior>
          <a data-active={isActive("/signup")}>Log in</a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/create" legacyBehavior>
          <a className="bold" data-active={isActive("/create")}>
            Cargar Movimiento
          </a>
        </Link>
        <Link href="/drafts" legacyBehavior>
          <a className="bold" data-active={isActive("/drafts")}>
            Movimientos Diarios
          </a>
        </Link>
        <Link href="/" legacyBehavior>
          <a className="bold" data-active={isActive("/")}>
            Agenda Semanal
          </a>
        </Link>

        <style jsx>{`
          .bold {
            align-items: start;
            font-weight: bold;
            color: gray;
          }

          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          .left {
            display: flex;
            align-items: center;
            margin-right: auto;
          }

          .left a[data-active="true"] {
            color: black;
          }

          a + a {
            margin-left: 1rem;
          }

          @media (max-width: 600px) {
            // Ajusta este valor según tus necesidades
            .left {
              flex-direction: column; // Cambia a un diseño de columna en pantallas más pequeñas
              align-items: flex-start; // Asegura que los elementos se alineen a la izquierda
            }

            a + a {
              margin-left: 0; // Elimina el margen izquierdo en pantallas más pequeñas
              margin-top: 0.5rem; // Agrega un espacio vertical entre los elementos
            }
          }
        `}</style>
      </div>
    );

    right = (
      <div className="right">
        <span>{session.user.email}</span>

        <button onClick={() => signOut()}>
          <a>Cerrar Sesion</a>
        </button>
        <style jsx>{`
          a {
            display: flex;
            text-decoration: none;
            color: #000;
          }

          p {
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin-top: 0rem; // Margen superior agregado
          }

          .right a {
            border: 1px solid black;
            padding: 0.5rem 1rem;
            border-radius: 3px;
            margin-bottom: 0.5rem;
          }

          button {
            background-color: white;
            border: none;
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: start;
          background-color: white;
        }
      `}</style>
    </nav>
  );
};

export default Header;
