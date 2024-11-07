import type { FC } from "react";
import NavBar from "@/src/components/Container/NavBar";
import style from "./layouts.module.css";
import PDFViewer from "@/src/components/Common/PDFViewer";

const AboutLayout: FC = () => {
  const url = "/fang_xie_CV_new_en.pdf";
  return (
    <>
      <NavBar />
      <div className={style.aboutLayout}>
        <PDFViewer pdfUrl={url}></PDFViewer>
        <a className={style.downloadLink} href="/fang_xie_CV_new_en.pdf" download>
          Download PDF
        </a>
      </div>
    </>
  );
};

export default AboutLayout;
