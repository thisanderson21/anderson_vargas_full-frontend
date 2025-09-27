import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"; 
import { MyAlbums } from "@/components/features/my-albums/MyAlbums";

export default async function MyAlbumsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <MyAlbums />
    </main>
  );
}
