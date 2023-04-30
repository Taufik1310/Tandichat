//TODO : use inheritance
class badClientResponse {
  code: number;
  reason: string;
  data: null = null;

  constructor(code: 400 | 401 | 403 | 404, reason: string | "Bad Request" | "Unauthorized" | "Forbidden" | "Not Found") {
    this.code = code;
    this.reason = reason;
  }
}

class goodResponse {
  code: number;
  data: object;

  constructor(code: 200 | 201 | 202, data: object) {
    this.code = code;
    this.data = data;
  }
}

class badServerResponse {
  code: number;
  reason: string;
  data: null = null;

  constructor(code: 500 | 501 | 502 | 503 | number, reason: string | "Internal Server Error" | "Not Implemented" | "Bad Gateway" | "Service unavailable") {
    this.code = code;
    this.reason = reason;
  }
}

class schemaValidationResponse {
  code: number = 404;
  reason: string = "One or more field is not provided";
}

class headerValidationResponse {
  code: number = 404;
  reason: string;

  constructor(reason: string) {
    this.reason = reason;
  }
}

export default { goodResponse, badClientResponse, badServerResponse, schemaValidationResponse, headerValidationResponse };
