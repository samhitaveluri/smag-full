import Navbar from "@/components/navbar/navbar";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const Layout = (props: Props) => {
    return (
        <>
            <Navbar />
            {props.children}
        </>
    );
};

export default Layout;
