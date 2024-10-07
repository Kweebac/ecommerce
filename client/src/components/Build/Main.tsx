import { useContext } from "react";
import { Link } from "react-router-dom";
import {
  CaseIcon,
  CPUCoolerIcon,
  CPUIcon,
  DeleteIcon,
  FanIcon,
  GPUIcon,
  MotherboardIcon,
  OSIcon,
  PlusIcon,
  PSUIcon,
  RAMIcon,
  StorageIcon,
} from "../Icons";
import Button from "../Buttons";
import { UserContext } from "../../../src/App";
import { handleSetUser } from "../../../src/utils";

function AddComponent({
  empty,
  icon,
  url,
}: {
  empty: boolean;
  icon: JSX.Element;
  url: string;
}) {
  return (
    <div className="grid min-w-[40rem] grid-flow-col items-center justify-start gap-6">
      <div
        className="z-10 bg-[--background-color] text-xl"
        style={{ width: empty ? "max-content" : "72px" }}
      >
        £0
      </div>
      {icon}
      <Link to={url}>
        <div className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-green-3 shadow-md hover:scale-110">
          <PlusIcon color="#ffffff" styles="h-8 w-8 rounded-full" />
        </div>
      </Link>
    </div>
  );
}

function ComponentInfoItem({ name, value }: { name: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-semibold text-green-3">{name}</div>
      <div>{value}</div>
    </div>
  );
}

function ComponentInfo({ icon, alt, component, children }) {
  const { setUser } = useContext(UserContext);
  const { url, name, price } = component;
  const link = `${alt.toLowerCase().replace(/\s/g, "-")}/${component._id}`;
  let componentType = alt.toLowerCase().replace(/\s/g, "-");
  if (componentType === "cpu-cooler") componentType = "cpuCooler";

  async function deleteBuildItem() {
    const res = await fetch("http://localhost:3000/api/user/build", {
      method: "DELETE",
      body: JSON.stringify({ componentType }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.ok) {
      handleSetUser(setUser);
    }
  }

  return (
    <div className="grid grid-flow-col items-center justify-start gap-6">
      <div className="z-10 w-[72px] bg-[--background-color] text-xl">
        £{price}
      </div>
      {icon}
      <div className="flex items-center gap-4 rounded-xl bg-white-1 pr-4 hover:shadow-md">
        <Link to={`/components/${link}`}>
          <div className="flex items-center gap-2 pl-2">
            <div className="h-16 w-16 place-content-center p-1">
              <img src={url} alt={alt} className="object-contain" />
            </div>

            <div className="flex gap-10">
              <ComponentInfoItem name="Name" value={name} />
              {children}
            </div>
          </div>
        </Link>
        <div
          onClick={deleteBuildItem}
          className="grid h-7 w-7 cursor-pointer place-content-center rounded-full bg-green-3 hover:scale-105"
        >
          <DeleteIcon styles="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default function Build() {
  const { user } = useContext(UserContext);
  const build = user?.build;
  let emptyBuild = true;
  let totalPrice = 0;

  if (build) {
    const buildCopy = { ...build, _id: undefined };

    for (const key in buildCopy) {
      if (Array.isArray(buildCopy[key]) && buildCopy[key].length)
        emptyBuild = false;
      else if (!Array.isArray(buildCopy[key]) && buildCopy[key])
        emptyBuild = false;
    }

    for (let key in build) {
      key = build[key];
      if (Array.isArray(key)) key.forEach((item) => (totalPrice += item.price));
      else if (key.price) totalPrice += key.price;
    }

    totalPrice = Number(totalPrice.toFixed(2));
  }

  return (
    <main className="my-8 grid justify-center">
      <div className="relative grid w-max justify-items-center">
        <h1 className="z-10 mb-8 bg-[--background-color] px-4 text-3xl font-semibold">
          Build your own PC
        </h1>
        <div className="z-10 grid gap-2">
          {build?.gpu.length ? (
            <ComponentInfo
              icon={<GPUIcon />}
              alt="GPU"
              component={build.gpu[0]}
            >
              <ComponentInfoItem name="Chipset" value={build.gpu[0].chipset} />
              <ComponentInfoItem
                name="Memory"
                value={`${build.gpu[0].memory} GB`}
              />
              <ComponentInfoItem
                name="Core clock"
                value={`${build.gpu[0].coreClock} MHz`}
              />
              <ComponentInfoItem
                name="Boost clock"
                value={`${build.gpu[0].boostClock} MHz`}
              />
            </ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<GPUIcon />}
              url="/components/gpu"
            />
          )}

          {build?.cpu ? (
            <ComponentInfo icon={<CPUIcon />} alt="CPU" component={build.cpu}>
              <ComponentInfoItem name="Series" value={build.cpu.series} />
              <ComponentInfoItem name="Cores" value={build.cpu.cores} />
              <ComponentInfoItem
                name="Core clock"
                value={`${build.cpu.pCoreClock} GHz`}
              />
              <ComponentInfoItem
                name="Boost clock"
                value={`${build.cpu.pBoostClock} GHz`}
              />
            </ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<CPUIcon />}
              url="/components/cpu"
            />
          )}

          {build?.motherboard ? (
            <ComponentInfo
              icon={<MotherboardIcon />}
              alt="Motherboard"
              component={build.motherboard}
            >
              <ComponentInfoItem
                name="Chipset"
                value={build.motherboard.chipset}
              />
              <ComponentInfoItem name="Wi-Fi" value={build.motherboard.wifi} />
            </ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<MotherboardIcon />}
              url="/components/motherboard"
            />
          )}

          {build?.ram.length ? (
            <ComponentInfo
              icon={<RAMIcon />}
              alt="RAM"
              component={build.ram[0]}
            >
              <ComponentInfoItem
                name="Modules"
                value={`${build.ram[0].modules} GB`}
              />
              <ComponentInfoItem
                name="Speed"
                value={`${build.ram[0].ddr}-${build.ram[0].ddrSpeed}`}
              />
              <ComponentInfoItem name="FWL" value={`${build.ram[0].fwl} ns`} />
              <ComponentInfoItem name="CL" value={build.ram[0].cl} />
            </ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<RAMIcon />}
              url="/components/ram"
            />
          )}

          {build?.storage.length ? (
            <ComponentInfo
              icon={<StorageIcon />}
              alt="Storage"
              component={build.storage[0]}
            >
              <ComponentInfoItem name="Type" value={build.storage[0].type} />
              <ComponentInfoItem
                name="Capacity"
                value={`${build.storage[0].capacity} GB`}
              />
            </ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<StorageIcon />}
              url="/components/storage"
            />
          )}

          {build?.psu ? (
            <ComponentInfo icon={<PSUIcon />} alt="PSU" component={build.psu}>
              <ComponentInfoItem
                name="Wattage"
                value={`${build.psu.wattage} W`}
              />
              <ComponentInfoItem name="Efficiency" value={build.psu.rating} />
            </ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<PSUIcon />}
              url="/components/psu"
            />
          )}

          {build?.case ? (
            <ComponentInfo
              icon={<CaseIcon />}
              alt="Case"
              component={build.case}
            >
              <ComponentInfoItem name="Type" value={build.case.type} />
              <ComponentInfoItem
                name="Dimensions"
                value={build.case.dimensions}
              />
            </ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<CaseIcon />}
              url="/components/case"
            />
          )}

          {build?.cpuCooler ? (
            <ComponentInfo
              icon={<CPUCoolerIcon />}
              alt="CPU Cooler"
              component={build.cpuCooler}
            >
              <ComponentInfoItem
                name="RPM"
                value={`${build.cpuCooler.rpm} RPM`}
              />
              <ComponentInfoItem
                name="Noise"
                value={`${build.cpuCooler.noise} dB`}
              />
              <ComponentInfoItem
                name="Water cooled"
                value={build.cpuCooler.waterCooled}
              />
            </ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<CPUCoolerIcon />}
              url="/components/cpu-cooler"
            />
          )}

          {build?.fans.length ? (
            <ComponentInfo
              icon={<FanIcon />}
              alt="Fans"
              component={build.fans[0]}
            >
              <ComponentInfoItem
                name="RPM"
                value={`${build.fans[0].rpm} RPM`}
              />
              <ComponentInfoItem
                name="Airflow"
                value={`${build.fans[0].airflow} CFM`}
              />
              <ComponentInfoItem
                name="Noise"
                value={`${build.fans[0].noise} dB`}
              />
            </ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<FanIcon />}
              url="/components/fans"
            />
          )}

          {build?.os ? (
            <ComponentInfo
              icon={<OSIcon />}
              alt="OS"
              component={build.os}
            ></ComponentInfo>
          ) : (
            <AddComponent
              empty={emptyBuild}
              icon={<OSIcon />}
              url="/components/os"
            />
          )}
        </div>
        <div className="z-10 mt-8 flex items-center gap-4 bg-[--background-color] px-4">
          <div className="text-2xl font-semibold">£{totalPrice}</div>
          <Button itemInfo={build} />
        </div>

        <div className="absolute left-3 mt-[18px] h-[calc(100%-43px)] w-[calc(100%/2)] rounded-l-[25px] border border-r-0 border-black"></div>
      </div>
    </main>
  );
}
