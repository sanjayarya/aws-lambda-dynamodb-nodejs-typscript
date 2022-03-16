export module Errors {
  export class SyntaxError extends Error {
    constructor(public statusCode: number, body: Record<string, unknown>) {
      super(JSON.stringify(body));
    }
  }

  export class HttpError extends Error {
    constructor(public statusCode: number, body: Record<string, unknown>) {
      super(JSON.stringify(body));
    }
  }
}
