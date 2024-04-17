import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import { useState, useEffect } from "react";
import { createClient } from "pexels";

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

export default function Dashboard(props) {
  const [dreams, setDreams] = useState([]);
  const [renderDream, setRenderDream] = useState(null);
  const [dreamImage, setDreamImage] = useState(null);

  useEffect(() => {
    async function fetchDreams() {
      try {
        const response = await fetch("/api/dreams");
        const data = await response.json();
        setDreams(data);
      } catch (err) {
        console.error("Error fetching dreams:", err);
      }
    }

    fetchDreams();
  }, []);

  const displayDream = async (dream) => {
    // console.log("Dream Entry:", dream);
    setRenderDream(dream);

    const client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);
    const query = dream.title;
    // Pexel fetch image
    client.photos
      .search({ query, per_page: 1 })
      .then((photos) => {
        const imageUrl = photos.photos[0].src.large;
        setDreamImage(imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  };

  const deleteDream = async (dreamId) => {
    try {
      const response = await fetch("/api/dreams", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dreamId }),
      });
      if (response.ok) {
        const updatedDreams = dreams.filter((dream) => dream._id !== dreamId);
        setDreams(updatedDreams);
        setRenderDream(null);
      }
    } catch (error) {
      console.error("Error deleting dream:", error);
    }
  };

  return (
    <main>
      <h1>Dream History</h1>
      <p>
        You can view the details of each dream you have saved by clicking the
        title. An image based on your dream title will be displayed if
        available.
      </p>
      <div className="content">
        <h2>Saved Dream Entries</h2>
        <br />
        Below are your saved dream entries.
        <div className="dreamDates">
          {dreams.map((dream, index) => (
            <div key={index} className="dreamList">
              <p onClick={() => displayDream(dream)}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    displayDream(dream);
                  }}
                >
                  {dream.title}
                </a>
                <br />
                <i>{new Date(dream.date).toLocaleDateString()}</i>
                <br />
              </p>
            </div>
          ))}
        </div>
        {renderDream && (
          <div className="dreamDetails">
            <p>
              {dreamImage && (
                <img
                  src={dreamImage}
                  alt="Dream Image"
                  className="dreamImage"
                />
              )}
            </p>
            <h2>~ {renderDream.title} ~</h2>
            <p>
              <h3>Date </h3>
              {new Date(renderDream.date).toLocaleDateString()}
            </p>
            <p>
              <h3>Mood </h3>
              {renderDream.mood}
            </p>
            <p>
              <h3>Description </h3>

              {renderDream.description}
            </p>
            <button onClick={() => deleteDream(renderDream._id)}>
              Delete Entry
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
