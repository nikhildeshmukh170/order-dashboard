"use client";
import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../../config";

function AdminPage() {
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Welcome,{" "}
          <span className="font-semibold text-gray-800">
            {user ? user.displayName : "Guest"}
          </span>!
        </p>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
      <footer className="absolute bottom-4 text-sm text-gray-500">
        Powered by Firebase | Secure Admin Access
      </footer>
    </div>
  );
}

export default AdminPage;
