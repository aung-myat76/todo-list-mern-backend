class HttpError extends Error {
    public code: string | number;

    constructor(message: string, code: string | number) {
        super(message);
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export default HttpError;
