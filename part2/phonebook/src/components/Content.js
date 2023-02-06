import React from "react";
const Content = ({ person, deleteNote }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deleteNote}>delete</button>
    </li>
  );
};

export default Content;
