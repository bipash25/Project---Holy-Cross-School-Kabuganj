import AdminLayout from "../layout/AdminLayout";

const AcademicsManager = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Academics Manager</h1>
          <p className="text-muted-foreground">
            Manage academic content and resources
          </p>
        </div>

        <div className="grid gap-6">
          {/* Add academic management content here */}
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AcademicsManager;
