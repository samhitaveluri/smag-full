"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/context";
import { API } from "@/components/fetching";
import { Tabs, Tab } from "@nextui-org/react";
import { TabDisplay } from "@/components/ShopManagePage/shopdetails";
import Loading from "./loading"; // Import your loading component

export default function Page() {
  const [shops, setShops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading

  const auth = useAuth();

  const getShops = async () => {
    try {
      const res = await API.get("/shops", {
        params: { user_id: auth?.currUser?.uuid },
      });
      // console.log(res.data);
      setShops(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading to false when data is fetched
    }
  };

  useEffect(() => {
    getShops();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading /> // Render the loading component while loading
      ) : (
        <div className="flex min-h-screen h-full flex-col items-center p-10 gap-8">
          <h1 className="text-4xl capitalize font-teko">
            Get insights on your stores here.
          </h1>
          <Tabs aria-label="Options" className="w-full justify-center">
            {shops &&
              shops.map((shop) => (
                <Tab
                  className="font-semibold text-md w-full"
                  key={shop.shop_id}
                  title={shop.shop_name}
                >
                  <TabDisplay shop_details={shop} />
                </Tab>
              ))}
          </Tabs>
        </div>
      )}
    </>
  );
}
