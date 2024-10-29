// @ts-nocheck

import { HeadphonesValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function HeadphonesItem() {
  const item: HeadphonesValues | null | undefined = useGetItem(
    "headphones",
    "accessories",
  );

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Microphone" value={item.microphone} />
        <InfoItem name="Wireless" value={item.wireless} />
        <InfoItem name="Frequency response" value={item.frequencyResponse} />
        <InfoItem name="Color" value={item.color} />
      </Item>
    );
}
