// this is either from a YT video or chatGPT or both, it's not connected to my project in anyway, 
// I'm tryyyying to figure out how to connect everything but struggling for no reason. I know that at I have been able to work the CRUD stuff in the terminal, 
//but that's not helpful to me

package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"encoding/json"
	"net/http"
)

// Define your data structure- parses data for Mongo thru bson and for JS thru JSON
type QnaSet struct {
	Title         string `bson:"title" json:"title"`
	Question      string `bson:"question" json:"question"`
	Option        string `bson:"option" json:"option"`
	CorrectAnswer string `bson:"correctAnswer" json:"correctAnswer"`
}

// example handler to retrive quiz
func getQuizHandler(w http.ResponseWriter, r *http.Request) {
	//example quiz data
	firstQNA := QnaSet{
		Title:         "2024 Election Results",
		Question:      "Who won the US Presidency in 2024?",
		Option:        "Kamala Harris",
		CorrectAnswer: "Donald Trump",
	}
	w.Header().Set("Content-Type", "application/json")

	err := json.NewEncoder(w).Encode(firstQNA) //respond w JSON
	if err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
	}
}

func main() {

	http.HandleFunc("/quiz", getQuizHandler) //set up route
	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil)) //start server

	// MongoDB connection string (local)
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.TODO())

	// Connect to the quizzes collection in the 'createAQuiz' database
	collection := client.Database("createAQuiz").Collection("quizzes")

	// Example of inserting a quiz
	mathQna := QnaSet{
		Title:         "Sample Quiz",
		Question:      "What is 2+2?",
		CorrectAnswer: "4",
	}

	// Insert the quiz document into MongoDB
	result, err := collection.InsertOne(context.TODO(), mathQna)
	if err != nil {
		log.Fatal(err)
	}

	// Print the result (Inserted ID)
	fmt.Println("Inserted quiz with ID:", result.InsertedID)

	// Define a filter to find a specific quiz by title
	filter := bson.M{"title": "Sample Quiz"}
	// Variable to store the result
	// var foundQuiz Quiz

	// Find one document that matches the filter
	err = collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		log.Fatal("Quiz not found:", err)
	}

	fmt.Println(mathQna)
	// Print the result
	fmt.Println("Retrieved quiz:", result)

}
