import AdminLayout from "../layout/AdminLayout";

const ContentManager = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Content Manager</h1>
          <p className="text-muted-foreground">
            Manage website content and pages
          </p>
        </div>

        <div className="grid gap-6">
          {/* Add content management features here */}
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ContentManager;
