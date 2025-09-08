


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import UserButton from "@/components/user-button";

// export default function Home() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];

//     if (!token) {
//       router.push("/signin"); //  UI login page
//     } else {
//       //Agar token hai, dashboard route pe bhejo
//       router.push("/dashboard");
//     }

//     setLoading(false);
//   }, [router]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen flex flex-col items-center p-6">
//       <UserButton />
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import UserButton from "@/components/user-button";

// export default function Home() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("token="))
//       ?.split("=")[1];

//     if (!token) {
//       router.replace("/signin"); // safer than push for redirects
//     } else {
//       router.replace("/dashboard");
//     }

//     // No need to set loading false if redirecting
//     // Only set loading false if you want to render something
//   }, [router]);

//   // Optionally show a loading spinner until redirect
//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <p className="text-center text-gray-500">Redirecting...</p>
//     </div>
//   );
// }



"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const token = cookies.find((row) => row.startsWith("token="))?.split("=")[1];

    if (token) {
      router.replace("/dashboard");
    } else {
      router.replace("/signin");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* <p className="text-center text-gray-500">Redirecting...</p> */}
    </div>
    // <div className="h-screen flex items-center justify-center bg-blue-500 text-white text-3xl font-bold">
    //   Tailwind is working 🚀
    // </div>
  );
}
