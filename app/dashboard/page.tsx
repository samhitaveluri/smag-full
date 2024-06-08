"use client";

import { Card, CardHeader } from "@nextui-org/card";

import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
    const nav = useRouter();
    const pair = [
        {
            imgSrc: "/images/selecttrack/import.svg",
            btnText: "Manage your Shops",
            redirect: "/dashboard/shop-manage",
            heading: "Improve Sales",
        },
        {
            imgSrc: "/images/selecttrack/initiate.svg",
            btnText: "Start a new Shop",
            redirect: "/dashboard/shop-register",
            heading: "Get into business?",
        },
    ];

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-font center p-10 gap-16">
            <h1 className="text-4xl p-4 font-teko">
                So what should we help you with today?
            </h1>
            <div className="flex justify-around w-full">
                {pair.map((item, index) => (
                    <Card
                        key={`opt${index}`}
                        onPress={() => nav.push(item.redirect)}
                        className="hover:scale-105 cursor-pointer px-8"
                    >
                        <CardHeader className="flex flex-col">
                            <p className="text-md font-teko font-light">
                                {item.heading}
                            </p>
                            <h4 className="text-black text-3xl font-teko">
                                {item.btnText}
                            </h4>
                        </CardHeader>
                        <Image
                            priority
                            src={item.imgSrc}
                            onClick={() => nav.push(item.redirect)}
                            className="object-cover"
                            alt="Bring Your Own Data"
                            width={300}
                            height={400}
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Page;
