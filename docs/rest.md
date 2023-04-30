== Rest ==

=== Register ===

- desc : Rest untuk register
- url : /api/register
- method : POST
- request body : application/json
- payload :
  - Email (string) (required)
  - username (string) (required)
  - Password (string) (required)
- response :
  - code : number
  - data : { }
- error response :
  - code : number
  - data : null
  - reason : string

Example

```javascript
const email = "foo@gmail.com";
const username = "bar";
const password = "baz";

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, username, password }),
};

const response = await fetch("/api/register", requestOptions);
console.log(response);
// {code: 200, data : {}}
```

=== Login ===

- desc : Rest untuk login
- url : /api/login
- method : POST
- request body : application/json
- payload :
  - username (string) (required)
  - Password (string) (required)
- response :
  - code : number
  - data : { jwt : string }
- error response :
  - code : number
  - data : null
  - reason : string

example

```javascript
const username = "bar";
const password = "baz";

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
};

const response = await fetch("/api/login", requestOptions);
console.log(response);
/* {
  code: 200,
  data : { 
    token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJ1c2VybmFtZSI6ImZvbyIsInNlc3Npb25JZCI6IjY0NGUyMTE0YzU1YjVkNTJjODRiYTk2NSIsImlhdCI6MTY4Mjg0MTg3Nn0.BRW3cIZnIfylve7tACeIPxjUsra5Bvc-0BwZf9L8dAQ
    }
  }*/
```

=== Logout ===

- desc : Rest untuk logout
- url : /api/logout
- method : POST
- request body : application/json
- Header :
  - Authorization : JWT
- response :
  - code : number
  - data : { }
- error response :
  - code : number
  - data : null
  - reason : string

```javascript
const token = "your_jwt_token_here"; // Ganti dengan jwt token yang diterima dari /api/login

const myHeaders = new Headers();

myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", token);

const requestOptions = {
  method: "POST",
  headers: myHeaders,
};

const response = await fetch("/api/logout", requestOptions);
console.log(response);
/*
{
    "code": 200,
    "data": {}
} 
*/
```
