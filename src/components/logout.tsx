"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";



export default function LogoutButton() {
  const router = useRouter();
  const [confirmLogout, setConfirmLogout] = useState(false);

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0"; // delete cookie
    router.push("/api/login");
  };

  return (
    <div>
      {confirmLogout ? (
        <div className="flex gap-2 items-center">
          <button
            onClick={logout}
            className="bg-red-600 text-white px-2 py-1 text-sm rounded"
          >
            Yes
          </button>
          <button
            onClick={() => setConfirmLogout(false)}
            className="bg-gray-500 text-white px-2 py-1 text-sm rounded"
          >
            No
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmLogout(true)}
          className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <LogOut size={18} />
          
        </button>
      )}
    </div>
  );
}


