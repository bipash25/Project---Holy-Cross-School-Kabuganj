import AdminLayout from "../layout/AdminLayout";

const CalendarManager = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Calendar Manager</h1>
          <p className="text-muted-foreground">
            Manage school calendar and events
          </p>
        </div>

        <div className="grid gap-6">
          {/* Add calendar management content here */}
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CalendarManager;
