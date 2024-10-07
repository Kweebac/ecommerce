import { GPUValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function GPUItem() {
  const item: GPUValues | null | undefined = useGetItem("gpu");

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item} options={{ addToPc: true }}>
        <InfoItem name="Chipset" value={item.chipset} />
        <InfoItem name="Memory" value={`${item.memory} GB`} />
        <InfoItem name="Core clock" value={`${item.coreClock} MHz`} />
        <InfoItem name="Boost clock" value={`${item.boostClock} MHz`} />
        <InfoItem name="Color" value={item.color} />
        <InfoItem name="Length" value={`${item.length} mm`} />
        <InfoItem name="TDP" value={`${item.tdp} W`} />
      </Item>
    );
}
