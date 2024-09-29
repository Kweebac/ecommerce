import { MiceValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function MiceItem() {
  const item: MiceValues | null | undefined = useGetItem("mice", "accessories");
  const styles = "w-32";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem
          name="Wireless"
          value={
            item.wireless.join(", ") === "No, Yes" ? "Both" : item.wireless
          }
          styles={styles}
        />
        <InfoItem name="Max DPI" value={item.maxDpi} styles={styles} />
        <InfoItem name="Color" value={item.color} styles={styles} />
      </Item>
    );
}
