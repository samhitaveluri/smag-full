import RegisterForm from "@/components/RegisterPage/registerForm";
import Nav from "@/components/nav";
import Image from "next/image";
import React from "react";

type Props = {};

const Page = (props: Props) => {
    return (
        <main className="flex min-h-screen h-full flex-col items-center justify-center p-10">
            <Nav />
            <section className="w-full rounded-lg flex justify-between items-center px-12">
                <Image
                    alt="hero-image"
                    priority
                    src="/images/signupPageSVG.svg"
                    width={500}
                    height={500}
                />
                <RegisterForm />
            </section>
        </main>
    );
};

export default Page;
