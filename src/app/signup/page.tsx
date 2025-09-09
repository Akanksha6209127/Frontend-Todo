

// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardHeader,
//   CardDescription,
//   CardContent,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import Link from "next/link";
// import { useState } from "react";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { TriangleAlert } from "lucide-react";

// const SignUp = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [pending, setPending] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setPending(true);

    
//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match!");
//       setPending(false);
//       return;
//     }

//     try {
      
//       const { confirmPassword, ...payload } = form;

//       const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload), 
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success(data.message);
//         router.push("/signin"); 
//       } else {
//         setError(data.message || "Something went wrong!");
//       }
//     } catch (error) {
//       console.error("Signup error:", error);
//       setError("Failed to connect to server. Please try again later.");
//     } finally {
//       setPending(false);
//     }
//   };

//   return (
//     <div className="h-[100vh] flex items-center justify-center bg-white dark:bg-gray-900">

//       {/* <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8"> */}
//       <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white dark:bg-gray-800 text-black dark:text-white">

//         <CardHeader>
//           <CardTitle className="text-center">Sign up</CardTitle>
//           <CardDescription className="text-sm text-center text-accent-foreground">
//             Use email or service, to create account
//           </CardDescription>
//         </CardHeader>

//         {!!error && (
//           <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
//             <TriangleAlert />
//             <p>{error}</p>
//           </div>
//         )}

//         <CardContent className="px-2 sm:px-6">
//           <form onSubmit={handleSubmit} className="space-y-3">
//             <Input
//               type="text"
//               disabled={pending}
//               placeholder="Full name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               required
//             />
//             <Input
//               type="email"
//               disabled={pending}
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//             />
//             <Input
//               type="password"
//               disabled={pending}
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//             />
//             <Input
//               type="password"
//               disabled={pending}
//               placeholder="Confirm password"
//               value={form.confirmPassword}
//               onChange={(e) =>
//                 setForm({ ...form, confirmPassword: e.target.value })
//               }
//               required
//             />

//             {/* ✅ Button type="submit" */}
//             <Button
//               type="submit"
//               className="w-full"
//               size="lg"
//               disabled={pending}
//             >
//               Continue
//             </Button>
//           </form>

//           <Separator />

//           <p className="text-center text-sm mt-2 text-muted-foreground">
//             Already have an account?
//             <Link
//               className="text-sky-700 ml-2 hover:underline cursor-pointer"
//               href="/signin"
//             >
//               Sign in
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SignUp;


"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert, Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // 👈 password toggle
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 confirm password toggle
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      setPending(false);
      return;
    }

    try {
      const { confirmPassword, ...payload } = form;

      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        router.push("/signin");
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Failed to connect to server. Please try again later.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-white dark:bg-gray-900">
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white dark:bg-gray-800 text-black dark:text-white">
        <CardHeader>
          <CardTitle className="text-center">Sign up</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use email or service, to create account
          </CardDescription>
        </CardHeader>

        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <CardContent className="px-2 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="text"
              disabled={pending}
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              type="email"
              disabled={pending}
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            {/* Password Field with Eye Icon */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                disabled={pending}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password Field with Eye Icon */}
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                disabled={pending}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={pending}>
              Continue
            </Button>
          </form>

          <Separator />

          <p className="text-center text-sm mt-2 text-muted-foreground">
            Already have an account?
            <Link
              className="text-sky-700 ml-2 hover:underline cursor-pointer"
              href="/signin"
            >
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
