import { ThemeProvider } from "@/src/providers/themeProvider";
import type { FC } from "react";
import "./globals.css";
import { PropsWithChildren } from "react";
import BaseLayout from "@/src/layouts/Base";

const RootLaylout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <BaseLayout>{children}</BaseLayout>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLaylout;
