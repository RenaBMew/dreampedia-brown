import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup(props) {
  const router = useRouter();
  const [
    {
      username,
      astrologicalsign,
      password,
      "confirm-password": confirmPassword,
    },
    setForm,
  ] = useState({
    username: "",
    astrologicalsign: "",
    password: "",
    "confirm-password": "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      username,
      astrologicalsign,
      password,
      "confirm-password": confirmPassword,
      ...{ [e.target.name]: e.target.value.trim() },
    });
  }
  async function handleCreateAccount(e) {
    e.preventDefault();
    if (!username) return setError("Must include username");
    if (password !== confirmPassword) return setError("Passwords must Match");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ username, astrologicalsign, password }),
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
        <h1>Please Sign Up for an Account Below.</h1>

        <form onSubmit={handleCreateAccount} className="loginForm">
          <label htmlFor="username">:Username: </label>
          <br />
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="loginInput"
            onChange={handleChange}
            value={username}
          />
          <br />
          <label htmlFor="astrologicalsign">:Astrological Sign: </label>
          <br />
          <select
            name="astrologicalsign"
            id="astrologicalsign"
            onChange={handleChange}
            value={astrologicalsign}
          >
            <option value="">Select an astrological sign</option>
            <option value="Aries">Aries</option>
            <option value="Taurus">Taurus</option>
            <option value="Gemini">Gemini</option>
            <option value="Cancer">Cancer</option>
            <option value="Leo">Leo</option>
            <option value="Virgo">Virgo</option>
            <option value="Libra">Libra</option>
            <option value="Scorpio">Scorpio</option>
            <option value="Sagittarius">Sagittarius</option>
            <option value="Capricorn">Capricorn</option>
            <option value="Aquarius">Aquarius</option>
            <option value="Pisces">Pisces</option>
          </select>
          <br />
          {/* It would be good simply ask for birthdate and auto add sign to account based on given date, possibly also add chinese zodiac sign!*/}
          <label htmlFor="password">:Password: </label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="loginInput"
            onChange={handleChange}
            value={password}
          />
          <br />
          <label htmlFor="confirm-password">:Confirm Password: </label>
          <br />
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm Password"
            className="loginInput"
            onChange={handleChange}
            value={confirmPassword}
          />
          <br />
          <button>Submit</button>
          {error && <p>{error}</p>}
          <Link href="/login">
            <p>Login instead?</p>
          </Link>
        </form>
      </div>
    </main>
  );
}
