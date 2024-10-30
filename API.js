import express, { json } from 'express';

const app = express();
app.use(json()); // parses incoming JSON data
const port = 3000;

let quizzes = []; // In-Memory storage for quizzes (use a database in production)

app.post('/api/quizzes', (req, res) => {
    const { name, questions } = req.body;
    const eachNewQuiz = { id: quizzes.length + 1, name, questions };
    quizzes.push(eachNewQuiz);
    res.status(201).json(eachNewQuiz); // RESTful POST reponse with status code 201
})

// below chunk is 'get' all quizzes
app.get('/api/quizzes', (req, res) => {
    res.json(quizzes); // RESTful GET to retrieve all quizzes
});

//below chunk is 'get' quizzes by id 
app.get('/api/quizzes/:id', (req, res) => {
    const quiz = quizzes .find(q => q.id === parseInt(req.params.id));
    if (!quiz) return res.status(404).send('Quiz not found');
    res.json(quiz); // RESTful GET to retrieve a single quiz by id
});

//below chunck is for UPDATING a quiz thru "put"
app.put('/api/quizzes/:id', (req, res) => {
    const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
    if (!quiz) return res.status(404).send('Quiz not found');

    const { name, questions } = req.body;
    quiz.name = name || quiz.name
    quiz.questions = questions || quiz.questions
    res.json(quiz); // RESTful PUT to update an existing quiz
});

// below chunk is for deleting a quiz thru DELETE
app.delete('/api/quizzes/:id', (req, res) => {
    const quizIndex = quizzes.findIndex(q => q.id === parseInt(req.params.id));
    if (quizIndex === -1) return res.status(404).send('Quiz not found')

        const deletedQuiz = quizzes.splice(quizIndex, 1);
        res.json(deletedQuiz); // RESTful DELETE to remove a quiz
});

app.post('/api/quizzes/:id/submit', (req, res) => {
    const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
    if (!quiz) return res.status(404).send('Quiz not found');

    const { answers } = req.body;
    const results = quiz.questions.map((q, i) => ({
        question: q.question,
        correct: q.answer === answers[i]
    }));
    res.json(results);
});

//Start the server
app.listen(port, () => {
    console.log(`This only logs at beginning of Node session thingy- Server running on ${port}`);
});

// The below chunk is not a part of current API program, may be educational tho
// // Define a simple GET endpoint
// app.get('/', (req, res) => {
//     res.send('Hello from my API!');
// });