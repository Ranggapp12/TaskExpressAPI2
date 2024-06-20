import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error(err));
  }, []);

  const addNote = (newNote) => {
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((data) => setNotes([...notes, data]))
      .catch((err) => console.error(err));
  };

  const deleteNote = (id) => {
    fetch(`/notes/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setNotes(notes.filter((note) => note.id !== id));
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <h1>Notes</h1>
      <NoteForm onAddNote={addNote} />
      <NoteList notes={notes} onDeleteNote={deleteNote} />
    </div>
  );
}

export default App;
