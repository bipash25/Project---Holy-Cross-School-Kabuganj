import { Card } from "../ui/card";
import meetingImg from "../../assets/images/staff-meeting.webp";
import groupPhotoImg from "../../assets/images/staff-group.webp";

const StaffSection = () => {
  const staffImages = [
    {
      image: meetingImg,
      caption: "Staff Meeting with Principal",
    },
    {
      image: groupPhotoImg,
      caption: "Teaching Staff (Archive)",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Our Staff
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
