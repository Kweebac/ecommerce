import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import URLError from "../URLError";
import {
  CaseIcon,
  CPUCoolerIcon,
  CPUIcon,
  GPUIcon,
  MotherboardIcon,
  PSUIcon,
  RAMIcon,
  StorageIcon,
} from "../Icons";
import Button from "../Buttons";

function ComponentInfoItem({ name, value }: { name: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-semibold text-green-3">{name}</div>
      <div>{value}</div>
    </div>
  );
}

function ComponentInfo({ icon, link, alt, component, children }) {
  const { url, name, price } = component;

  return (
    <div className="grid grid-flow-col items-center justify-start gap-6">
      <div className="z-10 w-[72px] bg-[--background-color] text-xl">
        £{price}
      </div>
      {icon}
      <Link to={`/components/${link}`}>
        <div className="flex items-center gap-2 rounded-xl bg-white-1 pl-2 pr-4 hover:shadow-md">
          <div className="h-16 w-16 place-content-center p-1">
            <img src={url} alt={alt} className="object-contain" />
          </div>

          <div className="flex gap-10">
            <ComponentInfoItem name="Name" value={name} />
            {children}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function PrebuiltItem() {
  const { id } = useParams();
  const [prebuilt, setPrebuilt] = useState();
  const { gpu, cpu, motherboard, ram, storage, psu, cpuCooler } = prebuilt
    ? prebuilt.components
    : {};
  const caseItem = prebuilt ? prebuilt.components.case : {};

  useEffect(() => {
    (async () => {
      const abortController = new AbortController();

      try {
        const res = await fetch(`http://localhost:3000/api/prebuilt/${id}`, {
          signal: abortController.signal,
        });
        if (res.status === 404) setPrebuilt(null);
        else {
          const data = await res.json();
          setPrebuilt(data);
        }
      } catch (error) {
        console.error(error);
      }

      return () => {
        abortController.abort();
      };
    })();
  }, [id]);

  if (prebuilt === null) return <URLError />;
  else if (prebuilt !== undefined)
    return (
      <main className="my-8 grid justify-center">
        <div className="relative grid w-max justify-items-center">
          <h1 className="z-10 mb-8 bg-[--background-color] px-4 text-3xl font-semibold">
            {prebuilt.name}
          </h1>
          <div className="z-10 grid content-start gap-2">
            <ComponentInfo
              icon={<GPUIcon />}
              link={`gpu/${gpu._id}`}
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

            <ComponentInfo
              icon={<CPUIcon />}
              link={`cpu/${cpu._id}`}
              alt="CPU"
              component={cpu}
            >
              <ComponentInfoItem name="Series" value={cpu.series} />
              <ComponentInfoItem name="Cores" value={cpu.cores} />
              <ComponentInfoItem
                name="Core clock"
                value={`${cpu.pCoreClock} GHz`}
              />
              <ComponentInfoItem
                name="Boost clock"
                value={`${cpu.pBoostClock} GHz`}
              />
            </ComponentInfo>

            <ComponentInfo
              icon={<MotherboardIcon />}
              link={`motherboard/${motherboard._id}`}
              alt="Motherboard"
              component={motherboard}
            >
              <ComponentInfoItem name="Chipset" value={motherboard.chipset} />
              <ComponentInfoItem name="Wi-Fi" value={motherboard.wifi} />
            </ComponentInfo>

            <ComponentInfo
              icon={<RAMIcon />}
              link={`ram/${ram._id}`}
              alt="RAM"
              component={ram}
            >
              <ComponentInfoItem name="Modules" value={`${ram.modules} GB`} />
              <ComponentInfoItem
                name="Speed"
                value={`${ram.ddr}-${ram.ddrSpeed}`}
              />
              <ComponentInfoItem name="FWL" value={`${ram.fwl} ns`} />
              <ComponentInfoItem name="CL" value={ram.cl} />
            </ComponentInfo>

            <ComponentInfo
              icon={<StorageIcon />}
              link={`storage/${storage._id}`}
              alt="Storage"
              component={storage}
            >
              <ComponentInfoItem name="Type" value={storage.type} />
              <ComponentInfoItem
                name="Capacity"
                value={`${storage.capacity} GB`}
              />
            </ComponentInfo>

            <ComponentInfo
              icon={<PSUIcon />}
              link={`psu/${psu._id}`}
              alt="PSU"
              component={psu}
            >
              <ComponentInfoItem name="Wattage" value={`${psu.wattage} W`} />
              <ComponentInfoItem name="Efficiency" value={psu.rating} />
            </ComponentInfo>

            <ComponentInfo
              icon={<CaseIcon />}
              link={`case/${caseItem._id}`}
              alt="Case"
              component={caseItem}
            >
              <ComponentInfoItem name="Type" value={caseItem.type} />
              <ComponentInfoItem
                name="Dimensions"
                value={caseItem.dimensions}
              />
            </ComponentInfo>

            {cpuCooler && (
              <ComponentInfo
                icon={<CPUCoolerIcon />}
                link={`cpu-cooler/${cpuCooler._id}`}
                alt="CPU Cooler"
                component={cpuCooler}
              >
                <ComponentInfoItem name="RPM" value={`${cpuCooler.rpm} RPM`} />
                <ComponentInfoItem
                  name="Noise"
                  value={`${cpuCooler.noise} dB`}
                />
                <ComponentInfoItem
                  name="Water cooled"
                  value={cpuCooler.waterCooled}
                />
              </ComponentInfo>
            )}
          </div>
          <div className="z-10 mt-8 flex items-center gap-4 bg-[--background-color] px-4">
            <div className="text-2xl font-semibold">£{prebuilt.price}</div>
            <Button itemInfo={prebuilt} />
          </div>

          <div className="absolute left-6 mt-[18px] h-[calc(100%-43px)] w-[calc(100%/2)] rounded-l-[25px] border border-r-0 border-black"></div>
        </div>
      </main>
    );
}
