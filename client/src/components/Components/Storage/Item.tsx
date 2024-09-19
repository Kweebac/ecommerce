import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLError from "../../URLError";

type StorageItem = {
  name: string;
  type: string;
  capacity: number;
  price: number;
  pricePerGb: number;
  url: string;
};

export default function StorageItem() {
  const [item, setItem] = useState<StorageItem | null>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/components/storage/${id}`,
      );

      if (res.status === 404) setItem(null);
      else {
        const data = await res.json();
        setItem(data);
      }
    })();
  }, [id]);

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <div className="mt-12 grid content-start justify-items-center">
        <div className="text-4xl">{item.name}</div>
        <div className="my-8 grid grid-flow-col content-start justify-center gap-12">
          <div>
            <img src={item.url} alt="GPU" className="h-[12rem] w-[12rem]" />
          </div>
          <div>
            <div className="grid grid-flow-col gap-6">
              <div className="grid content-start gap-0.5">
                <div>Type</div>
                <div>Capacity</div>
              </div>
              <div className="grid content-start gap-0.5">
                <div>{item.type}</div>
                <div>{item.capacity} GB</div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid w-[16rem] justify-items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-3xl">£{item.price}</div>
            <div className="text-lg">(£{item.pricePerGb} / GB)</div>
          </div>
          <button className="w-full rounded-md bg-green-3 py-3 text-xl text-white-1">
            Add to Cart
          </button>
        </div>
      </div>
    );
}
