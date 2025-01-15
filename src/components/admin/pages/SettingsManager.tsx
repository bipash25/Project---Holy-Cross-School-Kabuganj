import AdminLayout from "../layout/AdminLayout";

const SettingsManager = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage website settings and configurations
          </p>
        </div>

        <div className="grid gap-6">
          {/* Add settings management features here */}
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SettingsManager;
