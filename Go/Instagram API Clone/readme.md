# Instagram-API-Clone
It is a basic version of a RESTful API based on Instagram where we can
create user, get the users, create post and get post and get all posts of an
user.


## Description

A User has the Following details

    - Id
    - Name
    - Email
    - Password

A post has the Following details

    - Id
    - Caption
    - Image URL
    - Posted Timestamp

### Major Features

- **Feature 1-** Create an User using the details by the POST request
- **Feature 2-** Get an User using their ID by GET request
- **Feature 3-** Create a Post using the details by POST request
- **Feature 4-** Get a Post using the details of ID by GET request
- **Feature 5-** Get all Posts of  User using the the Unique ID of the User by GET request
- **Feature 6-** Impelmented Pagination to get all Posts of  User using the the Unique ID of the User by GET request

### Additonal Features

- Hashed to protect password so that it cannot be Reverse Engineered
- Implemented Thread security by Implementing Locks
- Fully Structured Code with code reusability
- Pagination for the list endpoint


eature 5-** Get all Posts of  User using the the Unique ID of the User by GET request
- **Feature 6-** Impelmented Pagination to get all Posts of  User using the the Unique ID of the User by GET request

### Additonal Features

- Hashed to protect password so that it cannot be Reverse Engineered
- Implemented Thread security by Implementing Locks
- Fully Structured Code with code reusability
- Pagination for the list endpoint

## Run Locally

Clone the project

```bash
  git clone https://github.com/ayan2809/Instagram-API-Clone
```

Install Dependencies
```bash
  git init test3
```

Run the Code

```bash
   go run instagram.go
```

## Usage/API Calls

#### To Create an Instagram user on the database using POST request

```bash
   http://localhost:4000/users
```
<p align="center">
 <img src=https://user-images.githubusercontent.com/42286904/136684495-c6f91779-df1e-4e3f-a795-a33305f1f67f.png>
 <img src=https://user-images.githubusercontent.com/42286904/136684497-81b67249-3be3-43ae-a974-e35312f2a845.png>
    </p>


#### To Get the user data using their unique id using the GET request

```bash
   http://localhost:4000/users/{id}
```

<p align="center">
 <img src=https://user-images.githubusercontent.com/42286904/136684548-76998012-d110-4b0c-91b9-caa40339be56.png>
    </p>



#### To Create an Instagram post on the database using POST request

```bash
   http://localhost:4000/posts
```
<p align="center">
 <img src=https://user-images.githubusercontent.com/42286904/136684575-f6464f2c-49e3-4f72-a7f8-3780adc44dd8.png>
 <img src=https://user-images.githubusercontent.com/42286904/136684581-fe796651-1f7a-4e11-a175-04624c83d674.png>
 </p>



#### To Get the instagram post data using the unique id of the post and  GET request

```bash
   http://localhost:4000/posts/{id}
```

<p align="center">
 <img src=https://user-images.githubusercontent.com/42286904/136684613-3bd4dcce-cc90-494d-9352-945deaf06e4b.png>
    </p>


#### To Get all the instagram posts of an user using the unique id of the user and GET request

```bash
   http://localhost:4000/posts/users/{id}
```

<p align="center">
 <img src=https://user-images.githubusercontent.com/42286904/136684640-1a856daf-bc7e-45b3-a97e-98c7a9cc4adb.png>
    </p>



#### To Get a certain limited instagram posts of an user using the unique id of the user and GET request

```bash
   http://localhost:4000/posts/users/{id}&limit=3
```
<p align="center">
 <img src=https://user-images.githubusercontent.com/42286904/136684675-85988eeb-8edc-4f0a-a5d1-0ff1994729d5.png>
 </p>



#### Thread Safety Feature using Locks
<p align="center">
 <img src=https://user-images.githubusercontent.com/42286904/136684686-1297ab23-d340-4804-a7c6-66d4f872a263.png>
</p>
