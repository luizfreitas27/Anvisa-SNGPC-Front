import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/app/components/dashboard-client";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("sngpc_token")?.value;

  if (!token) {
    redirect("/");
  }

  return <DashboardClient token={token} />;
}
