import { CPUValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: CPUValues | null | undefined = useGetItem("cpu");
  const styles = "w-52";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Series" value={item.series} styles={styles} />
        <InfoItem name="Cores" value={`${item.cores} GB`} styles={styles} />
        <InfoItem
          name="Core clock"
          value={`${item.pCoreClock} MHz`}
          styles={styles}
        />
        <InfoItem
          name="Boost clock"
          value={`${item.pBoostClock} MHz`}
          styles={styles}
        />
        <InfoItem
          name="Integrated graphics"
          value={item.integratedGraphics}
          styles={styles}
        />
        <InfoItem name="Socket" value={`${item.socket} mm`} styles={styles} />
        <InfoItem name="TDP" value={`${item.tdp} W`} styles={styles} />
      </Item>
    );
}
