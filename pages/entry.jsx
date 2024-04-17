import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import DreamEntryForm from "../components/DreamEntryForm";

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

export default function Entry(props) {
  return (
    <main>
      <h1>Create a Dream Entry</h1>
      <p>
        Use the form below to log an entry. You can also generate an image that
        can be saved to your dream entry by typing in a short description of
        your dream.
      </p>
      <div className="content">
        <DreamEntryForm />
      </div>
    </main>
  );
}
