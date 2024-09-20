import { CPUCoolerValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";

export default function CPUItem() {
  const item: CPUCoolerValues | null | undefined = useGetItem("cpu-cooler");
  const styles = "w-48";

  if (item)
    return (
      <Item item={item}>
        <InfoItem name="RPM" value={`${item.rpm} RPM`} styles={styles} />
        <InfoItem name="Noise" value={`${item.noise} dB`} styles={styles} />
        <InfoItem
          name="CPU sockets"
          value={item.cpuSockets.join(", ")}
          styles={styles}
        />
        <InfoItem name="Color" value={item.color} styles={styles} />
        <InfoItem
          name="Water Cooled"
          value={item.waterCooled}
          styles={styles}
        />
        <InfoItem name="Height" value={`${item.height} mm`} styles={styles} />
      </Item>
    );
}
