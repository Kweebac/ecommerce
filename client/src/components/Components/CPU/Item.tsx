// @ts-nocheck

import { CPUValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: CPUValues | null | undefined = useGetItem("cpu");

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item} options={{ addToPc: true }}>
        <InfoItem name="Series" value={item.series} />
        <InfoItem name="Cores" value={`${item.cores} GB`} />
        <InfoItem name="Core clock" value={`${item.pCoreClock} MHz`} />
        <InfoItem name="Boost clock" value={`${item.pBoostClock} MHz`} />
        <InfoItem name="Integrated graphics" value={item.integratedGraphics} />
        <InfoItem name="Socket" value={`${item.socket}`} />
        <InfoItem name="TDP" value={`${item.tdp} W`} />
      </Item>
    );
}
