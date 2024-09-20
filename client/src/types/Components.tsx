export type ComponentValues =
  | GPUValues
  | CPUValues
  | MotherboardValues
  | RAMValues
  | StorageValues
  | PSUValues
  | CaseValues
  | CPUCoolerValues
  | FanValues
  | OSValues;

export type GPUValues = {
  name: string;
  chipset: string;
  memory: number;
  coreClock: number;
  boostClock: number;
  color: string;
  length: number;
  tdp: number;
  price: number;
  url: string;
};

export type CPUValues = {
  name: string;
  series: string;
  cores: number;
  pCoreClock: number;
  pBoostClock: number;
  integratedGraphics: string;
  socket: string;
  tdp: number;
  price: number;
  url: string;
};

export type MotherboardValues = {
  name: string;
  chipset: string;
  formFactor: string;
  cpuSocket: string;
  ram: {
    ddr: string;
    slots: number;
    ddrSpeeds: number[];
  };
  m2Mkey: number;
  pcie: {
    x16: number;
    x8: number;
    x4: number;
    x1: number;
  };
  wifi: string;
  color: string;
  price: number;
  url: string;
};

export type RAMValues = {
  name: string;
  modules: number;
  ddr: string;
  ddrSpeed: number;
  fwl: number;
  cl: number;
  color: string;
  price: number;
  pricePerGb: number;
  url: string;
};

export type StorageValues = {
  name: string;
  type: string;
  capacity: number;
  price: number;
  pricePerGb: number;
  url: string;
};

export type PSUValues = {
  name: string;
  wattage: number;
  rating: string;
  color: string;
  price: number;
  url: string;
};

export type CaseValues = {
  name: string;
  type: string;
  motherboardFormFactors: string[];
  color: string;
  maxGpuLength: number;
  dimensions: string;
  price: number;
  url: string;
};

export type CPUCoolerValues = {
  name: string;
  rpm: number;
  noise: number;
  cpuSockets: string[];
  color: string;
  waterCooled: string;
  height: number;
  price: number;
  url: string;
};

export type FanValues = {
  name: string;
  quantity: number;
  size: number;
  rpm: number;
  airflow: number;
  noise: number;
  color: string;
  price: number;
  url: string;
};

export type OSValues = {
  name: string;
  price: number;
  url: string;
};
