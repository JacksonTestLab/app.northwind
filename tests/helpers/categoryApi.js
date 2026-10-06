async function routeCategoryRequestsWithinApiLimit(page) {
  await page.route(
    (url) =>
      url.pathname.endsWith("/api/v1/categories") &&
      url.searchParams.get("limit") === "1000",
    (route) => {
      const url = new URL(route.request().url());
      url.searchParams.set("limit", "100");
      return route.continue({ url: url.toString() });
    },
  );
}

module.exports = { routeCategoryRequestsWithinApiLimit };
