"use client";

import Image from "next/image";
import React from "react";
import styles from './Header.module.scss'
import { useTheme } from "@/context/ThemeContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const pathname = usePathname();
  const {data: session} = useSession()
  const { toggleTheme } = useTheme();

  const links = [
    { href: "/search", label: "Buscar" },
    { href: "/my-albums", label: "My albums" },
  ];

  return (
    <header className={styles.header}>
      <Image
        className={session ? styles.logoLg : ''}
        width={133}
        height={24}
        alt="logo"
        src={'/logo.svg'}
      />
      {
        session && (
          <Image
            className={styles.logoSm}
            width={26}
            height={26}
            alt="logo"
            src={'/icon_mobile.svg'}
          />
        )
      }

      {
        session && (
          <nav className={styles.nav}>
            {links.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`transition-colors ${
                    isActive ? styles.active : ''
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            |
            <button className={styles.btn} onClick={() => signOut()}>
              <Image
                className={styles.iconLogout}
                src={'/icon_logout.svg'}
                alt="/icon_logout.svg"
                width={24}
                height={24}
              />
              <span className={styles.textLogout}>Cerrar sesión</span>
            </button>
            <span className={styles.iconTheme}>|</span>
            <button className={styles.btn} onClick={toggleTheme}>
              <Image
                className={styles.iconTheme}
                src={'/icon_theme.svg'}
                alt="/icon_theme.svg"
                width={24}
                height={24}
              />
            </button>
          </nav>
        )
      }
    </header>
  );
};

export default Header;
