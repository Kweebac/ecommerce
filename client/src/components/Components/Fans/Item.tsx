import { FanValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: FanValues | null | undefined = useGetItem("fans");
  const styles = "w-36";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Quantity" value={item.quantity} styles={styles} />
        <InfoItem name="Size" value={`${item.size} mm`} styles={styles} />
        <InfoItem name="RPM" value={`${item.rpm} RPM`} styles={styles} />
        <InfoItem
          name="Airflow"
          value={`${item.airflow} CFM`}
          styles={styles}
        />
        <InfoItem name="Noise" value={`${item.noise} dB`} styles={styles} />
        <InfoItem name="Color" value={item.color} styles={styles} />
      </Item>
    );
}
