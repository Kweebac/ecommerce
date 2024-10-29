// @ts-nocheck

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
import { CheckoutButton } from "../Buttons";
import { UserContext } from "../../../src/App";
import { handleSetUser, useGetScreenWidth } from "../../../src/utils";
import BuildErrors from "../BuildErrors";

function AddComponent({
  icon,
  url,
  optional,
}: {
  icon: JSX.Element;
  url: string;
  optional?: boolean;
}) {
  return (
    <div className="grid min-w-[20rem] grid-flow-col items-center justify-start gap-4 sm:min-w-[24rem] sm:gap-6 md:min-w-[40rem]">
      <div className="z-10 w-20 bg-[--background-color] text-xl">£0</div>
      {icon}
      <Link to={url}>
        <div className="grid grid-flow-col place-items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-green-3 shadow-md hover:scale-110">
            <PlusIcon color="#ffffff" styles="h-8 w-8 rounded-full" />
          </div>
          {optional && <i className="text-gray-600">OPTIONAL</i>}
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
  const { xl, md } = useGetScreenWidth();
  const { url, name, price } = component;
  const link = `${alt.toLowerCase().replace(/\s/g, "-")}/${component._id}`;
  let componentType = alt.toLowerCase().replace(/\s/g, "-");
  if (componentType === "cpu-cooler") componentType = "cpuCooler";

  async function deleteBuildItem() {
    const res = await fetch("http://localhost:3000/api/user/build", {
      method: "DELETE",
      body: JSON.stringify({ componentType, id: component._id }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (res.ok) {
      handleSetUser(setUser);
    }
  }

  return (
    <div className="grid grid-flow-col items-center justify-start gap-4 sm:gap-6">
      <div className="z-10 w-20 bg-[--background-color] text-lg sm:text-xl">
        £{price}
      </div>
      {icon}
      <div className="flex items-center gap-4 rounded-xl bg-white-1 pr-4 hover:shadow-md">
        <Link to={`/components/${link}`}>
          <div className="flex items-center gap-2 pl-2">
            <div className="place-content-center p-1">
              <img src={url} alt={alt} className="h-14 w-14 object-contain" />
            </div>

            {md && (
              <div className="flex gap-10">
                <ComponentInfoItem name="Name" value={name} />
                {xl && children}
              </div>
            )}
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
  let totalPrice = 0;

  if (build) {
    for (let key in build) {
      key = build[key];
      if (Array.isArray(key)) key.forEach((item) => (totalPrice += item.price));
      else if (key.price) totalPrice += key.price;
    }

    totalPrice = Number(totalPrice.toFixed(2));
  }

  return (
    <main className="my-8 grid justify-items-center">
      <div className="mb-8 grid justify-items-center gap-2">
        {build && <BuildErrors build={build} />}
      </div>
      <div className="relative grid w-max justify-items-center">
        <h1 className="z-10 mb-8 bg-[--background-color] px-2 text-2xl font-semibold sm:px-4 sm:text-3xl">
          Build your own PC
        </h1>
        <div className="z-10 grid gap-2">
          {build?.gpu.length ? (
            <>
              {build.gpu.map((gpu, index) => (
                <ComponentInfo
                  key={index}
                  icon={<GPUIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
                  alt="GPU"
                  component={gpu}
                >
                  <ComponentInfoItem name="Chipset" value={gpu.chipset} />
                  <ComponentInfoItem name="Memory" value={`${gpu.memory} GB`} />
                  <ComponentInfoItem
                    name="Core clock"
                    value={`${gpu.coreClock} MHz`}
                  />
                  <ComponentInfoItem
                    name="Boost clock"
                    value={`${gpu.boostClock} MHz`}
                  />
                </ComponentInfo>
              ))}
              {build.gpu.length < 2 && (
                <AddComponent
                  icon={<GPUIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
                  url="/components/gpu"
                  optional={true}
                />
              )}
            </>
          ) : (
            <AddComponent
              icon={<GPUIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/gpu"
            />
          )}

          {build?.cpu ? (
            <ComponentInfo
              icon={<CPUIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              alt="CPU"
              component={build.cpu}
            >
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
              icon={<CPUIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/cpu"
            />
          )}

          {build?.motherboard ? (
            <ComponentInfo
              icon={<MotherboardIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
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
              icon={<MotherboardIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/motherboard"
            />
          )}

          {build?.ram.length ? (
            <>
              {build.ram.map((ram, index) => (
                <ComponentInfo
                  key={index}
                  icon={<RAMIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
                  alt="RAM"
                  component={ram}
                >
                  <ComponentInfoItem
                    name="Modules"
                    value={`${ram.modules} GB`}
                  />
                  <ComponentInfoItem
                    name="Speed"
                    value={`${ram.ddr}-${ram.ddrSpeed}`}
                  />
                  <ComponentInfoItem name="FWL" value={`${ram.fwl} ns`} />
                  <ComponentInfoItem name="CL" value={ram.cl} />
                </ComponentInfo>
              ))}
              {build.ram.length < 2 && (
                <AddComponent
                  icon={<RAMIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
                  url="/components/ram"
                  optional={true}
                />
              )}
            </>
          ) : (
            <AddComponent
              icon={<RAMIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/ram"
            />
          )}

          {build?.storage.length ? (
            <>
              {build.storage.map((storage, index) => (
                <ComponentInfo
                  key={index}
                  icon={<StorageIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
                  alt="Storage"
                  component={storage}
                >
                  <ComponentInfoItem name="Type" value={storage.type} />
                  <ComponentInfoItem
                    name="Capacity"
                    value={`${storage.capacity} GB`}
                  />
                </ComponentInfo>
              ))}
              {build.storage.length < 2 && (
                <AddComponent
                  icon={<StorageIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
                  url="/components/storage"
                  optional={true}
                />
              )}
            </>
          ) : (
            <AddComponent
              icon={<StorageIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/storage"
            />
          )}

          {build?.psu ? (
            <ComponentInfo
              icon={<PSUIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              alt="PSU"
              component={build.psu}
            >
              <ComponentInfoItem
                name="Wattage"
                value={`${build.psu.wattage} W`}
              />
              <ComponentInfoItem name="Efficiency" value={build.psu.rating} />
            </ComponentInfo>
          ) : (
            <AddComponent
              icon={<PSUIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/psu"
            />
          )}

          {build?.case ? (
            <ComponentInfo
              icon={<CaseIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
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
              icon={<CaseIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/case"
            />
          )}

          {build?.cpuCooler ? (
            <ComponentInfo
              icon={<CPUCoolerIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
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
              icon={<CPUCoolerIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/cpu-cooler"
            />
          )}

          {build?.fans.length ? (
            <>
              {build.fans.map((fan, index) => (
                <ComponentInfo
                  key={index}
                  icon={<FanIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
                  alt="Fans"
                  component={fan}
                >
                  <ComponentInfoItem name="RPM" value={`${fan.rpm} RPM`} />
                  <ComponentInfoItem
                    name="Airflow"
                    value={`${fan.airflow} CFM`}
                  />
                  <ComponentInfoItem name="Noise" value={`${fan.noise} dB`} />
                </ComponentInfo>
              ))}
              {build.fans.length < 4 && (
                <AddComponent
                  icon={<FanIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
                  url="/components/fans"
                  optional={true}
                />
              )}
            </>
          ) : (
            <AddComponent
              icon={<FanIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/fans"
            />
          )}

          {build?.os ? (
            <ComponentInfo
              icon={<OSIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              alt="OS"
              component={build.os}
            ></ComponentInfo>
          ) : (
            <AddComponent
              icon={<OSIcon styles="h-14 w-14 sm:h-16 sm:w-16" />}
              url="/components/os"
            />
          )}
        </div>
        <div className="z-10 mt-8 flex items-center gap-4 bg-[--background-color] px-2 sm:px-4">
          <div className="text-xl font-semibold sm:text-2xl">£{totalPrice}</div>
          <CheckoutButton />
        </div>

        <div className="absolute left-3 mt-[18px] h-[calc(100%-43px)] w-[calc(100%/2)] rounded-l-[25px] border border-r-0 border-black"></div>
      </div>
    </main>
  );
}
