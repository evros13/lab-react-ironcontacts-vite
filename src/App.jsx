import "./App.css";
import actors from "./contacts.json"
import { useState } from 'react';

function App() {
  const fiveContacts = actors.slice(0, 5)
  const [contacts, setContacts] = useState(fiveContacts)

  function removeContact(actorId) {
    const removedActorArray = contacts.filter((actor) => {
      console.log(actor.id, actorId)
      return actor.id !== actorId
    })
    setContacts(removedActorArray);
  }
  
  function addRandomContact() {
    const resultArray = [ ... contacts];
    let randomContact;
    do {
      randomContact = actors[Math.floor(actors.length * Math.random())];
    } while (contacts.includes(randomContact));

    resultArray.push(randomContact)

    setContacts(resultArray)
  }
  
  function sortByName() {
    const sortingName = contacts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })

    const sortedName = [...sortingName]
    setContacts(sortedName)
  }

  function sortByPopularity() {
    const sortingPopularity = contacts.sort((a, b) => b.popularity - a.popularity)

    const sortedPopularity = [...sortingPopularity]
    setContacts(sortedPopularity)
  }


  return (

    <div className="container">
        <h2>Iron Contacts</h2>
        <button onClick={() => addRandomContact()}>Add Random Contact</button>
        <button onClick={() => sortByName()}>Sort by name</button>
        <button onClick={() => sortByPopularity()}>Sort by popularity</button>

      <table>
        <thead>
          <tr>
            <th className="headContainer">Picture</th>
            <th className="headContainer">Name</th>
            <th className="headContainer">Popularity</th>
            <th className="headContainer">Won an Oscar</th>
            <th className="headContainer">Won an Emy</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((actor) => (
          <tr>
            <td><img height="120px" src={actor.pictureUrl} alt="Actor's image" /></td>
            <td>{actor.name}</td>
            <td>{(actor.popularity).toFixed(2)}</td>

            {actor.wonOscar && <td>🏆</td>}
            {!actor.wonOscar && <td></td>}
            {actor.wonEmmy && <td>🌟</td>}
            {!actor.wonEmmy && <td></td>}

            <td><button className="deleteBtn" onClick={() => removeContact(actor.id)}>Delete</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
