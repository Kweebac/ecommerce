import { CaseValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: CaseValues | null | undefined = useGetItem("case");

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item} options={{ addToPc: true }}>
        <InfoItem name="Type" value={item.type} />
        <InfoItem
          name="Motherboard form factors"
          value={item.motherboardFormFactors.join(", ")}
        />
        <InfoItem name="Color" value={item.color} />
        <InfoItem name="Max GPU length" value={`${item.maxGpuLength} mm`} />
        <InfoItem name="Dimensions" value={item.dimensions} />
      </Item>
    );
}
