import { Card } from "../ui/card";

const StaffSection = () => {
  const staffImages = [
    {
      image: "@/assets/images/teachers_and_principal_meeting.webp",
      caption: "Staff Meeting with Principal",
    },
    {
      image: "@/assets/images/teachers_group_photo.webp",
      caption: "Teaching Staff (Archive)",
    },
    {
      image: "@/assets/images/teachers_day.webp",
      caption: "Teachers' Day Celebration",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Our Staff
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {staffImages.map((item, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-center text-muted-foreground">
                  {item.caption}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
