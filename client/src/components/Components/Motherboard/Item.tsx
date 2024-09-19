import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import URLError from "../../URLError";

type MotherboardItem = {
  name: string;
  chipset: string;
  formFactor: string;
  cpuSocket: string;
  ram: {
    ddr: string;
    slots: number;
    ddrSpeeds: number[];
  };
  m2Mkey: number;
  pcie: {
    x16: number;
    x8: number;
    x4: number;
    x1: number;
  };
  wifi: string;
  color: string;
  price: number;
  url: string;
};

function DDRSpeeds({ speeds }: { speeds: number[] }) {
  const middle = Math.ceil(speeds.length / 2);
  const speedsFirstHalf = speeds.slice(0, middle).join(", ");
  const speedsSecondHalf = speeds.slice(middle).join(", ");

  return (
    <div>
      <div>{speedsFirstHalf}</div>
      <div>{speedsSecondHalf}</div>
    </div>
  );
}

export default function MotherboardItem() {
  const [item, setItem] = useState<MotherboardItem | null>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `http://localhost:3000/api/components/motherboard/${id}`,
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
                <div>Chipset</div>
                <div>Form factor</div>
                <div>CPU Socket</div>
                <div>RAM</div>
                <div>RAM slots</div>
                <div>RAM speeds</div>
                <br></br>
                <div>M.2 M-key slots</div>
                <div>PCIe 16x slots</div>
                <div>PCIe 8x slots</div>
                <div>PCIe 4x slots</div>
                <div>PCIe 1x slots</div>
                <div>Wi-Fi</div>
                <div>Color</div>
              </div>
              <div className="grid content-start gap-0.5">
                <div>{item.chipset}</div>
                <div>{item.formFactor}</div>
                <div>{item.cpuSocket}</div>
                <div>{item.ram.ddr}</div>
                <div>{item.ram.slots}</div>
                <DDRSpeeds speeds={item.ram.ddrSpeeds} />
                <div>{item.m2Mkey}</div>
                <div>{item.pcie.x16}</div>
                <div>{item.pcie.x8}</div>
                <div>{item.pcie.x4}</div>
                <div>{item.pcie.x1}</div>
                <div>{item.wifi}</div>
                <div>{item.color}</div>
              </div>
            </div>
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
