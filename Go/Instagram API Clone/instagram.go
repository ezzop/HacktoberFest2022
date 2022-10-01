package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"sync"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

//the Person structure to contain the various details
type Person struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name,omitempty" bson:"name,omitempty"`
	Email    string             `json:"email,omitempty" bson:"email,omitempty"`
	Password string             `json:"password,omitempty" bson:"password,omitempty"`
}

//the Post structure to contain the various details
type Post struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	User    primitive.ObjectID `json:"user,omitempty" bson:"user,omitempty"`
	Caption string             `json:"caption,omitempty" bson:"caption,omitempty"`
	Image   string             `json:"image,omitempty" bson:"image,omitempty"`
	Time    string             `json:"time,omitempty" bson:"time,omitempty"`
}

var client *mongo.Client
var lock sync.Mutex

//create Users Endpoint #Endpoint 1
func CreateUsersEndpoint(response http.ResponseWriter, request *http.Request) {
	lock.Lock()
	defer lock.Unlock()
	response.Header().Add("content-type", "application/json")
	var person Person
	json.NewDecoder(request.Body).Decode(&person)
	hash, err := bcrypt.GenerateFromPassword([]byte(person.Password), bcrypt.DefaultCost)
	person.Password = string(hash)
	if err != nil {
		fmt.Println(err)
	}
	collection := client.Database("instagramAPI").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection.InsertOne(ctx, person)
	json.NewEncoder(response).Encode(result)
	time.Sleep(1 * time.Second)
}

//Get Users Endpoint		#Endpoint 2
func GetUsersEndpoint(response http.ResponseWriter, request *http.Request) {
	lock.Lock()
	defer lock.Unlock()
	response.Header().Add("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var user Person
	collection := client.Database("instagramAPI").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err := collection.FindOne(ctx, Person{ID: id}).Decode(&user)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(user)
	time.Sleep(1 * time.Second)
}

//Create Post Endpoint #Endpoint 3
func CreatePostsEndpoint(response http.ResponseWriter, request *http.Request) {
	lock.Lock()
	defer lock.Unlock()
	response.Header().Add("content-type", "application/json")
	var post Post
	json.NewDecoder(request.Body).Decode(&post)
	post.Time = time.Now().Format("2006-01-02 15:04:05")
	collection := client.Database("instagramAPI").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection.InsertOne(ctx, post)
	json.NewEncoder(response).Encode(result)
	time.Sleep(1 * time.Second)
}

//Get Posts Endpoint	#Endpoint 4
func GetPostsEndpoint(response http.ResponseWriter, request *http.Request) {
	lock.Lock()
	defer lock.Unlock()

	response.Header().Add("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var post Post
	collection := client.Database("instagramAPI").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err := collection.FindOne(ctx, Post{ID: id}).Decode(&post)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}
	json.NewEncoder(response).Encode(post)
	time.Sleep(1 * time.Second)
}

//Get all Posts of an User Endpoint			#Endpoint 5
func GetAllPostsEndpoint(response http.ResponseWriter, request *http.Request) {
	lock.Lock()
	defer lock.Unlock()
	var postt []Post
	response.Header().Add("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var post Post
	collection := client.Database("instagramAPI").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	cur, err := collection.Find(ctx, bson.M{"user": id})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}

	for cur.Next(ctx) {
		err := cur.Decode(&post)
		if err != nil {
			response.WriteHeader(http.StatusInternalServerError)
			response.Write([]byte(`{"message": "` + err.Error() + `"}`))
			return
		}
		postt = append(postt, post)
	}
	for _, item := range postt {
		if item.User == id {
			json.NewEncoder(response).Encode(item)

		}
	}
	time.Sleep(1 * time.Second)
}

//Get all posts of an User based on Pagination			#Endpoint Extra Pagination
func GetAllPostsEndpointPager(response http.ResponseWriter, request *http.Request) {
	lock.Lock()
	defer lock.Unlock()
	var postt []Post
	response.Header().Add("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	limit, _ := strconv.Atoi(params["limit"])

	var post Post
	collection := client.Database("instagramAPI").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	cur, err := collection.Find(ctx, bson.M{"user": id})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message": "` + err.Error() + `"}`))
		return
	}

	for cur.Next(ctx) {
		err := cur.Decode(&post)
		if err != nil {
			response.WriteHeader(http.StatusInternalServerError)
			response.Write([]byte(`{"message": "` + err.Error() + `"}`))
			return
		}
		postt = append(postt, post)
	}
	for _, item := range postt {
		if item.User == id {
			if limit > 0 {
				limit--
				json.NewEncoder(response).Encode(item)
			}
		}
	}
	time.Sleep(1 * time.Second)
}

//Endpoint to get all the recent
func main() {
	//fmt.Println("Starting the application")
	//connector function
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017")) //connecting with mongo db client
	router := mux.NewRouter()

	//routers to various endpoints of the API
	router.HandleFunc("/users", CreateUsersEndpoint).Methods("POST")                              //users Creation API
	router.HandleFunc("/users/{id}", GetUsersEndpoint).Methods("GET")                             //users Get API
	router.HandleFunc("/posts", CreatePostsEndpoint).Methods("POST")                              //posts Creation API
	router.HandleFunc("/posts/{id}", GetPostsEndpoint).Methods("GET")                             //posts Get API by ID
	router.HandleFunc("/posts/users/{id}&limit={limit}", GetAllPostsEndpointPager).Methods("GET") //posts Get API using Pagination
	router.HandleFunc("/posts/users/{id}", GetAllPostsEndpoint).Methods("GET")                    //posts Get API by User ID

	http.ListenAndServe(":4000", router)
}
