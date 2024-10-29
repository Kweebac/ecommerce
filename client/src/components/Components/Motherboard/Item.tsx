// @ts-nocheck

import { useGetItem } from "../../../../src/utils";
import { MotherboardValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";
import URLError from "../../URLError";

export default function MotherboardItem() {
  const item: MotherboardValues | null | undefined = useGetItem("motherboard");

  let pcieText = "";
  if (item?.pcie.x16) pcieText += `${item.pcie.x16}x16, `;
  if (item?.pcie.x8) pcieText += `${item.pcie.x8}x8, `;
  if (item?.pcie.x4) pcieText += `${item.pcie.x4}x4, `;
  if (item?.pcie.x1) pcieText += `${item.pcie.x1}x1, `;
  pcieText = pcieText.slice(0, -2);

  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <Item item={item} options={{ addToPc: true }}>
        <InfoItem name="Chipset" value={item.chipset} />
        <InfoItem name="Form factor" value={item.formFactor} />
        <InfoItem name="CPU socket" value={item.cpuSocket} />
        <InfoItem name="RAM" value={item.ram.ddr} />
        <InfoItem name="RAM slots" value={item.ram.slots} />
        <InfoItem name="RAM speeds" value={item.ram.ddrSpeeds} />
        <InfoItem name="M.2 M-key slots" value={item.m2Mkey} />
        <InfoItem name="PCIe slots" value={pcieText} />
        <InfoItem name="Wi-Fi" value={item.wifi} />
        <InfoItem name="Color" value={item.color} />
      </Item>
    );
}
