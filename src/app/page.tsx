import Home from "./home/page";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await auth(); // Server-side auth check
  console.log("User => ", user);

  if (!user) {
    return redirect("/search"); // Redirect if not logged in
  }

  return <Home />;
}
