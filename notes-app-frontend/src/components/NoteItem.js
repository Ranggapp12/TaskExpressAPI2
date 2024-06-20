import React from 'react';

function NoteItem({ note, onDeleteNote }) {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.datetime}</p>
      <p>{note.note}</p>
      <button onClick={() => onDeleteNote(note.id)}>Delete</button>
    </div>
  );
}

export default NoteItem;
