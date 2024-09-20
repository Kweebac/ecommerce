import Item from "../../Tables/Item";
import { useGetItem } from "../../../utils";
import { SharedValues } from "@/src/types/Components";

export default function CPUItem() {
  const item: SharedValues | null | undefined = useGetItem("os");

  if (item) return <Item item={item}></Item>;
}
