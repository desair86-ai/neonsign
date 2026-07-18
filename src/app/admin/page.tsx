import { redirect } from "next/navigation";

export default function AdminIndex() {
  // Redirect to theme page by default
  redirect("/admin/theme");
}
