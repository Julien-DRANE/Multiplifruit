(function () {
  const ns = (window.StudioSlides = window.StudioSlides || {});
  ns.ui = ns.ui || {};

  function getBloomMeta(id) {
    const bloomLevels = (ns.data && ns.data.bloomLevels) || [];
    return bloomLevels.find((level) => level.id === id) || bloomLevels[0] || { title: "Bloom" };
  }

  function getSlideLogoSources(options) {
    const opts = options || {};
    const logoSources = opts.logoSources || {};

    return {
      region: logoSources.region || "assets/images/8K 18_logo_REGIONS ACA_REUNION fb.png",
      drane: logoSources.drane || "assets/images/LOGO_DRANE.png",
    };
  }

  function resolveThemeName(slide, settings) {
    const theme = settings.theme || "mix";
    if (theme !== "random") {
      return theme;
    }

    const variants = ["circles", "waves", "mix"];
    const seedSource = String((slide && (slide.id || slide.number || slide.title)) || "slide");
    let hash = 0;
    for (let index = 0; index < seedSource.length; index += 1) {
      hash = ((hash * 31) + seedSource.charCodeAt(index)) >>> 0;
    }
    return variants[hash % variants.length];
  }

  function getColorPalette(paletteId) {
    const palettes = (ns.data && ns.data.colorPalettes) || [];
    return palettes.find((item) => item.id === paletteId) || palettes[0] || {
      id: "ocean",
      bgStart: "#ffffff",
      bgEnd: "#eef5fd",
      accent: "#2c73da",
      accentStrong: "#17478b",
      accentSoft: "rgba(44, 115, 218, 0.22)",
      accentSofter: "rgba(44, 115, 218, 0.08)",
      accentWave: "rgba(44, 115, 218, 0.2)",
      accentWaveSoft: "rgba(44, 115, 218, 0.08)",
      accentDeepSoft: "rgba(23, 71, 139, 0.14)",
      surface: "rgba(255, 255, 255, 0.72)",
      surfaceStrong: "rgba(255, 255, 255, 0.76)",
      text: "#122033",
      textMuted: "#5d6c81",
      textSoft: "rgba(18, 32, 51, 0.44)",
      line: "rgba(18, 32, 51, 0.12)",
    };
  }

  function getSlidePalette(slide, settings) {
    return getColorPalette((slide && slide.paletteOverride) || (settings && settings.palette) || "ocean");
  }

  function getDecorativeAccent(accentId) {
    const accents = (ns.data && ns.data.decorativeAccents) || [];
    return accents.find((item) => item.id === accentId) || null;
  }

  function getFontOption(fontId) {
    const fonts = (ns.data && ns.data.fontOptions) || [];
    return fonts.find((item) => item.id === fontId) || fonts[0] || {
      id: "studio",
      body: '"Aptos", "Segoe UI", "Trebuchet MS", sans-serif',
      heading: '"Iowan Old Style", "Georgia", serif',
      pptBody: "Aptos",
      pptHeading: "Georgia",
    };
  }

  function getDeckFont(settings) {
    return getFontOption((settings && settings.font) || "studio");
  }

  function intensifyAccentColor(value) {
    const match = String(value || "").match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([0-9.]+))?\s*\)$/i);
    if (!match) {
      return value;
    }
    const alpha = match[4] === undefined ? 1 : Number(match[4]);
    const nextAlpha = Math.min(0.92, Math.max(0.34, (Number.isFinite(alpha) ? alpha : 1) * 1.75));
    return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${nextAlpha.toFixed(2)})`;
  }

  function getDecorativeStyleSet(slide, palette, decorativeAccent) {
    const source = decorativeAccent || palette;
    if (!slide || !slide.decorativeAccentSolid) {
      return source;
    }
    return {
      accentSoft: intensifyAccentColor(source.accentSoft),
      accentSofter: intensifyAccentColor(source.accentSofter),
      accentWave: intensifyAccentColor(source.accentWave),
      accentWaveSoft: intensifyAccentColor(source.accentWaveSoft),
      accentDeepSoft: intensifyAccentColor(source.accentDeepSoft),
    };
  }

  function createSlidePaletteStyle(slide, settings) {
    const palette = getSlidePalette(slide, settings);
    const decorativeAccent = getDecorativeAccent(slide && slide.decorativeAccentOverride);
    const accentStyleSet = decorativeAccent || palette;
    const decorativeStyleSet = getDecorativeStyleSet(slide, palette, decorativeAccent);
    const font = getDeckFont(settings);
    const frameShadow = settings && settings.frameShadow
      ? "0 14px 34px rgba(18, 32, 51, 0.16)"
      : "none";
    return [
      `--slide-bg-start:${palette.bgStart}`,
      `--slide-bg-end:${palette.bgEnd}`,
      `--slide-accent:${palette.accent}`,
      `--slide-accent-strong:${palette.accentStrong}`,
      `--slide-accent-soft:${accentStyleSet.accentSoft}`,
      `--slide-accent-softer:${accentStyleSet.accentSofter}`,
      `--slide-accent-wave:${accentStyleSet.accentWave}`,
      `--slide-accent-wave-soft:${accentStyleSet.accentWaveSoft}`,
      `--slide-accent-deep-soft:${accentStyleSet.accentDeepSoft}`,
      `--slide-decor-soft:${decorativeStyleSet.accentSoft}`,
      `--slide-decor-softer:${decorativeStyleSet.accentSofter}`,
      `--slide-decor-wave:${decorativeStyleSet.accentWave}`,
      `--slide-decor-wave-soft:${decorativeStyleSet.accentWaveSoft}`,
      `--slide-decor-deep-soft:${decorativeStyleSet.accentDeepSoft}`,
      `--slide-surface:${palette.surface}`,
      `--slide-surface-strong:${palette.surfaceStrong}`,
      `--slide-text:${palette.text}`,
      `--slide-text-muted:${palette.textMuted}`,
      `--slide-text-soft:${palette.textSoft}`,
      `--slide-line:${palette.line}`,
      `--slide-frame-shadow:${frameShadow}`,
      `--slide-font-body:${font.body}`,
      `--slide-font-heading:${font.heading}`,
    ].join(";");
  }

  function normalizeTable(tableInput) {
    const rows = Array.isArray(tableInput) ? tableInput.slice(0, 8).map((row) => Array.isArray(row) ? row.slice(0, 6) : []) : [];
    const rowCount = Math.max(2, rows.length);
    const colCount = Math.max(2, rows.reduce((max, row) => Math.max(max, row.length), 0));
    while (rows.length < rowCount) {
      rows.push([]);
    }
    rows.forEach((row) => {
      while (row.length < colCount) {
        row.push("");
      }
    });
    return rows;
  }

  function getSlideMedia(slide, options) {
    return getResolvedMediaById(slide && slide.mediaId, options);
  }

  function getSlideMediaItems(slide, options) {
    const mediaIds = [slide && slide.mediaId, slide && slide.secondaryMediaId].filter(Boolean);
    return mediaIds
      .map((mediaId) => getResolvedMediaById(mediaId, options))
      .filter(Boolean);
  }

  function getResolvedMediaById(mediaId, options) {
    const opts = options || {};
    const mediaItems = Array.isArray(opts.mediaItems) ? opts.mediaItems : [];
    const mediaUrls = opts.mediaUrls || {};
    if (!mediaId) {
      return null;
    }

    const mediaItem = mediaItems.find((item) => item.id === mediaId);
    if (!mediaItem || !mediaUrls[mediaId]) {
      return null;
    }

    return {
      id: mediaItem.id,
      kind: mediaItem.kind,
      name: mediaItem.name,
      mimeType: mediaItem.mimeType,
      src: mediaUrls[mediaId],
      embedUrl: mediaItem.embedUrl,
      externalUrl: mediaItem.externalUrl,
      provider: mediaItem.provider,
      pdfLinkHref: opts.mediaLinks ? opts.mediaLinks[mediaId] : "",
    };
  }

  function isTransparentPngMedia(media) {
    if (!media || media.kind !== "image") {
      return false;
    }
    const mimeType = String(media.mimeType || "").toLowerCase();
    const source = String(media.src || "").toLowerCase();
    const name = String(media.name || "").toLowerCase();
    return mimeType === "image/png" || source.startsWith("data:image/png") || /\.png($|\?|\#)/i.test(source) || /\.png$/i.test(name);
  }

  function createResolvedMediaMarkup(media, options) {
    const utils = ns.utils;
    const isCompact = Boolean(options && options.compact);
    if (!media) {
      return "";
    }

    if (options && options.pdfMode && (media.kind === "video" || media.kind === "embed")) {
      return `
        <div class="slide-media-print-card">
          <img class="slide-media-image" src="${utils.escapeHtml(media.src)}" alt="${utils.escapeHtml(media.name)}" />
          ${media.pdfLinkHref ? `<a class="slide-media-link" href="${utils.escapeHtml(media.pdfLinkHref)}" target="_blank" rel="noopener noreferrer">${utils.escapeHtml(media.pdfLinkHref)}</a>` : ""}
        </div>
      `;
    }

    if (options && options.exportMode === "html" && media.kind === "embed") {
      return `
        <div class="slide-media-print-card">
          <img class="slide-media-image" src="${utils.escapeHtml(media.src)}" alt="${utils.escapeHtml(media.name)}" />
          ${media.pdfLinkHref ? `<a class="slide-media-link" href="${utils.escapeHtml(media.pdfLinkHref)}" target="_blank" rel="noopener noreferrer">Ouvrir la vidÃ©o</a>` : ""}
        </div>
      `;
    }

    if (media.kind === "embed" && media.provider === "apps-education") {
      const linkHref = media.externalUrl || media.embedUrl || "";
      return `
        <div class="slide-media-print-card">
          ${linkHref ? `
            <a class="slide-media-external-link" href="${utils.escapeHtml(linkHref)}" target="_blank" rel="noopener noreferrer" aria-label="Ouvrir la vidÃ©o ${utils.escapeHtml(media.name)}">
              <img class="slide-media-image" src="${utils.escapeHtml(media.src)}" alt="${utils.escapeHtml(media.name)}" />
            </a>
          ` : `<img class="slide-media-image" src="${utils.escapeHtml(media.src)}" alt="${utils.escapeHtml(media.name)}" />`}
          ${linkHref ? `<a class="slide-media-link" href="${utils.escapeHtml(linkHref)}" target="_blank" rel="noopener noreferrer">Ouvrir la vidÃ©o</a>` : ""}
        </div>
      `;
    }

    if (media.kind === "embed") {
      return `
        <div class="slide-media-embed-wrap">
          <iframe
            class="slide-media-embed"
            src="${utils.escapeHtml(media.embedUrl || media.src)}"
            title="${utils.escapeHtml(media.name)}"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      `;
    }

    if (media.kind === "video") {
      return `
        <video class="slide-media-video" src="${utils.escapeHtml(media.src)}" ${isCompact ? 'muted playsinline preload="metadata"' : 'controls preload="metadata"'}>
          Votre navigateur ne peut pas lire cette vidÃ©o.
        </video>
      `;
    }

    return `<img class="slide-media-image" src="${utils.escapeHtml(media.src)}" alt="${utils.escapeHtml(media.name)}" />`;
  }

  function createSlideMediaMarkup(slide, options) {
    const mediaItems = getSlideMediaItems(slide, options);
    if (mediaItems.length > 1) {
      return `
        <div class="slide-media-stack">
          ${mediaItems.map((media) => `
            <div class="slide-media-stack-card">
              ${createResolvedMediaMarkup(media, options)}
            </div>
          `).join("")}
        </div>
      `;
    }
    return createResolvedMediaMarkup(mediaItems[0] || getSlideMedia(slide, options), options);
  }

  function createLinkBubbleListMarkup(urls, className, tagName) {
    const links = Array.isArray(urls) ? urls.filter(Boolean) : [];
    if (!links.length) {
      return "";
    }
    const wrapperTag = tagName === "span" ? "span" : "div";

    return `
      <${wrapperTag} class="${className || "slide-link-bubbles"}">
        ${links.map((url) => `
          <a class="slide-free-link slide-link-bubble" href="${ns.utils.escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
            ${ns.utils.escapeHtml(ns.utils.formatUrlLabel(url))}
          </a>
        `).join("")}
      </${wrapperTag}>
    `;
  }

  function createLinkedTextMarkup(value, options) {
    const utils = ns.utils;
    const opts = options || {};
    const linked = utils.extractLinks(value);
    const hasText = Boolean(linked.text);
    const textMarkup = hasText
      ? (opts.multiline
        ? utils.plainTextToRichHtml(linked.text, opts.limit)
        : `<span class="${opts.textClass || "slide-linked-text"}">${utils.escapeHtml(linked.text)}</span>`)
      : "";
    const linkMarkup = createLinkBubbleListMarkup(linked.links, opts.linksClass, opts.linksTag);
    return `${textMarkup}${linkMarkup}`;
  }

  function createBulletListMarkup(items, options) {
    const utils = ns.utils;
    const opts = options || {};
    const numbered = Boolean(opts.numbered);
    const startAt = Math.max(1, Number(opts.startAt) || 1);
    const className = opts.className || "slide-bullets";
    const progressive = Boolean(opts.progressive);

    return `
      <ul class="${className}${numbered ? " is-numbered" : ""}">
        ${items
          .map((item, index) => {
            const bulletItem = typeof item === "string" ? { text: item, children: [] } : item;
            const marker = numbered
              ? `<span class="slide-bullet-marker">${String(startAt + index).padStart(2, "0")}</span>`
              : "";
            const revealAttrs = progressive
              ? ` data-reveal-step="${startAt + index}" class="slide-reveal-item"`
              : "";
            const childrenMarkup = Array.isArray(bulletItem.children) && bulletItem.children.length
              ? `
                <ul class="slide-sub-bullets">
                  ${bulletItem.children.map((child) => `<li>${createLinkedTextMarkup(child, { textClass: "slide-sub-bullet-text", linksClass: "slide-link-bubbles slide-link-bubbles-sub" })}</li>`).join("")}
                </ul>
              `
              : "";
            return `<li${revealAttrs}>${marker}<div class="slide-bullet-text">${createLinkedTextMarkup(bulletItem.text || "", { textClass: "slide-bullet-text-content", linksClass: "slide-link-bubbles slide-link-bubbles-bullet" })}${childrenMarkup}</div></li>`;
          })
          .join("")}
      </ul>
    `;
  }

  function buildBulletItems(slide) {
    const bullets = Array.isArray(slide && slide.bullets)
      ? slide.bullets.filter((item) => item && item.trim())
      : [];
    const subBullets = slide && slide.subBullets && typeof slide.subBullets === "object"
      ? slide.subBullets
      : {};

    return bullets.map((text, index) => ({
      text,
      children: Array.isArray(subBullets[index]) ? subBullets[index].filter((item) => item && item.trim()) : [],
    }));
  }

  function splitBulletsForLayout(bulletsInput) {
    const bullets = Array.isArray(bulletsInput) ? bulletsInput : [];

    if (bullets.length <= 1) {
      return {
        mainBullets: bullets.slice(0, 3),
        extraBullets: bullets.slice(3),
        mainWeight: bullets.length ? 1 : 0,
        extraWeight: 0,
      };
    }

    const getBulletWeight = (item) => {
      const bulletItem = item && typeof item === "object" ? item : { text: String(item || ""), children: [] };
      const mainTextLength = String(bulletItem.text || "").trim().length;
      const mainWeight = 1 + Math.min(0.45, mainTextLength / 280);
      const childrenWeight = (Array.isArray(bulletItem.children) ? bulletItem.children : []).reduce((sum, child) => {
        const childLength = String(child || "").trim().length;
        return sum + 0.78 + Math.min(0.3, childLength / 360);
      }, 0);
      return mainWeight + childrenWeight;
    };

    const weights = bullets.map(getBulletWeight);
    const totalWeight = weights.reduce((sum, value) => sum + value, 0);
    const splitThreshold = 5.15;

    if (bullets.length <= 3 && totalWeight <= splitThreshold) {
      return {
        mainBullets: bullets.slice(0, 3),
        extraBullets: bullets.slice(3),
        mainWeight: totalWeight,
        extraWeight: 0,
      };
    }

    let bestSplitIndex = -1;
    let bestScore = Number.POSITIVE_INFINITY;
    let runningWeight = 0;

    for (let index = 0; index < bullets.length - 1; index += 1) {
      runningWeight += weights[index];
      const leftWeight = runningWeight;
      const rightWeight = totalWeight - runningWeight;
      const score = Math.max(leftWeight, rightWeight) + (Math.abs(leftWeight - rightWeight) * 0.22);

      if (score < bestScore) {
        bestScore = score;
        bestSplitIndex = index + 1;
      }
    }

    if (bestSplitIndex > 0) {
      return {
        mainBullets: bullets.slice(0, bestSplitIndex),
        extraBullets: bullets.slice(bestSplitIndex),
        mainWeight: weights.slice(0, bestSplitIndex).reduce((sum, value) => sum + value, 0),
        extraWeight: weights.slice(bestSplitIndex).reduce((sum, value) => sum + value, 0),
      };
    }

    return {
      mainBullets: bullets.slice(0, 3),
      extraBullets: bullets.slice(3),
      mainWeight: weights.slice(0, 3).reduce((sum, value) => sum + value, 0),
      extraWeight: weights.slice(3).reduce((sum, value) => sum + value, 0),
    };
  }

  function getTableCellFillStyle(tableHighlights, rowIndex, columnIndex) {
    const rowColor = tableHighlights && tableHighlights.rows ? tableHighlights.rows[String(rowIndex)] : "";
    const columnColor = tableHighlights && tableHighlights.columns ? tableHighlights.columns[String(columnIndex)] : "";
    const color = rowColor || columnColor;
    return color ? `background:${ns.utils.escapeHtml(color)};` : "";
  }

  function createTableMarkup(tableInput, tableHighlights, options) {
    const table = normalizeTable(tableInput);
    const rowCount = table.length;
    const columnCount = table[0] ? table[0].length : 0;
    const opts = options || {};
    const progressive = Boolean(opts.progressive);
    const progressiveOrder = opts.progressiveOrder === "column" ? "column" : "row";
    const bodyRowCount = Math.max(0, table.length - 1);
    const densityClass = table.length >= 7
      ? " slide-table-dense-3"
      : table.length >= 6
        ? " slide-table-dense-2"
        : table.length >= 5
          ? " slide-table-dense-1"
          : "";
    return `
      <div class="slide-table${densityClass}" data-table-lightbox="true" data-row-count="${rowCount}" data-column-count="${columnCount}">
        ${table.map((row, rowIndex) => `
          <div class="slide-table-row${progressive && rowIndex > 0 && columnCount > 2 ? " slide-reveal-item" : ""}" style="grid-template-columns: repeat(${row.length}, minmax(0, 1fr));"${progressive && rowIndex > 0 && columnCount > 2 ? ` data-reveal-step="${rowIndex}"` : ""}>
            ${row.map((cell, columnIndex) => {
              const isHeaderCell = rowIndex === 0 || (columnCount > 2 && columnIndex === 0);
              const headerClass = isHeaderCell ? " slide-table-cell-header" : "";
              const fillStyle = getTableCellFillStyle(tableHighlights, rowIndex, columnIndex);
              const revealStep = progressiveOrder === "column"
                ? (columnIndex * bodyRowCount) + rowIndex
                : ((rowIndex - 1) * columnCount) + columnIndex + 1;
              const revealAttrs = progressive && rowIndex > 0 && columnCount <= 2
                ? ` class="slide-table-cell${headerClass} slide-reveal-item" data-reveal-step="${revealStep}"`
                : ` class="slide-table-cell${headerClass}"`;
              return `<div${revealAttrs}${fillStyle ? ` style="${fillStyle}"` : ""}>${createLinkedTextMarkup(cell || "", { textClass: "slide-table-cell-text", linksClass: "slide-link-bubbles slide-link-bubbles-table" })}</div>`;
            }).join("")}
          </div>
        `).join("")}
      </div>
    `;
  }

  function createFreeMarkup(slide, options) {
    const utils = ns.utils;
    const bodyMarkup = utils.sanitizeRichText(slide.freeBody || "", 1600);
    const freeLinks = Array.isArray(slide.freeLinks) ? slide.freeLinks : [];
    const linksMarkup = freeLinks.length
      ? `
        <div class="slide-free-links">
          ${freeLinks
            .map((item) => {
              const label = item.label || item.url;
              return `<a class="slide-free-link" href="${utils.escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">${utils.escapeHtml(label)}</a>`;
            })
            .join("")}
        </div>
      `
      : "";
    const galleryIds = Array.isArray(slide.freeMediaIds) ? slide.freeMediaIds : [];
    const galleryMarkup = galleryIds.length
      ? `
        <div class="slide-free-gallery">
          ${galleryIds
            .map((mediaId) => {
              const media = getResolvedMediaById(mediaId, options);
              const mediaMarkup = createResolvedMediaMarkup(media, options);
              return mediaMarkup ? `<div class="slide-free-gallery-item">${mediaMarkup}</div>` : "";
            })
            .join("")}
        </div>
      `
      : "";

    return `
      <div class="slide-free-body">
        ${bodyMarkup}
        ${linksMarkup}
        ${galleryMarkup}
      </div>
    `;
  }

  function createBulletSideColumnMarkup(extraBullets, slide, options, numberingStart, progressive) {
    const sideBulletsMarkup = Array.isArray(extraBullets) && extraBullets.length
      ? createBulletListMarkup(extraBullets, {
          className: "slide-side-bullets",
          numbered: Boolean(slide && slide.bulletsNumbered),
          startAt: numberingStart,
          progressive: Boolean(progressive),
        })
      : "";
    const mediaMarkup = createSlideMediaMarkup(slide, options);

    if (sideBulletsMarkup && mediaMarkup) {
      return `
        <div class="slide-side-column">
          <div class="slide-side-column-bullets">${sideBulletsMarkup}</div>
          <div class="slide-side-column-media">${mediaMarkup}</div>
        </div>
      `;
    }

    return sideBulletsMarkup || mediaMarkup;
  }

  function createBulletPrimaryColumnMarkup(bulletMarkup, mediaMarkup, mediaCount) {
    if (!mediaMarkup) {
      return bulletMarkup;
    }

    return `
      <div class="slide-primary-column">
        <div class="slide-primary-column-bullets">${bulletMarkup}</div>
        <div class="slide-primary-column-media slide-media-slot is-media-bare${mediaCount > 1 ? " has-media-stack" : ""}">${mediaMarkup}</div>
      </div>
    `;
  }

  function getVisualData(slide) {
    const fallback = (ns.stateFactory && ns.stateFactory.createDefaultVisualData)
      ? ns.stateFactory.createDefaultVisualData()
      : {
          primaryMediaId: "",
          secondaryMediaId: "",
          body: "",
          callout: "",
          arrowDirection: "right",
          arrowColor: "#60b2e5",
          chartTitle: "",
          chartBars: [],
        };
    const raw = slide && slide.visualData && typeof slide.visualData === "object" ? slide.visualData : {};
    const chartBars = Array.isArray(raw.chartBars) ? raw.chartBars.slice(0, 6) : [];

    while (chartBars.length < 6) {
      chartBars.push(fallback.chartBars[chartBars.length] || { label: "", value: 0 });
    }

    return {
      primaryMediaId: raw.primaryMediaId || fallback.primaryMediaId,
      secondaryMediaId: raw.secondaryMediaId || fallback.secondaryMediaId,
      showImages: raw.showImages !== false,
      primaryMediaReveal: Boolean(raw.primaryMediaReveal),
      secondaryMediaReveal: Boolean(raw.secondaryMediaReveal),
      body: typeof raw.body === "string" ? raw.body : fallback.body,
      callout: typeof raw.callout === "string" ? raw.callout : fallback.callout,
      arrowDirection: raw.arrowDirection || fallback.arrowDirection,
      arrowColor: raw.arrowColor || fallback.arrowColor,
      showChart: raw.showChart !== false,
      chartReveal: Boolean(raw.chartReveal),
      chartBarCount: Math.max(1, Math.min(6, Number(raw.chartBarCount) || fallback.chartBarCount || 3)),
      chartTitle: typeof raw.chartTitle === "string" ? raw.chartTitle : fallback.chartTitle,
      chartBars: chartBars.map((bar, index) => ({
        label: (bar && bar.label) || (fallback.chartBars[index] ? fallback.chartBars[index].label : ""),
        value: Number.isFinite(Number(bar && bar.value)) ? Math.max(0, Math.min(100, Number(bar.value))) : (fallback.chartBars[index] ? fallback.chartBars[index].value : 0),
        color: /^#[0-9a-fA-F]{6}$/.test(bar && bar.color) ? bar.color : (fallback.chartBars[index] ? fallback.chartBars[index].color : "#60b2e5"),
      })),
    };
  }

  function createVisualArrowMarkup(direction, color, options) {
    const opts = options || {};
    const arrowDirection = direction === "up" || direction === "down" || direction === "left" ? direction : "right";
    const rotation = arrowDirection === "down" ? "90" : arrowDirection === "left" ? "180" : arrowDirection === "up" ? "-90" : "0";
    return `
      <svg class="slide-visual-arrow-svg" viewBox="0 0 200 56" aria-hidden="true"${opts.stretch ? ' preserveAspectRatio="none"' : ""}>
        <g transform="rotate(${rotation} 100 28)">
          <path
            d="M16 24h124l-20-18 8-6 40 28-40 28-8-6 20-18H16z"
            fill="${ns.utils.escapeHtml(color || "#60b2e5")}"
          ></path>
        </g>
      </svg>
    `;
  }

  function createVisualMediaCardMarkup(media, options, className, placeholder, revealStep) {
    const mediaMarkup = media ? createResolvedMediaMarkup(media, options) : `<div class="slide-visual-media-placeholder">${ns.utils.escapeHtml(placeholder)}</div>`;
    const revealAttrs = Number.isInteger(revealStep) && revealStep > 0 ? ` data-reveal-step="${revealStep}" class="${className} slide-reveal-item"` : ` class="${className}"`;
    return `<div${revealAttrs}><div class="slide-visual-media-frame">${mediaMarkup}</div></div>`;
  }

  function createVisualMarkup(slide, options) {
    const visualData = getVisualData(slide);
    const arrowDirection = visualData.arrowDirection === "up" || visualData.arrowDirection === "down" || visualData.arrowDirection === "left" ? visualData.arrowDirection : "right";
    const isHorizontal = arrowDirection === "left" || arrowDirection === "right";
    const primaryMedia = getResolvedMediaById(visualData.primaryMediaId, options);
    const secondaryMedia = getResolvedMediaById(visualData.secondaryMediaId, options);
    const showImages = visualData.showImages !== false;
    const mediaCards = [
      {
        media: primaryMedia,
        placeholder: "Ajoutez une image principale",
        revealStep: primaryMedia && visualData.primaryMediaReveal ? 1 : null,
      },
      {
        media: secondaryMedia,
        placeholder: "Ajoutez une image secondaire",
        revealStep: secondaryMedia && visualData.secondaryMediaReveal ? (primaryMedia && visualData.primaryMediaReveal ? 2 : 1) : null,
      },
    ];
    const orderedMediaCards = arrowDirection === "left" || arrowDirection === "up" ? mediaCards.slice().reverse() : mediaCards;
    const visibleMediaCards = showImages ? orderedMediaCards.filter((item) => item.media) : [];
    const hasAnyMedia = visibleMediaCards.length > 0;
    const hasTwoMedia = visibleMediaCards.length > 1;
    const arrowRevealStep = hasTwoMedia
      ? visibleMediaCards.reduce((maxStep, item) => Math.max(maxStep, item.revealStep || 0), 0) || null
      : null;
    const bodyRevealStep = primaryMedia && visualData.primaryMediaReveal ? 1 : null;
    const calloutRevealStep = secondaryMedia && visualData.secondaryMediaReveal
      ? (primaryMedia && visualData.primaryMediaReveal ? 2 : 1)
      : null;
    const chartRevealBase = visibleMediaCards.reduce((maxStep, item) => Math.max(maxStep, item.revealStep || 0), 0);
    const chartRevealStep = visualData.showChart && visualData.chartReveal ? chartRevealBase + 1 : null;
    const bodyMarkup = createLinkedTextMarkup(visualData.body || "", {
      multiline: true,
      limit: 320,
      linksClass: "slide-link-bubbles slide-link-bubbles-visual",
    });
    const calloutMarkup = createLinkedTextMarkup(visualData.callout || "", {
      multiline: true,
      limit: 180,
      linksClass: "slide-link-bubbles slide-link-bubbles-visual",
    });
    const chartTitle = visualData.chartTitle || "";
    const chartBars = visualData.chartBars
      .slice(0, Math.max(1, Math.min(6, Number(visualData.chartBarCount) || 3)));
    const chartBarsData = ns.utils.escapeHtml(JSON.stringify(
      chartBars.map((bar) => ({
        label: bar.label || "Point",
        value: Math.round(Number(bar.value) || 0),
        color: bar.color || visualData.arrowColor,
      }))
    ));
    const chartBarsMarkup = chartBars
      .map((bar) => {
        const height = Math.max(6, Math.round(Math.max(0, Math.min(100, Number(bar.value) || 0))));
        return `
          <div class="slide-visual-chart-bar-card">
            <div class="slide-visual-chart-bar-shell">
              <div class="slide-visual-chart-bar-fill" style="height:${height}%; background:${ns.utils.escapeHtml(bar.color || visualData.arrowColor)};"></div>
            </div>
            <div class="slide-visual-chart-meta">
              <span class="slide-visual-chart-label">${ns.utils.escapeHtml(bar.label || "Point")}</span>
              <strong class="slide-visual-chart-value">${Math.round(Number(bar.value) || 0)}%</strong>
            </div>
          </div>
        `;
      })
      .join("");

    return `
      <div class="slide-visual-layout slide-visual-layout-${ns.utils.escapeHtml(arrowDirection)}${hasAnyMedia ? "" : " is-media-hidden"}${hasTwoMedia ? " has-two-media" : hasAnyMedia ? " has-single-media" : ""}">
        ${hasAnyMedia ? `
          <div class="slide-visual-flow slide-visual-flow-${isHorizontal ? "horizontal" : "vertical"} slide-visual-flow-count-${visibleMediaCards.length}">
            ${visibleMediaCards
              .map((item) => createVisualMediaCardMarkup(item.media, options, "slide-visual-media-card", item.placeholder, item.revealStep))
              .join("")}
            ${hasTwoMedia ? `
              <div class="slide-visual-relation-card${arrowRevealStep ? " slide-reveal-item" : ""}" aria-hidden="true"${arrowRevealStep ? ` data-reveal-step="${arrowRevealStep}"` : ""}>
                <div class="slide-visual-arrow-wrap">
                  ${createVisualArrowMarkup(arrowDirection, visualData.arrowColor)}
                </div>
              </div>
            ` : ""}
          </div>
        ` : ""}
        <div class="slide-visual-support-column${visualData.showChart ? " has-chart" : ""}${hasAnyMedia ? "" : " is-expanded"}">
          ${bodyMarkup ? `
            <div class="slide-visual-text-card${bodyRevealStep ? " slide-reveal-item" : ""}"${bodyRevealStep ? ` data-reveal-step="${bodyRevealStep}"` : ""}>
              ${bodyMarkup}
            </div>
          ` : ""}
          ${calloutMarkup ? `
            <div class="slide-visual-callout-card${calloutRevealStep ? " slide-reveal-item" : ""}"${calloutRevealStep ? ` data-reveal-step="${calloutRevealStep}"` : ""}>
              <div class="slide-visual-callout-text">${calloutMarkup}</div>
            </div>
          ` : ""}
          ${visualData.showChart ? `
            <div class="slide-visual-chart-card${chartRevealStep ? " slide-reveal-item" : ""}"${chartRevealStep ? ` data-reveal-step="${chartRevealStep}"` : ""} data-chart-title="${ns.utils.escapeHtml(chartTitle)}" data-chart-body="${ns.utils.escapeHtml(visualData.body || "")}" data-chart-callout="${ns.utils.escapeHtml(visualData.callout || "")}" data-chart-bars="${chartBarsData}">
              ${chartTitle ? `<p class="slide-visual-chart-title">${ns.utils.escapeHtml(chartTitle)}</p>` : ""}
              <div class="slide-visual-chart-grid${chartBars.length > 4 ? " is-dense" : ""}" data-chart-count="${chartBars.length}" style="grid-template-columns: repeat(${chartBars.length}, minmax(0, 1fr));">
                ${chartBarsMarkup}
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }

  function clampCanvasMetric(value, fallback, min, max) {
    const parsed = Number(value);
    const safeValue = Number.isFinite(parsed) ? parsed : fallback;
    const lowerBound = Number.isFinite(min) ? min : 0;
    const upperBound = Number.isFinite(max) ? max : 100;
    const clamped = Math.max(lowerBound, Math.min(upperBound, safeValue));
    return Math.round(clamped * 10) / 10;
  }

  function normalizeCanvasRotation(value, fallback) {
    const parsed = Number(value);
    const safeValue = Number.isFinite(parsed) ? parsed : (Number.isFinite(Number(fallback)) ? Number(fallback) : 0);
    return Math.round(Math.max(-360, Math.min(360, safeValue)));
  }

  function normalizeCanvasArrowLength(value, fallback) {
    const parsed = Number(value);
    const safeValue = Number.isFinite(parsed) ? parsed : (Number.isFinite(Number(fallback)) ? Number(fallback) : 100);
    return Math.round(Math.max(40, Math.min(800, safeValue)));
  }

  function normalizeCanvasElement(element, index) {
    const input = element && typeof element === "object" ? element : {};
    const type = input.type === "image" || input.type === "arrow" ? input.type : "text";
    const normalized = {
      id: typeof input.id === "string" && input.id ? input.id : ns.utils.createId("canvas"),
      type,
      x: clampCanvasMetric(input.x, 10 + ((index % 3) * 8), 0, 92),
      y: clampCanvasMetric(input.y, 12 + ((index % 4) * 6), 0, 92),
      w: clampCanvasMetric(input.w, type === "arrow" ? 18 : type === "image" ? 28 : 34, 6, 100),
      h: clampCanvasMetric(input.h, type === "arrow" ? 10 : type === "image" ? 30 : 18, 6, 100),
    };

    normalized.w = Math.min(normalized.w, Math.max(6, 100 - normalized.x));
    normalized.h = Math.min(normalized.h, Math.max(6, 100 - normalized.y));

    if (type === "image") {
      normalized.mediaId = typeof input.mediaId === "string" ? input.mediaId : "";
      return normalized;
    }

    if (type === "arrow") {
      normalized.direction = input.direction === "up" || input.direction === "down" || input.direction === "left" ? input.direction : "right";
      normalized.color = /^#[0-9a-fA-F]{6}$/.test(input.color || "") ? input.color : "#0a66ff";
      normalized.rotation = normalizeCanvasRotation(input.rotation, 0);
      normalized.arrowLength = normalizeCanvasArrowLength(input.arrowLength, 100);
      return normalized;
    }

    const fallbackText = ns.utils.plainTextToRichHtml("Zone de texte", 600);
    normalized.text = typeof input.text === "string" ? ns.utils.sanitizeRichText(input.text, 600) : fallbackText;
    normalized.fontSize = clampCanvasMetric(input.fontSize, 28, 16, 72);
    normalized.color = /^#[0-9a-fA-F]{6}$/.test(input.color || "") ? input.color : "#1d1917";
    normalized.showFrame = input.showFrame !== false;
    normalized.bold = Boolean(input.bold);
    normalized.italic = Boolean(input.italic);
    normalized.underline = Boolean(input.underline);
    return normalized;
  }

  function getCanvasData(slide) {
    const raw = slide && slide.canvasData && typeof slide.canvasData === "object" ? slide.canvasData : {};
    return {
      elements: Array.isArray(raw.elements) ? raw.elements.slice(0, 24).map(normalizeCanvasElement).filter(Boolean) : [],
    };
  }

  function createCanvasTextMarkup(value) {
    return ns.utils.sanitizeRichText(value, 600);
  }

  function createCanvasElementMarkup(element, options) {
    const opts = options || {};
    const interactive = Boolean(opts.canvasInteractive);
    const selected = interactive && opts.selectedCanvasElementId === element.id;
    const selectionClass = selected ? " is-selected" : "";
    const interactiveClass = interactive ? " is-interactive" : "";
    const baseAttrs = `
      class="canvas-element canvas-element-${ns.utils.escapeHtml(element.type)}${selectionClass}${interactiveClass}"
      data-canvas-element-id="${ns.utils.escapeHtml(element.id)}"
      data-canvas-element-type="${ns.utils.escapeHtml(element.type)}"
      style="left:${element.x}%; top:${element.y}%; width:${element.w}%; height:${element.h}%;"
    `;

    if (element.type === "image") {
      const media = getResolvedMediaById(element.mediaId, opts);
      const transparentPngClass = isTransparentPngMedia(media) ? " is-transparent-png" : "";
      const mediaMarkup = media
        ? createResolvedMediaMarkup(media, opts)
        : `<div class="canvas-element-placeholder">Choisissez une image</div>`;
      return `
        <div ${baseAttrs}>
          <div class="canvas-element-content canvas-element-media-content${transparentPngClass}">${mediaMarkup}</div>
          ${interactive ? '<button class="canvas-resize-handle" type="button" data-canvas-resize-handle="true" aria-label="Redimensionner l’élément"></button>' : ""}
        </div>
      `;
    }

    if (element.type === "arrow") {
      const baseRotation = element.direction === "down" ? 90 : element.direction === "left" ? 180 : element.direction === "up" ? -90 : 0;
      const totalRotation = baseRotation + normalizeCanvasRotation(element.rotation, 0);
      return `
        <div ${baseAttrs}>
          <div class="canvas-element-content canvas-element-arrow-content" data-canvas-base-rotation="${baseRotation}" style="width:${Math.max(40, Number(element.arrowLength) || 100)}%; transform:rotate(${totalRotation}deg); --canvas-arrow-color:${ns.utils.escapeHtml(element.color || "#0a66ff")};">
            <span class="canvas-arrow-shaft" aria-hidden="true"></span>
            <span class="canvas-arrow-head" aria-hidden="true"></span>
          </div>
          ${interactive ? '<button class="canvas-rotate-handle" type="button" data-canvas-rotate-handle="true" aria-label="Faire tourner la flèche"></button>' : ""}
          ${interactive ? '<button class="canvas-resize-handle" type="button" data-canvas-resize-handle="true" aria-label="Redimensionner l’élément"></button>' : ""}
        </div>
      `;
    }

    return `
      <div ${baseAttrs}>
        <div class="canvas-element-content canvas-element-text-content${element.showFrame === false ? " is-frameless" : ""}" style="font-size:${element.fontSize}px; color:${ns.utils.escapeHtml(element.color)};">
          ${createCanvasTextMarkup(element.text)}
        </div>
        ${interactive ? '<button class="canvas-resize-handle" type="button" data-canvas-resize-handle="true" aria-label="Redimensionner l’élément"></button>' : ""}
      </div>
    `;
  }

  function createCanvasMarkup(slide, options) {
    const canvasData = getCanvasData(slide);
    const elementsMarkup = canvasData.elements
      .map((element) => createCanvasElementMarkup(element, options))
      .join("");

    return `
      <div class="slide-canvas-surface" data-canvas-surface="true">
        ${elementsMarkup || '<div class="slide-canvas-empty">Ajoutez un texte, une flèche, ou cliquez une image dans la médiathèque.</div>'}
      </div>
    `;
  }

  function createSlideMarkup(slide, settings, options) {
    const opts = options || {};
    const utils = ns.utils;
    const logoSources = getSlideLogoSources(opts);
    const slideMediaItems = getSlideMediaItems(slide, opts);
    const slideMedia = slideMediaItems[0] || null;
    const isTableMode = slide.contentType === "table";
    const isFreeMode = slide.contentType === "free";
    const isVisualMode = slide.contentType === "visual";
    const isCanvasMode = slide.contentType === "canvas";
    const allBullets = buildBulletItems(slide);
    const bulletColumns = splitBulletsForLayout(allBullets);
    const mainBullets = bulletColumns.mainBullets;
    const extraBullets = bulletColumns.extraBullets;
    const mainBulletsWeight = Number(bulletColumns.mainWeight) || 0;
    const extraBulletsWeight = Number(bulletColumns.extraWeight) || 0;
    const bulletsNumbered = Boolean(slide.bulletsNumbered);
    const bulletsProgressive = Boolean(slide.bulletsProgressive) && !opts.compact && !isFreeMode && !isTableMode && !isVisualMode && !isCanvasMode;
    const tableProgressive = Boolean(slide.tableProgressive) && !opts.compact && isTableMode;
    const tableProgressiveOrder = slide.tableProgressiveOrder === "column" ? "column" : "row";
    const visualData = slide.visualData || {};
    const visualShowsImages = visualData.showImages !== false;
    const visualProgressive = !opts.compact && isVisualMode && Boolean(
      (visualShowsImages && visualData.primaryMediaReveal && visualData.primaryMediaId) ||
      (visualShowsImages && visualData.secondaryMediaReveal && visualData.secondaryMediaId) ||
      (visualData.chartReveal && visualData.showChart)
    );
    const canKeepMediaWithExtendedBullets = Boolean(slideMedia) && allBullets.length > 3 && allBullets.length <= 6;
    const bulletMarkup = mainBullets.length
      ? createBulletListMarkup(mainBullets, {
          className: "slide-bullets",
          numbered: bulletsNumbered,
          startAt: 1,
          progressive: bulletsProgressive,
        })
      : createBulletListMarkup(["Ajoutez un point cle pour structurer la slide."], {
          className: "slide-bullets",
          numbered: false,
          startAt: 1,
          progressive: false,
        });
    const extendedBulletMarkup = createBulletListMarkup(
      allBullets.length ? allBullets : ["Ajoutez un point cle pour structurer la slide."],
      {
        className: "slide-bullets",
        numbered: allBullets.length ? bulletsNumbered : false,
        startAt: 1,
        progressive: allBullets.length ? bulletsProgressive : false,
      }
    );
    const compactClass = opts.compact ? " deck-slide-compact" : "";
    const moveMediaBelowPrimaryBullets = extraBullets.length > 0 && slideMediaItems.length > 0 && mainBulletsWeight <= extraBulletsWeight;
    const sideMarkup = extraBullets.length
      ? createBulletSideColumnMarkup(
          extraBullets,
          moveMediaBelowPrimaryBullets ? Object.assign({}, slide, { mediaId: "", secondaryMediaId: "" }) : slide,
          opts,
          mainBullets.length + 1,
          bulletsProgressive
        )
      : createSlideMediaMarkup(slide, opts);
    const headline = slide.title ? `<h3 class="slide-headline">${utils.escapeHtml(slide.title)}</h3>` : "";
    const subtitle = slide.subtitle ? `<p class="slide-subtitle-text">${utils.escapeHtml(slide.subtitle)}</p>` : "";
    const signature = settings.footer ? `<span class="slide-signature">${utils.escapeHtml(settings.footer)}</span>` : "";
    const note = slide.note
      ? `<div class="slide-note"><span class="slide-note-content">${createLinkedTextMarkup(slide.note, { textClass: "slide-note-text", linksClass: "slide-link-bubbles slide-link-bubbles-inline slide-link-bubbles-note", linksTag: "span" })}</span></div>`
      : "";

    let contentMarkup = "";
    let footerNoteMarkup = note;
    const mediaMarkup = createSlideMediaMarkup(slide, opts);

    if (isFreeMode) {
      contentMarkup = createFreeMarkup(slide, opts);
    } else if (isCanvasMode) {
      contentMarkup = createCanvasMarkup(slide, opts);
    } else if (isVisualMode) {
      contentMarkup = createVisualMarkup(slide, opts);
    } else if (isTableMode) {
      contentMarkup = createTableMarkup(slide.table, slide.tableHighlights, {
        progressive: tableProgressive,
        progressiveOrder: tableProgressiveOrder,
      });
    } else if (canKeepMediaWithExtendedBullets) {
      contentMarkup = extendedBulletMarkup;
    } else if (extraBullets.length) {
      contentMarkup = `
        <div class="slide-bullets-row slide-bullets-row-extra">
          ${moveMediaBelowPrimaryBullets ? createBulletPrimaryColumnMarkup(bulletMarkup, mediaMarkup, slideMediaItems.length) : bulletMarkup}
          <aside class="slide-media-slot slide-side-bullets-slot">${sideMarkup}</aside>
        </div>
      `;
    } else {
      contentMarkup = bulletMarkup;
    }

    const themeName = resolveThemeName(slide, settings);
    const paletteStyle = createSlidePaletteStyle(slide, settings);
    const visualModeClass = isVisualMode ? " is-visual-slide" : "";
    const canvasModeClass = isCanvasMode ? " is-canvas-slide" : "";
    const tableModeClass = isTableMode && !slideMediaItems.length ? " is-table-slide" : "";
    const visualHeaderClass = isVisualMode && (slide.title || slide.subtitle) ? " is-visual-has-header" : "";
    const stackedMediaLayoutClass = slideMediaItems.length > 1 ? " has-media-stack-layout" : "";

    return `
      <article class="deck-slide theme-${utils.escapeHtml(themeName)}${compactClass}${visualModeClass}${canvasModeClass}${tableModeClass}${visualHeaderClass}" data-progressive-content="${bulletsProgressive || tableProgressive || visualProgressive ? "true" : "false"}" style="${utils.escapeHtml(paletteStyle)}">
        <div class="slide-wave" aria-hidden="true"></div>
        <img class="slide-logo slide-logo-region" src="${utils.escapeHtml(logoSources.region)}" alt="Logo region academique" />
        <img class="slide-logo slide-logo-drane" src="${utils.escapeHtml(logoSources.drane)}" alt="Logo Drane" />
        <div class="slide-content">
          <div class="slide-topline">
            <div class="slide-meta-right">
              <span class="slide-number-badge">${utils.escapeHtml(slide.number || "")}</span>
            </div>
          </div>
          <div class="${isCanvasMode ? "slide-body slide-body-no-media slide-body-canvas" : isVisualMode ? "slide-body slide-body-no-media slide-body-visual" : slideMedia && (!extraBullets.length || isTableMode || canKeepMediaWithExtendedBullets) && !isFreeMode ? `slide-body${stackedMediaLayoutClass}` : "slide-body slide-body-no-media"}">
            <div class="slide-main">
              ${headline}
              ${subtitle}
              ${contentMarkup}
            </div>
            ${slideMediaItems.length && (!extraBullets.length || isTableMode || canKeepMediaWithExtendedBullets) && !isFreeMode && !isVisualMode ? `<aside class="slide-media-slot is-media-bare${slideMediaItems.length > 1 ? " has-media-stack" : ""}">${mediaMarkup}</aside>` : ""}
          </div>
          <div class="slide-footer">
            ${footerNoteMarkup}
            ${signature}
          </div>
        </div>
      </article>
    `;
  }

  function computeDensity(slide) {
    const totalChars =
      (slide.title || "").length +
      (slide.subtitle || "").length +
      (slide.note || "").length +
      (slide.objective || "").length +
      (slide.evidence || "").length +
      (slide.bullets || []).join("").length +
      Object.values(slide.subBullets || {}).flat().join("").length +
      (((slide.canvasData || {}).elements) || [])
        .filter((item) => item && item.type === "text")
        .map((item) => item.text || "")
        .join("").length +
      (((slide.visualData || {}).body) || "").length +
      (((slide.visualData || {}).callout) || "").length;
    const bulletCount = (slide.bullets || []).filter((item) => item && item.trim()).length;

    if (totalChars > 420 || (slide.subtitle || "").length > 150 || (slide.objective || "").length > 160) {
      return {
        label: "Trop dense",
        className: "density-badge density-alert",
      };
    }

    if (totalChars > 300 || bulletCount === 3) {
      return {
        label: "A surveiller",
        className: "density-badge density-warn",
      };
    }

    return {
      label: "Concis",
      className: "density-badge density-ok",
    };
  }

  ns.ui.getBloomMeta = getBloomMeta;
  ns.ui.getSlideLogoSources = getSlideLogoSources;
  ns.ui.createSlideMarkup = createSlideMarkup;
  ns.ui.computeDensity = computeDensity;
})();
