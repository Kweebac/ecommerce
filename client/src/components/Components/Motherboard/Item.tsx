import { useGetItem } from "../../../../src/utils";
import { MotherboardValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import URLError from "../../URLError";

type DDRSpeedsProps = {
  name: string;
  value: number[];
  styles: string;
};

export function DDRSpeeds({ name, value, styles }: DDRSpeedsProps) {
  const middle = Math.ceil(value.length / 2);
  const speedsFirstHalf = value.slice(0, middle).join(", ");
  const speedsSecondHalf = value.slice(middle).join(", ");

  return (
    <div className="grid rounded-xl border-t-4 border-t-[--background-color] bg-white-1 px-2 py-1.5">
      <span className="text-sm font-semibold text-green-3">{name}</span>
      <div>
        <div>{speedsFirstHalf}</div>
        <div>{speedsSecondHalf}</div>
      </div>
    </div>
  );
}

export default function MotherboardItem() {
  const item: MotherboardValues | null | undefined = useGetItem("motherboard");

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Chipset" value={item.chipset} />
        <InfoItem name="Form factor" value={item.formFactor} />
        <InfoItem name="CPU socket" value={item.cpuSocket} />
        <InfoItem name="RAM" value={item.ram.ddr} />
        <InfoItem name="RAM slots" value={item.ram.slots} />
        <DDRSpeeds name="RAM speeds" value={item.ram.ddrSpeeds} />
        <InfoItem name="M.2 M-key slots" value={item.m2Mkey} />
        <InfoItem name="PCIe 16x slots" value={item.pcie.x16} />
        <InfoItem name="PCIe 8x slots" value={item.pcie.x8} />
        <InfoItem name="PCIe 4x slots" value={item.pcie.x4} />
        <InfoItem name="PCIe 1x slots" value={item.pcie.x1} />
        <InfoItem name="Wi-Fi" value={item.wifi} />
        <InfoItem name="Color" value={item.color} />
      </Item>
    );
}
