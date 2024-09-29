export type ComponentValues =
  | SharedValues
  | GPUValues
  | CPUValues
  | MotherboardValues
  | RAMValues
  | StorageValues
  | PSUValues
  | CaseValues
  | CPUCoolerValues
  | FanValues
  | MonitorValues
  | KeyboardValues
  | MiceValues
  | HeadphonesValues
  | WebcamValues
  | SpeakerValues;

export type SharedValues = {
  name: string;
  price: number;
  url: string;
  _id: string;
};

export type GPUValues = {
  chipset: string;
  memory: number;
  coreClock: number;
  boostClock: number;
  color: string;
  length: number;
  tdp: number;
};

export type CPUValues = {
  series: string;
  cores: number;
  pCoreClock: number;
  pBoostClock: number;
  integratedGraphics: string;
  socket: string;
  tdp: number;
};

export type MotherboardValues = {
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
};

export type RAMValues = {
  modules: number;
  ddr: string;
  ddrSpeed: number;
  fwl: number;
  cl: number;
  color: string;
  pricePerGb: number;
};

export type StorageValues = {
  type: string;
  capacity: number;
  pricePerGb: number;
};

export type PSUValues = {
  wattage: number;
  rating: string;
  color: string;
};

export type CaseValues = {
  type: string;
  motherboardFormFactors: string[];
  color: string;
  maxGpuLength: number;
  dimensions: string;
};

export type CPUCoolerValues = {
  rpm: number;
  noise: number;
  cpuSockets: string[];
  color: string;
  waterCooled: string;
  height: number;
};

export type FanValues = {
  quantity: number;
  size: number;
  rpm: number;
  airflow: number;
  noise: number;
  color: string;
};

export type MonitorValues = {
  screenSize: number;
  resolution: string;
  refreshRate: number;
  responseTime: number;
  panelType: string;
  brightness: number;
  frameSync: string[];
  speakers: string;
  curved: string;
};

export type KeyboardValues = {
  style: string;
  mechanical: string;
  rgb: string;
  tenkeyless: string;
  connectionTypes: string[];
  color: string;
};

export type MiceValues = {
  connectionTypes: string[];
  maxDpi: number;
  color: string;
};

export type HeadphonesValues = {
  microphone: string;
  wireless: string;
  frequencyResponse: string;
  color: string;
};

export type WebcamValues = {
  resolutions: string[];
  focusType: string;
};

export type SpeakerValues = {
  configuration: number;
  frequencyResponse: string;
  wattage: number;
  power: number;
  color: string;
};
