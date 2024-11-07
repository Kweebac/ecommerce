import { NavLink, Outlet } from "react-router-dom";
import {
  HeadphonesIcon,
  KeyboardIcon,
  MonitorIcon,
  MouseIcon,
  SpeakersIcon,
  WebcamIcon,
} from "../Icons";
import { useGetScreenWidth } from "../../utils";

type ListItemProps = {
  icon: JSX.Element;
  name: string;
  styles?: string;
};

function ListItem({ icon, name, styles = "px-2" }: ListItemProps) {
  const url = "/accessories/" + name.toLowerCase();

  return (
    <li className={styles}>
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

export default function AccessoriesHeader() {
  const { xl } = useGetScreenWidth();

  return (
    <div className="grid grid-rows-[auto_1fr] ">
      <header className="justify-self-center xl:m-4">
        {xl && (
          <ul className="grid grid-flow-col gap-4 text-center">
            <ListItem icon={<MonitorIcon />} name="Monitors"></ListItem>
            <ListItem
              icon={<KeyboardIcon />}
              name="Keyboards"
              styles="px-1"
            ></ListItem>
            <ListItem icon={<MouseIcon />} name="Mice"></ListItem>
            <ListItem
              icon={<HeadphonesIcon />}
              name="Headphones"
              styles="px-0"
            ></ListItem>
            <ListItem
              icon={<WebcamIcon />}
              name="Webcams"
              styles="pl-0"
            ></ListItem>
            <ListItem icon={<SpeakersIcon />} name="Speakers"></ListItem>
          </ul>
        )}
      </header>

      <Outlet />
    </div>
  );
}
