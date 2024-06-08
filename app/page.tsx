import Image from "next/image";
import LoginForm from "@/components/MainPage/loginForm";
import Nav from "@/components/nav";

export default function Home() {
    return (
        <main className="flex min-h-screen h-full flex-col items-center justify-center p-10">
            <Nav />
            <section className="w-full rounded-lg flex justify-between items-center px-12">
                <Image
                    priority
                    src="/images/loginPageSVG.svg"
                    width={500}
                    height={500}
                    alt=""
                />
                <LoginForm />
            </section>
        </main>
    );
}
