// @ts-nocheck

import { KeyboardValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function KeyboardItem() {
  const item: KeyboardValues | null | undefined = useGetItem(
    "keyboards",
    "accessories",
  );

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Style" value={item.style} />
        <InfoItem name="Mechanical" value={item.mechanical} />
        <InfoItem name="Tenkeyless" value={item.tenkeyless} />
        <InfoItem
          name="Wireless"
          value={
            item.wireless.join(", ") === "No, Yes" ? "Both" : item.wireless
          }
        />{" "}
        <InfoItem name="RGB" value={item.rgb} />
        <InfoItem name="Color" value={item.color} />
      </Item>
    );
}
