import "~/styles/globals.css";

import { ModalProvider } from "~/components/providers/modal-provider";
import Footer from "~/components/shared/Footer";
import NavBar from "~/components/shared/NavBar";
import { Toaster } from "~/components/ui/toaster";

export const metadata = {
    title: "Create T3 App",
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <ModalProvider />
            <Toaster />
            <NavBar />

            <main className="flex min-h-screen flex-col items-center justify-center bg-pattern bg-cover bg-fixed dark:bg-pattern-dark">
                {children}
            </main>

            <Footer />
        </section>
    );
}
