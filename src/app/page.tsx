import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route"; 

export default async function Home() {
  const session = await getServerSession(authOptions);
  // const { theme, toggleTheme } = useTheme();

  // const session = await getServerSession(authOptions);

  console.log(session)
  if (!session) {
    redirect("/login"); // 🔒 si no hay sesión, lo manda al login
  }

  return (
    <div>
        <h1>Hola mundo xdddd</h1>
        {/* <button onClick={toggleTheme}>
          Cambiar a {theme === "light" ? "dark" : "light"}
        </button> */}
    </div>
  );
}
