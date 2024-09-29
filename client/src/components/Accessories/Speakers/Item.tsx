import { SpeakerValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function SpeakersItem() {
  const item: SpeakerValues | null | undefined = useGetItem(
    "speakers",
    "accessories",
  );
  const styles = "w-52";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem
          name="Configuration"
          value={item.configuration}
          styles={styles}
        />
        <InfoItem
          name="Frequency response"
          value={item.frequencyResponse}
          styles={styles}
        />

        <InfoItem name="Wattage" value={`${item.wattage} W`} styles={styles} />
        <InfoItem name="Power" value={`${item.power} W`} styles={styles} />
        <InfoItem name="Color" value={item.color} styles={styles} />
      </Item>
    );
}
