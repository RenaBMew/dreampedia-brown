import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function Login(props) {
  const router = useRouter();
  const [{ username, password }, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  function handleChange(e) {
    setForm({ username, password, ...{ [e.target.name]: e.target.value } });
  }
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (res.status === 200) return router.push("/");
      const { error: message } = await res.json();
      setError(message);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <main>
      <div className="content">
        <h1>Welcome! Please log in below.</h1>
        <form onSubmit={handleLogin} className="loginForm">
          <label htmlFor="username">:Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="loginInput"
            onChange={handleChange}
            value={username}
          />
          <label htmlFor="password">:Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="loginInput"
            onChange={handleChange}
            value={password}
          />
          <button>Login</button>
          {error && <p>{error}</p>}
          <Link href="/signup">
            <p>Sign up instead?</p>
          </Link>
        </form>
      </div>
    </main>
  );
}
