import Item from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import { SharedValues } from "@/src/types/Components";
import URLError from "../../URLError";

export default function CPUItem() {
  const item: SharedValues | null | undefined = useGetItem("os");

  if (item === null) return <URLError />;
  else if (item !== undefined) return <Item item={item}></Item>;
}
