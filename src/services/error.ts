import { showToastMessage } from '@/utils/helpers/toastMessage';

class APIError extends Error {
  code: string;

  constructor(message: string, code: string, options: ErrorOptions = {}) {
    super(message, options);
    this.name = 'APIError';
    this.message = message;
    this.code = code;
  }
}

const handleError = (error: Error) => {
  if (error instanceof APIError) {
    showToastMessage('error', error.message);
  } else {
    // eslint-disable-next-line no-console
    console.error(`Application Error:`, error);
  }
};

window.onerror = (_message, _source, _lineno, _colno, error) => {
  handleError(error);
};

export { APIError, handleError };
