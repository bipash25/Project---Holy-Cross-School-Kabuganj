import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Card } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const FeeStructure = () => {
  const feeStructure = [
    {
      class: "Class 1-3",
      admission: 5000,
      monthly: 1000,
      exam: 1500,
      total: 18500,
    },
    {
      class: "Class 4-5",
      admission: 6000,
      monthly: 1200,
      exam: 1800,
      total: 22200,
    },
    {
      class: "Class 6-8",
      admission: 7000,
      monthly: 1500,
      exam: 2000,
      total: 27000,
    },
    {
      class: "Class 9-10",
      admission: 8000,
      monthly: 1800,
      exam: 2500,
      total: 32100,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Fee Structure</h1>

          <Card className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead>Admission Fee</TableHead>
                  <TableHead>Monthly Fee</TableHead>
                  <TableHead>Exam Fee (per term)</TableHead>
                  <TableHead>Total Annual Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feeStructure.map((fee) => (
                  <TableRow key={fee.class}>
                    <TableCell className="font-medium">{fee.class}</TableCell>
                    <TableCell>₹{fee.admission}</TableCell>
                    <TableCell>₹{fee.monthly}</TableCell>
                    <TableCell>₹{fee.exam}</TableCell>
                    <TableCell>₹{fee.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <div className="mt-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Additional Fees</h2>
              <Card className="p-6">
                <ul className="space-y-2 text-muted-foreground">
                  <li>Library Fee: ₹500 per year</li>
                  <li>Laboratory Fee: ₹1000 per year (Classes 6-10)</li>
                  <li>Computer Lab Fee: ₹800 per year</li>
                  <li>Sports Fee: ₹500 per year</li>
                </ul>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Payment Guidelines
              </h2>
              <Card className="p-6">
                <ul className="space-y-2 text-muted-foreground">
                  <li>Monthly fees must be paid by the 10th of each month</li>
                  <li>
                    Term fees are to be paid before the start of each term
                  </li>
                  <li>Late payment will incur a 5% surcharge</li>
                  <li>All fees are non-refundable</li>
                </ul>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Scholarships</h2>
              <Card className="p-6">
                <ul className="space-y-2 text-muted-foreground">
                  <li>Merit-based scholarships available for top performers</li>
                  <li>
                    Special consideration for economically disadvantaged
                    students
                  </li>
                  <li>Sibling discount: 10% for second child</li>
                </ul>
              </Card>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeeStructure;
