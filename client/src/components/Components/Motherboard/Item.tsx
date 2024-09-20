import { useGetItem } from "../../../../src/utils";
import { MotherboardValues } from "@/src/types/Components";
import Item, { InfoItem } from "../../Tables/Item";

type DDRSpeedsProps = {
  name: string;
  value: number[];
  styles: string;
};

export function DDRSpeeds({ name, value, styles }: DDRSpeedsProps) {
  const middle = Math.ceil(value.length / 2);
  const speedsFirstHalf = value.slice(0, middle).join(", ");
  const speedsSecondHalf = value.slice(middle).join(", ");

  return (
    <div className="flex border-t border-t-gray-300 py-1.5">
      <span className={styles}>{name}</span>
      <div>
        <div>{speedsFirstHalf}</div>
        <div>{speedsSecondHalf}</div>
      </div>
    </div>
  );
}

export default function MotherboardItem() {
  const item: MotherboardValues | null | undefined = useGetItem("motherboard");
  const styles = "w-48";

  if (item)
    return (
      <Item item={item}>
        <InfoItem name="Chipset" value={item.chipset} styles={styles} />
        <InfoItem name="Form factor" value={item.formFactor} styles={styles} />
        <InfoItem name="CPU socket" value={item.cpuSocket} styles={styles} />
        <InfoItem name="RAM" value={item.ram.ddr} styles={styles} />
        <InfoItem name="RAM slots" value={item.ram.slots} styles={styles} />
        <DDRSpeeds
          name="RAM speeds"
          value={item.ram.ddrSpeeds}
          styles={styles}
        />
        <InfoItem name="M.2 M-key slots" value={item.m2Mkey} styles={styles} />
        <InfoItem name="PCIe 16x slots" value={item.pcie.x16} styles={styles} />
        <InfoItem name="PCIe 8x slots" value={item.pcie.x8} styles={styles} />
        <InfoItem name="PCIe 4x slots" value={item.pcie.x4} styles={styles} />
        <InfoItem name="PCIe 1x slots" value={item.pcie.x1} styles={styles} />
        <InfoItem name="Wi-Fi" value={item.wifi} styles={styles} />
        <InfoItem name="Color" value={item.color} styles={styles} />
      </Item>
    );
}
