// @ts-nocheck

import { MiceValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function MiceItem() {
  const item: MiceValues | null | undefined = useGetItem("mice", "accessories");

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem
          name="Wireless"
          value={
            item.wireless.join(", ") === "No, Yes" ? "Both" : item.wireless
          }
        />
        <InfoItem name="Max DPI" value={item.maxDpi} />
        <InfoItem name="Color" value={item.color} />
      </Item>
    );
}
