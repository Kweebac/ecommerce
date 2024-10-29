// @ts-nocheck

import { RAMValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function RAMItem() {
  const item: RAMValues | null | undefined = useGetItem("ram");

  const options = {
    pricePerGb: true,
    addToPc: true,
  };

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item} options={options}>
        <InfoItem name="Modules" value={`${item.modules} GB`} />
        <InfoItem name="Type" value={item.ddr} />
        <InfoItem name="Speed" value={item.ddrSpeed} />
        <InfoItem name="First word latency" value={`${item.fwl} ns`} />
        <InfoItem name="CAS latency" value={item.cl} />
        <InfoItem name="Color" value={item.color} />
      </Item>
    );
}
