import {SignInBox} from "@/components/auth/sign-in";
import React from "react";

function page() {
  return (
    <div className="w-screen h-screen overflow-x-hidden flex justify-center items-center">
      <SignInBox />
    </div>
  );
}

export default page;
