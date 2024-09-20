import { OSValues } from "@/src/types/Components";
import Item from "../../Tables/Item";
import { useGetItem } from "../../../utils";

export default function CPUItem() {
  const item: OSValues | null | undefined = useGetItem("os");

  if (item) return <Item item={item}></Item>;
}
