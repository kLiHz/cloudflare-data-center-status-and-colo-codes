import { dataCenters } from "./data";

export const csv = [
  Object.keys(dataCenters[0]).join(','),
  ...dataCenters.map(i => Object.values(i).map(s => `"${s}"`).join(',')),
].join('\n');
