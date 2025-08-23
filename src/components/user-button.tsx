// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useSession, signOut } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { Loader } from "lucide-react";
// import { Button } from "@/components/ui/button";

// import Link from "next/link";

// const UserButton = () => {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
//   }

//   const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
//     const handleSignOut = async () => {
//         await signOut({
//             redirect: false,
//         });
//         router.push("/")
// }
//   return (
//     <nav>
//       {session ? (
//         <DropdownMenu modal={false}>
//           <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
//             <div className="flex gap-4 items-center">
//               <span>{session.user?.name}</span>
//               <Avatar className="size-10 hover:opacity-75 transition">
               
//                 <AvatarFallback className="bg-sky-900 text-white">
//                   {avatarFallback}
//                 </AvatarFallback>
//               </Avatar>
//             </div>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="center" side="bottom" className="w-50">
//             <DropdownMenuItem className="h-10" onClick={()=>handleSignOut()}>Log out</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ) : (
//         <div className="flex justify-end p-4 gap-4">
//           <Button>
//             <Link href="sign-in">Sign in</Link>
//           </Button>
//           <Button>
//             <Link href="sign-up">Sign up</Link>
//           </Button>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default UserButton;




"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const UserButton = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      setLoading(false);
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.name);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSignOut = () => {
    document.cookie = "token=; path=/; max-age=0";
    router.push("/api/login");
  };

  if (loading) return <Loader className="h-6 w-6 mr-4 mt-4 float-right animate-spin" />;

  return (
    <nav>
      {userName ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8">
            <div className="flex gap-4 items-center">
              <span>{userName}</span>
              <Avatar className="h-10 w-10 hover:opacity-75 transition">
                <AvatarFallback className="bg-sky-900 text-white">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <DropdownMenuItem className="h-10" onClick={handleSignOut}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex justify-end p-4 gap-4">
          <Button asChild>
            <a href="/sign-in">Sign in</a>
          </Button>
          <Button asChild>
            <a href="/sign-up">Sign up</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default UserButton;
