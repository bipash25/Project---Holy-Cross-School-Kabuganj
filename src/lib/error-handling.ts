import { toast } from "@/components/ui/use-toast";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const handleError = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
};

export const showErrorToast = (error: unknown) => {
  const message = handleError(error);
  toast({
    title: "Error",
    description: message,
    variant: "destructive",
  });
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    switch (error.statusCode) {
      case 404:
        return "The requested resource was not found";
      case 401:
        return "You are not authorized to perform this action";
      case 403:
        return "Access forbidden";
      case 500:
        return "Internal server error. Please try again later";
      default:
        return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred. Please try again later";
};
