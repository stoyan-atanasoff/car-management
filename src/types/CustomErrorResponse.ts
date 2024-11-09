export interface CustomErrorResponse extends Error {
  response: {
    errors: CustomError[] | CustomErrorExtension[];
    data: null;
  }
}

interface CustomError {
  message: string;
  path: string[];
}

export interface CustomErrorExtension {
  message: string;
  path: string[];
  extensions?: ErrorExtension;
}

interface ErrorExtension {
  field: string;
}

// Type guard to check if an error is a CustomErrorExtension
export function isCustomErrorExtension(error: CustomError | CustomErrorExtension): error is CustomErrorExtension {
  return 'extensions' in error && !!error.extensions && 'field' in error.extensions;
}
