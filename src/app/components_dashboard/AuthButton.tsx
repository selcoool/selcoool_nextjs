"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Session } from "next-auth";

const AuthButton = () => {
  const { data: session } = useSession() as { data: Session | null };

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <div>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
          <button onClick={() => signIn("facebook")}>Sign in with Facebook</button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;
