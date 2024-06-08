"use client";

import { Card } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/context";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/react";

type Props = {};

export default function LoginForm({}: Props) {
  const router = useRouter();
  const { login } = useAuth()!;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      // @ts-ignore
      await login(e.target!.username.value, e.target!.password.value);
      toast.success("Login Successful");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.toString());
    }

    setLoading(false);
  };
  return (
    <>
      <Card className="w-1/3 p-4 h-96 flex flex-col justify-between ">
        <h1 className="text-2xl font-semibold text-center">Sign In</h1>
        <h2 className="text-center font-light text-sm tracking-wider">
          Please enter your details below
        </h2>
        <form className="flex flex-col p-4 gap-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your username"
            label="Username"
            name="username"
            id="username"
            isRequired
          />
          <Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            id="password"
            isRequired
          />
          <div className="h-8"></div>
          <Button
            type="submit"
            className="font-semibold bg-gradient-to-r from-s1 to-s2 bg-black text-white rounded-xl p-2"
          >
            {!loading ? (
              <span>Login</span>
            ) : (
              <Spinner size="sm" color="white" />
            )}
          </Button>
        </form>
        <Link href="/register">
          <p className="text-center text-sm">
            {"Don't have an account?"}
            <span className="text-s3"> Register here!</span>
          </p>
        </Link>
      </Card>
    </>
  );
}
