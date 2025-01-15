import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "./button";
import { Alert, AlertDescription, AlertTitle } from "./alert";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  section?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Alert variant="destructive" className="m-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {this.props.section
              ? `${this.props.section} Error`
              : "Something went wrong"}
          </AlertTitle>
          <AlertDescription className="mt-2 flex flex-col gap-2">
            <p>{this.state.error?.message || "An unexpected error occurred"}</p>
            <Button
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}
