export type CloudflareStatusComponents = {
  page: {
    id: string,
    /** "Cloudflare" */
    name: string,
    /** "https://www.cloudflarestatus.com" */
    url: string,
    /** Example: Etc/UTC */
    time_zone: string,
    /** Example: 2024-07-21T16:09:49.416Z */
    updated_at: string,
  },
  components: {
    id: string,
    name: string,
    status: string,
    /** Example: 2024-07-21T16:09:49.416Z */
    created_at: string,
    /** Example: 2024-07-21T16:09:49.416Z */
    updated_at: string,
    position: number,
    description: string | null,
    showcase: boolean,
    /** Example: 2024-07-21 */
    start_date: string | null,
    group_id: string,
    page_id: string,
    group: boolean,
    only_show_if_degraded: boolean,
    components?: string[],
  }[],
};


/** Data center information (and status) can be found under `components` section. */
const componentsURL = 'https://www.cloudflarestatus.com/api/v2/components.json';
const componentsResponse = await fetch(componentsURL);
const { components }: CloudflareStatusComponents = await componentsResponse.json();

const items = components.filter(({ group }) => !group );
const groups = components.filter(({ group }) => group );

/** Use a dict data structure to index component items by their id. */
const itemsIdMap = Object.fromEntries(items.map(i => [i.id, i]))

/** Data center information from [Cloudflare Status](https://www.cloudflarestatus.com). */
const dataCenterEntries: {group_name: string, colo: string, name: string, status: string}[] = [];

/** Slice off first group since it's about general Cloudflare functionalities. */
for (const group of groups.slice(1).map(({name, status, components}) => {
  return {
    name, status,
    components: components!.map(id => itemsIdMap[id]),
  }
})) {
  for (const {name, status} of group.components) {
    const s = name.trim();
    const c = s.slice(-4, -1);
    const p = s.slice(0, -5).trimEnd().slice(0, -1).trimEnd();
    dataCenterEntries.push({group_name: group.name, colo: c, name: p, status})
  }
}

export type CloudflareSpeedTestLocationItem = {
  iata: string,
  lat: number,
  lon: number,
  cca2: string,
  region: string,
  city: string,
}

/** We can also find out some data center information on [Cloudflare Speed Test](https://speed.cloudflare.com/locations). */
const locationsURL = 'https://speed.cloudflare.com/locations';
const locationsResponse = await fetch(locationsURL);
const locations: CloudflareSpeedTestLocationItem[] = await locationsResponse.json();
const locationsByIATA = Object.fromEntries(locations.map(i => [i.iata, i]));

export const dataCenters = dataCenterEntries.map(({group_name, colo, name, status}) => {
  const {iata, lat, lon, cca2, region, city} = locationsByIATA[colo] ?? {iata: '', lat: '', lon: '', cca2: '', region: '', city: ''};
  return {
    group_name, region, city, cca2, name, iata, colo, lat, lon, status,
  }
});
