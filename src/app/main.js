(function () {
  const ns = (window.StudioSlides = window.StudioSlides || {});
  const STORAGE_KEY = "studio-ingenierie-formation-v2";

  const refs = {
    appShell: document.querySelector(".app-shell"),
    tabs: Array.from(document.querySelectorAll("[data-switch-view]")),
    generateBloomDeck: document.querySelector("#generate-bloom-deck"),
    addSlide: document.querySelector("#add-slide"),
    addSlideMenu: document.querySelector("#add-slide-menu"),
    duplicateSlide: document.querySelector("#duplicate-slide"),
    deleteSlide: document.querySelector("#delete-slide"),
    deleteSlideInline: document.querySelector("#delete-slide-inline"),
    openPresentation: document.querySelector("#open-presentation"),
    openPresentationActive: document.querySelector("#open-presentation-active"),
    exportPdf: document.querySelector("#export-pdf"),
    exportPptx: document.querySelector("#export-pptx"),
    exportHtml: document.querySelector("#export-html"),
    exportJson: document.querySelector("#export-json"),
    importJson: document.querySelector("#import-json"),
    importJsonInput: document.querySelector("#import-json-input"),
    toggleNightMode: document.querySelector("#toggle-night-mode"),
    deckTitle: document.querySelector("#deck-title"),
    deckSubtitle: document.querySelector("#deck-subtitle"),
    deckFooter: document.querySelector("#deck-footer"),
    deckTheme: document.querySelector("#deck-theme"),
    deckPalette: document.querySelector("#deck-palette"),
    deckFont: document.querySelector("#deck-font"),
    deckTransition: document.querySelector("#deck-transition"),
    deckFrameShadow: document.querySelector("#deck-frame-shadow"),
    taxonomyCount: document.querySelector("#taxonomy-count"),
    taxonomyRoadmap: document.querySelector("#taxonomy-roadmap"),
    slideCount: document.querySelector("#slide-count"),
    slideList: document.querySelector("#slide-list"),
    principlesList: document.querySelector("#principles-list"),
    previewPanel: document.querySelector("#preview-panel"),
    stage: document.querySelector("#stage"),
    chartLightbox: document.querySelector("#chart-lightbox"),
    chartLightboxContent: document.querySelector("#chart-lightbox-content"),
    chartLightboxClose: document.querySelector("#chart-lightbox-close"),
    tableLightbox: document.querySelector("#table-lightbox"),
    tableLightboxContent: document.querySelector("#table-lightbox-content"),
    tableLightboxClose: document.querySelector("#table-lightbox-close"),
    presentationProgress: document.querySelector("#presentation-progress"),
    slideHint: document.querySelector("#slide-hint"),
    densityBadge: document.querySelector("#density-badge"),
    thumbStrip: document.querySelector("#thumb-strip"),
    pedagogyBrief: document.querySelector("#pedagogy-brief"),
    mediaUpload: document.querySelector("#media-upload"),
    mediaUploadTrigger: document.querySelector("#media-upload-trigger"),
    toggleMediaPanel: document.querySelector("#toggle-media-panel"),
    slideMediaPanelBody: document.querySelector("#slide-media-panel-body"),
    clearSlideMedia: document.querySelector("#clear-slide-media"),
    mediaLinkInput: document.querySelector("#media-link-input"),
    mediaLinkAdd: document.querySelector("#media-link-add"),
    mediaLinkFeedback: document.querySelector("#media-link-feedback"),
    mediaLibrary: document.querySelector("#media-library"),
    slideMediaSelection: document.querySelector("#slide-media-selection"),
    slideBloomLevel: document.querySelector("#slide-bloom-level"),
    slideLabel: document.querySelector("#slide-label"),
    slideNumber: document.querySelector("#slide-number"),
    slideObjective: document.querySelector("#slide-objective"),
    slideEvidence: document.querySelector("#slide-evidence"),
    slideTitle: document.querySelector("#slide-title"),
    slideSubtitle: document.querySelector("#slide-subtitle"),
    slideContentType: document.querySelector("#slide-content-type"),
    slidePaletteOverride: document.querySelector("#slide-palette-override"),
    slideDecorativeAccentOverride: document.querySelector("#slide-decorative-accent-override"),
    slideDecorativeAccentSolid: document.querySelector("#slide-decorative-accent-solid"),
    slideBulletsEditor: document.querySelector("#slide-bullets-editor"),
    slideTableEditor: document.querySelector("#slide-table-editor"),
    slideFreeEditor: document.querySelector("#slide-free-editor"),
    slideCanvasEditor: document.querySelector("#slide-canvas-editor"),
    slideVisualEditor: document.querySelector("#slide-visual-editor"),
    slideNoteEditor: document.querySelector("#slide-note-editor"),
    slideBulletsNumbered: document.querySelector("#slide-bullets-numbered"),
    slideBulletsProgressive: document.querySelector("#slide-bullets-progressive"),
    slideTableProgressive: document.querySelector("#slide-table-progressive"),
    slideTableProgressiveOrderWrap: document.querySelector("#slide-table-progressive-order-wrap"),
    slideTableProgressiveOrder: document.querySelector("#slide-table-progressive-order"),
    slideBullet1: document.querySelector("#slide-bullet-1"),
    slideBullet2: document.querySelector("#slide-bullet-2"),
    slideBullet3: document.querySelector("#slide-bullet-3"),
    subBulletLists: [
      document.querySelector("#sub-bullets-0"),
      document.querySelector("#sub-bullets-1"),
      document.querySelector("#sub-bullets-2"),
    ],
    addBullet: document.querySelector("#add-bullet"),
    extraBulletsList: document.querySelector("#extra-bullets-list"),
    addTableRow: document.querySelector("#add-table-row"),
    removeTableRow: document.querySelector("#remove-table-row"),
    addTableColumn: document.querySelector("#add-table-column"),
    removeTableColumn: document.querySelector("#remove-table-column"),
    tableFillTarget: document.querySelector("#table-fill-target"),
    tableFillIndex: document.querySelector("#table-fill-index"),
    tableFillColor: document.querySelector("#table-fill-color"),
    addTableFill: document.querySelector("#add-table-fill"),
    tableFillList: document.querySelector("#table-fill-list"),
    tableEditorGrid: document.querySelector("#table-editor-grid"),
    slideFreeBody: document.querySelector("#slide-free-body"),
    freeTextColor: document.querySelector("#free-text-color"),
    freeBodyMeta: document.querySelector("#free-body-meta"),
    freeLinkLabel: document.querySelector("#free-link-label"),
    freeLinkUrl: document.querySelector("#free-link-url"),
    addFreeLink: document.querySelector("#add-free-link"),
    freeLinksList: document.querySelector("#free-links-list"),
    canvasAddText: document.querySelector("#canvas-add-text"),
    canvasAddArrow: document.querySelector("#canvas-add-arrow"),
    canvasElementsList: document.querySelector("#canvas-elements-list"),
    canvasElementFields: document.querySelector("#canvas-element-fields"),
    canvasEmptySelection: document.querySelector("#canvas-empty-selection"),
    canvasElementX: document.querySelector("#canvas-element-x"),
    canvasElementY: document.querySelector("#canvas-element-y"),
    canvasElementW: document.querySelector("#canvas-element-w"),
    canvasElementH: document.querySelector("#canvas-element-h"),
    canvasTextContentWrap: document.querySelector("#canvas-text-content-wrap"),
    canvasTextContent: document.querySelector("#canvas-text-content"),
    canvasTextToolbar: document.querySelector("#canvas-text-toolbar"),
    canvasTextBold: document.querySelector("#canvas-text-bold"),
    canvasTextItalic: document.querySelector("#canvas-text-italic"),
    canvasTextUnderline: document.querySelector("#canvas-text-underline"),
    canvasTextColorPalette: document.querySelector("#canvas-text-color-palette"),
    canvasTextStyleGrid: document.querySelector("#canvas-text-style-grid"),
    canvasTextSize: document.querySelector("#canvas-text-size"),
    canvasTextSizeValue: document.querySelector("#canvas-text-size-value"),
    canvasTextFrame: document.querySelector("#canvas-text-frame"),
    canvasImageMediaWrap: document.querySelector("#canvas-image-media-wrap"),
    canvasImageMedia: document.querySelector("#canvas-image-media"),
    canvasArrowControls: document.querySelector("#canvas-arrow-controls"),
    canvasArrowDirection: document.querySelector("#canvas-arrow-direction"),
    canvasArrowColor: document.querySelector("#canvas-arrow-color"),
    canvasArrowRotation: document.querySelector("#canvas-arrow-rotation"),
    canvasArrowLength: document.querySelector("#canvas-arrow-length"),
    canvasArrowLengthValue: document.querySelector("#canvas-arrow-length-value"),
    canvasDeleteElement: document.querySelector("#canvas-delete-element"),
    visualPrimaryMedia: document.querySelector("#visual-primary-media"),
    visualSecondaryMedia: document.querySelector("#visual-secondary-media"),
    visualShowImages: document.querySelector("#visual-show-images"),
    visualPrimaryMediaReveal: document.querySelector("#visual-primary-media-reveal"),
    visualSecondaryMediaReveal: document.querySelector("#visual-secondary-media-reveal"),
    visualBody: document.querySelector("#visual-body"),
    visualBodyMeta: document.querySelector("#visual-body-meta"),
    visualCallout: document.querySelector("#visual-callout"),
    visualCalloutMeta: document.querySelector("#visual-callout-meta"),
    visualArrowDirection: document.querySelector("#visual-arrow-direction"),
    visualArrowColor: document.querySelector("#visual-arrow-color"),
    visualShowChart: document.querySelector("#visual-show-chart"),
    visualChartEditor: document.querySelector("#visual-chart-editor"),
    visualChartReveal: document.querySelector("#visual-chart-reveal"),
    visualChartTitle: document.querySelector("#visual-chart-title"),
    visualChartBars: document.querySelector("#visual-chart-bars"),
    visualChartAddColumn: document.querySelector("#visual-chart-add-column"),
    visualChartRemoveColumn: document.querySelector("#visual-chart-remove-column"),
    slideNote: document.querySelector("#slide-note"),
    titleMeta: document.querySelector("#title-meta"),
    subtitleMeta: document.querySelector("#subtitle-meta"),
    noteMeta: document.querySelector("#note-meta"),
    objectiveMeta: document.querySelector("#objective-meta"),
    evidenceMeta: document.querySelector("#evidence-meta"),
  };

  let state = ns.services.storage.loadState(STORAGE_KEY);
  let draggedSlideId = null;
  let draggedListSlideId = null;
  let draggedBulletIndex = null;
  let draggedFreeLinkIndex = null;
  let draggedVisualChartIndex = null;
  let isAddSlideMenuOpen = false;
  let pendingBulletFocus = null;
  let pendingSubBulletFocus = null;
  let pendingTableFocus = null;
  let pendingVisualFieldFocus = null;
  let pendingVisualChartFocus = null;
  let pendingPreviewPanelFocus = false;
  let freeEditorRange = null;
  let suppressFreeEditorBlur = false;
  let canvasTextEditorRange = null;
  let canvasTextSelectionBookmark = null;
  let suppressCanvasTextEditorBlur = false;
  let selectedCanvasElementId = null;
  let activeCanvasInteraction = null;
  let suppressCanvasClickUntil = 0;
  let isPptxExportRunning = false;
  const defaultPptxButtonLabel = refs.exportPptx ? refs.exportPptx.textContent : "Exporter PPTX";
  const isPresentationMode = new URLSearchParams(window.location.search).get("present") === "1";

  if (isPresentationMode) {
    ns.services.exporter.renderPresentationDocument(state);
    return;
  }

  function getSelectedSlide() {
    return state.slides.find((slide) => slide.id === state.selectedSlideId) || state.slides[0];
  }

  function getDefaultCanvasData() {
    return ns.utils.clone(
      (ns.stateFactory && ns.stateFactory.createDefaultCanvasData)
        ? ns.stateFactory.createDefaultCanvasData()
        : { elements: [] }
    );
  }

  function getSelectedCanvasData() {
    return Object.assign(getDefaultCanvasData(), ns.utils.clone((getSelectedSlide() && getSelectedSlide().canvasData) || {}));
  }

  function getCanvasSelectedElement(elements) {
    const items = Array.isArray(elements) ? elements : [];
    return items.find((item) => item.id === selectedCanvasElementId) || null;
  }

  function syncSelectedCanvasElement() {
    const selectedSlide = getSelectedSlide();
    if (!selectedSlide || (selectedSlide.contentType || "bullets") !== "canvas") {
      selectedCanvasElementId = null;
      return;
    }
    const canvasData = getSelectedCanvasData();
    const selectedElement = getCanvasSelectedElement(canvasData.elements);
    if (selectedCanvasElementId && !selectedElement) {
      selectedCanvasElementId = null;
    }
  }

  function updatePptxExportButton(progress) {
    if (!refs.exportPptx) {
      return;
    }

    const detail = progress || {};
    const percent = Math.max(0, Math.min(100, Number(detail.percent) || 0));
    const stateName = detail.state || "idle";
    const label = detail.label || defaultPptxButtonLabel;
    const buttonText = stateName === "running"
      ? `${label} ${percent}%`
      : label;

    refs.exportPptx.textContent = buttonText;
    refs.exportPptx.style.setProperty("--pptx-progress", `${percent}%`);
    refs.exportPptx.classList.toggle("is-exporting", stateName === "running");
    refs.exportPptx.classList.toggle("is-complete", stateName === "completed");
    refs.exportPptx.disabled = stateName === "running";
    refs.exportPptx.setAttribute("aria-busy", stateName === "running" ? "true" : "false");
    refs.exportPptx.title = detail.detail || defaultPptxButtonLabel;

    if (stateName === "completed") {
      window.setTimeout(() => {
        if (isPptxExportRunning) {
          return;
        }
        refs.exportPptx.textContent = defaultPptxButtonLabel;
        refs.exportPptx.style.setProperty("--pptx-progress", "0%");
        refs.exportPptx.classList.remove("is-complete");
        refs.exportPptx.title = defaultPptxButtonLabel;
      }, 1800);
    }

    if (stateName === "idle" || stateName === "error") {
      refs.exportPptx.textContent = defaultPptxButtonLabel;
      refs.exportPptx.style.setProperty("--pptx-progress", "0%");
      refs.exportPptx.classList.remove("is-exporting", "is-complete");
      refs.exportPptx.disabled = false;
      refs.exportPptx.setAttribute("aria-busy", "false");
      refs.exportPptx.title = defaultPptxButtonLabel;
    }
  }

  if (ns.services.exporter && typeof ns.services.exporter.setPptxProgressListener === "function") {
    ns.services.exporter.setPptxProgressListener(updatePptxExportButton);
  }

  function render() {
    syncSelectedCanvasElement();
    ns.ui.renderDashboard({ state, refs, selectedCanvasElementId });
    updateCanvasTextToolbarState();
    ns.services.storage.saveState(STORAGE_KEY, state);
    if (pendingBulletFocus) {
      const input = refs.extraBulletsList.querySelector(`[data-extra-bullet-index="${pendingBulletFocus.index}"]`);
      if (input) {
        input.focus();
        const caret = Math.min(pendingBulletFocus.caret, input.value.length);
        input.setSelectionRange(caret, caret);
      }
      pendingBulletFocus = null;
    }
    if (pendingTableFocus) {
      const input = refs.tableEditorGrid.querySelector(`[data-table-cell="${pendingTableFocus.row}-${pendingTableFocus.column}"]`);
      if (input) {
        input.focus();
        const caret = Math.min(pendingTableFocus.caret, input.value.length);
        input.setSelectionRange(caret, caret);
      }
      pendingTableFocus = null;
    }
    if (pendingSubBulletFocus) {
      const input = document.querySelector(
        `[data-sub-bullet-parent="${pendingSubBulletFocus.parentIndex}"][data-sub-bullet-index="${pendingSubBulletFocus.subIndex}"]`
      );
      if (input) {
        input.focus();
        const caret = Math.min(pendingSubBulletFocus.caret, input.value.length);
        input.setSelectionRange(caret, caret);
      }
      pendingSubBulletFocus = null;
    }
    if (pendingVisualFieldFocus) {
      const input = refs[pendingVisualFieldFocus.refKey];
      if (input) {
        input.focus();
        if (typeof input.setSelectionRange === "function") {
          const caret = Math.min(pendingVisualFieldFocus.caret, input.value.length);
          input.setSelectionRange(caret, caret);
        }
      }
      pendingVisualFieldFocus = null;
    }
    if (pendingVisualChartFocus) {
      const input = refs.visualChartBars.querySelector(
        `[data-visual-chart-field="${pendingVisualChartFocus.field}"][data-visual-chart-index="${pendingVisualChartFocus.index}"]`
      );
      if (input) {
        input.focus();
        if (typeof input.setSelectionRange === "function") {
          const caret = Math.min(pendingVisualChartFocus.caret, input.value.length);
          input.setSelectionRange(caret, caret);
        }
      }
      pendingVisualChartFocus = null;
    }
    if (pendingPreviewPanelFocus) {
      refs.previewPanel.focus();
      pendingPreviewPanelFocus = false;
    }
  }

  async function hydrateMediaLibrary() {
    state.mediaLibrary = await ns.services.media.hydrateMediaLibrary(state.mediaLibrary);
    render();
  }

  async function importJsonProject(file) {
    const raw = await file.text();
    const parsed = JSON.parse(raw);
    const nextState = ns.services.storage.sanitizeState(parsed);
    const importedMedia = await ns.services.media.importMediaDataMap(parsed.mediaDataMap || {}, nextState.mediaLibrary || []);
    nextState.mediaLibrary = importedMedia;
    state = nextState;
    closeAddSlideMenu();
    render();
  }

  function syncLiveEditorMeta() {
    const selectedSlide = getSelectedSlide();
    const visualData = selectedSlide.visualData || {};
    const density = ns.ui.computeDensity(selectedSlide);

    refs.titleMeta.textContent = `${selectedSlide.title.length}/72 caractères`;
    refs.subtitleMeta.textContent = `${selectedSlide.subtitle.length}/170 caractères`;
    refs.noteMeta.textContent = `${selectedSlide.note.length}/180 caractères`;
    refs.objectiveMeta.textContent = `${selectedSlide.objective.length}/180 caractères`;
    refs.evidenceMeta.textContent = `${selectedSlide.evidence.length}/120 caractères`;
    refs.freeBodyMeta.textContent = `${ns.utils.richTextLength(selectedSlide.freeBody || "")}/1600 caractères`;
    refs.visualBodyMeta.textContent = `${(visualData.body || "").length}/320 caractères`;
    refs.visualCalloutMeta.textContent = `${(visualData.callout || "").length}/180 caractères`;
    refs.densityBadge.className = density.className;
    refs.densityBadge.textContent = density.label;
  }

  function updateSettings(key, value, limit, rerender = true) {
    state.settings[key] = ns.utils.clampText(value, limit);
    if (rerender === false) {
      refreshStageOnly();
      return;
    }
    render();
  }

  function refreshStageOnly() {
    const selectedSlide = getSelectedSlide();
    syncSelectedCanvasElement();
    refs.stage.innerHTML = ns.ui.createSlideMarkup(selectedSlide, state.settings, {
      compact: false,
      mediaItems: state.mediaLibrary,
      mediaUrls: ns.services.media.getUrlMap(),
      canvasInteractive: (selectedSlide.contentType || "bullets") === "canvas",
      selectedCanvasElementId: selectedCanvasElementId || "",
    });
    syncLiveEditorMeta();
    ns.services.storage.saveState(STORAGE_KEY, state);
  }

  function getChartLightboxBars(chartCard) {
    if (!chartCard) {
      return [];
    }

    try {
      const parsed = JSON.parse(chartCard.getAttribute("data-chart-bars") || "[]");
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.slice(0, 6).map((bar) => ({
        label: ns.utils.clampText(bar && bar.label, 18) || "Point",
        value: clampVisualBarValue(bar && bar.value),
        color: normalizeVisualArrowColor(bar && bar.color),
      }));
    } catch (error) {
      return [];
    }
  }

  function decorateChartCloneForLightbox(chartClone) {
    if (!chartClone) {
      return chartClone;
    }
    const chartGrid = chartClone.querySelector(".slide-visual-chart-grid");
    if (!chartGrid || chartGrid.closest(".chart-lightbox-chart-grid-wrap")) {
      return chartClone;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "chart-lightbox-chart-grid-wrap";

    const gridSurface = document.createElement("div");
    gridSurface.className = "chart-lightbox-grid-surface";
    const gridLines = document.createElement("div");
    gridLines.className = "chart-lightbox-grid-lines";
    ["high", "mid", "low"].forEach((labelText) => {
      const line = document.createElement("span");
      line.setAttribute("aria-hidden", "true");
      line.setAttribute("data-chart-line", labelText);
      gridLines.appendChild(line);
    });

    const parent = chartGrid.parentNode;
    parent.replaceChild(wrapper, chartGrid);
    gridSurface.appendChild(gridLines);
    gridSurface.appendChild(chartGrid);
    wrapper.appendChild(gridSurface);
    return chartClone;
  }

  function appendChartLightboxText(container, text) {
    const linked = ns.utils.extractLinks(text || "");
    if (linked.text) {
      linked.text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((line) => {
          const paragraph = document.createElement("p");
          paragraph.textContent = line;
          container.appendChild(paragraph);
        });
    }
    if (linked.links.length) {
      const linksWrap = document.createElement("div");
      linksWrap.className = "slide-link-bubbles";
      linked.links.forEach((url) => {
        const link = document.createElement("a");
        link.className = "slide-free-link slide-link-bubble";
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = ns.utils.formatUrlLabel(url);
        linksWrap.appendChild(link);
      });
      container.appendChild(linksWrap);
    }
  }

  function createChartLightboxMarkup(chartCard, chartClone) {
    const chartBars = getChartLightboxBars(chartCard);
    const legendMarkup = chartBars.length ? `
      <section class="chart-lightbox-panel">
        <p class="chart-lightbox-kicker">Legende</p>
        <ul class="chart-lightbox-legend">
          ${chartBars.map((bar) => `
            <li class="chart-lightbox-legend-item">
              <span class="chart-lightbox-swatch" style="background:${ns.utils.escapeHtml(bar.color)};"></span>
              <span class="chart-lightbox-legend-label">${ns.utils.escapeHtml(bar.label)}</span>
              <strong class="chart-lightbox-legend-value">${Math.round(bar.value)}%</strong>
            </li>
          `).join("")}
        </ul>
      </section>
    ` : "";
    const wrapper = document.createElement("div");
    wrapper.className = "chart-lightbox-layout";
    wrapper.innerHTML = `
      <div class="chart-lightbox-main"></div>
      <aside class="chart-lightbox-side"${legendMarkup ? "" : " hidden"}>
        ${legendMarkup}
      </aside>
    `;
    wrapper.querySelector(".chart-lightbox-main").appendChild(chartClone);
    const side = wrapper.querySelector(".chart-lightbox-side");
    const bodyText = chartCard.getAttribute("data-chart-body") || "";
    const calloutText = chartCard.getAttribute("data-chart-callout") || "";
    if (bodyText.trim() || calloutText.trim()) {
      const panel = document.createElement("section");
      panel.className = "chart-lightbox-panel";
      panel.innerHTML = `<p class="chart-lightbox-kicker">Texte des indicateurs</p>`;
      if (bodyText.trim()) {
        const copy = document.createElement("div");
        copy.className = "chart-lightbox-copy";
        appendChartLightboxText(copy, bodyText);
        panel.appendChild(copy);
      }
      if (calloutText.trim()) {
        const note = document.createElement("div");
        note.className = "chart-lightbox-note";
        appendChartLightboxText(note, calloutText);
        panel.appendChild(note);
      }
      side.appendChild(panel);
    }
    side.hidden = side.childElementCount === 0;
    return wrapper;
  }

  function openChartLightbox(chartCard) {
    if (!chartCard || !refs.chartLightbox || !refs.chartLightboxContent) {
      return;
    }
    const chartClone = chartCard.cloneNode(true);
    decorateChartCloneForLightbox(chartClone);
    chartClone.classList.remove("slide-reveal-item", "presentation-reveal-hidden", "presentation-reveal-visible");
    chartClone.querySelectorAll(".slide-reveal-item, .presentation-reveal-hidden, .presentation-reveal-visible").forEach((node) => {
      node.classList.remove("slide-reveal-item", "presentation-reveal-hidden", "presentation-reveal-visible");
    });
    refs.chartLightboxContent.innerHTML = "";
    refs.chartLightboxContent.appendChild(createChartLightboxMarkup(chartCard, chartClone));
    refs.chartLightbox.classList.add("is-open");
    refs.chartLightbox.setAttribute("aria-hidden", "false");
  }

  function closeChartLightbox() {
    if (!refs.chartLightbox || !refs.chartLightboxContent) {
      return;
    }
    refs.chartLightbox.classList.remove("is-open");
    refs.chartLightbox.setAttribute("aria-hidden", "true");
    refs.chartLightboxContent.innerHTML = "";
  }

  function applySlidePaletteVarsToNode(sourceNode, targetNode) {
    if (!sourceNode || !targetNode) {
      return;
    }
    const slideRoot = sourceNode.closest(".deck-slide");
    if (!slideRoot) {
      return;
    }
    const computed = window.getComputedStyle(slideRoot);
    [
      "--slide-bg-start",
      "--slide-bg-end",
      "--slide-accent",
      "--slide-accent-strong",
      "--slide-accent-soft",
      "--slide-accent-softer",
      "--slide-surface",
      "--slide-surface-strong",
      "--slide-text",
      "--slide-text-muted",
      "--slide-text-soft",
      "--slide-line",
      "--slide-frame-shadow",
      "--slide-font-body",
      "--slide-font-heading",
    ].forEach((name) => {
      const value = computed.getPropertyValue(name);
      if (value) {
        targetNode.style.setProperty(name, value.trim());
      }
    });
  }

  function createTableLightboxMarkup(tableClone) {
    const wrapper = document.createElement("div");
    wrapper.className = "table-lightbox-surface";
    tableClone.classList.add("table-lightbox-table");
    wrapper.appendChild(tableClone);
    return wrapper;
  }

  function openTableLightbox(tableNode) {
    if (!tableNode || !refs.tableLightbox || !refs.tableLightboxContent) {
      return;
    }
    const tableClone = tableNode.cloneNode(true);
    applySlidePaletteVarsToNode(tableNode, tableClone);
    tableClone.querySelectorAll(".slide-reveal-item, .presentation-reveal-hidden, .presentation-reveal-visible").forEach((node) => {
      node.classList.remove("slide-reveal-item", "presentation-reveal-hidden", "presentation-reveal-visible");
    });
    refs.tableLightboxContent.innerHTML = "";
    refs.tableLightboxContent.appendChild(createTableLightboxMarkup(tableClone));
    refs.tableLightbox.classList.add("is-open");
    refs.tableLightbox.setAttribute("aria-hidden", "false");
  }

  function closeTableLightbox() {
    if (!refs.tableLightbox || !refs.tableLightboxContent) {
      return;
    }
    refs.tableLightbox.classList.remove("is-open");
    refs.tableLightbox.setAttribute("aria-hidden", "true");
    refs.tableLightboxContent.innerHTML = "";
  }

  function setView(view) {
    if (view !== "engineering" && view !== "presentation") {
      return;
    }
    closeAddSlideMenu();
    state.view = view;
    render();
  }

  function isPreviewPanelTarget(target) {
    if (!target || !(target instanceof HTMLElement)) {
      return false;
    }

    return refs.previewPanel.contains(target);
  }

  function toggleNightMode() {
    state.uiNightMode = !state.uiNightMode;
    render();
  }

  function toggleMediaPanel() {
    state.uiMediaPanelCollapsed = !state.uiMediaPanelCollapsed;
    render();
  }

  function updateSelectedSlide(patch, rerender = true) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      return Object.assign({}, slide, patch);
    });
    if (rerender === false) {
      refreshStageOnly();
      return;
    }
    render();
  }

  function updateSelectedTableCell(rowIndex, columnIndex, value, rerender = true) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const table = normalizeTable(slide.table);
      table[rowIndex][columnIndex] = value;
      return Object.assign({}, slide, { table });
    });
    if (rerender === false) {
      refreshStageOnly();
      return;
    }
    render();
  }

  function resizeSelectedTable(nextRows, nextCols) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const table = normalizeTable(slide.table, nextRows, nextCols);
      const tableHighlights = sanitizeTableHighlightsForSize(slide.tableHighlights, table.length, table[0] ? table[0].length : 0);
      return Object.assign({}, slide, { table, tableHighlights });
    });
    render();
  }

  function getDefaultVisualData() {
    return ns.utils.clone(ns.stateFactory.createDefaultVisualData());
  }

  function getSelectedVisualData() {
    return Object.assign(getDefaultVisualData(), ns.utils.clone((getSelectedSlide() && getSelectedSlide().visualData) || {}));
  }

  function normalizeVisualArrowColor(value) {
    return /^#[0-9a-fA-F]{6}$/.test(value || "") ? value.toLowerCase() : "#60b2e5";
  }

  function clampVisualBarValue(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.max(0, Math.min(100, Math.round(parsed))) : 0;
  }

  function updateSelectedVisualData(patch, rerender = true) {
    const current = getSelectedVisualData();
    updateSelectedSlide({
      visualData: Object.assign({}, current, patch),
    }, rerender);
  }

  function updateSelectedVisualChartBar(index, patch, rerender = true) {
    const current = getSelectedVisualData();
    const nextBars = current.chartBars.map((bar, barIndex) => barIndex === index ? Object.assign({}, bar, patch) : bar);
    updateSelectedVisualData({ chartBars: nextBars }, rerender);
  }

  function getDefaultVisualChartBar(index) {
    const defaults = getDefaultVisualData().chartBars || [];
    return ns.utils.clone(defaults[index] || defaults[defaults.length - 1] || {
      label: `Point ${index + 1}`,
      value: 50,
      color: "#60b2e5",
    });
  }

  function normalizeVisualChartBars(bars) {
    const normalized = Array.isArray(bars) ? bars.slice(0, 6).map((bar, index) => ({
      label: ns.utils.clampText(bar && bar.label, 18) || "",
      value: clampVisualBarValue(bar && bar.value),
      color: normalizeVisualArrowColor(bar && bar.color),
    })) : [];

    while (normalized.length < 6) {
      normalized.push(getDefaultVisualChartBar(normalized.length));
    }

    return normalized;
  }

  function getVisibleVisualChartBars() {
    const current = getSelectedVisualData();
    const count = Math.max(1, Math.min(6, Number(current.chartBarCount) || 3));
    return {
      count,
      bars: normalizeVisualChartBars(current.chartBars),
    };
  }

  function addSelectedVisualChartBar() {
    const current = getSelectedVisualData();
    const count = Math.max(1, Math.min(6, Number(current.chartBarCount) || 3));
    if (count >= 6) {
      return;
    }
    const nextBars = normalizeVisualChartBars(current.chartBars);
    nextBars.splice(count, 0, getDefaultVisualChartBar(count));
    nextBars.length = 6;
    pendingVisualChartFocus = { index: count, field: "label", caret: 0 };
    updateSelectedVisualData({
      chartBarCount: count + 1,
      chartBars: nextBars,
    });
  }

  function removeSelectedVisualChartBar(index) {
    const current = getSelectedVisualData();
    const count = Math.max(1, Math.min(6, Number(current.chartBarCount) || 3));
    if (count <= 1 || index < 0 || index >= count) {
      return;
    }
    const nextBars = normalizeVisualChartBars(current.chartBars);
    nextBars.splice(index, 1);
    nextBars.push(getDefaultVisualChartBar(nextBars.length));
    nextBars.length = 6;
    updateSelectedVisualData({
      chartBarCount: count - 1,
      chartBars: nextBars,
    });
  }

  function moveSelectedVisualChartBar(fromIndex, toIndex) {
    const current = getSelectedVisualData();
    const count = Math.max(1, Math.min(6, Number(current.chartBarCount) || 3));
    if (
      fromIndex === toIndex ||
      fromIndex < 0 || fromIndex >= count ||
      toIndex < 0 || toIndex >= count
    ) {
      return;
    }
    const nextBars = normalizeVisualChartBars(current.chartBars);
    const visible = nextBars.slice(0, count);
    const hidden = nextBars.slice(count);
    const [moved] = visible.splice(fromIndex, 1);
    visible.splice(toIndex, 0, moved);
    updateSelectedVisualData({
      chartBars: visible.concat(hidden).slice(0, 6),
    });
  }

  function assignVisualMedia(mediaId) {
    const current = getSelectedVisualData();
    if (!mediaId || mediaId === current.primaryMediaId || mediaId === current.secondaryMediaId) {
      return;
    }

    if (!current.primaryMediaId) {
      updateSelectedVisualData({ primaryMediaId: mediaId });
      return;
    }

    if (!current.secondaryMediaId) {
      updateSelectedVisualData({ secondaryMediaId: mediaId });
      return;
    }

    updateSelectedVisualData({ secondaryMediaId: mediaId });
  }

  function clampCanvasMetric(value, fallback, min, max) {
    const parsed = Number(value);
    const safeValue = Number.isFinite(parsed) ? parsed : fallback;
    const lowerBound = Number.isFinite(min) ? min : 0;
    const upperBound = Number.isFinite(max) ? max : 100;
    const clamped = Math.max(lowerBound, Math.min(upperBound, safeValue));
    return Math.round(clamped * 10) / 10;
  }

  function normalizeCanvasColor(value, fallback) {
    return /^#[0-9a-fA-F]{6}$/.test(value || "") ? value.toLowerCase() : (fallback || "#1d1917");
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
      normalized.mediaId = ns.utils.clampText(input.mediaId, 80);
      return normalized;
    }

    if (type === "arrow") {
      normalized.direction = input.direction === "up" || input.direction === "down" || input.direction === "left" ? input.direction : "right";
      normalized.color = normalizeCanvasColor(input.color, "#0a66ff");
      normalized.rotation = normalizeCanvasRotation(input.rotation, 0);
      normalized.arrowLength = normalizeCanvasArrowLength(input.arrowLength, 100);
      return normalized;
    }

    const fallbackText = ns.utils.plainTextToRichHtml("Zone de texte", 600);
    normalized.text = typeof input.text === "string" ? ns.utils.sanitizeRichText(input.text, 600) : fallbackText;
    normalized.fontSize = clampCanvasMetric(input.fontSize, 28, 16, 72);
    normalized.color = normalizeCanvasColor(input.color, "#1d1917");
    normalized.showFrame = input.showFrame !== false;
    normalized.bold = Boolean(input.bold);
    normalized.italic = Boolean(input.italic);
    normalized.underline = Boolean(input.underline);
    return normalized;
  }

  function normalizeCanvasElements(elements) {
    return Array.isArray(elements) ? elements.slice(0, 24).map(normalizeCanvasElement).filter(Boolean) : [];
  }

  function updateSelectedCanvasData(patch, rerender = true) {
    const current = getSelectedCanvasData();
    updateSelectedSlide({
      canvasData: Object.assign({}, current, patch),
    }, rerender);
  }

  function updateCanvasElements(transform, rerender = true) {
    const current = getSelectedCanvasData();
    const nextElements = normalizeCanvasElements(typeof transform === "function" ? transform(current.elements.slice()) : current.elements);
    updateSelectedCanvasData({ elements: nextElements }, rerender);
  }

  function createCanvasElement(type, patch) {
    const base = {
      text: {
        id: ns.utils.createId("canvas"),
        type: "text",
        x: 8,
        y: 18,
        w: 36,
        h: 18,
        text: ns.utils.plainTextToRichHtml("Nouvelle zone de texte", 600),
        fontSize: 28,
        color: "#1d1917",
        showFrame: true,
        bold: false,
        italic: false,
        underline: false,
      },
      image: {
        id: ns.utils.createId("canvas"),
        type: "image",
        x: 54,
        y: 20,
        w: 24,
        h: 30,
        mediaId: "",
      },
      arrow: {
        id: ns.utils.createId("canvas"),
        type: "arrow",
        x: 42,
        y: 38,
        w: 18,
        h: 10,
        direction: "right",
        color: "#0a66ff",
        rotation: 0,
        arrowLength: 100,
      },
    };

    return normalizeCanvasElement(Object.assign({}, base[type] || base.text, patch), 0);
  }

  function addCanvasElement(type, patch) {
    const nextElement = createCanvasElement(type, patch);
    selectedCanvasElementId = nextElement.id;
    updateCanvasElements((elements) => elements.concat(nextElement));
  }

  function updateCanvasElementById(elementId, patch, rerender = true) {
    if (!elementId) {
      return;
    }
    updateCanvasElements((elements) => elements.map((element) => {
      if (element.id !== elementId) {
        return element;
      }
      return Object.assign({}, element, patch);
    }), rerender);
  }

  function removeCanvasElementById(elementId) {
    if (!elementId) {
      return;
    }
    updateCanvasElements((elements) => elements.filter((element) => element.id !== elementId));
    if (selectedCanvasElementId === elementId) {
      selectedCanvasElementId = null;
    }
  }

  function removeSelectedCanvasElement() {
    removeCanvasElementById(selectedCanvasElementId);
  }

  function addCanvasMediaElement(mediaId) {
    if (!mediaId) {
      return;
    }
    const selectedElement = getCanvasSelectedElement(getSelectedCanvasData().elements);
    if (selectedElement && selectedElement.type === "image") {
      updateCanvasElementById(selectedElement.id, { mediaId });
      return;
    }
    addCanvasElement("image", { mediaId });
  }

  function updateSelectedCanvasElement(patch, rerender = true) {
    if (!selectedCanvasElementId) {
      return;
    }
    updateCanvasElementById(selectedCanvasElementId, patch, rerender);
  }

  function saveCanvasTextEditorSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }
    const range = selection.getRangeAt(0);
    if (!refs.canvasTextContent.contains(range.commonAncestorContainer)) {
      return;
    }
    const startRange = document.createRange();
    startRange.selectNodeContents(refs.canvasTextContent);
    startRange.setEnd(range.startContainer, range.startOffset);
    const endRange = document.createRange();
    endRange.selectNodeContents(refs.canvasTextContent);
    endRange.setEnd(range.endContainer, range.endOffset);
    canvasTextEditorRange = {
      start: startRange.toString().length,
      end: endRange.toString().length,
    };
  }

  function clearCanvasTextSelectionBookmark() {
    if (!canvasTextSelectionBookmark) {
      return;
    }
    ["startId", "endId"].forEach((key) => {
      const markerId = canvasTextSelectionBookmark[key];
      if (!markerId) {
        return;
      }
      const marker = refs.canvasTextContent.querySelector(`[data-canvas-selection-marker-id="${markerId}"]`);
      if (marker && marker.parentNode) {
        marker.parentNode.removeChild(marker);
      }
    });
    canvasTextSelectionBookmark = null;
  }

  function createCanvasTextSelectionBookmark() {
    clearCanvasTextSelectionBookmark();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      return false;
    }
    const range = selection.getRangeAt(0);
    if (!refs.canvasTextContent.contains(range.commonAncestorContainer)) {
      return false;
    }

    const startId = ns.utils.createId("canvas-sel-start");
    const endId = ns.utils.createId("canvas-sel-end");
    const startMarker = document.createElement("span");
    const endMarker = document.createElement("span");
    startMarker.setAttribute("data-canvas-selection-marker-id", startId);
    endMarker.setAttribute("data-canvas-selection-marker-id", endId);
    startMarker.setAttribute("aria-hidden", "true");
    endMarker.setAttribute("aria-hidden", "true");
    startMarker.style.display = "inline-block";
    endMarker.style.display = "inline-block";
    startMarker.style.width = "0";
    endMarker.style.width = "0";
    startMarker.style.overflow = "hidden";
    endMarker.style.overflow = "hidden";
    startMarker.style.lineHeight = "0";
    endMarker.style.lineHeight = "0";

    const endRange = range.cloneRange();
    endRange.collapse(false);
    endRange.insertNode(endMarker);

    const startRange = range.cloneRange();
    startRange.collapse(true);
    startRange.insertNode(startMarker);

    canvasTextSelectionBookmark = { startId, endId };
    return true;
  }

  function restoreCanvasTextSelectionBookmark() {
    if (!canvasTextSelectionBookmark) {
      return null;
    }

    const startMarker = refs.canvasTextContent.querySelector(
      `[data-canvas-selection-marker-id="${canvasTextSelectionBookmark.startId}"]`
    );
    const endMarker = refs.canvasTextContent.querySelector(
      `[data-canvas-selection-marker-id="${canvasTextSelectionBookmark.endId}"]`
    );
    if (!startMarker || !endMarker) {
      clearCanvasTextSelectionBookmark();
      return null;
    }

    const range = document.createRange();
    range.setStartAfter(startMarker);
    range.setEndBefore(endMarker);
    startMarker.remove();
    endMarker.remove();
    canvasTextSelectionBookmark = null;

    const selection = window.getSelection();
    if (!selection) {
      return null;
    }
    selection.removeAllRanges();
    selection.addRange(range);
    return { selection, range };
  }

  function restoreCanvasTextEditorSelection() {
    const selection = window.getSelection();
    const saved = canvasTextEditorRange;
    if (!selection || !saved) {
      return false;
    }
    const textWalker = document.createTreeWalker(refs.canvasTextContent, NodeFilter.SHOW_TEXT);
    let currentNode = textWalker.nextNode();
    let charIndex = 0;
    let startNode = null;
    let endNode = null;
    let startOffset = 0;
    let endOffset = 0;

    while (currentNode) {
      const nextCharIndex = charIndex + currentNode.textContent.length;
      if (!startNode && saved.start <= nextCharIndex) {
        startNode = currentNode;
        startOffset = Math.max(0, saved.start - charIndex);
      }
      if (!endNode && saved.end <= nextCharIndex) {
        endNode = currentNode;
        endOffset = Math.max(0, saved.end - charIndex);
        break;
      }
      charIndex = nextCharIndex;
      currentNode = textWalker.nextNode();
    }

    if (!startNode || !endNode) {
      return false;
    }

    const range = document.createRange();
    range.setStart(startNode, Math.min(startOffset, startNode.textContent.length));
    range.setEnd(endNode, Math.min(endOffset, endNode.textContent.length));
    selection.removeAllRanges();
    selection.addRange(range);
    return true;
  }

  function markCanvasTextEditorToolbarInteraction() {
    suppressCanvasTextEditorBlur = true;
    window.setTimeout(() => {
      suppressCanvasTextEditorBlur = false;
    }, 0);
  }

  function getCanvasTextEditorFormatAncestorForNode(node, tagName) {
    let current = node && node.nodeType === Node.ELEMENT_NODE ? node : node.parentNode;
    while (current && current !== refs.canvasTextContent) {
      if (current.nodeType === Node.ELEMENT_NODE && current.tagName.toLowerCase() === tagName) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  function findCanvasTextEditorFormatAncestor(range, tagName) {
    if (!range) {
      return null;
    }

    const commonAncestor = getCanvasTextEditorFormatAncestorForNode(range.commonAncestorContainer, tagName);
    if (commonAncestor) {
      return commonAncestor;
    }

    const startAncestor = getCanvasTextEditorFormatAncestorForNode(range.startContainer, tagName);
    const endAncestor = getCanvasTextEditorFormatAncestorForNode(range.endContainer, tagName);
    if (startAncestor && endAncestor && startAncestor === endAncestor) {
      return startAncestor;
    }

    return null;
  }

  function unwrapCanvasTextEditorFormat(element) {
    if (!element || !element.parentNode) {
      return;
    }

    const parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
  }

  function updateCanvasTextToolbarState() {
    let activeBold = false;
    let activeItalic = false;
    let activeUnderline = false;
    const selectedElement = getCanvasSelectedElement(getSelectedCanvasData().elements);
    const activeColor = selectedElement && selectedElement.type === "text"
      ? normalizeCanvasColor(selectedElement.color, "#1d1917")
      : "#1d1917";

    const selection = window.getSelection();
    if (document.activeElement === refs.canvasTextContent && selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (refs.canvasTextContent.contains(range.commonAncestorContainer)) {
        activeBold = Boolean(findCanvasTextEditorFormatAncestor(range, "strong"));
        activeItalic = Boolean(findCanvasTextEditorFormatAncestor(range, "em"));
        activeUnderline = Boolean(findCanvasTextEditorFormatAncestor(range, "u"));
      }
    }

    refs.canvasTextBold.classList.toggle("is-active", activeBold);
    refs.canvasTextBold.setAttribute("aria-pressed", activeBold ? "true" : "false");
    refs.canvasTextItalic.classList.toggle("is-active", activeItalic);
    refs.canvasTextItalic.setAttribute("aria-pressed", activeItalic ? "true" : "false");
    refs.canvasTextUnderline.classList.toggle("is-active", activeUnderline);
    refs.canvasTextUnderline.setAttribute("aria-pressed", activeUnderline ? "true" : "false");
    document.querySelectorAll("[data-canvas-text-color-value]").forEach((button) => {
      button.classList.toggle(
        "is-active",
        normalizeCanvasColor(button.getAttribute("data-canvas-text-color-value"), "#1d1917") === activeColor
      );
    });
  }

  function normalizeCanvasTextEditorMarkup(assignToEditor) {
    const selectedElement = getCanvasSelectedElement(getSelectedCanvasData().elements);
    if (!selectedElement || selectedElement.type !== "text") {
      return;
    }
    const sanitized = ns.utils.sanitizeRichText(refs.canvasTextContent.innerHTML, 600);
    if (assignToEditor) {
      refs.canvasTextContent.innerHTML = sanitized;
    }
    updateSelectedCanvasElement({
      text: sanitized,
    }, false);
    updateCanvasTextToolbarState();
  }

  function applyCanvasTextEditorFontSize(size) {
    const selectionData = getCanvasTextEditorSelection();
    if (!selectionData || selectionData.selection.isCollapsed) {
      return;
    }

    const selection = selectionData.selection;
    const range = selectionData.range;
    const normalizedSize = Math.round(clampCanvasMetric(size, 28, 16, 72));
    const wrapper = document.createElement("span");
    wrapper.setAttribute("style", `font-size:${normalizedSize}px;`);
    try {
      const content = range.extractContents();
      wrapper.appendChild(content);
      range.insertNode(wrapper);
      range.selectNodeContents(wrapper);
      selection.removeAllRanges();
      selection.addRange(range);
      refs.canvasTextSizeValue.textContent = `${normalizedSize} px`;
      saveCanvasTextEditorSelection();
      normalizeCanvasTextEditorMarkup(false);
    } catch (error) {
      return;
    }
  }

  function getCanvasTextEditorSelection() {
    const selectedElement = getCanvasSelectedElement(getSelectedCanvasData().elements);
    if (!selectedElement || selectedElement.type !== "text") {
      return null;
    }

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const liveRange = selection.getRangeAt(0);
      if (refs.canvasTextContent.contains(liveRange.commonAncestorContainer)) {
        return { selection, range: liveRange };
      }
    }

    const bookmarkedSelection = restoreCanvasTextSelectionBookmark();
    if (bookmarkedSelection) {
      return bookmarkedSelection;
    }

    if (document.activeElement !== refs.canvasTextContent) {
      refs.canvasTextContent.focus({ preventScroll: true });
    }

    if (!restoreCanvasTextEditorSelection()) {
      return null;
    }

    const restoredSelection = window.getSelection();
    if (!restoredSelection || restoredSelection.rangeCount === 0) {
      return null;
    }

    const range = restoredSelection.getRangeAt(0);
    if (!refs.canvasTextContent.contains(range.commonAncestorContainer)) {
      return null;
    }

    return { selection: restoredSelection, range };
  }

  function applyCanvasTextEditorTextColor(color) {
    const normalizedColor = normalizeCanvasColor(color, "#1d1917");
    const selectionData = getCanvasTextEditorSelection();
    if (!selectionData) {
      return;
    }

    const selection = selectionData.selection;
    const range = selectionData.range;
    if (selection.isCollapsed) {
      return;
    }

    try {
      document.execCommand("styleWithCSS", false, true);
      document.execCommand("foreColor", false, normalizedColor);
      saveCanvasTextEditorSelection();
      normalizeCanvasTextEditorMarkup(false);
    } catch (error) {
      return;
    }
  }

  function applyCanvasTextEditorInlineTag(tagName) {
    const selectionData = getCanvasTextEditorSelection();
    if (!selectionData || selectionData.selection.isCollapsed) {
      return;
    }

    const command = tagName === "strong" ? "bold" : tagName === "em" ? "italic" : tagName === "u" ? "underline" : "";
    if (!command) {
      return;
    }

    try {
      document.execCommand(command, false);
      saveCanvasTextEditorSelection();
      normalizeCanvasTextEditorMarkup(false);
    } catch (error) {
      return;
    }
  }

  function insertCanvasTextEditorLineBreak() {
    if (!restoreCanvasTextEditorSelection()) {
      refs.canvasTextContent.focus();
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!refs.canvasTextContent.contains(range.commonAncestorContainer)) {
      return;
    }

    const br = document.createElement("br");
    const spacer = document.createTextNode("");
    range.deleteContents();
    range.insertNode(br);
    range.setStartAfter(br);
    range.insertNode(spacer);
    range.setStartAfter(spacer);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    saveCanvasTextEditorSelection();
    normalizeCanvasTextEditorMarkup(false);
  }

  function updateStageCanvasSelection(elementId) {
    selectedCanvasElementId = elementId || null;
    canvasTextEditorRange = null;
    clearCanvasTextSelectionBookmark();
    refs.stage.querySelectorAll("[data-canvas-element-id]").forEach((node) => {
      node.classList.toggle("is-selected", node.getAttribute("data-canvas-element-id") === selectedCanvasElementId);
    });
    updateCanvasTextToolbarState();
  }

  function getCanvasSurfaceRect() {
    const surface = refs.stage.querySelector("[data-canvas-surface]");
    if (!surface) {
      return null;
    }
    return {
      surface,
      rect: surface.getBoundingClientRect(),
    };
  }

  function beginCanvasInteraction(event, elementId, mode) {
    if (event.button !== 0) {
      return;
    }
    const slide = getSelectedSlide();
    if (!slide || (slide.contentType || "bullets") !== "canvas") {
      return;
    }
    const canvasData = getSelectedCanvasData();
    const element = canvasData.elements.find((item) => item.id === elementId);
    const surfaceData = getCanvasSurfaceRect();
    const elementNode = refs.stage.querySelector(`[data-canvas-element-id="${elementId}"]`);
    if (!element || !surfaceData || !elementNode) {
      return;
    }

    event.preventDefault();
    updateStageCanvasSelection(elementId);
    const elementRect = elementNode.getBoundingClientRect();
    const elementCenterX = elementRect.left + (elementRect.width / 2);
    const elementCenterY = elementRect.top + (elementRect.height / 2);
    const arrowContent = elementNode.querySelector(".canvas-element-arrow-content");
    activeCanvasInteraction = {
      pointerId: event.pointerId,
      mode,
      elementId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startRect: {
        x: Number(element.x) || 0,
        y: Number(element.y) || 0,
        w: Number(element.w) || 10,
        h: Number(element.h) || 10,
      },
      startRotation: normalizeCanvasRotation(element.rotation, 0),
      baseRotation: arrowContent ? Number(arrowContent.getAttribute("data-canvas-base-rotation")) || 0 : 0,
      centerX: elementCenterX,
      centerY: elementCenterY,
      startPointerAngle: Math.atan2(event.clientY - elementCenterY, event.clientX - elementCenterX),
      surfaceRect: surfaceData.rect,
      moved: false,
      livePatch: null,
    };
    if (typeof surfaceData.surface.setPointerCapture === "function") {
      try {
        surfaceData.surface.setPointerCapture(event.pointerId);
      } catch (error) {
        activeCanvasInteraction = null;
      }
    }
  }

  function updateCanvasInteractionPreview() {
    if (!activeCanvasInteraction || !activeCanvasInteraction.livePatch) {
      return;
    }
    const node = refs.stage.querySelector(`[data-canvas-element-id="${activeCanvasInteraction.elementId}"]`);
    if (!node) {
      return;
    }
    const patch = activeCanvasInteraction.livePatch;
    if (patch.x !== undefined) {
      node.style.left = `${patch.x}%`;
    }
    if (patch.y !== undefined) {
      node.style.top = `${patch.y}%`;
    }
    if (patch.w !== undefined) {
      node.style.width = `${patch.w}%`;
    }
    if (patch.h !== undefined) {
      node.style.height = `${patch.h}%`;
    }
    if (patch.rotation !== undefined) {
      const arrowContent = node.querySelector(".canvas-element-arrow-content");
      if (arrowContent) {
        const baseRotation = Number(arrowContent.getAttribute("data-canvas-base-rotation")) || 0;
        arrowContent.style.transform = `rotate(${baseRotation + patch.rotation}deg)`;
      }
    }
  }

  function handleCanvasPointerMove(event) {
    if (!activeCanvasInteraction || event.pointerId !== activeCanvasInteraction.pointerId) {
      return;
    }
    const interaction = activeCanvasInteraction;
    const dxPercent = ((event.clientX - interaction.startClientX) / Math.max(1, interaction.surfaceRect.width)) * 100;
    const dyPercent = ((event.clientY - interaction.startClientY) / Math.max(1, interaction.surfaceRect.height)) * 100;
    let patch;

    if (interaction.mode === "resize") {
      patch = {
        w: clampCanvasMetric(interaction.startRect.w + dxPercent, interaction.startRect.w, 6, 100 - interaction.startRect.x),
        h: clampCanvasMetric(interaction.startRect.h + dyPercent, interaction.startRect.h, 6, 100 - interaction.startRect.y),
      };
    } else if (interaction.mode === "rotate") {
      const currentAngle = Math.atan2(event.clientY - interaction.centerY, event.clientX - interaction.centerX);
      const deltaDegrees = (currentAngle - interaction.startPointerAngle) * (180 / Math.PI);
      patch = {
        rotation: normalizeCanvasRotation(interaction.startRotation + deltaDegrees, interaction.startRotation),
      };
    } else {
      patch = {
        x: clampCanvasMetric(interaction.startRect.x + dxPercent, interaction.startRect.x, 0, 100 - interaction.startRect.w),
        y: clampCanvasMetric(interaction.startRect.y + dyPercent, interaction.startRect.y, 0, 100 - interaction.startRect.h),
      };
    }

    interaction.livePatch = patch;
    interaction.moved = true;
    updateCanvasInteractionPreview();
  }

  function endCanvasInteraction(event) {
    if (!activeCanvasInteraction || (event && event.pointerId !== activeCanvasInteraction.pointerId)) {
      return;
    }
    const interaction = activeCanvasInteraction;
    activeCanvasInteraction = null;
    if (interaction.moved && interaction.livePatch) {
      suppressCanvasClickUntil = Date.now() + 120;
      updateCanvasElementById(interaction.elementId, interaction.livePatch);
      return;
    }
    render();
  }

  function normalizeTable(tableInput, minRows, minCols) {
    const rowTarget = Math.max(2, Math.min(8, minRows || (Array.isArray(tableInput) ? tableInput.length : 2)));
    const colTarget = Math.max(2, Math.min(6, minCols || getTableColumnCount(tableInput) || 2));
    const table = Array.isArray(tableInput) ? tableInput.slice(0, rowTarget).map((row) => Array.isArray(row) ? row.slice(0, colTarget) : []) : [];
    while (table.length < rowTarget) {
      table.push([]);
    }
    table.forEach((row) => {
      while (row.length < colTarget) {
        row.push("");
      }
    });
    return table;
  }

  function getTableColumnCount(tableInput) {
    if (!Array.isArray(tableInput)) {
      return 0;
    }
    return tableInput.reduce((max, row) => Math.max(max, Array.isArray(row) ? row.length : 0), 0);
  }

  function sanitizeTableHighlightsForSize(tableHighlights, rowCount, colCount) {
    const sanitizeMap = (input, max) => {
      const result = {};
      if (!input || typeof input !== "object") {
        return result;
      }
      Object.keys(input).forEach((key) => {
        const index = Number(key);
        if (!Number.isInteger(index) || index < 0 || index >= max) {
          return;
        }
        result[String(index)] = input[key];
      });
      return result;
    };

    return {
      rows: sanitizeMap(tableHighlights && tableHighlights.rows, rowCount),
      columns: sanitizeMap(tableHighlights && tableHighlights.columns, colCount),
    };
  }

  function normalizeHexColor(value) {
    return /^#[0-9a-fA-F]{6}$/.test(value || "") ? value.toLowerCase() : "#dcecff";
  }

  function normalizeFreeEditorTextColor(value) {
    return /^#[0-9a-fA-F]{6}$/.test(value || "") ? value.toLowerCase() : "#1d1917";
  }

  function getSelectedTableFillColor() {
    const slide = getSelectedSlide();
    const target = refs.tableFillTarget.value === "column" ? "columns" : "rows";
    const index = Number(refs.tableFillIndex.value);
    const tableHighlights = slide.tableHighlights || {};
    return normalizeHexColor(tableHighlights[target] && tableHighlights[target][String(index)]);
  }

  function setSelectedTableFill(target, index, color) {
    if ((target !== "row" && target !== "column") || !Number.isInteger(index) || index < 0 || !/^#[0-9a-fA-F]{6}$/.test(color || "")) {
      return;
    }
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const key = target === "row" ? "rows" : "columns";
      const tableHighlights = {
        rows: Object.assign({}, slide.tableHighlights && slide.tableHighlights.rows),
        columns: Object.assign({}, slide.tableHighlights && slide.tableHighlights.columns),
      };
      tableHighlights[key][String(index)] = color.toLowerCase();
      return Object.assign({}, slide, { tableHighlights });
    });
    render();
  }

  function removeSelectedTableFill(target, index) {
    if ((target !== "row" && target !== "column") || !Number.isInteger(index) || index < 0) {
      return;
    }
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const key = target === "row" ? "rows" : "columns";
      const tableHighlights = {
        rows: Object.assign({}, slide.tableHighlights && slide.tableHighlights.rows),
        columns: Object.assign({}, slide.tableHighlights && slide.tableHighlights.columns),
      };
      delete tableHighlights[key][String(index)];
      return Object.assign({}, slide, { tableHighlights });
    });
    render();
  }

  function assignMediaToSelectedSlide(mediaId) {
    const selectedSlide = getSelectedSlide();
    if (!mediaId) {
      updateSelectedSlide({ mediaId: "", secondaryMediaId: "" });
      return;
    }
    if (mediaId === selectedSlide.mediaId || mediaId === selectedSlide.secondaryMediaId) {
      return;
    }
    if (!selectedSlide.mediaId) {
      updateSelectedSlide({ mediaId });
      return;
    }
    if (!selectedSlide.secondaryMediaId) {
      updateSelectedSlide({ secondaryMediaId: mediaId });
      return;
    }
    updateSelectedSlide({ secondaryMediaId: mediaId });
  }

  function updateSelectedBullet(index, value, rerender) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const bullets = Array.isArray(slide.bullets) ? slide.bullets.slice() : [];
      while (bullets.length <= index) {
        bullets.push("");
      }
      bullets[index] = value;
      return Object.assign({}, slide, { bullets });
    });
    if (rerender === false) {
      refreshStageOnly();
      return;
    }
    render();
  }

  function addSelectedBullet() {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const bullets = Array.isArray(slide.bullets) ? slide.bullets.slice() : ["", "", ""];
      bullets.push("");
      return Object.assign({}, slide, { bullets });
    });
    render();
  }

  function updateSelectedSubBullet(parentIndex, subIndex, value, rerender = true) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const subBullets = Object.assign({}, slide.subBullets || {});
      const items = Array.isArray(subBullets[parentIndex]) ? subBullets[parentIndex].slice() : [];
      while (items.length <= subIndex) {
        items.push("");
      }
      items[subIndex] = value;
      subBullets[parentIndex] = items;
      return Object.assign({}, slide, { subBullets });
    });
    if (rerender === false) {
      refreshStageOnly();
      return;
    }
    render();
  }

  function addSelectedSubBullet(parentIndex) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const subBullets = Object.assign({}, slide.subBullets || {});
      const items = Array.isArray(subBullets[parentIndex]) ? subBullets[parentIndex].slice(0, 6) : [];
      items.push("");
      subBullets[parentIndex] = items.slice(0, 6);
      return Object.assign({}, slide, { subBullets });
    });
    render();
  }

  function removeSelectedSubBullet(parentIndex, subIndex) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const subBullets = Object.assign({}, slide.subBullets || {});
      const items = Array.isArray(subBullets[parentIndex]) ? subBullets[parentIndex].slice() : [];
      if (subIndex < 0 || subIndex >= items.length) {
        return slide;
      }
      items.splice(subIndex, 1);
      if (items.length) {
        subBullets[parentIndex] = items;
      } else {
        delete subBullets[parentIndex];
      }
      return Object.assign({}, slide, { subBullets });
    });
    render();
  }

  function removeSelectedBullet(index) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const bullets = Array.isArray(slide.bullets) ? slide.bullets.slice() : [];
      if (index < 3 || index >= bullets.length) {
        return slide;
      }
      bullets.splice(index, 1);
      while (bullets.length < 3) {
        bullets.push("");
      }
      const subBullets = Object.assign({}, slide.subBullets || {});
      delete subBullets[index];
      Object.keys(subBullets)
        .map(Number)
        .sort((a, b) => a - b)
        .forEach((key) => {
          if (key > index) {
            subBullets[key - 1] = subBullets[key];
            delete subBullets[key];
          }
        });
      return Object.assign({}, slide, { bullets, subBullets });
    });
    render();
  }

  function updateSelectedFreeBody(value) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      return Object.assign({}, slide, { freeBody: ns.utils.sanitizeRichText(value, 1600) });
    });
    ns.services.storage.saveState(STORAGE_KEY, state);
  }

  function updateFreeBodyPreview() {
    const selectedSlide = getSelectedSlide();
    syncSelectedCanvasElement();
    refs.stage.innerHTML = ns.ui.createSlideMarkup(selectedSlide, state.settings, {
      compact: false,
      mediaItems: state.mediaLibrary,
      mediaUrls: ns.services.media.getUrlMap(),
      canvasInteractive: (selectedSlide.contentType || "bullets") === "canvas",
      selectedCanvasElementId: selectedCanvasElementId || "",
    });
    refs.freeBodyMeta.textContent = `${ns.utils.richTextLength(selectedSlide.freeBody || "")}/1600 caractères`;
  }

  function saveFreeEditorSelection() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }
    const range = selection.getRangeAt(0);
    if (!refs.slideFreeBody.contains(range.commonAncestorContainer)) {
      return;
    }
    freeEditorRange = range.cloneRange();
  }

  function restoreFreeEditorSelection() {
    const selection = window.getSelection();
    if (!selection || !freeEditorRange) {
      return false;
    }
    selection.removeAllRanges();
    selection.addRange(freeEditorRange);
    return true;
  }

  function normalizeFreeEditorMarkup(assignToEditor) {
    const sanitized = ns.utils.sanitizeRichText(refs.slideFreeBody.innerHTML, 1600);
    if (assignToEditor) {
      refs.slideFreeBody.innerHTML = sanitized;
    }
    updateSelectedFreeBody(sanitized);
    updateFreeBodyPreview();
  }

  function markFreeEditorToolbarInteraction() {
    suppressFreeEditorBlur = true;
    window.setTimeout(() => {
      suppressFreeEditorBlur = false;
    }, 0);
  }

  function applyFreeEditorFontSize(size) {
    if (!restoreFreeEditorSelection()) {
      refs.slideFreeBody.focus();
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!refs.slideFreeBody.contains(range.commonAncestorContainer)) {
      return;
    }

    const wrapper = document.createElement("span");
    wrapper.setAttribute("style", `font-size:${size}%;`);
    try {
      const content = range.extractContents();
      wrapper.appendChild(content);
      range.insertNode(wrapper);
      range.selectNodeContents(wrapper);
      selection.removeAllRanges();
      selection.addRange(range);
      saveFreeEditorSelection();
      normalizeFreeEditorMarkup(false);
    } catch (error) {
      return;
    }
  }

  function applyFreeEditorTextColor(color) {
    if (!restoreFreeEditorSelection()) {
      refs.slideFreeBody.focus();
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!refs.slideFreeBody.contains(range.commonAncestorContainer)) {
      return;
    }

    const normalizedColor = normalizeFreeEditorTextColor(color);
    const wrapper = document.createElement("span");
    wrapper.setAttribute("style", `color:${normalizedColor};`);
    try {
      const content = range.extractContents();
      wrapper.appendChild(content);
      range.insertNode(wrapper);
      range.selectNodeContents(wrapper);
      selection.removeAllRanges();
      selection.addRange(range);
      saveFreeEditorSelection();
      normalizeFreeEditorMarkup(false);
    } catch (error) {
      return;
    }
  }

  function applyFreeEditorInlineTag(tagName) {
    if (!restoreFreeEditorSelection()) {
      refs.slideFreeBody.focus();
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!refs.slideFreeBody.contains(range.commonAncestorContainer)) {
      return;
    }

    const formatAncestor = findFreeEditorFormatAncestor(range, tagName);
    if (formatAncestor) {
      unwrapFreeEditorFormat(formatAncestor);
      saveFreeEditorSelection();
      normalizeFreeEditorMarkup(false);
      return;
    }

    const wrapper = document.createElement(tagName);
    try {
      const content = range.extractContents();
      wrapper.appendChild(content);
      range.insertNode(wrapper);
      range.selectNodeContents(wrapper);
      selection.removeAllRanges();
      selection.addRange(range);
      saveFreeEditorSelection();
      normalizeFreeEditorMarkup(false);
    } catch (error) {
      return;
    }
  }

  function getFreeEditorFormatAncestorForNode(node, tagName) {
    let current = node && node.nodeType === Node.ELEMENT_NODE ? node : node.parentNode;
    while (current && current !== refs.slideFreeBody) {
      if (current.nodeType === Node.ELEMENT_NODE && current.tagName.toLowerCase() === tagName) {
        return current;
      }
      current = current.parentNode;
    }
    return null;
  }

  function findFreeEditorFormatAncestor(range, tagName) {
    if (!range) {
      return null;
    }

    const commonAncestor = getFreeEditorFormatAncestorForNode(range.commonAncestorContainer, tagName);
    if (commonAncestor) {
      return commonAncestor;
    }

    const startAncestor = getFreeEditorFormatAncestorForNode(range.startContainer, tagName);
    const endAncestor = getFreeEditorFormatAncestorForNode(range.endContainer, tagName);
    if (startAncestor && endAncestor && startAncestor === endAncestor) {
      return startAncestor;
    }

    return null;
  }

  function unwrapFreeEditorFormat(element) {
    if (!element || !element.parentNode) {
      return;
    }

    const parent = element.parentNode;
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element);
    }
    parent.removeChild(element);
  }

  function insertFreeEditorLineBreak() {
    if (!restoreFreeEditorSelection()) {
      refs.slideFreeBody.focus();
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);
    if (!refs.slideFreeBody.contains(range.commonAncestorContainer)) {
      return;
    }

    const br = document.createElement("br");
    const spacer = document.createTextNode("");
    range.deleteContents();
    range.insertNode(br);
    range.setStartAfter(br);
    range.insertNode(spacer);
    range.setStartAfter(spacer);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    saveFreeEditorSelection();
    normalizeFreeEditorMarkup(false);
  }

  function addSelectedFreeLink(label, url) {
    const trimmedUrl = ns.utils.clampText(url, 500).trim();
    if (!trimmedUrl) {
      return;
    }

    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const freeLinks = Array.isArray(slide.freeLinks) ? slide.freeLinks.slice(0, 12) : [];
      freeLinks.push({
        label: ns.utils.clampText(label, 80),
        url: trimmedUrl,
      });
      return Object.assign({}, slide, { freeLinks: freeLinks.slice(0, 12) });
    });
    render();
  }

  function removeSelectedFreeLink(index) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const freeLinks = Array.isArray(slide.freeLinks) ? slide.freeLinks.slice() : [];
      if (index < 0 || index >= freeLinks.length) {
        return slide;
      }
      freeLinks.splice(index, 1);
      return Object.assign({}, slide, { freeLinks });
    });
    render();
  }

  function toggleSelectedFreeMedia(mediaId) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const freeMediaIds = Array.isArray(slide.freeMediaIds) ? slide.freeMediaIds.slice() : [];
      const index = freeMediaIds.indexOf(mediaId);
      if (index >= 0) {
        freeMediaIds.splice(index, 1);
      } else {
        freeMediaIds.push(mediaId);
      }
      return Object.assign({}, slide, { freeMediaIds: ns.utils.uniqueStrings(freeMediaIds).slice(0, 12) });
    });
    render();
  }

  function moveSelectedBullet(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
      return;
    }

    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const bullets = Array.isArray(slide.bullets) ? slide.bullets.slice() : ["", "", ""];
      const origins = bullets.map((unused, index) => index);
      while (bullets.length < 3) {
        bullets.push("");
        origins.push(origins.length);
      }
      if (fromIndex >= bullets.length || toIndex >= bullets.length) {
        return slide;
      }

      const moved = bullets.splice(fromIndex, 1)[0];
      const movedOrigin = origins.splice(fromIndex, 1)[0];
      bullets.splice(toIndex, 0, moved);
      origins.splice(toIndex, 0, movedOrigin);
      const sourceSubBullets = Object.assign({}, slide.subBullets || {});
      const reorderedSubBullets = {};
      origins.forEach((originIndex, index) => {
        const items = sourceSubBullets[originIndex];
        if (Array.isArray(items) && items.length) {
          reorderedSubBullets[index] = items.slice();
        }
      });
      return Object.assign({}, slide, { bullets, subBullets: reorderedSubBullets });
    });
    render();
  }

  function updateSelectedFreeLink(index, patch) {
    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const freeLinks = Array.isArray(slide.freeLinks) ? slide.freeLinks.slice() : [];
      if (index < 0 || index >= freeLinks.length) {
        return slide;
      }
      freeLinks[index] = Object.assign({}, freeLinks[index], patch);
      return Object.assign({}, slide, { freeLinks });
    });
    refreshStageOnly();
  }

  function moveSelectedFreeLink(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
      return;
    }

    state.slides = state.slides.map((slide) => {
      if (slide.id !== state.selectedSlideId) {
        return slide;
      }
      const freeLinks = Array.isArray(slide.freeLinks) ? slide.freeLinks.slice() : [];
      if (fromIndex >= freeLinks.length || toIndex >= freeLinks.length) {
        return slide;
      }

      const moved = freeLinks.splice(fromIndex, 1)[0];
      freeLinks.splice(toIndex, 0, moved);
      return Object.assign({}, slide, { freeLinks });
    });
    render();
  }

  function reindexSlides() {
    state.slides = state.slides.map((slide, index) => {
      return Object.assign({}, slide, {
        number: String(index + 1).padStart(2, "0"),
      });
    });
  }

  function createBlankSlide(bloomLevelId) {
    const selected = getSelectedSlide();
    const slide = ns.stateFactory.createBlankSlide(
      state.slides.length + 1,
      bloomLevelId || (selected && selected.bloomLevel)
    );
    slide.id = ns.utils.createId("slide");
    state.slides.push(slide);
    state.selectedSlideId = slide.id;
    reindexSlides();
    closeAddSlideMenu();
    render();
  }

  function openAddSlideMenu() {
    isAddSlideMenuOpen = true;
    refs.addSlide.setAttribute("aria-expanded", "true");
    refs.addSlideMenu.hidden = false;
    refs.addSlideMenu.classList.add("is-open");
  }

  function closeAddSlideMenu() {
    isAddSlideMenuOpen = false;
    refs.addSlide.setAttribute("aria-expanded", "false");
    refs.addSlideMenu.classList.remove("is-open");
    refs.addSlideMenu.hidden = true;
  }

  function toggleAddSlideMenu() {
    if (isAddSlideMenuOpen) {
      closeAddSlideMenu();
      return;
    }
    openAddSlideMenu();
  }

  function duplicateCurrentSlide() {
    closeAddSlideMenu();
    const selected = getSelectedSlide();
    if (!selected) {
      return;
    }

    const duplicate = ns.utils.clone(selected);
    duplicate.id = ns.utils.createId("slide");
    duplicate.label = ns.utils.clampText(`${selected.label} copie`, 24);

    const index = state.slides.findIndex((slide) => slide.id === selected.id);
    state.slides.splice(index + 1, 0, duplicate);
    state.selectedSlideId = duplicate.id;
    reindexSlides();
    render();
  }

  function deleteCurrentSlide() {
    closeAddSlideMenu();
    deleteSlideById(state.selectedSlideId);
  }

  function deleteSlideById(id) {
    closeAddSlideMenu();
    if (state.slides.length === 1) {
      return;
    }

    const index = state.slides.findIndex((slide) => slide.id === id);
    if (index < 0) {
      return;
    }

    state.slides.splice(index, 1);
    reindexSlides();
    state.selectedSlideId = state.slides[Math.max(0, index - 1)].id;
    render();
  }

  function moveSlide(id, direction) {
    closeAddSlideMenu();
    const currentIndex = state.slides.findIndex((slide) => slide.id === id);
    const targetIndex = currentIndex + direction;
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= state.slides.length) {
      return;
    }

    const moved = state.slides.splice(currentIndex, 1)[0];
    state.slides.splice(targetIndex, 0, moved);
    reindexSlides();
    render();
  }

  function moveSlideToIndex(id, targetIndex) {
    closeAddSlideMenu();
    const currentIndex = state.slides.findIndex((slide) => slide.id === id);
    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= state.slides.length || currentIndex === targetIndex) {
      return;
    }

    const moved = state.slides.splice(currentIndex, 1)[0];
    state.slides.splice(targetIndex, 0, moved);
    state.selectedSlideId = moved.id;
    reindexSlides();
    render();
  }

  function clearThumbDropState() {
    refs.thumbStrip.querySelectorAll(".thumb-card.is-drop-target").forEach((card) => {
      card.classList.remove("is-drop-target");
    });
  }

  function clearListDropState() {
    refs.slideList.querySelectorAll(".slide-item.is-drop-target").forEach((card) => {
      card.classList.remove("is-drop-target");
    });
  }

  function clearBulletDropState() {
    refs.slideBulletsEditor.querySelectorAll(".bullet-editor-row.is-drop-target, .bullet-editor-row.is-dragging").forEach((row) => {
      row.classList.remove("is-drop-target", "is-dragging");
    });
  }

  function selectSlide(id, options) {
    const opts = options || {};
    closeAddSlideMenu();
    if (!state.slides.some((slide) => slide.id === id)) {
      return;
    }
    state.selectedSlideId = id;
    if (opts.focusPreviewPanel) {
      pendingPreviewPanelFocus = true;
    }
    render();
  }

  function applyBloomLevel(levelId) {
    closeAddSlideMenu();
    updateSelectedSlide({ bloomLevel: levelId });
  }

  function togglePrinciple(principleId) {
    closeAddSlideMenu();
    const selected = getSelectedSlide();
    const nextPrinciples = selected.principleIds.includes(principleId)
      ? selected.principleIds.filter((id) => id !== principleId)
      : selected.principleIds.concat(principleId);
    updateSelectedSlide({ principleIds: ns.utils.uniqueStrings(nextPrinciples) });
  }

  function regenerateBloomDeck() {
    closeAddSlideMenu();
    const slides = ns.stateFactory.createBloomDeckSlides().map((slide) => {
      slide.id = ns.utils.createId("slide");
      return slide;
    });
    state.slides = slides;
    state.selectedSlideId = slides[0] ? slides[0].id : null;
    reindexSlides();
    render();
  }

  refs.deckTitle.addEventListener("input", (event) => updateSettings("title", event.target.value, 60, false));
  refs.deckSubtitle.addEventListener("input", (event) => updateSettings("subtitle", event.target.value, 90, false));
  refs.deckFooter.addEventListener("input", (event) => updateSettings("footer", event.target.value, 50, false));
  refs.deckPalette.addEventListener("change", (event) => updateSettings("palette", event.target.value, 24));
  refs.deckFont.addEventListener("change", (event) => updateSettings("font", event.target.value, 24));
  refs.deckTransition.addEventListener("change", (event) => updateSettings("transition", event.target.value, 12));
  refs.deckTheme.addEventListener("change", (event) => updateSettings("theme", event.target.value, 12));
  refs.deckFrameShadow.addEventListener("change", (event) => {
    state.settings.frameShadow = Boolean(event.target.checked);
    render();
  });

  refs.slideBloomLevel.addEventListener("change", (event) => updateSelectedSlide({ bloomLevel: event.target.value }));
  refs.slideLabel.addEventListener("input", (event) => updateSelectedSlide({ label: ns.utils.clampText(event.target.value, 24) }, false));
  refs.slideNumber.addEventListener("input", (event) => updateSelectedSlide({ number: ns.utils.clampText(event.target.value, 8) }, false));
  refs.slideObjective.addEventListener("input", (event) => updateSelectedSlide({ objective: ns.utils.clampText(event.target.value, 180) }, false));
  refs.slideEvidence.addEventListener("input", (event) => updateSelectedSlide({ evidence: ns.utils.clampText(event.target.value, 120) }, false));
  refs.slideTitle.addEventListener("input", (event) => updateSelectedSlide({ title: ns.utils.clampText(event.target.value, 72) }, false));
  refs.slideSubtitle.addEventListener("input", (event) => updateSelectedSlide({ subtitle: ns.utils.clampText(event.target.value, 170) }, false));
  refs.slideContentType.addEventListener("change", (event) => updateSelectedSlide({
    contentType: event.target.value === "table"
      ? "table"
      : event.target.value === "free"
        ? "free"
        : event.target.value === "visual"
          ? "visual"
          : event.target.value === "canvas"
            ? "canvas"
            : "bullets",
  }));
  refs.slidePaletteOverride.addEventListener("change", (event) => updateSelectedSlide({
    paletteOverride: event.target.value,
  }));
  refs.slideDecorativeAccentOverride.addEventListener("change", (event) => updateSelectedSlide({
    decorativeAccentOverride: event.target.value,
  }));
  refs.slideDecorativeAccentSolid.addEventListener("change", (event) => updateSelectedSlide({
    decorativeAccentSolid: Boolean(event.target.checked),
  }));
  refs.slideBulletsNumbered.addEventListener("change", (event) => updateSelectedSlide({
    bulletsNumbered: Boolean(event.target.checked),
  }));
  refs.slideBulletsProgressive.addEventListener("change", (event) => updateSelectedSlide({
    bulletsProgressive: Boolean(event.target.checked),
  }));
  refs.slideTableProgressive.addEventListener("change", (event) => updateSelectedSlide({
    tableProgressive: Boolean(event.target.checked),
  }));
  refs.slideTableProgressiveOrder.addEventListener("change", (event) => updateSelectedSlide({
    tableProgressiveOrder: event.target.value === "column" ? "column" : "row",
  }));
  refs.slideBullet1.addEventListener("input", (event) => updateSelectedBullet(0, ns.utils.clampText(event.target.value, 220), false));
  refs.slideBullet2.addEventListener("input", (event) => updateSelectedBullet(1, ns.utils.clampText(event.target.value, 220), false));
  refs.slideBullet3.addEventListener("input", (event) => updateSelectedBullet(2, ns.utils.clampText(event.target.value, 220), false));
  refs.addBullet.addEventListener("click", addSelectedBullet);
  refs.slideFreeBody.addEventListener("input", () => {
    saveFreeEditorSelection();
    if (ns.utils.richTextLength(refs.slideFreeBody.innerHTML) > 1600) {
      normalizeFreeEditorMarkup(true);
      return;
    }
    normalizeFreeEditorMarkup(false);
  });
  refs.slideFreeBody.addEventListener("mousedown", () => {
    freeEditorRange = null;
  });
  refs.slideFreeBody.addEventListener("keyup", saveFreeEditorSelection);
  refs.slideFreeBody.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      insertFreeEditorLineBreak();
    }
  });
  refs.slideFreeBody.addEventListener("mouseup", saveFreeEditorSelection);
  refs.slideFreeBody.addEventListener("click", () => {
    setTimeout(saveFreeEditorSelection, 0);
  });
  refs.slideFreeBody.addEventListener("blur", () => {
    if (suppressFreeEditorBlur) {
      return;
    }
    normalizeFreeEditorMarkup(true);
  });
  refs.slideFreeBody.addEventListener("paste", (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData ? event.clipboardData.getData("text/plain") : "";
    if (!pastedText) {
      return;
    }
    restoreFreeEditorSelection();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }
    const range = selection.getRangeAt(0);
    if (!refs.slideFreeBody.contains(range.commonAncestorContainer)) {
      return;
    }
    range.deleteContents();
    const textNode = document.createTextNode(pastedText);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    saveFreeEditorSelection();
    normalizeFreeEditorMarkup(true);
  });
  refs.addFreeLink.addEventListener("click", () => {
    addSelectedFreeLink(refs.freeLinkLabel.value, refs.freeLinkUrl.value);
    refs.freeLinkLabel.value = "";
    refs.freeLinkUrl.value = "";
  });
  refs.canvasAddText.addEventListener("click", () => addCanvasElement("text"));
  refs.canvasAddArrow.addEventListener("click", () => addCanvasElement("arrow"));
  refs.canvasDeleteElement.addEventListener("click", removeSelectedCanvasElement);
  refs.canvasElementX.addEventListener("input", (event) => updateSelectedCanvasElement({
    x: clampCanvasMetric(event.target.value, 0, 0, 94),
  }, false));
  refs.canvasElementY.addEventListener("input", (event) => updateSelectedCanvasElement({
    y: clampCanvasMetric(event.target.value, 0, 0, 94),
  }, false));
  refs.canvasElementW.addEventListener("input", (event) => {
    const selectedElement = getCanvasSelectedElement(getSelectedCanvasData().elements);
    const maxWidth = selectedElement ? (100 - (Number(selectedElement.x) || 0)) : 100;
    updateSelectedCanvasElement({
      w: clampCanvasMetric(event.target.value, selectedElement ? selectedElement.w : 24, 6, maxWidth),
    }, false);
  });
  refs.canvasElementH.addEventListener("input", (event) => {
    const selectedElement = getCanvasSelectedElement(getSelectedCanvasData().elements);
    const maxHeight = selectedElement ? (100 - (Number(selectedElement.y) || 0)) : 100;
    updateSelectedCanvasElement({
      h: clampCanvasMetric(event.target.value, selectedElement ? selectedElement.h : 18, 6, maxHeight),
    }, false);
  });
  refs.canvasTextContent.addEventListener("input", () => {
    saveCanvasTextEditorSelection();
    if (ns.utils.richTextLength(refs.canvasTextContent.innerHTML) > 600) {
      normalizeCanvasTextEditorMarkup(true);
      return;
    }
    normalizeCanvasTextEditorMarkup(false);
  });
  refs.canvasTextContent.addEventListener("mousedown", () => {
    canvasTextEditorRange = null;
  });
  refs.canvasTextContent.addEventListener("keyup", () => {
    saveCanvasTextEditorSelection();
    updateCanvasTextToolbarState();
  });
  refs.canvasTextContent.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      insertCanvasTextEditorLineBreak();
    }
  });
  refs.canvasTextContent.addEventListener("mouseup", () => {
    saveCanvasTextEditorSelection();
    updateCanvasTextToolbarState();
  });
  refs.canvasTextContent.addEventListener("click", () => {
    setTimeout(() => {
      saveCanvasTextEditorSelection();
      updateCanvasTextToolbarState();
    }, 0);
  });
  refs.canvasTextContent.addEventListener("blur", () => {
    if (suppressCanvasTextEditorBlur) {
      return;
    }
    normalizeCanvasTextEditorMarkup(true);
  });
  refs.canvasTextContent.addEventListener("paste", (event) => {
    event.preventDefault();
    const pastedText = event.clipboardData ? event.clipboardData.getData("text/plain") : "";
    if (!pastedText) {
      return;
    }
    restoreCanvasTextEditorSelection();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      return;
    }
    const range = selection.getRangeAt(0);
    if (!refs.canvasTextContent.contains(range.commonAncestorContainer)) {
      return;
    }
    range.deleteContents();
    const textNode = document.createTextNode(pastedText);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    saveCanvasTextEditorSelection();
    normalizeCanvasTextEditorMarkup(true);
  });
  refs.canvasTextBold.addEventListener("mousedown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    markCanvasTextEditorToolbarInteraction();
    saveCanvasTextEditorSelection();
    applyCanvasTextEditorInlineTag("strong");
  });
  refs.canvasTextBold.addEventListener("click", (event) => {
    event.preventDefault();
  });
  refs.canvasTextItalic.addEventListener("mousedown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    markCanvasTextEditorToolbarInteraction();
    saveCanvasTextEditorSelection();
    applyCanvasTextEditorInlineTag("em");
  });
  refs.canvasTextItalic.addEventListener("click", (event) => {
    event.preventDefault();
  });
  refs.canvasTextUnderline.addEventListener("mousedown", (event) => {
    event.preventDefault();
    event.stopPropagation();
    markCanvasTextEditorToolbarInteraction();
    saveCanvasTextEditorSelection();
    applyCanvasTextEditorInlineTag("u");
  });
  refs.canvasTextUnderline.addEventListener("click", (event) => {
    event.preventDefault();
  });
  refs.canvasTextSize.addEventListener("input", (event) => {
    const nextValue = String(Math.round(clampCanvasMetric(event.target.value, 28, 16, 72)));
    refs.canvasTextSizeValue.textContent = `${nextValue} px`;
    applyCanvasTextEditorFontSize(nextValue);
  });
  refs.canvasTextSize.addEventListener("mousedown", () => {
    markCanvasTextEditorToolbarInteraction();
    saveCanvasTextEditorSelection();
    createCanvasTextSelectionBookmark();
  });
  refs.canvasTextFrame.addEventListener("change", (event) => updateSelectedCanvasElement({
    showFrame: Boolean(event.target.checked),
  }, false));
  if (refs.canvasTextColorPalette) {
    refs.canvasTextColorPalette.addEventListener("mousedown", (event) => {
      const swatch = event.target.closest("[data-canvas-text-color-value]");
      if (!swatch) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      markCanvasTextEditorToolbarInteraction();
      saveCanvasTextEditorSelection();
      createCanvasTextSelectionBookmark();
      applyCanvasTextEditorTextColor(swatch.getAttribute("data-canvas-text-color-value"));
    });
    refs.canvasTextColorPalette.addEventListener("click", (event) => {
      if (event.target.closest("[data-canvas-text-color-value]")) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }
  refs.canvasImageMedia.addEventListener("change", (event) => updateSelectedCanvasElement({
    mediaId: event.target.value,
  }));
  refs.canvasArrowDirection.addEventListener("change", (event) => updateSelectedCanvasElement({
    direction: event.target.value === "up" || event.target.value === "down" || event.target.value === "left" ? event.target.value : "right",
  }));
  refs.canvasArrowColor.addEventListener("input", (event) => updateSelectedCanvasElement({
    color: normalizeCanvasColor(event.target.value, "#0a66ff"),
  }, false));
  refs.canvasArrowRotation.addEventListener("input", (event) => updateSelectedCanvasElement({
    rotation: normalizeCanvasRotation(event.target.value, 0),
  }, false));
  refs.canvasArrowLength.addEventListener("input", (event) => {
    const nextValue = String(normalizeCanvasArrowLength(event.target.value, 100));
    refs.canvasArrowLengthValue.textContent = `${nextValue} %`;
    updateSelectedCanvasElement({
      arrowLength: Number(nextValue),
    }, false);
  });
  refs.freeLinksList.addEventListener("input", (event) => {
    const labelInput = event.target.closest("[data-free-link-label]");
    if (labelInput) {
      updateSelectedFreeLink(
        Number(labelInput.getAttribute("data-free-link-label")),
        { label: ns.utils.clampText(labelInput.value, 80) }
      );
      return;
    }
    const urlInput = event.target.closest("[data-free-link-url]");
    if (urlInput) {
      updateSelectedFreeLink(
        Number(urlInput.getAttribute("data-free-link-url")),
        { url: ns.utils.clampText(urlInput.value, 500) }
      );
    }
  });
  refs.visualPrimaryMedia.addEventListener("change", (event) => updateSelectedVisualData({
    primaryMediaId: event.target.value,
  }));
  refs.visualSecondaryMedia.addEventListener("change", (event) => updateSelectedVisualData({
    secondaryMediaId: event.target.value,
  }));
  refs.visualShowImages.addEventListener("change", (event) => updateSelectedVisualData({
    showImages: Boolean(event.target.checked),
  }));
  refs.visualPrimaryMediaReveal.addEventListener("change", (event) => updateSelectedVisualData({
    primaryMediaReveal: Boolean(event.target.checked),
  }));
  refs.visualSecondaryMediaReveal.addEventListener("change", (event) => updateSelectedVisualData({
    secondaryMediaReveal: Boolean(event.target.checked),
  }));
  refs.visualBody.addEventListener("input", (event) => {
    pendingVisualFieldFocus = {
      refKey: "visualBody",
      caret: event.target.selectionStart || 0,
    };
    updateSelectedVisualData({
      body: ns.utils.clampText(event.target.value, 320),
    }, false);
  });
  refs.visualCallout.addEventListener("input", (event) => {
    pendingVisualFieldFocus = {
      refKey: "visualCallout",
      caret: event.target.selectionStart || 0,
    };
    updateSelectedVisualData({
      callout: ns.utils.clampText(event.target.value, 180),
    }, false);
  });
  refs.visualArrowDirection.addEventListener("change", (event) => updateSelectedVisualData({
    arrowDirection: event.target.value === "up" || event.target.value === "down" || event.target.value === "left" ? event.target.value : "right",
  }));
  refs.visualArrowColor.addEventListener("change", (event) => updateSelectedVisualData({
    arrowColor: normalizeVisualArrowColor(event.target.value),
  }));
  refs.visualShowChart.addEventListener("change", (event) => updateSelectedVisualData({
    showChart: Boolean(event.target.checked),
  }));
  refs.visualChartReveal.addEventListener("change", (event) => updateSelectedVisualData({
    chartReveal: Boolean(event.target.checked),
  }));
  refs.visualChartTitle.addEventListener("input", (event) => {
    pendingVisualFieldFocus = {
      refKey: "visualChartTitle",
      caret: event.target.selectionStart || 0,
    };
    updateSelectedVisualData({
      chartTitle: ns.utils.clampText(event.target.value, 48),
    }, false);
  });
  refs.visualChartBars.addEventListener("input", (event) => {
    const input = event.target.closest("[data-visual-chart-field]");
    if (!input) {
      return;
    }
    const index = Number(input.getAttribute("data-visual-chart-index"));
    const field = input.getAttribute("data-visual-chart-field");
    pendingVisualChartFocus = {
      index,
      field,
      caret: typeof input.selectionStart === "number" ? input.selectionStart : 0,
    };
    if (field === "label") {
      updateSelectedVisualChartBar(index, {
        label: ns.utils.clampText(input.value, 18),
      }, false);
      return;
    }
    if (field === "value") {
      updateSelectedVisualChartBar(index, {
        value: clampVisualBarValue(input.value),
      }, false);
    }
  });
  refs.visualChartBars.addEventListener("change", (event) => {
    const input = event.target.closest('[data-visual-chart-field="color"]');
    if (!input) {
      return;
    }
    const index = Number(input.getAttribute("data-visual-chart-index"));
    updateSelectedVisualChartBar(index, {
      color: normalizeVisualArrowColor(input.value),
    });
  });
  refs.visualChartBars.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-visual-chart-bar]");
    if (!removeButton) {
      return;
    }
    removeSelectedVisualChartBar(Number(removeButton.getAttribute("data-remove-visual-chart-bar")));
  });
  refs.visualChartAddColumn.addEventListener("click", addSelectedVisualChartBar);
  refs.visualChartRemoveColumn.addEventListener("click", () => {
    const { count } = getVisibleVisualChartBars();
    removeSelectedVisualChartBar(count - 1);
  });
  refs.slideNote.addEventListener("input", (event) => updateSelectedSlide({ note: ns.utils.clampText(event.target.value, 180) }, false));
  refs.extraBulletsList.addEventListener("input", (event) => {
    const input = event.target.closest("[data-extra-bullet-index]");
    if (!input) {
      return;
    }
    pendingBulletFocus = {
      index: Number(input.getAttribute("data-extra-bullet-index")),
      caret: input.selectionStart || 0,
    };
    updateSelectedBullet(Number(input.getAttribute("data-extra-bullet-index")), ns.utils.clampText(input.value, 220), false);
  });
  refs.slideBulletsEditor.addEventListener("input", (event) => {
    const input = event.target.closest("[data-sub-bullet-index]");
    if (!input) {
      return;
    }
    pendingSubBulletFocus = {
      parentIndex: Number(input.getAttribute("data-sub-bullet-parent")),
      subIndex: Number(input.getAttribute("data-sub-bullet-index")),
      caret: input.selectionStart || 0,
    };
    updateSelectedSubBullet(
      Number(input.getAttribute("data-sub-bullet-parent")),
      Number(input.getAttribute("data-sub-bullet-index")),
      ns.utils.clampText(input.value, 320),
      false
    );
  });
  refs.tableEditorGrid.addEventListener("input", (event) => {
    const input = event.target.closest("[data-table-cell]");
    if (!input) {
      return;
    }
    const [rowIndex, columnIndex] = input.getAttribute("data-table-cell").split("-").map(Number);
    pendingTableFocus = { row: rowIndex, column: columnIndex, caret: input.selectionStart || 0 };
    updateSelectedTableCell(rowIndex, columnIndex, ns.utils.clampText(input.value, 120), false);
  });
  refs.tableFillTarget.addEventListener("change", () => render());
  refs.tableFillIndex.addEventListener("change", () => {
    refs.tableFillColor.value = getSelectedTableFillColor();
  });
  refs.tableFillColor.addEventListener("change", () => {
    refs.tableFillColor.value = normalizeHexColor(refs.tableFillColor.value);
  });
  refs.addTableRow.addEventListener("click", () => {
    const slide = getSelectedSlide();
    resizeSelectedTable((slide.table || []).length + 1, getTableColumnCount(slide.table));
  });
  refs.removeTableRow.addEventListener("click", () => {
    const slide = getSelectedSlide();
    resizeSelectedTable(Math.max(2, (slide.table || []).length - 1), getTableColumnCount(slide.table));
  });
  refs.addTableColumn.addEventListener("click", () => {
    const slide = getSelectedSlide();
    resizeSelectedTable((slide.table || []).length, getTableColumnCount(slide.table) + 1);
  });
  refs.removeTableColumn.addEventListener("click", () => {
    const slide = getSelectedSlide();
    resizeSelectedTable((slide.table || []).length, Math.max(2, getTableColumnCount(slide.table) - 1));
  });
  refs.addTableFill.addEventListener("click", () => {
    setSelectedTableFill(refs.tableFillTarget.value, Number(refs.tableFillIndex.value), normalizeHexColor(refs.tableFillColor.value));
  });
  refs.mediaUploadTrigger.addEventListener("click", () => refs.mediaUpload.click());
  refs.importJson.addEventListener("click", () => refs.importJsonInput.click());
  refs.toggleNightMode.addEventListener("click", toggleNightMode);
  refs.toggleMediaPanel.addEventListener("click", toggleMediaPanel);
  refs.importJsonInput.addEventListener("change", async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    try {
      await importJsonProject(file);
    } finally {
      event.target.value = "";
    }
  });
  refs.mediaUpload.addEventListener("change", async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const importedItems = await ns.services.media.importFiles(files);
    state.mediaLibrary = state.mediaLibrary.concat(importedItems);
    render();
    event.target.value = "";
  });
  refs.clearSlideMedia.addEventListener("click", () => assignMediaToSelectedSlide(""));
  refs.mediaLinkAdd.addEventListener("click", () => {
    const rawValue = refs.mediaLinkInput.value;
    refs.mediaLinkFeedback.textContent = "";

    const mediaItem = ns.services.media.isDirectMediaUrl(rawValue)
      ? ns.services.media.createExternalMedia(rawValue)
      : ns.services.media.isEmbeddableMediaUrl(rawValue)
        ? ns.services.media.createEmbedMedia(rawValue)
        : null;

    if (!mediaItem) {
      refs.mediaLinkFeedback.textContent = "Utilise un lien http/https, un code iframe, un data URL image/vidéo, ou un lien vidéo reconnu.";
      return;
    }

    ns.services.media.primeMediaUrl(mediaItem);
    state.mediaLibrary = state.mediaLibrary.concat(mediaItem);
    refs.mediaLinkInput.value = "";
    refs.mediaLinkFeedback.textContent = mediaItem.kind === "embed"
      ? "Embed YouTube ajouté."
      : "Média ajouté depuis le lien.";
    render();
    assignMediaToSelectedSlide(mediaItem.id);
  });

  refs.generateBloomDeck.addEventListener("click", regenerateBloomDeck);
  refs.addSlide.addEventListener("click", toggleAddSlideMenu);
  refs.duplicateSlide.addEventListener("click", duplicateCurrentSlide);
  refs.deleteSlide.addEventListener("click", deleteCurrentSlide);
  refs.deleteSlideInline.addEventListener("click", deleteCurrentSlide);
  refs.exportJson.addEventListener("click", () => ns.services.exporter.exportJson(state));
  refs.exportPdf.addEventListener("click", () => ns.services.exporter.exportPdf(state));
  refs.exportPptx.addEventListener("click", async () => {
    if (isPptxExportRunning) {
      return;
    }
    isPptxExportRunning = true;
    updatePptxExportButton({
      state: "running",
      percent: 1,
      label: "Préparation",
      detail: "Lancement de l'export PowerPoint",
    });
    try {
      await ns.services.exporter.exportPptx(state);
    } catch (error) {
      console.error(error);
      window.alert("L'export PPTX a rencontre un probleme. Consulte la console pour plus de details.");
      updatePptxExportButton({ state: "error" });
    } finally {
      isPptxExportRunning = false;
      if (refs.exportPptx.classList.contains("is-exporting")) {
        updatePptxExportButton({ state: "idle" });
      }
    }
  });
  refs.exportHtml.addEventListener("click", () => ns.services.exporter.exportHtml(state, false));
  refs.openPresentation.addEventListener("click", () => {
    ns.services.storage.saveState(STORAGE_KEY, state);
    const presentationUrl = new URL(window.location.href);
    presentationUrl.searchParams.set("present", "1");
    window.open(presentationUrl.toString(), "_blank", "noopener");
  });
  refs.openPresentationActive.addEventListener("click", () => {
    ns.services.storage.saveState(STORAGE_KEY, state);
    const presentationUrl = new URL(window.location.href);
    presentationUrl.searchParams.set("present", "1");
    presentationUrl.searchParams.set("start", state.selectedSlideId || "");
    window.open(presentationUrl.toString(), "_blank", "noopener");
  });
  refs.tabs.forEach((tab) => {
    tab.addEventListener("click", () => setView(tab.getAttribute("data-switch-view")));
  });

  document.querySelectorAll("[data-free-command]").forEach((button) => {
    button.addEventListener("mousedown", (event) => {
      event.preventDefault();
      markFreeEditorToolbarInteraction();
      saveFreeEditorSelection();
    });
    button.addEventListener("click", () => {
      refs.slideFreeBody.focus();
      const command = button.getAttribute("data-free-command");
      if (command === "bold") {
        applyFreeEditorInlineTag("strong");
        return;
      }
      if (command === "italic") {
        applyFreeEditorInlineTag("em");
        return;
      }
      if (command === "underline") {
        applyFreeEditorInlineTag("u");
      }
    });
  });

  document.querySelectorAll("[data-free-size]").forEach((button) => {
    button.addEventListener("mousedown", (event) => {
      event.preventDefault();
      markFreeEditorToolbarInteraction();
      saveFreeEditorSelection();
    });
    button.addEventListener("click", () => {
      refs.slideFreeBody.focus();
      applyFreeEditorFontSize(button.getAttribute("data-free-size"));
    });
  });

  if (refs.freeTextColor) {
    refs.freeTextColor.addEventListener("mousedown", () => {
      markFreeEditorToolbarInteraction();
      saveFreeEditorSelection();
    });
    refs.freeTextColor.addEventListener("input", (event) => {
      refs.slideFreeBody.focus();
      applyFreeEditorTextColor(event.target.value);
    });
    refs.freeTextColor.addEventListener("change", (event) => {
      refs.slideFreeBody.focus();
      applyFreeEditorTextColor(event.target.value);
    });
  }

  document.addEventListener("selectionchange", () => {
    if (document.activeElement === refs.slideFreeBody) {
      saveFreeEditorSelection();
    }
    if (document.activeElement === refs.canvasTextContent) {
      saveCanvasTextEditorSelection();
      updateCanvasTextToolbarState();
    }
  });

  document.addEventListener("click", (event) => {
    const slideTrigger = event.target.closest("[data-select-slide]");
    const moveTrigger = event.target.closest("[data-move-slide]");
    const deleteTrigger = event.target.closest("[data-delete-slide]");
    const mediaAssignTrigger = event.target.closest("[data-assign-media]");
    const mediaDeleteTrigger = event.target.closest("[data-delete-media]");
    const removeBulletTrigger = event.target.closest("[data-remove-bullet]");
    const addSubBulletTrigger = event.target.closest("[data-add-sub-bullet]");
    const removeSubBulletTrigger = event.target.closest("[data-remove-sub-bullet]");
    const removeFreeLinkTrigger = event.target.closest("[data-remove-free-link]");
    const removeTableFillTrigger = event.target.closest("[data-remove-table-fill]");
    const toggleFreeMediaTrigger = event.target.closest("[data-toggle-free-media]");
    const addCanvasMediaTrigger = event.target.closest("[data-add-canvas-media]");
    const selectCanvasElementTrigger = event.target.closest("[data-select-canvas-element]");
    const addSlideTrigger = event.target.closest("[data-add-slide-bloom]");
    const bloomTrigger = event.target.closest("[data-set-bloom]");

    if (!event.target.closest(".add-slide-group") && isAddSlideMenuOpen) {
      closeAddSlideMenu();
    }

    if (selectCanvasElementTrigger) {
      selectedCanvasElementId = selectCanvasElementTrigger.getAttribute("data-select-canvas-element");
      render();
      return;
    }

    if (addSlideTrigger) {
      createBlankSlide(addSlideTrigger.getAttribute("data-add-slide-bloom"));
      return;
    }

    if (addCanvasMediaTrigger) {
      addCanvasMediaElement(addCanvasMediaTrigger.getAttribute("data-add-canvas-media"));
      return;
    }

    if (mediaAssignTrigger) {
      if ((getSelectedSlide().contentType || "bullets") === "visual") {
        assignVisualMedia(mediaAssignTrigger.getAttribute("data-assign-media"));
        return;
      }
      assignMediaToSelectedSlide(mediaAssignTrigger.getAttribute("data-assign-media"));
      return;
    }

    if (toggleFreeMediaTrigger) {
      toggleSelectedFreeMedia(toggleFreeMediaTrigger.getAttribute("data-toggle-free-media"));
      return;
    }

    if (mediaDeleteTrigger) {
      const mediaId = mediaDeleteTrigger.getAttribute("data-delete-media");
      state.mediaLibrary = state.mediaLibrary.filter((item) => item.id !== mediaId);
      state.slides = state.slides.map((slide) => {
        const nextVisualData = slide.visualData
          ? Object.assign({}, slide.visualData, {
              primaryMediaId: slide.visualData.primaryMediaId === mediaId ? "" : slide.visualData.primaryMediaId,
              secondaryMediaId: slide.visualData.secondaryMediaId === mediaId ? "" : slide.visualData.secondaryMediaId,
            })
          : slide.visualData;
        return Object.assign({}, slide, {
          mediaId: slide.mediaId === mediaId ? "" : slide.mediaId,
          secondaryMediaId: slide.secondaryMediaId === mediaId ? "" : slide.secondaryMediaId,
          visualData: nextVisualData,
          canvasData: slide.canvasData
            ? Object.assign({}, slide.canvasData, {
                elements: (Array.isArray(slide.canvasData.elements) ? slide.canvasData.elements : []).map((element) => {
                  if (element.type !== "image") {
                    return element;
                  }
                  return Object.assign({}, element, {
                    mediaId: element.mediaId === mediaId ? "" : element.mediaId,
                  });
                }),
              })
            : slide.canvasData,
        });
      });
      ns.services.media.deleteMedia(mediaId).then(() => render());
      render();
      return;
    }

    if (removeBulletTrigger) {
      removeSelectedBullet(Number(removeBulletTrigger.getAttribute("data-remove-bullet")));
      return;
    }

    if (addSubBulletTrigger) {
      addSelectedSubBullet(Number(addSubBulletTrigger.getAttribute("data-add-sub-bullet")));
      return;
    }

    if (removeSubBulletTrigger) {
      const [parentIndex, subIndex] = removeSubBulletTrigger.getAttribute("data-remove-sub-bullet").split("-").map(Number);
      removeSelectedSubBullet(parentIndex, subIndex);
      return;
    }

    if (removeFreeLinkTrigger) {
      removeSelectedFreeLink(Number(removeFreeLinkTrigger.getAttribute("data-remove-free-link")));
      return;
    }

    if (removeTableFillTrigger) {
      const [target, index] = removeTableFillTrigger.getAttribute("data-remove-table-fill").split("-");
      removeSelectedTableFill(target, Number(index));
      return;
    }

    if (deleteTrigger) {
      event.stopPropagation();
      deleteSlideById(deleteTrigger.getAttribute("data-delete-slide"));
      return;
    }

    if (slideTrigger) {
      selectSlide(slideTrigger.getAttribute("data-select-slide"), {
        focusPreviewPanel: refs.slideList.contains(slideTrigger),
      });
    }

    if (moveTrigger) {
      moveSlide(
        moveTrigger.getAttribute("data-move-slide"),
        Number(moveTrigger.getAttribute("data-direction"))
      );
    }

    if (bloomTrigger) {
      applyBloomLevel(bloomTrigger.getAttribute("data-set-bloom"));
    }
  });

  refs.principlesList.addEventListener("change", (event) => {
    const target = event.target;
    if (target && target.matches("[data-toggle-principle]")) {
      togglePrinciple(target.getAttribute("data-toggle-principle"));
    }
  });

  refs.thumbStrip.addEventListener("dragstart", (event) => {
    const card = event.target.closest("[data-thumb-slide]");
    if (!card) {
      return;
    }

    draggedSlideId = card.getAttribute("data-thumb-slide");
    card.classList.add("is-dragging");
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggedSlideId);
    }
  });

  refs.thumbStrip.addEventListener("dragover", (event) => {
    const card = event.target.closest("[data-thumb-slide]");
    if (!card || !draggedSlideId) {
      return;
    }

    event.preventDefault();
    clearThumbDropState();
    if (card.getAttribute("data-thumb-slide") !== draggedSlideId) {
      card.classList.add("is-drop-target");
    }
  });

  refs.thumbStrip.addEventListener("drop", (event) => {
    const card = event.target.closest("[data-thumb-slide]");
    if (!card || !draggedSlideId) {
      return;
    }

    event.preventDefault();
    const targetId = card.getAttribute("data-thumb-slide");
    const targetIndex = state.slides.findIndex((slide) => slide.id === targetId);
    clearThumbDropState();
    moveSlideToIndex(draggedSlideId, targetIndex);
    draggedSlideId = null;
  });

  refs.thumbStrip.addEventListener("dragend", (event) => {
    const card = event.target.closest("[data-thumb-slide]");
    if (card) {
      card.classList.remove("is-dragging");
    }
    clearThumbDropState();
    draggedSlideId = null;
  });

  refs.slideList.addEventListener("dragstart", (event) => {
    const handle = event.target.closest("[data-list-drag-handle]");
    if (!handle) {
      event.preventDefault();
      return;
    }

    const card = handle.closest("[data-list-slide]");
    if (!card) {
      return;
    }

    draggedListSlideId = card.getAttribute("data-list-slide");
    card.classList.add("is-dragging");
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggedListSlideId);
    }
  });

  refs.slideList.addEventListener("dragover", (event) => {
    const card = event.target.closest("[data-list-slide]");
    if (!card || !draggedListSlideId) {
      return;
    }

    event.preventDefault();
    clearListDropState();
    if (card.getAttribute("data-list-slide") !== draggedListSlideId) {
      card.classList.add("is-drop-target");
    }
  });

  refs.slideList.addEventListener("drop", (event) => {
    const card = event.target.closest("[data-list-slide]");
    if (!card || !draggedListSlideId) {
      return;
    }

    event.preventDefault();
    const targetId = card.getAttribute("data-list-slide");
    const targetIndex = state.slides.findIndex((slide) => slide.id === targetId);
    clearListDropState();
    moveSlideToIndex(draggedListSlideId, targetIndex);
    draggedListSlideId = null;
  });

  refs.slideList.addEventListener("dragend", (event) => {
    const card = event.target.closest("[data-list-slide]");
    if (card) {
      card.classList.remove("is-dragging");
    }
    clearListDropState();
    draggedListSlideId = null;
  });

  refs.slideBulletsEditor.addEventListener("dragstart", (event) => {
    const handle = event.target.closest("[data-bullet-drag-handle]");
    if (!handle) {
      return;
    }

    draggedBulletIndex = Number(handle.getAttribute("data-bullet-drag-handle"));
    const row = handle.closest("[data-bullet-row]");
    if (row) {
      row.classList.add("is-dragging");
    }
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(draggedBulletIndex));
    }
  });

  refs.slideBulletsEditor.addEventListener("dragover", (event) => {
    const row = event.target.closest("[data-bullet-row]");
    if (!row || draggedBulletIndex === null) {
      return;
    }

    event.preventDefault();
    clearBulletDropState();
    const targetIndex = Number(row.getAttribute("data-bullet-row"));
    if (targetIndex !== draggedBulletIndex) {
      row.classList.add("is-drop-target");
    }
  });

  refs.slideBulletsEditor.addEventListener("drop", (event) => {
    const row = event.target.closest("[data-bullet-row]");
    if (!row || draggedBulletIndex === null) {
      return;
    }

    event.preventDefault();
    const targetIndex = Number(row.getAttribute("data-bullet-row"));
    clearBulletDropState();
    moveSelectedBullet(draggedBulletIndex, targetIndex);
    draggedBulletIndex = null;
  });

  refs.slideBulletsEditor.addEventListener("dragend", () => {
    clearBulletDropState();
    draggedBulletIndex = null;
  });

  refs.freeLinksList.addEventListener("dragstart", (event) => {
    const handle = event.target.closest("[data-free-link-drag-handle]");
    if (!handle) {
      return;
    }
    draggedFreeLinkIndex = Number(handle.getAttribute("data-free-link-drag-handle"));
    const row = handle.closest("[data-free-link-row]");
    if (row) {
      row.classList.add("is-dragging");
    }
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(draggedFreeLinkIndex));
    }
  });

  refs.freeLinksList.addEventListener("dragover", (event) => {
    const row = event.target.closest("[data-free-link-row]");
    if (!row || draggedFreeLinkIndex === null) {
      return;
    }
    event.preventDefault();
    refs.freeLinksList.querySelectorAll(".bullet-editor-row.is-drop-target").forEach((item) => {
      if (item !== row) {
        item.classList.remove("is-drop-target");
      }
    });
    row.classList.add("is-drop-target");
  });

  refs.freeLinksList.addEventListener("drop", (event) => {
    const row = event.target.closest("[data-free-link-row]");
    if (!row || draggedFreeLinkIndex === null) {
      return;
    }

    event.preventDefault();
    const targetIndex = Number(row.getAttribute("data-free-link-row"));
    refs.freeLinksList.querySelectorAll(".bullet-editor-row.is-drop-target, .bullet-editor-row.is-dragging").forEach((item) => {
      item.classList.remove("is-drop-target", "is-dragging");
    });
    moveSelectedFreeLink(draggedFreeLinkIndex, targetIndex);
    draggedFreeLinkIndex = null;
  });

  refs.freeLinksList.addEventListener("dragend", () => {
    refs.freeLinksList.querySelectorAll(".bullet-editor-row.is-drop-target, .bullet-editor-row.is-dragging").forEach((item) => {
      item.classList.remove("is-drop-target", "is-dragging");
    });
    draggedFreeLinkIndex = null;
  });

  refs.visualChartBars.addEventListener("dragstart", (event) => {
    const handle = event.target.closest("[data-visual-chart-drag-handle]");
    if (!handle) {
      return;
    }
    draggedVisualChartIndex = Number(handle.getAttribute("data-visual-chart-drag-handle"));
    const row = handle.closest("[data-visual-chart-row]");
    if (row) {
      row.classList.add("is-dragging");
    }
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", String(draggedVisualChartIndex));
    }
  });

  refs.visualChartBars.addEventListener("dragover", (event) => {
    const row = event.target.closest("[data-visual-chart-row]");
    if (!row || draggedVisualChartIndex === null) {
      return;
    }
    event.preventDefault();
    refs.visualChartBars.querySelectorAll(".visual-chart-bar-row.is-drop-target").forEach((item) => {
      if (item !== row) {
        item.classList.remove("is-drop-target");
      }
    });
    if (Number(row.getAttribute("data-visual-chart-row")) !== draggedVisualChartIndex) {
      row.classList.add("is-drop-target");
    }
  });

  refs.visualChartBars.addEventListener("drop", (event) => {
    const row = event.target.closest("[data-visual-chart-row]");
    if (!row || draggedVisualChartIndex === null) {
      return;
    }
    event.preventDefault();
    const targetIndex = Number(row.getAttribute("data-visual-chart-row"));
    refs.visualChartBars.querySelectorAll(".visual-chart-bar-row.is-drop-target, .visual-chart-bar-row.is-dragging").forEach((item) => {
      item.classList.remove("is-drop-target", "is-dragging");
    });
    moveSelectedVisualChartBar(draggedVisualChartIndex, targetIndex);
    draggedVisualChartIndex = null;
  });

  refs.visualChartBars.addEventListener("dragend", () => {
    refs.visualChartBars.querySelectorAll(".visual-chart-bar-row.is-drop-target, .visual-chart-bar-row.is-dragging").forEach((item) => {
      item.classList.remove("is-drop-target", "is-dragging");
    });
    draggedVisualChartIndex = null;
  });

  refs.stage.addEventListener("pointerdown", (event) => {
    const selectedSlide = getSelectedSlide();
    if (!selectedSlide || (selectedSlide.contentType || "bullets") !== "canvas") {
      return;
    }
    const rotateHandle = event.target.closest("[data-canvas-rotate-handle]");
    const resizeHandle = event.target.closest("[data-canvas-resize-handle]");
    const canvasElement = event.target.closest("[data-canvas-element-id]");
    if (!canvasElement) {
      return;
    }
    beginCanvasInteraction(
      event,
      canvasElement.getAttribute("data-canvas-element-id"),
      rotateHandle ? "rotate" : resizeHandle ? "resize" : "drag"
    );
  });

  refs.stage.addEventListener("click", (event) => {
    const selectedSlide = getSelectedSlide();
    if ((selectedSlide.contentType || "bullets") === "canvas") {
      if (Date.now() < suppressCanvasClickUntil) {
        return;
      }
      const canvasElement = event.target.closest("[data-canvas-element-id]");
      const canvasSurface = event.target.closest("[data-canvas-surface]");
      if (canvasElement) {
        selectedCanvasElementId = canvasElement.getAttribute("data-canvas-element-id");
        render();
        return;
      }
      if (canvasSurface) {
        selectedCanvasElementId = null;
        render();
        return;
      }
    }
    const tableCard = event.target.closest(".slide-table[data-table-lightbox='true']");
    if (tableCard) {
      openTableLightbox(tableCard);
      return;
    }
    const chartCard = event.target.closest(".slide-visual-chart-card");
    if (!chartCard) {
      return;
    }
    openChartLightbox(chartCard);
  });

  document.addEventListener("pointermove", handleCanvasPointerMove);
  document.addEventListener("pointerup", endCanvasInteraction);
  document.addEventListener("pointercancel", endCanvasInteraction);

  refs.chartLightbox.addEventListener("click", (event) => {
    if (
      event.target === refs.chartLightbox ||
      event.target === refs.chartLightboxClose
    ) {
      closeChartLightbox();
    }
  });

  refs.tableLightbox.addEventListener("click", (event) => {
    if (
      event.target === refs.tableLightbox ||
      event.target === refs.tableLightboxClose
    ) {
      closeTableLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && refs.chartLightbox.classList.contains("is-open")) {
      closeChartLightbox();
      return;
    }

    if (event.key === "Escape" && refs.tableLightbox.classList.contains("is-open")) {
      closeTableLightbox();
      return;
    }

    if ((event.key === "ArrowUp" || event.key === "ArrowDown") && isPreviewPanelTarget(event.target)) {
      event.preventDefault();
      const currentIndex = state.slides.findIndex((slide) => slide.id === state.selectedSlideId);
      if (currentIndex < 0) {
        return;
      }
      const nextIndex = event.key === "ArrowUp"
        ? Math.max(0, currentIndex - 1)
        : Math.min(state.slides.length - 1, currentIndex + 1);
      const nextSlide = state.slides[nextIndex];
      if (!nextSlide) {
        return;
      }
      selectSlide(nextSlide.id, { focusPreviewPanel: true });
      return;
    }

    if (
      ((event.key === "Delete") || (event.key === "Backspace")) &&
      (getSelectedSlide().contentType || "bullets") === "canvas" &&
      selectedCanvasElementId &&
      !/^(input|textarea|select)$/i.test((event.target && event.target.tagName) || "")
    ) {
      event.preventDefault();
      removeSelectedCanvasElement();
      return;
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d") {
      event.preventDefault();
      duplicateCurrentSlide();
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "n") {
      event.preventDefault();
      toggleAddSlideMenu();
    }

    if (event.key === "Escape" && isAddSlideMenuOpen) {
      closeAddSlideMenu();
    }
  });

  render();
  hydrateMediaLibrary();
})();
