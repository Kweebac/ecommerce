import { StorageValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";

export default function RAMItem() {
  const item: StorageValues | null | undefined = useGetItem("storage");
  const styles = "w-36";

  const options = {
    pricePerGb: true,
  };

  if (item)
    return (
      <Item item={item} options={options}>
        <InfoItem name="Type" value={item.type} styles={styles} />
        <InfoItem
          name="Capacity"
          value={`${item.capacity} GB`}
          styles={styles}
        />
      </Item>
    );
}
