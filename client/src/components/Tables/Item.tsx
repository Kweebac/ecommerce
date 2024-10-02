import { ComponentValues } from "@/src/types/Components";
import Button from "../Buttons";

type InfoItemProps = {
  name: string;
  value: string | number;
};

export function InfoItem({ name, value }: InfoItemProps) {
  return (
    <div className="grid content-start rounded-xl border-t-4 border-t-[--background-color] bg-white-1 px-2 py-1.5">
      <span className="text-sm font-semibold text-green-3">{name}</span>
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
  return (
    <div className="my-8 flex items-start justify-center gap-12">
      <div className="grid gap-3">
        <div className="flex gap-3">
          <div className="h-64 w-64 place-content-center rounded-xl bg-white-1">
            <img
              src={item.url}
              alt="GPU"
              className="rounded-xl object-contain"
            />
          </div>
          <img
            src="https://placehold.co/256"
            alt="GPU"
            className="h-64 w-64 rounded-xl"
          />
        </div>
        <div className="flex gap-3">
          <img
            src="https://placehold.co/256"
            alt="GPU"
            className="h-64 w-64 rounded-xl"
          />
          <img
            src="https://placehold.co/256"
            alt="GPU"
            className="h-64 w-64 rounded-xl"
          />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="text-3xl font-semibold">{item.name}</div>
        {children && (
          <div className="grid w-max grid-cols-2 gap-2">{children}</div>
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
