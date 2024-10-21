import { ErrorIcon } from "./Icons";

function BuildError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-md bg-red-500 px-3 py-2">
      <ErrorIcon
        styles="min-w-max h-6 w-6 rounded-full shadow-md"
        color="#f4f4f3"
      />
      <div className="text-xs text-[--background-color] md:text-sm lg:text-base">
        {message}
      </div>
    </div>
  );
}

function MissingComponentError({ build }) {
  const { gpu, cpu, motherboard, ram, storage, psu, cpuCooler, fans, os } =
    build;
  const caseItem = build.case;

  if (
    !gpu.length ||
    !cpu ||
    !motherboard ||
    !ram.length ||
    !storage.length ||
    !psu ||
    !cpuCooler ||
    !fans.length ||
    !caseItem ||
    !os
  )
    return <BuildError message="You are missing component(s)." />;
}

function DDRTypeError({ motherboard, ram }) {
  if (motherboard && ram.length) {
    if (ram.length > 1) {
      if (
        motherboard.ram.ddr !== ram[0].ddr ||
        motherboard.ram.ddr !== ram[1].ddr
      )
        return (
          <BuildError
            message={`Your RAM types (${ram[0].ddr}, ${ram[1].ddr}) are not compatible with your motherboard's RAM type (${motherboard.ram.ddr}).`}
          />
        );
    } else {
      if (motherboard.ram.ddr !== ram[0].ddr)
        return (
          <BuildError
            message={`Your RAM type (${ram[0].ddr}) is not compatible with your motherboard's RAM type (${motherboard.ram.ddr}).`}
          />
        );
    }
  }
}

function DDRSpeedError({ motherboard, ram }) {
  if (motherboard && ram.length) {
    if (ram.length > 1) {
      if (
        !motherboard.ram.ddrSpeeds.filter(
          (ddrSpeed) => ddrSpeed === ram[0].ddrSpeed,
        ).length ||
        !motherboard.ram.ddrSpeeds.filter(
          (ddrSpeed) => ddrSpeed === ram[1].ddrSpeed,
        ).length
      )
        return (
          <BuildError
            message={`Your RAM speeds (${ram[0].ddrSpeed}, ${ram[1].ddrSpeed}) are not compatible with your motherboard's RAM speeds.`}
          />
        );
    } else {
      if (
        !motherboard.ram.ddrSpeeds.filter(
          (ddrSpeed) => ddrSpeed === ram[0].ddrSpeed,
        ).length
      )
        return (
          <BuildError
            message={`Your RAM speed (${ram[0].ddrSpeed}) is not compatible with your motherboard's RAM speeds.`}
          />
        );
    }
  }
}

function PSUWattageError({ gpu, cpu, psu }) {
  if (psu) {
    const totalWattage =
      (gpu?.reduce((acc, gpu) => acc + gpu.tdp, 0) || 0) + (cpu?.tdp || 0);

    if (totalWattage > psu.wattage)
      return (
        <BuildError
          message={`Your total TDP (${totalWattage} W) is higher than your PSU's wattage (${psu.wattage} W).`}
        />
      );
  }
}

function MotherboardFormFactorError({ motherboard, caseItem }) {
  if (motherboard && caseItem) {
    if (!caseItem.motherboardFormFactors.includes(motherboard.formFactor))
      return (
        <BuildError
          message={`Your motherboard's form factor (${motherboard.formFactor}) is not compatible with your case's form factors.`}
        />
      );
  }
}

function MotherboardCPUSocketError({ motherboard, cpu }) {
  if (motherboard && cpu) {
    if (motherboard.cpuSocket !== cpu.socket)
      return (
        <BuildError
          message={`Your CPU socket (${cpu.socket}) is not compatible with your motherboard's CPU socket (${motherboard.cpuSocket}).`}
        />
      );
  }
}

function GPULengthError({ caseItem, gpu }) {
  if (caseItem && gpu.length) {
    if (gpu.length > 1) {
      if (
        gpu[0].length > caseItem.maxGpuLength ||
        gpu[1].length > caseItem.maxGpuLength
      )
        return (
          <BuildError
            message={`Your GPU lengths (${gpu[0].length} mm, ${gpu[1].length} mm) are higher than your case's maximum GPU length (${caseItem.maxGpuLength} mm).`}
          />
        );
    } else {
      if (gpu[0].length > caseItem.maxGpuLength)
        return (
          <BuildError
            message={`Your GPU length (${gpu[0].length} mm) is higher than your case's maximum GPU length (${caseItem.maxGpuLength} mm).`}
          />
        );
    }
  }
}

function MotherboardChipsetError({ cpu, motherboard }) {
  let amdError = false;

  if (cpu && motherboard) {
    if (motherboard && motherboard.chipset === "AMD B550") {
      if (cpu.name.includes("AMD")) {
        const series = Array.from(cpu.name.split(" ")[3][0]);
        if (series !== "3" && series !== "4" && series !== "5") {
          amdError = true;
        }
      } else if (cpu.name.includes("Intel")) {
        amdError = true;
      }
    } else if (
      (motherboard && motherboard.chipset === "AMD B650") ||
      (motherboard && motherboard.chipset === "AMD X670")
    ) {
      if (cpu.name.includes("AMD")) {
        const series = Array.from(cpu.name.split(" ")[3][0]);
        if (series !== "7" && series !== "8" && series !== "9") {
          amdError = true;
        }
      } else if (cpu.name.includes("Intel")) {
        amdError = true;
      }
    }
  }

  if (cpu && motherboard) {
    if (
      (motherboard.chipset.includes("Intel") && !cpu.name.includes("Intel")) ||
      amdError
    )
      return (
        <BuildError
          message={`Your motherboard's chipset (${motherboard.chipset}) is not compatible with your CPU.`}
        />
      );
  }
}

export default function BuildErrors({ build }) {
  const { gpu, cpu, motherboard, ram, psu } = build;
  const caseItem = build.case;

  return (
    <>
      <MissingComponentError build={build} />
      <GPULengthError caseItem={caseItem} gpu={gpu} />
      <MotherboardChipsetError cpu={cpu} motherboard={motherboard} />
      <MotherboardCPUSocketError motherboard={motherboard} cpu={cpu} />
      <MotherboardFormFactorError
        motherboard={motherboard}
        caseItem={caseItem}
      />
      <DDRTypeError motherboard={motherboard} ram={ram} />
      <DDRSpeedError motherboard={motherboard} ram={ram} />
      <PSUWattageError gpu={gpu} cpu={cpu} psu={psu} />
    </>
  );
}
