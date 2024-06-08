import React from "react";
import { Spinner } from "@nextui-org/spinner";

type Props = {};

const Loading = (props: Props) => {
  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <Spinner size="lg" label="Loading...">
        Loading
      </Spinner>
    </main>
  );
};

export default Loading;
