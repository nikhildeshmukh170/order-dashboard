// import { Session } from "next-auth";
"use client";
import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../../config";

function Header() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  return (
    <header className="admin-header">
      <div>
        <h2 className="text-2xl font-semibold text-dark-400">
          Welcome, {user ? user.displayName : "Guest"}
          
        </h2>
        <p className="text-base text-slate-500">
        {user?.email || "Guest email"}<br/>
          Handle all orders here
        </p>
      </div>

      {/*<p>Search</p>*/}
    </header>
  );
};
export default Header;