import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: {
    template: "% - eCart store",
        default: "eCart store"
    },
    description: "Online shopping store",
};

const clerkAppearance = {
    variables: {
        colorPrimary: "#7C3AED",
        colorText: "#111827",
        colorBackground: "#FFFFFF",
        colorWarning: "#7C3AED",
        colorAlphaShade: "#FFFFFF",
    },
    elements: {
        card: "shadow-none border-none",
        modal: "shadow-none border-none",
        formButtonPrimary: "bg-violet-600 hover:bg-violet-700 text-white shadow-none rounded-none",
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <ClerkProvider appearance={clerkAppearance}>
            <div className="flex flex-col">
                <Header />
                <main className="flex-1 md:min-h-150 lg:min-h-190">{children}</main>
                <Footer />
            </div>
        </ClerkProvider>
    );
}
