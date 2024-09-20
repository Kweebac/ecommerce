import { PSUValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";

export default function CPUItem() {
  const item: PSUValues | null | undefined = useGetItem("psu");
  const styles = "w-36";

  if (item)
    return (
      <Item item={item}>
        <InfoItem name="Wattage" value={`${item.wattage} W`} styles={styles} />
        <InfoItem name="Rating" value={item.rating} styles={styles} />
        <InfoItem name="Color" value={item.color} styles={styles} />
      </Item>
    );
}
