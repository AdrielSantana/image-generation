export * from "./metadata";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import MakeGeneralLayout from "@/factories/layouts/MakeGeneralLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers>
          <MakeGeneralLayout>{children}</MakeGeneralLayout>
        </Providers>
      </body>
    </html>
  );
}
