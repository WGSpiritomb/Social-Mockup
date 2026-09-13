import { domToPng, domToBlob } from 'modern-screenshot';
import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';

const TRANSPARENT_1PX_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAZ';

/**
 * Robust, cross-browser screenshot export engine that never crashes on CORS,
 * font embeds, or modern Tailwind v4 CSS properties.
 */
export async function captureScreenshotPng(element: HTMLElement): Promise<string> {
  // 1. Temporarily neutralize any CSS zoom scale on parents during capture
  let transformParent: HTMLElement | null = null;
  let savedTransform = '';
  let curr: HTMLElement | null = element.parentElement;
  while (curr && curr !== document.body) {
    if (curr.style?.transform && curr.style.transform.includes('scale')) {
      transformParent = curr;
      savedTransform = curr.style.transform;
      curr.style.transform = 'none';
      break;
    }
    curr = curr.parentElement;
  }

  const elementWidth = element.offsetWidth || 385;
  const elementHeight = element.offsetHeight || 780;

  try {
    // Tier 1: modern-screenshot (Handles Tailwind v4, ignores font CORS, uses safe fallback placeholders)
    try {
      const dataUrl = await domToPng(element, {
        scale: 2,
        font: false, // Prevents CORS errors on external Google fonts
        fetch: {
          bypassingCache: false,
          requestInit: {
            mode: 'cors',
            cache: 'force-cache',
          },
          placeholderImage: TRANSPARENT_1PX_PNG,
        },
        filter: (node: Node) => {
          if (node instanceof HTMLElement && node.dataset?.noExport) {
            return false;
          }
          return true;
        },
      });

      if (dataUrl && dataUrl.length > 200) {
        return dataUrl;
      }
    } catch (modernErr) {
      console.warn('modern-screenshot tier 1 failed, trying html-to-image:', modernErr);
    }

    // Tier 2: html-to-image with onImageErrorHandler to avoid {"isTrusted": true} crashes
    try {
      const dataUrl = await toPng(element, {
        skipFonts: true,
        cacheBust: false,
        pixelRatio: 2,
        width: elementWidth,
        height: elementHeight,
        imagePlaceholder: TRANSPARENT_1PX_PNG,
        onImageErrorHandler: () => {
          // Intercept image load errors so it doesn't reject with {"isTrusted": true}
        },
        filter: (node) => {
          if (node instanceof HTMLElement && node.dataset.noExport) {
            return false;
          }
          return true;
        },
      });

      if (dataUrl && dataUrl.length > 200) {
        return dataUrl;
      }
    } catch (htmlToImgErr) {
      console.warn('html-to-image tier 2 failed, trying html2canvas:', htmlToImgErr);
    }

    // Tier 3: html2canvas
    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: false,
        scale: 2,
        backgroundColor: null,
        logging: false,
        width: elementWidth,
        height: elementHeight,
        ignoreElements: (node: Element) => {
          return node instanceof HTMLElement && Boolean(node.dataset?.noExport);
        },
      });

      const fallbackUrl = canvas.toDataURL('image/png');
      if (fallbackUrl && fallbackUrl.length > 200) {
        return fallbackUrl;
      }
    } catch (canvasErr) {
      console.warn('html2canvas tier 3 failed, trying basic domToPng:', canvasErr);
    }

    // Tier 4: Direct scale 1 domToPng
    const finalUrl = await domToPng(element, {
      scale: 1,
      font: false,
    });

    if (finalUrl && finalUrl.length > 200) {
      return finalUrl;
    }

    throw new Error('Screenshot engine returned empty data.');
  } finally {
    // Always restore the transform on the zoom container
    if (transformParent) {
      transformParent.style.transform = savedTransform;
    }
  }
}

/**
 * Robust PNG Blob generator for clipboard copy
 */
export async function captureScreenshotBlob(element: HTMLElement): Promise<Blob | null> {
  // 1. Try domToBlob from modern-screenshot
  try {
    const blob = await domToBlob(element, {
      scale: 2,
      font: false,
      fetch: {
        placeholderImage: TRANSPARENT_1PX_PNG,
      },
      filter: (node: Node) => {
        if (node instanceof HTMLElement && node.dataset?.noExport) {
          return false;
        }
        return true;
      },
    });

    if (blob) return blob;
  } catch (blobErr) {
    console.warn('domToBlob failed, generating blob from PNG dataUrl:', blobErr);
  }

  // 2. Fallback: capture PNG data URL and convert to blob
  try {
    const dataUrl = await captureScreenshotPng(element);
    const res = await fetch(dataUrl);
    return await res.blob();
  } catch (err) {
    console.error('Failed to capture screenshot blob:', err);
    return null;
  }
}
