== Rest ==

// TODO : Use swagger

- Login
  - desc : Rest untuk login
  - url : /api/login
  - method : POST
  - request body : application/json
  - payload :
    - Email (string) (required)
    - Password (string) (required)
  - response :
    - code : number
    - status : enum (ok / not ok)
    - body : { jwt : string }
