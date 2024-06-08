import { API, routes } from "@/components/fetching";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    useDisclosure,
    Spinner,
} from "@nextui-org/react";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { TableMaker } from "@/components/ShopManagePage/Tables/top_table";
import { AssociationTable } from "@/components/ShopManagePage/Tables/associate_table";
import { IoAdd, IoCloudUpload, IoTrashOutline } from "react-icons/io5";
import { toast } from "sonner";

function Predictor() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const formSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const date = (e.currentTarget[0] as any).value;
        try {
            const res = await API.get(routes.makePrediction, {
                params: { time: date },
            });

            setData(res.data.top_sold_items);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
    return (
        <>
            <Button
                variant="bordered"
                className="font-semibold border-[#80c9fb] p-2"
                onPress={() => {
                    onOpen();
                    setData([]);
                }}
            >
                Predict Sales For Range
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Top Selling Items in a 10 Day Window
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={formSubmitHandler}>
                                    <div className="flex gap-4 items-center justify-evenly pb-2">
                                        <label
                                            htmlFor="date"
                                            className="font-semibold"
                                        >
                                            Select Date
                                        </label>
                                        <input
                                            onChange={() => {
                                                setData([]);
                                            }}
                                            title="date"
                                            type="date"
                                            className="outline-none"
                                        ></input>
                                        <Button
                                            type="submit"
                                            variant="bordered"
                                            className="font-semibold border-[#80c9fb] rounded-xl p-2"
                                        >
                                            Predict
                                        </Button>
                                    </div>
                                </form>
                                {loading && <Spinner className="py-4" />}
                                {data.length > 0 && (
                                    <>
                                        <ul className="list-disc p-8">
                                            {/* <li className="list-none text-lg">Top Selling Items</li> */}
                                            {data.map((item, idx) => (
                                                <li
                                                    className="text-lg font-normal"
                                                    key={idx}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export function TabDisplay({ shop_details }: { shop_details: any }) {
    const [topProducts, setTopProducts] = useState<any[]>([]);
    const [bottomProducts, setBottomProducts] = useState<any[]>([]);
    const [associations, setAssociations] = useState<any>([]);
    const [currFile, setCurrFile] = useState<any | null>(null);
    const [isLoading, setLoading] = useState(false);

    const [loadingTopProducts, setLoadingTopProducts] = useState(false);
    const [loadingBottomProducts, setLoadingBottomProducts] = useState(false);
    const [loadingAssociations, setLoadingAssociations] = useState(false);

    const getTopProducts = async () => {
        setLoadingTopProducts(true);
        try {
            const res = await API.get(routes.getTopItems, {
                params: { shop_id: shop_details.shop_id },
            });

            setTopProducts(res.data.top_sold_items);
            // setTopProducts(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoadingTopProducts(false);
    };
    const getBottomProducts = async () => {
        setLoadingBottomProducts(true);
        try {
            const res = await API.get(routes.getBottomItems, {
                params: { shop_id: shop_details.shop_id },
            });

            setBottomProducts(res.data.bottom_sold_items);
            // setTopProducts(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoadingBottomProducts(false);
    };

    const getAssociations = async () => {
        setLoadingAssociations(true);
        try {
            const res = await API.get(routes.getAssociations, {
                params: { shop_id: shop_details.shop_id },
            });

            setAssociations(res.data.buy_patterns);
            console.log(res.data.buy_patterns);
        } catch (error) {
            console.log(error);
        }
        setLoadingAssociations(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrFile(e.target.files![0]);
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("file", currFile);
            formData.append("shop_id", shop_details.shop_id);

            const res = await API.post(
                routes.uploadFile + `?shop_id=${shop_details.shop_id}`,
                formData
            );
        } catch (err: any) {
            toast.error(err.toString());
        }
        setLoading(false);
    };

    useEffect(() => {
        getTopProducts();
        getBottomProducts();
        getAssociations();
    }, []);

    return (
        <Card className="p-4">
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <h1>
                        Shop ID :{" "}
                        <span className="font-normal">
                            {shop_details.shop_id}
                        </span>
                    </h1>
                    <h1>
                        Shop Name :{" "}
                        <span className="font-normal capitalize">
                            {shop_details.shop_name}
                        </span>
                    </h1>
                    <h1>
                        Shop District :{" "}
                        <span className="font-normal capitalize">
                            {shop_details.district}
                        </span>
                    </h1>
                    <h1>
                        Shop State :{" "}
                        <span className="font-normal capitalize">
                            {shop_details.state}
                        </span>
                    </h1>
                </div>
                <div className="flex flex-col gap-4">
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        {!currFile ? (
                            <Button className="cursor-pointer font-semibold bg-gradient-to-r from-s1 to-s2 bg-black text-white rounded-xl p-2">
                                <label className="flex justify-between items-center w-full cursor-pointer">
                                    <IoAdd size={28} />
                                    Upload Billing Data
                                    <input
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".csv"
                                    />
                                </label>
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="font-semibold bg-gradient-to-r from-s1 to-s2 bg-black text-white rounded-xl p-2"
                                isLoading={isLoading}
                            >
                                <IoCloudUpload size={25} />
                                Upload File
                            </Button>
                        )}
                        {currFile && (
                            <span
                                onClick={() => {
                                    setCurrFile(null);
                                }}
                                className="cursor-pointer flex p-2 text-xs justify-center hover:text-red-500"
                            >
                                <IoTrashOutline size={20} /> {currFile.name}
                            </span>
                        )}
                    </form>
                    <Predictor />
                </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-8">
                <AssociationTable
                    title="Buyer Pattern Analysis"
                    loading={loadingAssociations}
                    associations={associations}
                />
                <div className="flex gap-4 justify-evenly">
                    <TableMaker
                        products={topProducts}
                        title={"Top Selling Products"}
                        loading={loadingTopProducts}
                        routeToHit={routes.improveTopProductSales}
                        description={
                            "These are the products that are selling the most."
                        }
                    />
                    <TableMaker
                        products={bottomProducts}
                        title={"Worst Selling Products"}
                        loading={loadingBottomProducts}
                        routeToHit={routes.improveBottomProductSales}
                        description={
                            "These are the products that need to be pushed with offers."
                        }
                    />
                </div>
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    );
}
