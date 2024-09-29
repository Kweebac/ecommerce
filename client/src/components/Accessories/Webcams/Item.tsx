import { WebcamValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import URLError from "../../URLError";

export default function WebcamItem() {
  const item: WebcamValues | null | undefined = useGetItem(
    "webcams",
    "accessories",
  );
  const styles = "w-32";

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item}>
        <InfoItem
          name="Resolutions"
          value={item.resolutions.join(", ")}
          styles={styles}
        />
        <InfoItem name="Focus Type" value={item.focusType} styles={styles} />
      </Item>
    );
}
