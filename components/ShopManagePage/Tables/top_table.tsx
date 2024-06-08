import { API } from "@/components/fetching";
import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  Skeleton,
  ModalBody,
  Spinner,
  ModalFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { useState } from "react";

export function TableMaker({
  products,
  title,
  description,
  loading,
  routeToHit,
}: {
  products: any[];
  title: string;
  description: string;
  loading: boolean;
  routeToHit: string;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [strategy, setStrategy] = useState("");
  const [product, setProduct] = useState("");

  const getBoost = async (item: string) => {
    setStrategy("");
    setProduct("");
    onOpen();
    try {
      const res = await API.get(routeToHit, {
        params: { product_name: item },
      });

      setStrategy(res.data.strategy);
      setProduct(item);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col grow">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {product === "" ? (
                  <Skeleton />
                ) : (
                  <p>
                    Strategy for Improving Sales of{" "}
                    <span className="capitalize">{product}</span>
                  </p>
                )}
              </ModalHeader>
              <ModalBody className="p-8">
                {product === "" ? <Spinner /> : <p>{strategy}</p>}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <h1 className="text-center">{title}</h1>
      <p className="text-center font-normal py-2">{description}</p>
      <Table title={title} aria-label={title}>
        <TableHeader className="text-lg">
          <TableColumn>NO</TableColumn>
          <TableColumn>PRODUCT</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={loading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={"No rows to display."}
        >
          {products &&
            products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="capitalize">{product}</TableCell>
                <TableCell>
                  <Button
                    className="font-semibold bg-gradient-to-r from-s1 to-s2 bg-black text-white rounded-xl p-2"
                    onClick={() => getBoost(product)}
                  >
                    Improve Sales
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
