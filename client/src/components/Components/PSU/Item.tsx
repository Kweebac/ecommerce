import { PSUValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: PSUValues | null | undefined = useGetItem("psu");

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item} options={{ addToPc: true }}>
        <InfoItem name="Wattage" value={`${item.wattage} W`} />
        <InfoItem name="Rating" value={item.rating} />
        <InfoItem name="Color" value={item.color} />
      </Item>
    );
}
