import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLError from "../../URLError";

type OSItem = {
  name: string;
  price: number;
  url: string;
};

export default function OSItem() {
  const [item, setItem] = useState<OSItem | null>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3000/api/components/os/${id}`);

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
        </div>
        <div className="grid w-[12rem] justify-items-center gap-2">
          <div className="text-3xl">£{item.price}</div>
          <button className="w-full rounded-md bg-green-3 py-3 text-xl text-white-1">
            Add to Cart
          </button>
        </div>
      </div>
    );
}
