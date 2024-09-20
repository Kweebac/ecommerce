import { RAMValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";

export default function RAMItem() {
  const item: RAMValues | null | undefined = useGetItem("ram");
  const styles = "w-52";

  const options = {
    pricePerGb: true,
  };

  if (item)
    return (
      <Item item={item} options={options}>
        <InfoItem name="Modules" value={`${item.modules} GB`} styles={styles} />
        <InfoItem name="Type" value={item.ddr} styles={styles} />
        <InfoItem name="Speed" value={item.ddrSpeed} styles={styles} />
        <InfoItem
          name="First word latency"
          value={`${item.fwl} ns`}
          styles={styles}
        />
        <InfoItem name="CAS latency" value={item.cl} styles={styles} />
        <InfoItem name="Color" value={item.color} styles={styles} />
      </Item>
    );
}
