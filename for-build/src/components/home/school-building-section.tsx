import { Card } from "../ui/card";

const SchoolBuildingSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <Card className="overflow-hidden">
          <div className="relative h-[400px] md:h-[500px]">
            <img
              src="@/assets/images/school_main_building_exterior.webp"
              alt="School Building"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 md:p-8 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Our Campus
                </h2>
                <p className="text-lg max-w-2xl">
                  A modern educational facility designed to provide the best
                  learning environment for our students. Our campus features
                  spacious classrooms, well-equipped laboratories, and extensive
                  grounds for sports and recreational activities.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SchoolBuildingSection;
