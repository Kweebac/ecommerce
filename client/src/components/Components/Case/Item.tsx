import { CaseValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: CaseValues | null | undefined = useGetItem("case");
  const styles = "w-64";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Type" value={item.type} styles={styles} />
        <InfoItem
          name="Motherboard form factors"
          value={item.motherboardFormFactors.join(", ")}
          styles={styles}
        />
        <InfoItem name="Color" value={item.color} styles={styles} />
        <InfoItem
          name="Max GPU length"
          value={`${item.maxGpuLength} mm`}
          styles={styles}
        />
        <InfoItem name="Dimensions" value={item.dimensions} styles={styles} />
      </Item>
    );
}
