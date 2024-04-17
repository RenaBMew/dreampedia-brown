import styles from "./style.module.css";
import Link from "next/link";
import useLogout from "../../hooks/useLogout";
import Image from "next/image";

export default function Header(props) {
  const logout = useLogout();
  return (
    <header className={styles.container}>
      <p className={styles.links}>
        <Link href="/">
          <Image
            src="/dreamlogo.png"
            alt="Dreampedia Logo"
            width={80}
            height={50}
            className="dreamLogo"
          />
        </Link>
      </p>
      <div className={styles.links}>
        {props.isLoggedIn ? (
          <>
            <Link href="/entry">Log an Entry</Link>
            <Link href="/history">History</Link>
            <a onClick={logout} style={{ cursor: "pointer" }}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}
