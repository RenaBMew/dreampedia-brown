import React, { useState } from "react";

const DreamEntryForm = () => {
  const [dreamEntry, setDreamEntry] = useState({
    date: "",
    mood: "",
    title: "",
    description: "",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDreamEntry({ ...dreamEntry, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/dreams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dreamEntry),
      });
      if (response.ok) {
        console.log("Dream saved successfully!");
        setSaved(true);
        setDreamEntry({
          date: "",
          mood: "",
          title: "",
          description: "",
        });
        setTimeout(() => {
          setSaved(false);
        }, 3000);
      } else {
        console.error("Failed to save dream");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dreamForm">
      <br />

      <label>
        Date:
        <br />
        <input
          type="date"
          name="date"
          value={dreamEntry.date}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Mood:
        <br />
        <input
          type="text"
          name="mood"
          placeholder="How did this dream make you feel?"
          value={dreamEntry.mood}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Dream Title:
        <br />
        <input
          type="text"
          name="title"
          placeholder="An image will be generated based on this title."
          value={dreamEntry.title}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Dream Description:
        <br />
        <textarea
          name="description"
          placeholder="Add as long of a description as you'd like! Be sure to add notes about specific details, people, or places."
          value={dreamEntry.description}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      {/* Add image generation here */}
      {saved && <div className="savedMessage">Dream Entry Saved!</div>}
      <button type="submit" className="submit">
        Save Entry
      </button>
    </form>
  );
};

export default DreamEntryForm;
