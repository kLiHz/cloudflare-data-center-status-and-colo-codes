import { dataCenters } from "./data";

export const html = `<table>
  <style>
    #colo-list-table-head th, #colo-list-table-body td { text-align: left; padding: 0 0.2em; text-wrap: nowrap; }
  </style>
  <thead id="colo-list-table-head">
      <tr><th>${Object.keys(dataCenters[0]).join('</th><th>')}</th></tr>
  </thead>
  <tbody id="colo-list-table-body">
    ${dataCenters.map(i => `<tr><td>${Object.values(i).join('</td><td>')}</td></tr>`).join('\n')}
  </tbody>
<table>`;
