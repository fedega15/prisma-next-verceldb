import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';


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

  

  return (
    <nav>
      <div className="menu left">
        <button onClick={toggleLeftMenu}>
          <span className="bold"><FontAwesomeIcon icon={faBars} /> MENU </span>
      
        </button>
        {leftMenuOpen && (
          <div className={`dropdown-content ${leftMenuOpen ? 'left-open' : ''}`}>
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
  
      <div className="menu right">
        <button onClick={toggleRightMenu}>
          <span className="bold">  <FontAwesomeIcon icon={faUser} /> SESION</span>
        
        </button>
        {rightMenuOpen && (
          <div className={`dropdown-content ${rightMenuOpen ? 'right-open' : ''}`}>
            {session ? (
              <>
                <a>{session.user.email}</a>
                <button onClick={() => signOut()}>
                  <a className="ab">Cerrar Sesión</a>
                </button>
              </>
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
  
        .menu {
          margin-right: 1rem;
        }
  
        .menu.left {
          margin-right: auto;
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
          color: #003366;
        }
  
        span {
          margin-left: 5px;
        }
  
        .dropdown-content {
          display: flex;
          flex-direction: column;
          position: absolute;
          background-color: #003366; 
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
          z-index: 1;
        }
  
        .dropdown-content.left-open {
          left: 0;
        }
  
        .dropdown-content.right-open {
          right: 0;
        }
  
        .dropdown-content a {
            color: white;
          padding: 11px 5px;
          text-decoration: none;
          display: block;
        }
  
        .dropdown-content .ab {
          width: 100%;
          color: white;
          padding: 11px 5px;
          text-decoration: none;
          display: block;
        }
  
        .dropdown-content a:hover {
          background-color: #436b95;
        }
      `}</style>
    </nav>
  );  
};

export default Header;
