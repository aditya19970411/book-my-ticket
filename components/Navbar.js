import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div
      className="flex justify-center items-center sticky left-0 w-56 top-0 bg-slate-400 font-semibold"
      style={{ height: "100vh" }}
    >
      <Link href="/movies">Movies</Link>
    </div>
  );
};
