# cloudflare-data-center-status-and-colo-codes
Structured data center colo code information and status of Cloudflare is out there.

Inspired by [Netrvin/cloudflare-colo-list](https://github.com/Netrvin/cloudflare-colo-list), which uses data from [Cloudflare Status](https://www.cloudflarestatus.com/) (which has [APIs](https://www.cloudflarestatus.com/api) now, so no need to scrape and parse HTML) and [Cloudflare Speed Test](https://speed.cloudflare.com) to provide a list of Cloudflare data center's colo codes and name of their locations.

## About Cloudflare data center's colo codes

You can find the code as "colo" when visiting [/cdn-cgi/trace](https://api.muc.moe/cdn-cgi/trace) under a site that is hosted on Cloudflare CDN, which tells you about the Cloudflare data center you are visiting.

Notice that as [Cloudflare Speed Test's About](https://speed.cloudflare.com/about/) has mentioned, [data centers](https://www.cloudflare.com/learning/cdn/glossary/data-center/) are generally located near (but not physically inside) airports and designated with three-letter [IATA](https://en.wikipedia.org/wiki/IATA_airport_code) airport codes. Cloudflare does not publish the addresses for data centers, so the map on Cloudflare Speed Test uses the addresses of airports to show physical location.
