// @ts-nocheck

import { FanValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: FanValues | null | undefined = useGetItem("fans");

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item} options={{ addToPc: true }}>
        <InfoItem name="Quantity" value={item.quantity} />
        <InfoItem name="Size" value={`${item.size} mm`} />
        <InfoItem name="RPM" value={`${item.rpm} RPM`} />
        <InfoItem name="Airflow" value={`${item.airflow} CFM`} />
        <InfoItem name="Noise" value={`${item.noise} dB`} />
        <InfoItem name="Color" value={item.color} />
      </Item>
    );
}
