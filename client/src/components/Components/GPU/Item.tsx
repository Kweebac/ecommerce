import { GPUValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function GPUItem() {
  const item: GPUValues | null | undefined = useGetItem("gpu");
  const styles = "w-40";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Chipset" value={item.chipset} styles={styles} />
        <InfoItem name="Memory" value={`${item.memory} GB`} styles={styles} />
        <InfoItem
          name="Core clock"
          value={`${item.coreClock} MHz`}
          styles={styles}
        />
        <InfoItem
          name="Boost clock"
          value={`${item.boostClock} MHz`}
          styles={styles}
        />
        <InfoItem name="Color" value={item.color} styles={styles} />
        <InfoItem name="Length" value={`${item.length} mm`} styles={styles} />
        <InfoItem name="TDP" value={`${item.tdp} W`} styles={styles} />
      </Item>
    );
}
