"use client";

import { signOut } from "next-auth/react";

function SignOut() {
  return <button onClick={() => signOut()}>SignOut</button>;
}

export default SignOut;
