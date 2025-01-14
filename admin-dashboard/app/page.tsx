"use client";
import { useState, useEffect } from "react";
import app from "../config";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Page from "./admin/page";

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/admin");
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 via-indigo-700 to-white-500 text-white">
      {user ? (
        <Page />
      ) : (
        <div className="max-w-md text-center p-8 bg-white rounded-lg shadow-lg text-gray-800">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-indigo-600">Admin Portal</span>
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Manage everything in one place. Sign in to get started!
          </p>
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-full font-semibold py-3 px-6 rounded-full shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <img
              src="https://banner2.cleanpng.com/20240111/qtv/transparent-google-logo-colorful-google-logo-with-bold-green-1710929465092.webp"
              alt="Google Icon"
              className="w-6 h-6 mr-3"
            />
            Sign In with Google
          </button>
          <div className="mt-6 text-gray-500 text-sm">
            By signing in, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
