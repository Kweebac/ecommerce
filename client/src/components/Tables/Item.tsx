import { ComponentValues } from "@/src/types/Components";
import URLError from "../URLError";
import Button from "../Buttons";

type InfoItemProps = {
  name: string;
  value: string | number;
  styles: string;
};

export function InfoItem({ name, value, styles }: InfoItemProps) {
  return (
    <div className="flex border-t border-t-gray-300 py-1.5">
      <span className={styles}>{name}</span>
      <span>{value}</span>
    </div>
  );
}

type ItemProps = {
  item: ComponentValues | null | undefined;
  options?: { pricePerGb?: boolean };
  children?: React.ReactNode;
};

export default function Item({ item, options, children }: ItemProps) {
  if (item === null) return <URLError />;
  else if (item !== undefined)
    return (
      <div className="my-8 flex items-start justify-center gap-12">
        <div className="grid gap-3">
          <div className="flex gap-3">
            <img src={item.url} alt="GPU" className="h-64 w-64" />
            <img
              src="https://placehold.co/256"
              alt="GPU"
              className="h-64 w-64"
            />
          </div>
          <div className="flex gap-3">
            <img
              src="https://placehold.co/256"
              alt="GPU"
              className="h-64 w-64"
            />
            <img
              src="https://placehold.co/256"
              alt="GPU"
              className="h-64 w-64"
            />
          </div>
        </div>
        <div className="grid gap-6">
          <div className="text-3xl font-semibold">{item.name}</div>
          {children && (
            <div className="grid grid-flow-col justify-start gap-12">
              <div>{children}</div>
            </div>
          )}
          <div className="grid w-64 justify-items-center gap-3">
            <Button itemInfo={item} />
            {options?.pricePerGb ? (
              <div className="flex items-center gap-2">
                <div className="text-3xl">£{item.price}</div>
                <div className="text-lg">(£{item.pricePerGb} / GB)</div>
              </div>
            ) : (
              <div className="text-3xl">£{item.price}</div>
            )}
          </div>
        </div>
      </div>
    );
}
