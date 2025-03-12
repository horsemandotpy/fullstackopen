const express = require("express");
const morgan = require("morgan");
const app = express();

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(express.json());

app.use(
  morgan("tiny", {
    stream: "ok"  }),
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send(`<h1>Hello Bitch</h1>`);
});

app.get("/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const template = `
    <h1>Phonebook has info for ${persons.length}</h1>
    ${date.toString()}
  `;

  response.send(template);
});

app.get("/api/perons/:id", (request, response) => {
  const id = request.params.id;
  const note = persons.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

const generateId = (notes) => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  const noteId = String(maxId + 1);
  return noteId;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.number) {
    return response.status(400).json({
      error: "number is missing",
    });
  }

  if (!body.name) {
    return response.status(400).json({
      error: "name is missing",
    });
  }

  const namelist = persons.map((person) => person.name);

  if (namelist.includes(body.name)) {
    return response.json({
      error: "Name must be unique",
    });
  }

  const note = {
    id: generateId(persons),
    name: body.name,
    number: body.number || false,
  };

  console.log(note);
  persons.concat(note);

  response.json(note);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

app.use(unknownEndpoint);
