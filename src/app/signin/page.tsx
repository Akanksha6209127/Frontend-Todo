
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { TriangleAlert } from "lucide-react";
// import Cookies from "js-cookie";

// interface SignInForm {
//   email: string;
//   password: string;
// }

// const SignInPage: React.FC = () => {
//   const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
//   const [pending, setPending] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();
//   const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setPending(true);
//     setError(null);

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (res.ok && data.token) {
//         Cookies.set("token", data.token, { expires: 7, path: "/" });
//         toast.success(data.message || "Login successful!");
//         router.push("/dashboard");
//       } else {
//         setError(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Server error");
//     } finally {
//       setPending(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center py-10">
//       <Card className="w-[90%] sm:w-[420px] p-6 sm:p-8">
//         <CardHeader>
//           <CardTitle className="text-center">Sign in</CardTitle>
//           <CardDescription className="text-sm text-center">
//             Use your email and password
//           </CardDescription>
//         </CardHeader>

//         {error && (
//           <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
//             <TriangleAlert />
//             <p>{error}</p>
//           </div>
//         )}

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-3">
//             <Input
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               disabled={pending}
//               required
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               disabled={pending}
//               required
//             />
//             <Button type="submit" className="w-full" disabled={pending} size="lg">
//               {pending ? "Signing in..." : "Sign in"}
//             </Button>
//           </form>

//           <Separator className="my-4" />

//           <p className="text-center text-sm text-muted-foreground">
//             Don’t have an account?{" "}
//             <Link href="/signup" className="text-sky-700 ml-2 hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SignInPage;


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TriangleAlert, Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";

interface SignInForm {
  email: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const [form, setForm] = useState<SignInForm>({ email: "", password: "" });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // 👈 new state
  const router = useRouter();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        Cookies.set("token", data.token, { expires: 7, path: "/" });
        toast.success(data.message || "Login successful!");
        router.push("/dashboard");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <Card className="w-[90%] sm:w-[420px] p-6 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign in</CardTitle>
          <CardDescription className="text-sm text-center">
            Use your email and password
          </CardDescription>
        </CardHeader>

        {error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={pending}
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"} // 👈 toggle type
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                disabled={pending}
                required
                className="pr-10" // 👈 padding for eye icon
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Button type="submit" className="w-full" disabled={pending} size="lg">
              {pending ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <Separator className="my-4" />

          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-sky-700 ml-2 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
