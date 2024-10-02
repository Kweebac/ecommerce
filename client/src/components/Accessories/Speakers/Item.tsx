import { SpeakerValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function SpeakersItem() {
  const item: SpeakerValues | null | undefined = useGetItem(
    "speakers",
    "accessories",
  );

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem name="Configuration" value={item.configuration} />
        <InfoItem name="Frequency response" value={item.frequencyResponse} />

        <InfoItem name="Wattage" value={`${item.wattage} W`} />
        <InfoItem name="Power" value={`${item.power} W`} />
        <InfoItem name="Color" value={item.color} />
      </Item>
    );
}
