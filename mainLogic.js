let questionNumber = 1;

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
    event.preventDefault(); //prevents the automatic "erasing" of the text from the input fields once the form has been "submitted"
});

const savedUserInput = document.getElementById("savedUserInput");
savedUserInput.addEventListener('submit', event => {
    event.preventDefault();
});


function submitQNA() {
const formData = new FormData(formEl); // saves the user input data

    
const createdQuestion = formData.get("question");
const createdAnswer = formData.get("answer");
const createdFakeAnswer = formData.get("fakeAnswer");

  if (savedUserInput) {
    savedUserInput.innerHTML += `<p>Question ${questionNumber}: ${createdQuestion}</p>`;
    savedUserInput.innerHTML += `<p>Answer: ${createdAnswer}</p>`;
    savedUserInput.innerHTML += `<p>Fake Answer: ${createdFakeAnswer}</p>`;
    savedUserInput.innerHTML += `<br>`;
    questionNumber++;
} else {
    console.log("Element with class 'savedUserInput' not found.")
}  
console.log("This is the console log: ", createdQuestion, createdAnswer, createdFakeAnswer)
}

// fetch("http://localhost:8080/quiz")
// .then(response => response.json())
// .then(data => {
//     console.log("Quiz Data: ", data);
// })
// .catch(error => console.log("Error fetching quiz", error));

fetch("http://localhost:8080/quiz", { method: 'GET' }) //'GET' is the fetch method default, but I'm hard coding it to become accustomized to the syntax 
    .then(response => response.text()) // Use text() to inspect raw response
    .then(text => {
        console.log("Raw response:", text);
        return JSON.parse(text);
    })
    .catch(error => console.error("Error fetching quiz", error));



    fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: data
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))

const data = new URLSearchParams(formData);