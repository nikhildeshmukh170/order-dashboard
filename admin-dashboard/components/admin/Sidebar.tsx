"use client";

import Image from "next/image";
import { adminSideBarLinks } from "@/constants";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "firebase/auth"; // Import Firebase user type
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../../config"; 

function Sidebar() {
  const auth = getAuth(app); // Initialize Firebase Auth
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); // Use User type
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set user if authenticated
      } else {
        setUser(null); // Set null if no user is authenticated
        router.push("/"); // Redirect if not authenticated
      }
    });
    return () => unsubscribe(); // Cleanup on component unmount
  }, [auth, router]);

  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src="/icons/admin/logo.png"
            alt="logo"
            height={37}
            width={37}
          />
          <h1>Smart-Order</h1>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          {adminSideBarLinks.map((link) => {
            const isSelected =
              (link.route !== "/admin" &&
                pathname.includes(link.route) &&
                link.route.length > 1) ||
              pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm",
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${isSelected ? "brightness-0 invert" : ""} object-contain`}
                    />
                  </div>

                  <p className={cn(isSelected ? "text-white" : "text-dark")}>
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user">
        <Avatar>
          <AvatarFallback className="bg-amber-100">
            {getInitials(user ? user.displayName || "IN" : "IN")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-dark-200">{user ? user.displayName : "Guest"}</p>
          <p className="text-xs text-light-500">{user?.email || "Guest email"}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
