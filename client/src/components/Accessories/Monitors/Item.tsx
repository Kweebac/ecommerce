import { MonitorValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function MonitorItem() {
  const item: MonitorValues | null | undefined = useGetItem(
    "monitors",
    "accessories",
  );

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Screen size" value={`${item.screenSize}"`} />
        <InfoItem name="Resolution" value={item.resolution} />
        <InfoItem name="Refresh rate" value={`${item.refreshRate} Hz`} />
        <InfoItem name="Response time" value={`${item.responseTime} ms`} />
        <InfoItem name="Panel" value={item.panelType} />
        <InfoItem name="Brightness" value={`${item.brightness} cd/m²`} />
        <InfoItem name="Frame sync" value={item.frameSync} />
        <InfoItem name="Speakers" value={item.speakers} />
        <InfoItem name="Curved" value={item.curved} />
      </Item>
    );
}
