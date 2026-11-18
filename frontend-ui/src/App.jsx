import { CopyProvider, makeCopy } from "./components/ContentCopy.jsx";
import React, { useEffect, useState } from "react";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import InnerPage from "./pages/InnerPage.jsx";
import Icon from "./components/Icon.jsx";
import {
  fallbackContent,
  fetchContent,
  paths,
  routeNames,
  imageUrl,
} from "./content.js";
import { cmsConfig } from "./lib/config.js";
import useNavigation from "./hooks/useNavigation.js";
import useReveal from "./hooks/useReveal.js";
export default function App({
  path: initialPath = "/",
  initialData = fallbackContent,
}) {
  const path = useNavigation(initialPath);
  const [data, setData] = useState(initialData);
  const copy = makeCopy(data.copy);
  useReveal(path);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    fetchContent(cmsConfig.projectId, cmsConfig.dataset, controller.signal)
      .then(setData)
      .catch(() => {})
      .finally(() => clearTimeout(timeout));
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);
  useEffect(() => {
    const page = data.pageSettings?.pages?.find((p) => p.path === path);
    const title =
      path === "/"
        ? data.settings.title
        : `${page?.seoTitle || page?.title || ""} | ${data.settings.title}`;
    document.title = title;
    const description =
      page?.seoDescription ||
      page?.description ||
      data.home.heroDescription ||
      "";
    const image = imageUrl(data.settings, "socialImage");
    const values = {
      description: description,
      "og:title": title,
      "og:description": description,
      "og:image": image,
      "og:image:alt": data.settings.socialImageAlt || "",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
      "twitter:image:alt": data.settings.socialImageAlt || "",
    };
    for (const [name, value] of Object.entries(values)) {
      const tag = document.querySelector(
        `meta[name="${name}"],meta[property="${name}"]`,
      );
      if (tag) tag.setAttribute("content", value || "");
    }
    const icon = imageUrl(data.settings, "favicon");
    for (const tag of document.querySelectorAll(
      'link[rel="icon"],link[rel="apple-touch-icon"]',
    )) {
      if (icon) tag.href = icon;
    }
  }, [path, data]);

  return (
    <CopyProvider groups={data.copy}>
      <Layout settings={data.settings} path={path}>
        {path === "/" ? (
          <Home data={data} />
        ) : paths.includes(path) ? (
          <InnerPage path={path} data={data} />
        ) : (
          <section className="section not-found">
            <span className="eyebrow">{copy("404 / PAGE NOT FOUND")}</span>
            <h1>
              {copy("A different path")}
              <br />
              {copy("back to the lab.")}
            </h1>
            <p>{copy("This page could not be found.")}</p>
            <a className="button primary" href="/">
              {copy("Return home")}
              <Icon name="arrow" />
            </a>
          </section>
        )}
      </Layout>
    </CopyProvider>
  );
}
