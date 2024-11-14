// So this is connected to HTML and kinda works, but the data isn't saved or anything. This is stupid, but I'm confused by how to connect the 
//server/browsers/idk-what-to-call-it >> Basically, when I open the html file by clicking "Live Server" it automatically runs on the 
//http://127.0.0.1:5500/html.html URL, and then the URL I had created from tutorials/chatGPT was "http://localhost:8080/quiz", so I need to somehow have all the
// files on the same URL, which I'm sure I can do, but then I start worrying ab it being on a private server, so I'm trying to set it up publically thru Vercel, 
//and that doesn't work... basically I haven't planned this project well, and idk where to go from here. I'm trying to use only HTML, CSS, JavaScript,
// Node.js + Express, GO and MongoDB. My README file should kind of explain it, but my current goal is to be saving user data and eventually have a dual usage,
// where some people create Tests, and other people can take them and get graded. It might be too advanced for me rn, but I am a all or nothing person, and I've 
// been doing the bare minimum in this course until I thought of this project that I find interesting, so I hate to quit on it

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
