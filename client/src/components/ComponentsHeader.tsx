import { NavLink, Outlet } from "react-router-dom";
import {
  CaseIcon,
  CPUCoolerIcon,
  CPUIcon,
  FanIcon,
  GPUIcon,
  MotherboardIcon,
  OSIcon,
  PSUIcon,
  RAMIcon,
  StorageIcon,
} from "./Icons";

type ListItemProps = {
  icon: JSX.Element;
  name: string;
  px?: string;
};

function ListItem({ icon, name, px = "px-2" }: ListItemProps) {
  const url = "/components/" + name.toLowerCase().replace(" ", "-");

  return (
    <li className={px}>
      <NavLink
        to={url}
        className="grid cursor-pointer justify-items-center gap-2"
      >
        {icon}

        <p className="px-2">{name}</p>
      </NavLink>
    </li>
  );
}

export default function ComponentsHeader() {
  return (
    <div className="grid grid-rows-[auto_1fr] ">
      <header className="m-4 justify-self-center">
        <ul className="grid grid-flow-col gap-4 text-center">
          <ListItem icon={<GPUIcon />} name="GPU" px="px-3"></ListItem>
          <ListItem icon={<CPUIcon />} name="CPU"></ListItem>
          <ListItem
            icon={<MotherboardIcon />}
            name="Motherboard"
            px="px-0"
          ></ListItem>
          <ListItem icon={<RAMIcon />} name="RAM"></ListItem>
          <ListItem icon={<StorageIcon />} name="Storage"></ListItem>
          <ListItem icon={<PSUIcon />} name="PSU"></ListItem>
          <ListItem icon={<CaseIcon />} name="Case"></ListItem>
          <ListItem
            icon={<CPUCoolerIcon />}
            name="CPU Cooler"
            px="px-0"
          ></ListItem>
          <ListItem icon={<FanIcon />} name="Fans"></ListItem>
          <ListItem icon={<OSIcon />} name="OS"></ListItem>
        </ul>
      </header>

      <Outlet />
    </div>
  );
}
