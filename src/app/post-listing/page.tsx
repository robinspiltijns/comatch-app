"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Authenticate from "@/components/Authenticate";
import { AuthContext } from "@/lib/AuthProvider";
import { useContext } from "react";

function PostCohousingForm() {}

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
        <div className="flex flex-row justify-center">
          <Authenticate />
        </div>
      );
      break;
    case "AUTHENTICATED":
      body = <div>To add flow for posting cohouse.</div>;
      break;
    default:
      body = <div>Error: Unknown state</div>; // Or any error state
  }

  return (
    <div>
      <h2 className="font-mono text-2xl py-3 px-5 lg:px-20 border-b-2 border-dotted">
        Zoekertje plaatsen
      </h2>
      <div className="p-5 lg:px-20">{body}</div>
    </div>
  );
}
