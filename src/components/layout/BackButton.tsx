"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  href?: string;
};
export const BackButton = ({ href }: BackButtonProps) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => (href ? router.push(href) : router.back())}
      className="flex items-center text-blue-600"
      variant={"ghost"}
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </Button>
  );
};
