"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { verifyUser } from "@utils/api/services/userService";

const VerifyPageContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("user");

  useEffect(() => {
    const verify = async () => {
      if (user) {
        try {
          const response = await verifyUser({ user: user as string });
          if (response.status === 200) {
            toast.success("Verification successful!");
            router.push("/");
          } else {
            toast.error("Verification failed. Please try again.");
            router.push("/register");
          }
        } catch (error) {
          toast.error("Something went wrong. Please try again.");
          router.push("/register");
        }
      }
    };

    verify();
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Verifying...</h1>
      </div>
    </div>
  );
};

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
