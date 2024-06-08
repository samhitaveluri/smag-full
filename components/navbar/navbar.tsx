"use client";

import { useAuth } from "@/app/contexts/context";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { IoLogOut } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { currUser, logout } = useAuth()!;
    const nav = useRouter();
    const handleClick = () => {
        logout();
        nav.push("/");
    };
    return (
        <Card className="absolute right-0 m-2 w-40">
            <CardBody className="flex flex-row items-center justify-evenly p-3">
                <h2 className="text-normal">{currUser?.name}</h2>
                <Popover offset={20} className="">
                    <PopoverTrigger>
                        <Avatar />
                    </PopoverTrigger>
                    <PopoverContent className="p-1">
                        <Button className="p-2 min-w-0 " onClick={handleClick}>
                            <span className="text-normal italic">Logout</span>
                            <IoLogOut size={24} />
                        </Button>
                    </PopoverContent>
                </Popover>
            </CardBody>
        </Card>
    );
}
