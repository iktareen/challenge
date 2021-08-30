export class BaseRequest {
  descriptor;

  constructor( descriptor ) {
    this.descriptor = { ...descriptor };
  }
}

export class BaseApiError {
  error;
  wasHandled;

  constructor( error, wasHandled = false ) {
    this.error = error;
    this.wasHandled = wasHandled;
  }
}
