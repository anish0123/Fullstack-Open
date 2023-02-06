import { useEffect, useState } from "react";
import Content from "./components/Content";
import ErrorNotification from "./components/ErrorNotification";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setSearch] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((personResponse) => {
      setPersons(personResponse);
      console.log("response received", personResponse.length);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    const newArray = persons.filter(function (person) {
      return person.name
        .toLocaleLowerCase()
        .includes(newSearch.toLocaleLowerCase());
    });
    setFilteredPersons(newArray);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const checkUser = persons.find((person) => person.name === newName);
    const newNameObject = {
      name: newName,
      number: newNumber,
    };
    if (!checkUser) {
      personService
        .addPersons(newNameObject)
        .then((personResponse) => {
          setPersons(persons.concat(personResponse));
          console.log("person added");
          console.log(persons);
          setNewName("");
          setNewNumber("");
          setMessage(`Added ${newNameObject.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log("add Person", error);
          setErrorMessage(
            ` ${newNameObject.name} could not be added. Please check the details you have entered. `
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    } else {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with new one?`
        )
      ) {
        personService
          .updatePerson(checkUser.id, newNameObject)
          .then((personResponse) => {
            setPersons(
              persons.map((p) => (p.id !== checkUser.id ? p : personResponse))
            );
            setFilteredPersons(
              persons.map((p) => (p.id !== checkUser.id ? p : personResponse))
            );
            setNewName("");
            setNewNumber("");
            setMessage(`Updated ${newNameObject.name}`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage(
              `Information of ${newNameObject.name} has already been removed from the server. `
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    }
  };

  const deleteSelectedNote = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          let notDeletedPersons = persons.filter(
            (filterPerson) => filterPerson.id !== person.id
          );
          setPersons(notDeletedPersons);
          setFilteredPersons(notDeletedPersons);
        })
        .catch((error) => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from the server. `
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
      <Filter value={newSearch} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {newSearch.length !== 0
          ? filteredPersons.map((person) => (
              <Content
                key={person.id}
                person={person}
                deleteNote={() => deleteSelectedNote(person)}
              />
            ))
          : persons.map((person) => (
              <Content
                key={person.id}
                person={person}
                deleteNote={() => deleteSelectedNote(person)}
              />
            ))}
      </ul>
    </div>
  );
};

export default App;
