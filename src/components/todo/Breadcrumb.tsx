


// "use client";
// import { ChevronRight, Home } from "lucide-react";
// import { useRouter } from "next/navigation";

// type Props = {
//   expandedBoxId: string | null;
//   boxes: { _id: string; title: string; type: "todo" | "list" }[];
//   setExpandedBoxId: (id: string | null) => void;
//   scrollToSection: (type: "todo" | "list") => void;
//   scrollToTop?: () => void;
// };

// export default function Breadcrumb({ expandedBoxId, boxes, setExpandedBoxId, scrollToSection }: Props) {
//   const router = useRouter();
//   let crumbs: { label: string; onClick?: () => void }[] = [
//     { 
//       label: "Home", 
//       onClick: () => {
//         setExpandedBoxId(null);
        
//         router.push("/dashboard");
//       }, 

//     },
//   ];

//   if (expandedBoxId) {
//     const box = boxes.find((b) => b._id === expandedBoxId);
//     if (box) {
//       crumbs.push({
//         label: box.type === "todo" ? "Todos" : "Groceries",
//         onClick: () => {
//           setExpandedBoxId(null);
//           scrollToSection(box.type);
//         },
//       });
//       crumbs.push({ label: box.title });
//     }
//   }

//   return (
//     <div className="flex items-center gap-2 text-sm text-gray-700 mb-4 font-bold">
//       {crumbs.map((c, i) => (
//         <span
//           key={i}
//           className={`flex items-center gap-2 ${c.onClick ? "cursor-pointer hover:underline" : ""}`}
//           onClick={c.onClick}
//         >
//           {i > 0 && <ChevronRight size={20} />}
//           {i === 0 && <Home size={20} className="mr-1" />}
//           <span>{c.label}</span>
//         </span>
//       ))}
//     </div>
//   );
// }




"use client";

import { ChevronRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";

type BoxType = { _id: string; title: string; type: "todo" | "list" };

type BreadcrumbProps = {
  expandedBoxId: string | null;
  boxes: BoxType[];
  scrollToTop: () => void;
  setExpandedBoxId: (id: string | null) => void; // added


};

export default function Breadcrumb({ expandedBoxId, boxes, scrollToTop, setExpandedBoxId  }: BreadcrumbProps) {
  const router = useRouter();

  // Start with Home
  const crumbs: { label: string; onClick?: () => void }[] = [
    {
      label: "Home",
      onClick: () => {
        setExpandedBoxId(null); 
        scrollToTop(); // scroll to top of dashboard
        router.push("/dashboard"); // navigate if needed

      },
       
    },
     
    
  ];

  if (expandedBoxId) {
    const box = boxes.find((b) => b._id === expandedBoxId);
    if (box) {
      crumbs.push({
        label: box.type === "todo" ? "Todos" : "Groceries",
      });
      crumbs.push({ label: box.title });
    }
  }

  return (
    <nav className="flex items-center gap-2 text-white-700 mb-4 font-bold">
      {crumbs.map((c, i) => (
        <span
          key={i}
          className={`flex items-center gap-2 ${c.onClick ? "cursor-pointer hover:underline text-2xl" : ""}`}
          onClick={c.onClick}
        >
          {i === 0 && <Home size={25} className="mr-1" />}
          {i > 0 && <ChevronRight size={30} />}
          <span>{c.label}</span>
        </span>
      ))}
    </nav>
  );
}
