import { PSUValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: PSUValues | null | undefined = useGetItem("psu");
  const styles = "w-36";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Wattage" value={`${item.wattage} W`} styles={styles} />
        <InfoItem name="Rating" value={item.rating} styles={styles} />
        <InfoItem name="Color" value={item.color} styles={styles} />
      </Item>
    );
}
