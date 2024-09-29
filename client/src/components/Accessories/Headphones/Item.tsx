import { HeadphonesValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function HeadphonesItem() {
  const item: HeadphonesValues | null | undefined = useGetItem(
    "headphones",
    "accessories",
  );
  const styles = "w-52";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Microphone" value={item.microphone} styles={styles} />
        <InfoItem name="Wireless" value={item.wireless} styles={styles} />
        <InfoItem
          name="Frequency response"
          value={item.frequencyResponse}
          styles={styles}
        />
        <InfoItem name="Color" value={item.color} styles={styles} />
      </Item>
    );
}
