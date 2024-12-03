import { columns } from "@/components/custom/payroll-table/columns";
import { DataTable } from "@/components/custom/payroll-table/data-table";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchPayrollEntries, fetchPayrollSummary } from "@/lib/fetchers";
import { Suspense } from "react";

export default async function PayrollListPage() {
  const payrollEntries = await fetchPayrollEntries("this_month").catch(
    (err) => {
      console.error(err);
      return [];
    }
  );

  const payrollSummary = await fetchPayrollSummary().catch((err) => {
    console.error(err);
    return {
      total_payroll: 0,
      total_retentions: 0,
      average_salary: 0,
      average_retentions: 0,
    };
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 pt-2 pb-20 gap-4 w-full">
      <div className="flex items-center justify-between w-full gap-2">
        <h1 className="text-2xl font-bold">Payroll</h1>
      </div>
      <div className="flex flex-col items-start justify-center w-full h-full gap-4">
        <div className="flex items-center justify-between w-full gap-2">
          <h2 className="text-lg font-bold">Summary</h2>
        </div>
        <div className="flex items-center justify-start w-full h-full gap-4">
          <Card className="w-full">
            <CardHeader>
              <CardDescription>Total Payroll</CardDescription>
              <CardTitle>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(payrollSummary.total_payroll)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardDescription>Total Retentions</CardDescription>
              <CardTitle>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(payrollSummary.total_retentions)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardDescription>Average Salary</CardDescription>
              <CardTitle>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(payrollSummary.average_salary)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardDescription>Average Retentions</CardDescription>
              <CardTitle>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(payrollSummary.average_retentions)}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="flex items-center justify-between w-full gap-2">
          <h2 className="text-lg font-bold">Payroll Entries</h2>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <DataTable columns={columns} data={payrollEntries} />
        </Suspense>
      </div>
    </div>
  );
}
