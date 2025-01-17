import { Button } from "./ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SEO } from "./ui/seo";

export function getStaticProps() {
  return {
    props: {},
    status: 404,
  };
}

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <SEO
        title="Page Not Found"
        description="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
        noindex={true}
      />
      <div className="text-center space-y-6 p-8">
        <h1 className="text-9xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-foreground">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mt-4"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
          <Button onClick={() => navigate("/")} className="mt-4" size="lg">
            <Home className="mr-2 h-5 w-5" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
