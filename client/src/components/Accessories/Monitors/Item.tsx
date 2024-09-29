import { MonitorValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function MonitorItem() {
  const item: MonitorValues | null | undefined = useGetItem(
    "monitors",
    "accessories",
  );
  const styles = "w-40";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem
          name="Screen size"
          value={`${item.screenSize}"`}
          styles={styles}
        />
        <InfoItem name="Resolution" value={item.resolution} styles={styles} />
        <InfoItem
          name="Refresh rate"
          value={`${item.refreshRate} Hz`}
          styles={styles}
        />
        <InfoItem
          name="Response time"
          value={`${item.responseTime} ms`}
          styles={styles}
        />
        <InfoItem name="Panel" value={item.panelType} styles={styles} />
        <InfoItem
          name="Brightness"
          value={`${item.brightness} cd/m²`}
          styles={styles}
        />
        <InfoItem
          name="Frame sync"
          value={item.frameSync.join(", ")}
          styles={styles}
        />
        <InfoItem name="Speakers" value={item.speakers} styles={styles} />
        <InfoItem name="Curved" value={item.curved} styles={styles} />
      </Item>
    );
}
