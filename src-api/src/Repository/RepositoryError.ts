export enum RepositoryErrorType {
  NotFound,
  Empty,
}
export class RepositoryError extends Error {
  errorType: RepositoryErrorType;

  constructor(message: string, errorType: RepositoryErrorType) {
    super(message);
    this.name = "RepositoryError";
    this.errorType = errorType;
    Object.setPrototypeOf(this, RepositoryError.prototype);
  }
}
