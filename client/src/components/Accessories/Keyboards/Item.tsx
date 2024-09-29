import { KeyboardValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function KeyboardItem() {
  const item: KeyboardValues | null | undefined = useGetItem(
    "keyboards",
    "accessories",
  );
  const styles = "w-40";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Style" value={item.style} styles={styles} />
        <InfoItem name="Mechanical" value={item.mechanical} styles={styles} />
        <InfoItem name="Tenkeyless" value={item.tenkeyless} styles={styles} />
        <InfoItem
          name="Wireless"
          value={
            item.wireless.join(", ") === "No, Yes" ? "Both" : item.wireless
          }
          styles={styles}
        />{" "}
        <InfoItem name="RGB" value={item.rgb} styles={styles} />
        <InfoItem name="Color" value={item.color} styles={styles} />
      </Item>
    );
}
