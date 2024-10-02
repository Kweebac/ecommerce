import { CPUCoolerValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: CPUCoolerValues | null | undefined = useGetItem("cpu-cooler");

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="RPM" value={`${item.rpm} RPM`} />
        <InfoItem name="Noise" value={`${item.noise} dB`} />
        <InfoItem name="CPU sockets" value={item.cpuSockets.join(", ")} />
        <InfoItem name="Color" value={item.color} />
        <InfoItem name="Water cooled" value={item.waterCooled} />
        <InfoItem name="Height" value={`${item.height} mm`} />
      </Item>
    );
}
