(function () {
  const ns = (window.StudioSlides = window.StudioSlides || {});
  ns.ui = ns.ui || {};

  function renderDashboard(payload) {
    const state = payload.state;
    const refs = payload.refs;
    const selectedSlide = state.slides.find((slide) => slide.id === state.selectedSlideId) || state.slides[0];
    const bloomLevels = ns.data.bloomLevels || [];
    const colorPalettes = ns.data.colorPalettes || [];
    const decorativeAccents = ns.data.decorativeAccents || [];
    const fontOptions = ns.data.fontOptions || [];
    const principles = ns.data.cognitivePrinciples || [];
    const density = ns.ui.computeDensity(selectedSlide);
    const visualData = selectedSlide.visualData || {};
    const canvasData = getCanvasData(selectedSlide);
    const selectedCanvasElement = getSelectedCanvasElement(canvasData, payload.selectedCanvasElementId);

    refs.deckTitle.value = state.settings.title;
    refs.deckSubtitle.value = state.settings.subtitle;
    refs.deckFooter.value = state.settings.footer;
    refs.deckTheme.value = state.settings.theme;
    refs.deckPalette.innerHTML = colorPalettes
      .map((palette) => `<option value="${ns.utils.escapeHtml(palette.id)}">${ns.utils.escapeHtml(palette.label)}</option>`)
      .join("");
    refs.deckPalette.value = state.settings.palette || "ocean";
    refs.deckFont.innerHTML = fontOptions
      .map((font) => `<option value="${ns.utils.escapeHtml(font.id)}">${ns.utils.escapeHtml(font.label)}</option>`)
      .join("");
    refs.deckFont.value = state.settings.font || "studio";
    refs.deckTransition.value = state.settings.transition || "fade";
    refs.deckFrameShadow.checked = Boolean(state.settings.frameShadow);
    refs.slideCount.textContent = `${state.slides.length} slides`;
    refs.taxonomyCount.textContent = `${bloomLevels.length} niveaux`;
    refs.appShell.setAttribute("data-view", state.view || "engineering");
    refs.appShell.setAttribute("data-ui-theme", state.uiNightMode && (state.view || "engineering") === "presentation" ? "night" : "day");
    refs.toggleNightMode.classList.toggle("is-active", Boolean(state.uiNightMode));
    refs.toggleNightMode.setAttribute("aria-pressed", state.uiNightMode ? "true" : "false");
    refs.toggleNightMode.textContent = state.uiNightMode ? "Mode clair" : "Mode nuit";

    refs.tabs.forEach((tab) => {
      const isActive = tab.getAttribute("data-switch-view") === (state.view || "engineering");
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    refs.addSlide.setAttribute("aria-expanded", "false");
    refs.addSlideMenu.classList.remove("is-open");
    refs.addSlideMenu.hidden = true;

    refs.addSlideMenu.innerHTML = bloomLevels
      .map((level) => {
        return `
          <button
            class="add-slide-option"
            type="button"
            data-add-slide-bloom="${ns.utils.escapeHtml(level.id)}"
          >
            <span class="add-slide-option-number">${ns.utils.escapeHtml(level.number)}</span>
            <span class="add-slide-option-label">${ns.utils.escapeHtml(level.title)}</span>
          </button>
        `;
      })
      .join("");

    refs.slideBloomLevel.innerHTML = bloomLevels
      .map((level) => {
        const selected = level.id === selectedSlide.bloomLevel ? " selected" : "";
        return `<option value="${ns.utils.escapeHtml(level.id)}"${selected}>${ns.utils.escapeHtml(level.number)} - ${ns.utils.escapeHtml(level.title)}</option>`;
      })
      .join("");

    refs.slideLabel.value = selectedSlide.label;
    refs.slideNumber.value = selectedSlide.number;
    refs.slideObjective.value = selectedSlide.objective;
    refs.slideEvidence.value = selectedSlide.evidence;
    refs.slideTitle.value = selectedSlide.title;
    refs.slideSubtitle.value = selectedSlide.subtitle;
    refs.slideContentType.value = selectedSlide.contentType || "bullets";
    refs.slidePaletteOverride.innerHTML = [
      '<option value="">Palette du diaporama</option>',
      ...colorPalettes.map((palette) => `<option value="${ns.utils.escapeHtml(palette.id)}">${ns.utils.escapeHtml(palette.label)}</option>`),
    ].join("");
    refs.slidePaletteOverride.value = selectedSlide.paletteOverride || "";
    refs.slideDecorativeAccentOverride.innerHTML = [
      '<option value="">Habillage de la slide</option>',
      ...decorativeAccents.map((accent) => `<option value="${ns.utils.escapeHtml(accent.id)}">${ns.utils.escapeHtml(accent.label)}</option>`),
    ].join("");
    refs.slideDecorativeAccentOverride.value = selectedSlide.decorativeAccentOverride || "";
    refs.slideDecorativeAccentSolid.checked = Boolean(selectedSlide.decorativeAccentSolid);
    refs.slideBulletsNumbered.checked = Boolean(selectedSlide.bulletsNumbered);
    refs.slideBulletsProgressive.checked = Boolean(selectedSlide.bulletsProgressive);
    refs.slideTableProgressive.checked = Boolean(selectedSlide.tableProgressive);
    refs.slideTableProgressiveOrder.value = selectedSlide.tableProgressiveOrder === "column" ? "column" : "row";
    refs.slideBullet1.value = selectedSlide.bullets[0] || "";
    refs.slideBullet2.value = selectedSlide.bullets[1] || "";
    refs.slideBullet3.value = selectedSlide.bullets[2] || "";
    refs.subBulletLists.forEach((container, index) => {
      container.innerHTML = renderSubBulletEditor(selectedSlide, index);
    });
    refs.extraBulletsList.innerHTML = renderExtraBullets(selectedSlide);
    refs.tableEditorGrid.innerHTML = renderTableEditor(selectedSlide);
    const currentFillTarget = refs.tableFillTarget.value === "column" ? "column" : "row";
    const currentFillIndex = refs.tableFillIndex.value;
    refs.tableFillTarget.value = currentFillTarget;
    refs.tableFillIndex.innerHTML = renderTableFillIndexOptions(selectedSlide, currentFillTarget);
    if (refs.tableFillIndex.querySelector(`option[value="${ns.utils.escapeHtml(currentFillIndex)}"]`)) {
      refs.tableFillIndex.value = currentFillIndex;
    }
    refs.tableFillColor.value = getDefaultTableFillColor(selectedSlide, currentFillTarget, refs.tableFillIndex.value);
    refs.tableFillList.innerHTML = renderTableFillList(selectedSlide);
    const sanitizedFreeBody = ns.utils.sanitizeRichText(selectedSlide.freeBody || "", 1600);
    if (document.activeElement !== refs.slideFreeBody || refs.slideFreeBody.innerHTML !== sanitizedFreeBody) {
      refs.slideFreeBody.innerHTML = sanitizedFreeBody;
    }
    refs.freeLinksList.innerHTML = renderFreeLinks(selectedSlide);
    refs.visualPrimaryMedia.innerHTML = renderVisualMediaOptions(state.mediaLibrary, "Image principale");
    refs.visualSecondaryMedia.innerHTML = renderVisualMediaOptions(state.mediaLibrary, "Image secondaire");
    refs.visualPrimaryMedia.value = visualData.primaryMediaId || "";
    refs.visualSecondaryMedia.value = visualData.secondaryMediaId || "";
    refs.visualShowImages.checked = visualData.showImages !== false;
    refs.visualPrimaryMediaReveal.checked = Boolean(visualData.primaryMediaReveal);
    refs.visualSecondaryMediaReveal.checked = Boolean(visualData.secondaryMediaReveal);
    refs.visualBody.value = visualData.body || "";
    refs.visualCallout.value = visualData.callout || "";
    refs.visualArrowDirection.value = visualData.arrowDirection || "right";
    refs.visualArrowColor.value = visualData.arrowColor || "#60b2e5";
    refs.visualShowChart.checked = visualData.showChart !== false;
    refs.visualChartEditor.hidden = visualData.showChart === false;
    refs.visualChartReveal.checked = Boolean(visualData.chartReveal);
    refs.visualChartTitle.value = visualData.chartTitle || "";
    refs.visualChartBars.innerHTML = renderVisualChartEditor(visualData);
    refs.visualChartAddColumn.disabled = (visualData.chartBarCount || 3) >= 6;
    refs.visualChartRemoveColumn.disabled = (visualData.chartBarCount || 3) <= 1;
    refs.canvasElementsList.innerHTML = renderCanvasElementsList(canvasData, selectedCanvasElement && selectedCanvasElement.id);
    refs.canvasImageMedia.innerHTML = renderVisualMediaOptions(state.mediaLibrary, "Choisir une image");
    refs.canvasElementFields.hidden = !selectedCanvasElement;
    refs.canvasEmptySelection.hidden = Boolean(selectedCanvasElement);
    if (selectedCanvasElement) {
      refs.canvasElementX.value = formatCanvasMetric(selectedCanvasElement.x);
      refs.canvasElementY.value = formatCanvasMetric(selectedCanvasElement.y);
      refs.canvasElementW.value = formatCanvasMetric(selectedCanvasElement.w);
      refs.canvasElementH.value = formatCanvasMetric(selectedCanvasElement.h);
      refs.canvasTextContentWrap.hidden = selectedCanvasElement.type !== "text";
      refs.canvasTextToolbar.hidden = selectedCanvasElement.type !== "text";
      refs.canvasTextStyleGrid.hidden = selectedCanvasElement.type !== "text";
      refs.canvasImageMediaWrap.hidden = selectedCanvasElement.type !== "image";
      refs.canvasArrowControls.hidden = selectedCanvasElement.type !== "arrow";
      if (selectedCanvasElement.type === "text") {
        const sanitizedCanvasText = ns.utils.sanitizeRichText(selectedCanvasElement.text || "", 600);
        if (document.activeElement !== refs.canvasTextContent || refs.canvasTextContent.innerHTML !== sanitizedCanvasText) {
          refs.canvasTextContent.innerHTML = sanitizedCanvasText;
        }
      } else if (refs.canvasTextContent.innerHTML) {
        refs.canvasTextContent.innerHTML = "";
      }
      refs.canvasTextSize.value = selectedCanvasElement.type === "text" ? String(Math.round(Number(selectedCanvasElement.fontSize) || 28)) : "28";
      refs.canvasTextSizeValue.textContent = `${refs.canvasTextSize.value} px`;
      refs.canvasTextFrame.checked = selectedCanvasElement.type === "text" ? selectedCanvasElement.showFrame !== false : true;
      refs.canvasTextBold.classList.remove("is-active");
      refs.canvasTextBold.setAttribute("aria-pressed", "false");
      refs.canvasTextItalic.classList.remove("is-active");
      refs.canvasTextItalic.setAttribute("aria-pressed", "false");
      refs.canvasTextUnderline.classList.remove("is-active");
      refs.canvasTextUnderline.setAttribute("aria-pressed", "false");
      refs.canvasImageMedia.value = selectedCanvasElement.type === "image" ? (selectedCanvasElement.mediaId || "") : "";
      refs.canvasArrowDirection.value = selectedCanvasElement.type === "arrow" ? (selectedCanvasElement.direction || "right") : "right";
      refs.canvasArrowColor.value = selectedCanvasElement.type === "arrow" ? (selectedCanvasElement.color || "#0a66ff") : "#0a66ff";
      refs.canvasArrowRotation.value = selectedCanvasElement.type === "arrow" ? String(Math.round(Number(selectedCanvasElement.rotation) || 0)) : "0";
      refs.canvasArrowLength.value = selectedCanvasElement.type === "arrow" ? String(Math.round(Number(selectedCanvasElement.arrowLength) || 100)) : "100";
      refs.canvasArrowLengthValue.textContent = `${refs.canvasArrowLength.value} %`;
    } else {
      refs.canvasTextContentWrap.hidden = true;
      refs.canvasTextToolbar.hidden = true;
      refs.canvasTextStyleGrid.hidden = true;
      refs.canvasImageMediaWrap.hidden = true;
      refs.canvasArrowControls.hidden = true;
      refs.canvasTextContent.innerHTML = "";
      refs.canvasTextSize.value = "28";
      refs.canvasTextSizeValue.textContent = "28 px";
      refs.canvasTextFrame.checked = true;
      refs.canvasTextBold.classList.remove("is-active");
      refs.canvasTextBold.setAttribute("aria-pressed", "false");
      refs.canvasTextItalic.classList.remove("is-active");
      refs.canvasTextItalic.setAttribute("aria-pressed", "false");
      refs.canvasTextUnderline.classList.remove("is-active");
      refs.canvasTextUnderline.setAttribute("aria-pressed", "false");
      refs.canvasImageMedia.value = "";
      refs.canvasArrowDirection.value = "right";
      refs.canvasArrowColor.value = "#0a66ff";
      refs.canvasArrowRotation.value = "0";
      refs.canvasArrowLength.value = "100";
      refs.canvasArrowLengthValue.textContent = "100 %";
    }
    refs.slideNote.value = selectedSlide.note;
    const isTableMode = (selectedSlide.contentType || "bullets") === "table";
    const isFreeMode = (selectedSlide.contentType || "bullets") === "free";
    const isVisualMode = (selectedSlide.contentType || "bullets") === "visual";
    const isCanvasMode = (selectedSlide.contentType || "bullets") === "canvas";
    refs.slideBulletsEditor.hidden = isTableMode || isFreeMode || isVisualMode || isCanvasMode;
    refs.slideTableEditor.hidden = !isTableMode;
    refs.slideFreeEditor.hidden = !isFreeMode;
    refs.slideVisualEditor.hidden = !isVisualMode;
    refs.slideCanvasEditor.hidden = !isCanvasMode;
    refs.slideNoteEditor.hidden = false;
    refs.slideBulletsEditor.classList.toggle("is-collapsed", isTableMode || isFreeMode || isVisualMode || isCanvasMode);
    refs.slideTableEditor.classList.toggle("is-collapsed", !isTableMode);
    refs.slideFreeEditor.classList.toggle("is-collapsed", !isFreeMode);
    refs.slideVisualEditor.classList.toggle("is-collapsed", !isVisualMode);
    refs.slideCanvasEditor.classList.toggle("is-collapsed", !isCanvasMode);
    refs.clearSlideMedia.hidden = isFreeMode || isVisualMode || isCanvasMode;
    refs.slideMediaPanelBody.hidden = Boolean(state.uiMediaPanelCollapsed);
    refs.toggleMediaPanel.textContent = state.uiMediaPanelCollapsed ? "Déplier" : "Replier";
    refs.toggleMediaPanel.setAttribute("aria-expanded", state.uiMediaPanelCollapsed ? "false" : "true");
    const table = normalizeTable(selectedSlide.table);
    const isTwoColumnTable = Boolean(table[0] && table[0].length === 2);
    refs.slideTableProgressiveOrderWrap.hidden = !isTableMode || !selectedSlide.tableProgressive || !isTwoColumnTable;

    refs.titleMeta.textContent = `${selectedSlide.title.length}/72 caractères`;
    refs.subtitleMeta.textContent = `${selectedSlide.subtitle.length}/170 caractères`;
    refs.noteMeta.textContent = `${selectedSlide.note.length}/180 caractères`;
    refs.freeBodyMeta.textContent = `${ns.utils.richTextLength(selectedSlide.freeBody || "")}/1600 caractères`;
    refs.visualBodyMeta.textContent = `${(visualData.body || "").length}/320 caractères`;
    refs.visualCalloutMeta.textContent = `${(visualData.callout || "").length}/180 caractères`;
    refs.objectiveMeta.textContent = `${selectedSlide.objective.length}/180 caractères`;
    refs.evidenceMeta.textContent = `${selectedSlide.evidence.length}/120 caractères`;

    refs.densityBadge.className = density.className;
    refs.densityBadge.textContent = density.label;
    refs.slideHint.textContent = isVisualMode
      ? "Mode visuel : images, texte, flèche et mini graphe dans une composition éditoriale."
      : isFreeMode
      ? "Mode libre : texte long, liens et plusieurs médias pour les annexes."
      : isCanvasMode
      ? "Mode canvas : place librement textes, images et flèches directement sur la slide."
      : "Modèle : un niveau Bloom, une idée forte, trois points maximum.";
    refs.slideMediaSelection.textContent = isVisualMode
      ? getVisualMediaSelectionText(selectedSlide, state.mediaLibrary)
      : isFreeMode
      ? `${(selectedSlide.freeMediaIds || []).length} média(x) dans l'annexe libre.`
      : isCanvasMode
      ? getCanvasMediaSelectionText(canvasData, state.mediaLibrary)
      : (selectedSlide.mediaId || selectedSlide.secondaryMediaId)
        ? getMediaSelectionText(selectedSlide, state.mediaLibrary)
        : "Aucun média affecté à cette slide.";
    refs.slideList.innerHTML = renderSlideList(state, selectedSlide.id);
    refs.taxonomyRoadmap.innerHTML = renderTaxonomyRoadmap(state, selectedSlide.bloomLevel);
    refs.principlesList.innerHTML = renderPrinciplesList(selectedSlide, principles);
    refs.stage.innerHTML = ns.ui.createSlideMarkup(selectedSlide, state.settings, {
      compact: false,
      mediaItems: state.mediaLibrary,
      mediaUrls: ns.services.media.getUrlMap(),
      canvasInteractive: isCanvasMode,
      selectedCanvasElementId: selectedCanvasElement ? selectedCanvasElement.id : "",
    });
    refs.presentationProgress.innerHTML = renderPresentationProgress(state, selectedSlide.id);
    refs.pedagogyBrief.innerHTML = renderPedagogyBrief(selectedSlide, principles);
    refs.mediaLibrary.innerHTML = renderMediaLibrary(state.mediaLibrary, selectedSlide);
    refs.thumbStrip.innerHTML = renderThumbStrip(state, selectedSlide.id);
  }

  function getMediaSelectionText(selectedSlide, mediaItems) {
    const selectedMedia = [selectedSlide.mediaId, selectedSlide.secondaryMediaId]
      .filter(Boolean)
      .map((mediaId) => (mediaItems || []).find((item) => item.id === mediaId))
      .filter(Boolean);
    if (!selectedMedia.length) {
      return "Aucun média affecté à cette slide.";
    }
    if (selectedMedia.length === 1) {
      const mediaItem = selectedMedia[0];
      const kindLabel = mediaItem.kind === "embed" ? "Embed" : mediaItem.kind === "video" ? "Vidéo" : "Image";
      return `${kindLabel} sélectionnée : ${mediaItem.name}`;
    }
    return `${selectedMedia.length} médias sélectionnés : ${selectedMedia.map((item) => item.name).join(" / ")}`;
  }
  function renderSlideList(state, activeId) {
    return state.slides
      .map((slide, index) => {
        const activeClass = slide.id === activeId ? " is-active" : "";
        const bloomMeta = ns.ui.getBloomMeta(slide.bloomLevel);
        return `
          <article class="slide-item${activeClass}" data-list-slide="${ns.utils.escapeHtml(slide.id)}">
            <button class="slide-select" type="button" data-select-slide="${ns.utils.escapeHtml(slide.id)}">
              <span class="slide-order" data-list-drag-handle="true" draggable="true" title="Glisser pour réordonner">
                ${String(index + 1).padStart(2, "0")}
              </span>
              <span class="slide-meta">
                <span class="slide-title">${ns.utils.escapeHtml(slide.title || "Slide sans titre")}</span>
                <span class="slide-subline">${ns.utils.escapeHtml(bloomMeta.title)} - ${ns.utils.escapeHtml(slide.subtitle || "À compléter")}</span>
              </span>
            </button>
            <div class="slide-actions">
              <button class="icon-button" type="button" data-move-slide="${ns.utils.escapeHtml(slide.id)}" data-direction="-1" aria-label="Monter">
                ^
              </button>
              <button class="icon-button" type="button" data-move-slide="${ns.utils.escapeHtml(slide.id)}" data-direction="1" aria-label="Descendre">
                v
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderTaxonomyRoadmap(state, activeBloomLevel) {
    const bloomLevels = ns.data.bloomLevels || [];
    return bloomLevels
      .map((level) => {
        const count = state.slides.filter((slide) => slide.bloomLevel === level.id).length;
        const activeClass = level.id === activeBloomLevel ? " is-active" : "";
        const verbMarkup = level.verbs
          .map((verb) => `<span class="verb-chip">${ns.utils.escapeHtml(verb)}</span>`)
          .join("");

        return `
          <article class="taxonomy-card${activeClass}" data-set-bloom="${ns.utils.escapeHtml(level.id)}">
            <div class="taxonomy-topline">
              <span class="taxonomy-step">${ns.utils.escapeHtml(level.number)}</span>
              <span class="count-pill">${count} slide${count > 1 ? "s" : ""}</span>
            </div>
            <h3 class="taxonomy-title">${ns.utils.escapeHtml(level.title)}</h3>
            <p class="taxonomy-summary">${ns.utils.escapeHtml(level.summary)}</p>
            <div class="taxonomy-verbs">${verbMarkup}</div>
          </article>
        `;
      })
      .join("");
  }

  function renderPrinciplesList(selectedSlide, principles) {
    return principles
      .map((principle) => {
        const checked = selectedSlide.principleIds.includes(principle.id) ? " checked" : "";
        return `
          <label class="principle-card">
            <input type="checkbox" data-toggle-principle="${ns.utils.escapeHtml(principle.id)}"${checked} />
            <span>
              <span class="principle-title">${ns.utils.escapeHtml(principle.title)}</span>
              <span class="principle-summary">${ns.utils.escapeHtml(principle.summary)}</span>
              <span class="principle-detail">${ns.utils.escapeHtml(principle.detail)}</span>
            </span>
          </label>
        `;
      })
      .join("");
  }

  function renderPedagogyBrief(selectedSlide, principles) {
    const bloomMeta = ns.ui.getBloomMeta(selectedSlide.bloomLevel);
    const activePrinciples = principles.filter((principle) => selectedSlide.principleIds.includes(principle.id));
    const principleMarkup = activePrinciples.length
      ? activePrinciples
          .map((principle) => `<span class="principle-chip">${ns.utils.escapeHtml(principle.title)}</span>`)
          .join("")
      : '<span class="principle-chip">Aucun principe actif</span>';

    return `
      <div class="pedagogy-heading">
        <span class="slide-meta-chip">${ns.utils.escapeHtml(bloomMeta.title)}</span>
        ${principleMarkup}
      </div>
      <div class="pedagogy-grid">
        <div class="pedagogy-box">
          <h4>Objectif</h4>
          <p class="pedagogy-line">${ns.utils.escapeHtml(selectedSlide.objective || "À compléter")}</p>
        </div>
        <div class="pedagogy-box">
          <h4>Trace attendue</h4>
          <p class="pedagogy-line">${ns.utils.escapeHtml(selectedSlide.evidence || "À compléter")}</p>
        </div>
      </div>
    `;
  }

  function renderThumbStrip(state, activeId) {
    return state.slides
      .map((slide, index) => {
        const activeClass = slide.id === activeId ? " is-active" : "";
        return `
          <article
            class="thumb-card${activeClass}"
            data-select-slide="${ns.utils.escapeHtml(slide.id)}"
            data-thumb-slide="${ns.utils.escapeHtml(slide.id)}"
            data-thumb-index="${index}"
            draggable="true"
          >
            <div class="thumb-card-actions">
              <button
                class="icon-button icon-button-danger"
                type="button"
                data-delete-slide="${ns.utils.escapeHtml(slide.id)}"
                aria-label="Supprimer la slide ${ns.utils.escapeHtml(slide.number || String(index + 1).padStart(2, "0"))}"
              >
                x
              </button>
            </div>
            ${ns.ui.createSlideMarkup(slide, state.settings, {
              compact: true,
              mediaItems: state.mediaLibrary,
              mediaUrls: ns.services.media.getUrlMap(),
            })}
            <p class="thumb-caption">${ns.utils.escapeHtml(slide.number)} - ${ns.utils.escapeHtml(slide.label)}</p>
          </article>
        `;
      })
      .join("");
  }

  function getVisualMediaSelectionText(selectedSlide, mediaItems) {
    const visualData = selectedSlide.visualData || {};
    const selectedNames = [visualData.primaryMediaId, visualData.secondaryMediaId]
      .filter(Boolean)
      .map((mediaId) => (mediaItems || []).find((item) => item.id === mediaId))
      .filter(Boolean)
      .map((item) => item.name);

    if (!selectedNames.length) {
      return "Aucun média visuel sélectionné. Importez puis assignez une image principale et secondaire.";
    }

    return `${selectedNames.length} média(x) dans la composition visuelle : ${selectedNames.join(" / ")}`;
  }

  function getCanvasData(slide) {
    const raw = slide && slide.canvasData && typeof slide.canvasData === "object" ? slide.canvasData : {};
    return {
      elements: Array.isArray(raw.elements) ? raw.elements : [],
    };
  }

  function getSelectedCanvasElement(canvasData, selectedId) {
    const elements = canvasData && Array.isArray(canvasData.elements) ? canvasData.elements : [];
    return elements.find((item) => item.id === selectedId) || null;
  }

  function getCanvasMediaSelectionText(canvasData, mediaItems) {
    const mediaIds = Array.from(new Set(
      ((canvasData && canvasData.elements) || [])
        .filter((item) => item && item.type === "image" && item.mediaId)
        .map((item) => item.mediaId)
    ));
    const names = mediaIds
      .map((mediaId) => (mediaItems || []).find((item) => item.id === mediaId))
      .filter(Boolean)
      .map((item) => item.name);

    if (!names.length) {
      return "Aucune image posée sur le canvas. Cliquez un média pour l'ajouter, ou pour remplacer l'image sélectionnée.";
    }

    return `${names.length} média(x) sur le canvas : ${names.join(" / ")}`;
  }

  function getCanvasElementLabel(element) {
    if (!element) {
      return "Élément";
    }
    if (element.type === "image") {
      return "Image";
    }
    if (element.type === "arrow") {
      return "Flèche";
    }
    return "Texte";
  }

  function formatCanvasMetric(value) {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric.toFixed(1).replace(/\.0$/, "") : "0";
  }

  function renderCanvasElementsList(canvasData, activeId) {
    const elements = canvasData && Array.isArray(canvasData.elements) ? canvasData.elements : [];
    if (!elements.length) {
      return '<p class="extra-bullets-empty">Aucun élément sur le canvas.</p>';
    }

    return elements
      .map((element, index) => {
        const activeClass = element.id === activeId ? " is-active" : "";
        return `
          <button class="canvas-element-chip${activeClass}" type="button" data-select-canvas-element="${ns.utils.escapeHtml(element.id)}">
            <span class="canvas-element-chip-index">${index + 1}</span>
            <span class="canvas-element-chip-label">${ns.utils.escapeHtml(getCanvasElementLabel(element))}</span>
          </button>
        `;
      })
      .join("");
  }

  function renderVisualMediaOptions(mediaItems, placeholder) {
    return [
      `<option value="">${ns.utils.escapeHtml(placeholder)}</option>`,
      ...(mediaItems || []).map((item) => {
        const kindLabel = item.kind === "embed" ? "Embed" : item.kind === "video" ? "Vidéo" : "Image";
        return `<option value="${ns.utils.escapeHtml(item.id)}">${ns.utils.escapeHtml(kindLabel)} - ${ns.utils.escapeHtml(item.name)}</option>`;
      }),
    ].join("");
  }

  function renderPresentationProgress(state, activeId) {
    return state.slides
      .map((slide, index) => {
        const isActive = slide.id === activeId;
        const activeClass = isActive ? " is-active" : "";
        const slideNumber = slide.number || String(index + 1).padStart(2, "0");
        const slideTitle = slide.title || `Slide ${slideNumber}`;
        return `
          <button
            class="presentation-progress-step${activeClass}"
            type="button"
            data-select-slide="${ns.utils.escapeHtml(slide.id)}"
            aria-label="Aller à la slide ${ns.utils.escapeHtml(slideNumber)} : ${ns.utils.escapeHtml(slideTitle)}"
            ${isActive ? 'aria-current="step"' : ""}
            title="${ns.utils.escapeHtml(slideNumber)} - ${ns.utils.escapeHtml(slideTitle)}"
          >
            <span class="presentation-progress-dot"></span>
          </button>
        `;
      })
      .join("");
  }

  function renderMediaLibrary(mediaItems, selectedSlide) {
    if (!mediaItems || mediaItems.length === 0) {
      return '<p class="media-empty">Importez une image ou une vidéo pour commencer.</p>';
    }

    const mediaUrls = ns.services.media.getUrlMap();
    const isFreeMode = (selectedSlide.contentType || "bullets") === "free";
    const isVisualMode = (selectedSlide.contentType || "bullets") === "visual";
    const isCanvasMode = (selectedSlide.contentType || "bullets") === "canvas";
    const freeMediaIds = Array.isArray(selectedSlide.freeMediaIds) ? selectedSlide.freeMediaIds : [];
    const visualMediaIds = selectedSlide.visualData
      ? [selectedSlide.visualData.primaryMediaId, selectedSlide.visualData.secondaryMediaId].filter(Boolean)
      : [];
    const canvasMediaIds = selectedSlide.canvasData && Array.isArray(selectedSlide.canvasData.elements)
      ? selectedSlide.canvasData.elements.filter((item) => item.type === "image" && item.mediaId).map((item) => item.mediaId)
      : [];

    return mediaItems
      .map((item) => {
        const bulletMediaIds = [selectedSlide.mediaId, selectedSlide.secondaryMediaId].filter(Boolean);
        const activeClass = isVisualMode
          ? (visualMediaIds.includes(item.id) ? " is-active" : "")
          : isCanvasMode
            ? (canvasMediaIds.includes(item.id) ? " is-active" : "")
          : isFreeMode
            ? (freeMediaIds.includes(item.id) ? " is-active" : "")
            : (bulletMediaIds.includes(item.id) ? " is-active" : "");
        const preview = item.kind === "video"
          ? `<video class="media-thumb-preview" src="${ns.utils.escapeHtml(mediaUrls[item.id] || "")}" muted preload="metadata"></video>`
          : `<img class="media-thumb-preview" src="${ns.utils.escapeHtml(mediaUrls[item.id] || "")}" alt="${ns.utils.escapeHtml(item.name)}" />`;
        const typeLabel = item.kind === "embed" ? "Embed YouTube" : item.kind === "video" ? "Vidéo" : "Image";
        const actionAttr = isCanvasMode
          ? `data-add-canvas-media="${ns.utils.escapeHtml(item.id)}"`
          : isFreeMode
            ? `data-toggle-free-media="${ns.utils.escapeHtml(item.id)}"`
            : `data-assign-media="${ns.utils.escapeHtml(item.id)}"`;

        return `
          <article class="media-card${activeClass}">
            <button class="media-card-select" type="button" ${actionAttr}>
              <span class="media-thumb">${preview}</span>
              <span class="media-meta">
                <span class="media-title">${ns.utils.escapeHtml(item.name)}</span>
                <span class="media-subline">${ns.utils.escapeHtml(typeLabel)}</span>
              </span>
            </button>
            <button
              class="icon-button icon-button-danger"
              type="button"
              data-delete-media="${ns.utils.escapeHtml(item.id)}"
              aria-label="Supprimer le media ${ns.utils.escapeHtml(item.name)}"
            >
              x
            </button>
          </article>
        `;
      })
      .join("");
  }

  function renderFreeLinks(selectedSlide) {
    const freeLinks = Array.isArray(selectedSlide.freeLinks) ? selectedSlide.freeLinks : [];
    if (freeLinks.length === 0) {
      return '<p class="extra-bullets-empty">Aucun lien ajouté.</p>';
    }

    return freeLinks
      .map((item, index) => `
        <div class="free-link-row bullet-editor-row" data-free-link-row="${index}">
          <button
            class="bullet-drag-handle"
            type="button"
            draggable="true"
            data-free-link-drag-handle="${index}"
            aria-label="Glisser le lien ${index + 1}"
            title="Glisser pour réordonner"
          >
            ::
          </button>
          <div class="free-link-meta">
            <input
              type="text"
              maxlength="80"
              value="${ns.utils.escapeHtml(item.label || "")}"
              data-free-link-label="${index}"
              placeholder="Libellé du lien"
            />
            <input
              type="url"
              maxlength="500"
              value="${ns.utils.escapeHtml(item.url || "")}"
              data-free-link-url="${index}"
              placeholder="https://..."
            />
          </div>
          <button class="icon-button icon-button-danger" type="button" data-remove-free-link="${index}" aria-label="Supprimer le lien ${index + 1}">
            x
          </button>
        </div>
      `)
      .join("");
  }

  function renderSubBulletEditor(selectedSlide, bulletIndex) {
    const subBullets = selectedSlide.subBullets && Array.isArray(selectedSlide.subBullets[bulletIndex])
      ? selectedSlide.subBullets[bulletIndex]
      : [];

    return `
      <div class="sub-bullets-panel">
        <div class="sub-bullets-header">
          <span>Sous-points</span>
          <button class="button button-ghost" type="button" data-add-sub-bullet="${bulletIndex}">Ajouter</button>
        </div>
        <div class="sub-bullets-list">
          ${subBullets.length
            ? subBullets.map((item, subIndex) => `
              <div class="sub-bullet-row">
                <input
                  type="text"
                  maxlength="320"
                  value="${ns.utils.escapeHtml(item || "")}"
                  data-sub-bullet-parent="${bulletIndex}"
                  data-sub-bullet-index="${subIndex}"
                  placeholder="Sous-point ${subIndex + 1}"
                />
                <button class="icon-button icon-button-danger" type="button" data-remove-sub-bullet="${bulletIndex}-${subIndex}" aria-label="Supprimer le sous-point ${subIndex + 1}">
                  x
                </button>
              </div>
            `).join("")
            : '<p class="extra-bullets-empty">Aucun sous-point.</p>'}
        </div>
      </div>
    `;
  }

  function renderExtraBullets(selectedSlide) {
    const extraBullets = (selectedSlide.bullets || []).slice(3);
    if (extraBullets.length === 0) {
      return '<p class="extra-bullets-empty">Aucun point supplémentaire.</p>';
    }

    return extraBullets
      .map((bullet, index) => {
        const actualIndex = index + 3;
        return `
          <div class="extra-bullet-row bullet-editor-row" data-bullet-row="${actualIndex}">
            <button
              class="bullet-drag-handle"
              type="button"
              draggable="true"
              data-bullet-drag-handle="${actualIndex}"
              aria-label="Glisser le point ${actualIndex + 1}"
              title="Glisser pour réordonner"
            >
              ::
            </button>
            <input
              type="text"
              maxlength="220"
              value="${ns.utils.escapeHtml(bullet || "")}"
              data-extra-bullet-index="${actualIndex}"
              placeholder="Point ${actualIndex + 1}"
            />
            <button
              class="icon-button icon-button-danger"
              type="button"
              data-remove-bullet="${actualIndex}"
              aria-label="Supprimer le point ${actualIndex + 1}"
            >
              x
            </button>
            <div class="extra-bullet-subpoints">
              ${renderSubBulletEditor(selectedSlide, actualIndex)}
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderTableEditor(selectedSlide) {
    const table = normalizeTable(selectedSlide.table);
    const highlights = selectedSlide.tableHighlights || {};
    const rows = table
      .map((row, rowIndex) => {
        return row.map((cell, columnIndex) => {
          const headerClass = rowIndex === 0 || columnIndex === 0 ? " is-header" : "";
          const fillStyle = getTableCellFillStyle(highlights, rowIndex, columnIndex);
          return `
            <input
              class="table-editor-cell${headerClass}"
              type="text"
              maxlength="120"
              value="${ns.utils.escapeHtml(cell || "")}"
              data-table-cell="${rowIndex}-${columnIndex}"
              placeholder="Cellule"
              style="${fillStyle}"
            />
          `;
        }).join("");
      })
      .join("");

    return `
      <div
        class="table-editor-matrix"
        style="grid-template-columns: repeat(${table[0].length}, minmax(0, 1fr));"
      >
        ${rows}
      </div>
    `;
  }

  function renderVisualChartEditor(visualData) {
    const chartBarCount = Math.max(1, Math.min(6, Number(visualData.chartBarCount) || 3));
    const chartBars = Array.isArray(visualData.chartBars) ? visualData.chartBars.slice(0, chartBarCount) : [];
    return chartBars.map((bar, index) => `
      <div class="visual-chart-bar-row bullet-editor-row" data-visual-chart-row="${index}">
        <button
          class="bullet-drag-handle"
          type="button"
          draggable="true"
          data-visual-chart-drag-handle="${index}"
          aria-label="Glisser l'indicateur ${index + 1}"
          title="Glisser pour réordonner"
        >
          ::
        </button>
        <input
          type="text"
          maxlength="18"
          value="${ns.utils.escapeHtml((bar && bar.label) || "")}"
          data-visual-chart-field="label"
          data-visual-chart-index="${index}"
          placeholder="Libellé ${index + 1}"
        />
        <input
          type="number"
          min="0"
          max="100"
          step="1"
          value="${ns.utils.escapeHtml(String((bar && bar.value) ?? 0))}"
          data-visual-chart-field="value"
          data-visual-chart-index="${index}"
          placeholder="0-100"
        />
        <input
          type="color"
          value="${ns.utils.escapeHtml((bar && bar.color) || "#60b2e5")}"
          data-visual-chart-field="color"
          data-visual-chart-index="${index}"
          aria-label="Couleur de l'indicateur ${index + 1}"
        />
        <button
          class="icon-button icon-button-danger"
          type="button"
          data-remove-visual-chart-bar="${index}"
          aria-label="Supprimer l'indicateur ${index + 1}"
        >
          x
        </button>
      </div>
    `).join("");
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

  function renderTableFillIndexOptions(selectedSlide, target) {
    const table = normalizeTable(selectedSlide.table);
    const count = target === "column"
      ? (table[0] ? table[0].length : 0)
      : table.length;

    return Array.from({ length: count }, (unused, index) => {
      const label = target === "column" ? `Colonne ${index + 1}` : `Ligne ${index + 1}`;
      return `<option value="${index}">${ns.utils.escapeHtml(label)}</option>`;
    }).join("");
  }

  function getDefaultTableFillColor(selectedSlide, target, indexValue) {
    const key = target === "column" ? "columns" : "rows";
    const index = Number(indexValue);
    const tableHighlights = selectedSlide.tableHighlights || {};
    const existing = tableHighlights[key] && tableHighlights[key][String(index)];
    return existing || "#dcecff";
  }

  function renderTableFillList(selectedSlide) {
    const tableHighlights = selectedSlide.tableHighlights || {};
    const entries = [
      ...Object.keys(tableHighlights.rows || {}).map((key) => ({
        target: "row",
        index: Number(key),
        color: tableHighlights.rows[key],
      })),
      ...Object.keys(tableHighlights.columns || {}).map((key) => ({
        target: "column",
        index: Number(key),
        color: tableHighlights.columns[key],
      })),
    ].sort((a, b) => {
      if (a.target !== b.target) {
        return a.target.localeCompare(b.target);
      }
      return a.index - b.index;
    });

    if (!entries.length) {
      return '<p class="table-fill-empty">Aucun remplissage actif.</p>';
    }

    return entries.map((entry) => `
      <div class="table-fill-item">
        <span class="table-fill-swatch" style="background:${ns.utils.escapeHtml(entry.color)};"></span>
        <span class="table-fill-label">${entry.target === "column" ? "Colonne" : "Ligne"} ${entry.index + 1}</span>
        <button
          class="icon-button icon-button-danger"
          type="button"
          data-remove-table-fill="${entry.target}-${entry.index}"
          aria-label="Retirer la couleur de ${entry.target === "column" ? "la colonne" : "la ligne"} ${entry.index + 1}"
        >
          x
        </button>
      </div>
    `).join("");
  }

  function getTableCellFillStyle(tableHighlights, rowIndex, columnIndex) {
    const rowColor = tableHighlights && tableHighlights.rows ? tableHighlights.rows[String(rowIndex)] : "";
    const columnColor = tableHighlights && tableHighlights.columns ? tableHighlights.columns[String(columnIndex)] : "";
    const color = rowColor || columnColor;
    return color ? `background:${ns.utils.escapeHtml(color)};` : "";
  }

  ns.ui.renderDashboard = renderDashboard;
})();
