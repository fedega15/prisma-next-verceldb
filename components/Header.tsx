import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  // Estado para controlar la apertura/cierre de los menús desplegables
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);

  const toggleLeftMenu = () => {
    setLeftMenuOpen(!leftMenuOpen);
  };

  const toggleRightMenu = () => {
    setRightMenuOpen(!rightMenuOpen);
  };

  let left = (
    <div className="left">
      <button onClick={toggleLeftMenu}>
        <span className="bold">MENU</span>
        <span>&#9662;</span>
      </button>
      {leftMenuOpen && (
        <div className="dropdown-content">
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
        </div>
      )}
      <style jsx>{`
        .left {
          margin-right: 1rem;
        }

        button {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          display: flex;
          align-items: center;
        }

        .bold {
          font-weight: bold;
          margin-right: 5px;
        }

        span {
          margin-left: 5px;
        }

        .dropdown-content {
         
          display: flex;
          flex-direction: column;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          z-index: 1;
          
        }

        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          
        }
        

        .dropdown-content a:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );

  let right = (
    <div className="right">
      <button onClick={toggleRightMenu}>
        <span className="bold right">SESION</span>
        <span>&#9662;</span>
      </button>
      {rightMenuOpen && (
        <div className="dropdown-content">
          {session ? (
            <div>
              <span>{session.user.email}</span>
              <button onClick={() => signOut()}>
                <a>Cerrar Sesión</a>
              </button>
            </div>
          ) : (
            <Link href="/api/auth/signin" legacyBehavior>
              <a data-active={isActive("/signup")}>Log in</a>
            </Link>
          )}
        </div>
      )}
      <style jsx>{`
        .right {
          margin-left: 1rem;
        }

        button {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          display: flex;
          align-items: center;
        }

        .bold {
          font-weight: bold;
          margin-right: 5px;
        }

        span {
          margin-left: 5px;
        }

        .dropdown-content {
          display: flex;
          flex-direction: column;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          z-index: 1;
        }

        .dropdown-content a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }

        .dropdown-content a:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </div>
  );return (
    <nav>
      <div className="left">
        <button onClick={toggleLeftMenu}>
          <span className="bold">MENU</span>
          <span>&#9662;</span>
        </button>
        {leftMenuOpen && (
          <div className="dropdown-content common-menu">
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
          </div>
        )}
      </div>

      <div className="right">
        <button onClick={toggleRightMenu}>
          <span className="bold right">SESION</span>
          <span>&#9662;</span>
        </button>
        {rightMenuOpen && (
          <div className="dropdown-content common-menu">
            {session ? (
              <div>
                <span>{session.user.email}</span>
                <button onClick={() => signOut()}>
                  <a>Cerrar Sesión</a>
                </button>
              </div>
            ) : (
              <Link href="/api/auth/signin" legacyBehavior>
                <a data-active={isActive("/signup")}>Log in</a>
              </Link>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: start;
          background-color: white;
        }

        .left {
          margin-right: 1rem;
        }

        .right {
          margin-right: 7rem;
          margin-left: auto; /* Mueve el contenedor al extremo derecho */
        }

        button {
          background: none;
          border: none;
          padding: 0;
          font: inherit;
          cursor: pointer;
          outline: inherit;
          display: flex;
          align-items: center;
        }

        .bold {
          font-weight: bold;
          margin-right: 5px;
        }

        span {
          margin-left: 5px;
        }

        .common-menu {
          display: flex;
          flex-direction: column;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          z-index: 1;
          
        }

        .common-menu a {
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
        }

        .common-menu a:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </nav>
  
  );
};

export default Header;