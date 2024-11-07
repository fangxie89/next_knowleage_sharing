"use client";

import { useEffect, useRef, useState, type FC } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.mjs";
import style from './index.module.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = "/lib/pdfWorker/pdf.worker.min.mjs";

type PDFViewProps = {
  pdfUrl: string;
};
const PDFViewer: FC<PDFViewProps> = ({ pdfUrl }) => {
  const [numberPages, setNumberPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let isRendering = false;

    const loadPDF = async () => {
      const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
      setNumberPages(pdfDoc.numPages);
      renderPage(pdfDoc, currentPage);
    };

    const renderPage = async (pdf: PDFDocumentProxy, pageNumber: number) => {
      if (isRendering) return;
      isRendering = true;

      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const ctx = canvas && canvas.getContext("2d");

      if (ctx) {
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
        }).promise;
      }
      isRendering = false;
    };

    loadPDF();

    return () => {
      isRendering = false;
    }
  }, [pdfUrl, currentPage]);

  const goNext = () => {
    if (currentPage < (numberPages || 0)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={style.pdfContainer}>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className={style.controller}>
        <button className={style.controllerButton} onClick={goPrev} disabled={currentPage === 1}>
          Previous
        </button>
        <button className={style.controllerButton} onClick={goNext} disabled={currentPage === numberPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
