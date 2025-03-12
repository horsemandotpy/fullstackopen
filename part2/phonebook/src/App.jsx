import { useState } from "react";

function Person({ persons, filter }) {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.name.toLowerCase()),
        )
        .map((ele) => (
          <p key={ele.name}>
            {ele.name} - {ele.number}
          </p>
        ))}
    </>
  );
}

function PersonForm({ newPerson, setNewPerson }) {
  return (
    <>
      <div>
        name:{" "}
        <input
          onChange={(e) => {
            setNewPerson({ ...newPerson, name: e.target.value });
          }}
        />
      </div>
      <div>
        number:
        <input
          onChange={(e) => {
            setNewPerson({ ...newPerson, number: e.target.value });
          }}
        />
      </div>
    </>
  );
}

function Filter({ filter, setFilter }) {
  return (
    <div>
      filter shown with
      <input
        onChange={(e) => {
          setFilter({ ...filter, name: e.target.value });
        }}
      />
    </div>
  );
}

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState({ name: "" });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <form>
        <h3>Add a new</h3>
        <PersonForm newPerson={newPerson} setNewPerson={setNewPerson} />
        <div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (persons.find((person) => person.name === newPerson.name)) {
                alert(`${newPerson.name} is already added to phonebook`);
                return;
              }
              setPersons(persons.concat([newPerson]));
              setNewPerson({ name: "", number: "" });
            }}
          >
            add
          </button>
        </div>
        <h2>Numbers</h2>
        <Person persons={persons} filter={filter} />
        <div>
          debug: {newPerson.name} {newPerson.number}
        </div>
      </form>
    </div>
  );
}

export default App;
