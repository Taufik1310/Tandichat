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
  - error : string
  - details : string

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
  - email (string) (required)
  - Password (string) (required)
- response :
  - code : number
  - data : { jwt : string }
- error response :
  - code : number
  - data : null
  - error : string
  - details : string
- JWT payload :
  {
  "Sessionid": number,
  "about": string,
  "email": string,
  "profile": string,
  "userID": number,
  "username": string
  }

Example

```javascript
const email = "bar";
const password = "baz";

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
};

const response = await fetch("/api/login", requestOptions);
console.log(response);
/* {
  code: 200,
  data : { 
    token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTZXNzaW9uaWQiOjIsImFib3V0IjoiSGVsbG8gaW0gdXNpbmcgdGFuZGljaGF0IiwiZW1haWwiOiJiYXJAZ21haWwuY29tIiwicHJvZmlsZSI6ImQzMDM1OGMzLTMwNmItNGE5YS1hZTIwLWQyM2Y0YWQ1MzQ2OSIsInVzZXJJRCI6MSwidXNlcm5hbWUiOiJmb28ifQ.jBokpV84B6N7SZAF_svkFWvvciHGpPaHDBdR9nWjte0
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
  - error : string
  - details : string

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

=== Get Profile Picture ===

- desc : Rest untuk mengambil profile picture
- url : /api/profile
- queryParams :
  - name (optional) : Image name (default jika tidak diberikan : default)
- method : GET
- response :
  - image
- error response :
  - code : number
  - data : null
  - error : string
  - details : string

```javascript
const fetchProfilePicture = async (imageName = "default") => {
  try {
    const queryParams = new URLSearchParams({ name: imageName }).toString();
    const url = `/api/profile?${queryParams}`;

    //Fetch image
    const response = await fetch(url);

    //Error handling
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    //Ambil blob nya
    const imageBlob = await response.blob();
    //Buat object
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error("Error fetching profile picture:", error.message);
  }
};

fetchProfilePicture()
  .then((imageUrl) => {
    console.log("Profile picture URL:", imageUrl);
  })
  .catch((error) => {
    console.error("Failed to fetch profile picture:", error);
  });
```

// TODO : Implement ini, benerin error handlin

== Change Profile Picture ==

- desc : Rest untuk mengubah profile picture
- url : /api/profile
- queryParams :
  - id (required) : jwt
- method : POST
- response :

  - "data": {
    "filename": string
    },
  - "message": string,
  - "status": number

- error response :
  - code : number
  - data : null
  - error : string
  - details : string
