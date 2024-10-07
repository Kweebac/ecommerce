import { StorageValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function RAMItem() {
  const item: StorageValues | null | undefined = useGetItem("storage");

  const options = {
    pricePerGb: true,
    addToPc: true,
  };

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item} options={options}>
        <InfoItem name="Type" value={item.type} />
        <InfoItem name="Capacity" value={`${item.capacity} GB`} />
      </Item>
    );
}
