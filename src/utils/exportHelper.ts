import { toPng, toBlob } from 'html-to-image';
import html2canvas from 'html2canvas';

/**
 * Pre-processes images to ensure they have crossOrigin and can be exported without tainting canvas
 */
async function prepareImagesForExport(element: HTMLElement) {
  const images = element.querySelectorAll('img');
  const promises: Promise<void>[] = [];

  images.forEach((img) => {
    if (!img.crossOrigin && !img.src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
    }
  });

  return Promise.all(promises);
}

/**
 * Robust PNG generator with multi-engine fallback for GitHub Pages & cross-origin hosting
 */
export async function captureScreenshotPng(element: HTMLElement): Promise<string> {
  await prepareImagesForExport(element);

  // Engine 1: html-to-image with skipFonts (critical for GitHub Pages & CDN fonts)
  try {
    const dataUrl = await toPng(element, {
      skipFonts: true, // Prevents CORS error on Google Fonts in production
      cacheBust: false, // Prevents breaking CDN signed image URLs
      pixelRatio: 2, // Retina 2x crisp output
      filter: (node) => {
        if (node instanceof HTMLElement && node.dataset.noExport) {
          return false;
        }
        return true;
      },
    });

    if (dataUrl && dataUrl.length > 100) {
      return dataUrl;
    }
  } catch (primaryErr) {
    console.warn('html-to-image capture failed, trying html2canvas fallback:', primaryErr);
  }

  // Engine 2: html2canvas fallback (handles CORS images and complex DOM seamlessly)
  try {
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      scale: 2,
      backgroundColor: null,
      logging: false,
      ignoreElements: (node: Element) => {
        return node instanceof HTMLElement && Boolean(node.dataset?.noExport);
      },
    });

    const fallbackUrl = canvas.toDataURL('image/png');
    if (fallbackUrl && fallbackUrl.length > 100) {
      return fallbackUrl;
    }
  } catch (canvasErr) {
    console.error('html2canvas also failed:', canvasErr);
  }

  // Engine 3: html-to-image with lower ratio and basic config
  try {
    return await toPng(element, {
      skipFonts: true,
      cacheBust: false,
      pixelRatio: 1.5,
    });
  } catch (lastErr) {
    throw new Error('Unable to generate screenshot image due to browser cross-origin restrictions.');
  }
}

/**
 * Robust PNG Blob generator for clipboard copy
 */
export async function captureScreenshotBlob(element: HTMLElement): Promise<Blob | null> {
  await prepareImagesForExport(element);

  try {
    const blob = await toBlob(element, {
      skipFonts: true,
      cacheBust: false,
      pixelRatio: 2,
      filter: (node) => {
        if (node instanceof HTMLElement && node.dataset.noExport) {
          return false;
        }
        return true;
      },
    });

    if (blob) return blob;
  } catch (err) {
    console.warn('toBlob failed, generating blob from canvas:', err);
  }

  try {
    const dataUrl = await captureScreenshotPng(element);
    const res = await fetch(dataUrl);
    return await res.blob();
  } catch (err) {
    console.error('Failed to create blob for clipboard:', err);
    return null;
  }
}
