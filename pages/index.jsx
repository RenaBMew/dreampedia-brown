import Link from "next/link";
import Image from "next/image";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import { useEffect, useState } from "react";
import axios from "axios";

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

export default function Home(props) {
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoroscope = async () => {
      try {
        const astroSign = props?.user?.astrologicalsign;
        const response = await axios.get(
          `https://cors-anywhere.herokuapp.com/https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${astroSign}&day=TODAY`
        );
        setHoroscopeData(response.data.data.horoscope_data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (props.isLoggedIn && props.user) {
      fetchHoroscope();
    }
  }, [props.isLoggedIn, props.user]);

  return (
    <main>
      <div>
        <div className="welcome">
          <div className="welcome-bg">
            <Image
              src="/dreambg.png"
              alt="background image"
              objectFit="cover"
              fill={true}
            />
          </div>
        </div>
        <div className="herobanner">
          <h1 className="splashTitle">Welcome to</h1>
          <p className="heroTitle">Dreampedia</p>
          <hr></hr>
          <p>
            Dreams are a window into our subconscious and can provide insight
            into our thoughts and emotions. Oneirology and is a field of
            psychology that studies the meaning of dreams. Dreams can be a
            reflection of our daily lives, our fears, our hopes, and our
            desires.
            <br />
            The typical person tends to have 3-5 dreams per night, but most
            people forget 95-99% of their dreams. By logging your dreams, you
            can better understand your subconscious and gain insight into your
            thoughts and emotions.
          </p>
          <p>
            Dreampedia provides you with a resource to log your dreams, track
            your dream mood, and reflect on events in your in life.
          </p>
        </div>
        <div>
          {props.isLoggedIn ? (
            <div className="content">
              <h2>Welcome Back, {props?.user?.username}!</h2>
              <hr></hr>
              <br />
              <Image
                src={`/${props?.user?.astrologicalsign}.jpg`}
                alt="Horoscope Sign Image"
                width={600}
                height={400}
                className="astroPic"
              />
              <h3>Your Daily Horoscope</h3>
              <hr></hr>
              <br />
              Below is todays horoscope for{" "}
              <b>~{props?.user?.astrologicalsign}~</b>
              <hr></hr>
              <br />
              <div>
                {error ? <i>Error: {error}</i> : <i>{horoscopeData}</i>}
              </div>
            </div>
          ) : (
            <b>
              Please <Link href="/login">Log in</Link> or{" "}
              <Link href="/signup">Sign Up</Link> to get started.
            </b>
          )}
        </div>
      </div>
    </main>
  );
}
