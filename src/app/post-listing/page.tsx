"use client";

import LoadingSpinner from "@/app/_components/LoadingSpinner";
import Authenticate from "@/app/_components/Authenticate";
import { AuthContext } from "@/lib/providers/AuthProvider";
import { useContext } from "react";
import PostCohousingForm from "@/app/post-listing/PostCohousingForm";

export default function PostListing() {
  const authState = useContext(AuthContext);

  let body: JSX.Element;

  switch (authState.type) {
    case "LOADING":
      body = (
        <div className="flex flex-row justify-center">
          <LoadingSpinner />
        </div>
      );
      break;
    case "UNAUTHENTICATED":
      body = (
        <div>
          <p className="mb-5">
            Log in of registreer om een zoekertje te plaatsen.
          </p>
          <div className="flex flex-row justify-center">
            <Authenticate />
          </div>
        </div>
      );
      break;
    case "AUTHENTICATED":
      body = <PostCohousingForm />;
      break;
    default:
      body = <div>Error: Unknown state</div>; // Or any error state
  }

  return (
    <div className="p-5 lg:px-20">
      <h1 className="mb-2">Zoekertje plaatsen</h1>

      <div>{body}</div>
    </div>
  );
}
