import React from "react";
import { Spinner } from "@nextui-org/spinner";

type Props = {};

const Loading = (props: Props) => {
  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <Spinner size="lg" label="Loading...">
        Loading
      </Spinner>
    </section>
  );
};

export default Loading;
