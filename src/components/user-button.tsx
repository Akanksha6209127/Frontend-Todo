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

    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/me`, {
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
    router.push("/auth/signin");
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
            <a href="/signin">Sign in</a>
          </Button>
          <Button asChild>
            <a href="/signup">Sign up</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default UserButton;
