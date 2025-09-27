import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"; 
import { SearchArtist } from "@/components/features/search-artist/SearchArtist";

export default async function SearchPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <SearchArtist />


    </main>
  );
}
