// app/[locale]/layout.js
import "../globals.css";
import { Oswald } from "next/font/google";
import { ThemeProviders } from "../../components/ThemeProvider";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import AuthProvider from "./(auth)/admin/authProvider";
import AdminNavbar from "../../components/AdminNavbar";

const OswaldFont = Oswald({
  weight: ["300", "400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Invent Tree",
  description:
    "Discover Invent-Tree – a leading political, survey, and geospatial consultancy firm.",
};

export default async function LocaleLayout(props) {
   // ❌ Don't use `await` here
  const params = await Promise.resolve(props.params);
  const locale = params.locale;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${OswaldFont.className} antialiased`}>
        <ThemeProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AsyncIntlProvider locale={locale}>
            <AuthProvider>
              <AdminNavbar />
              {props.children}
            </AuthProvider>
          </AsyncIntlProvider>
        </ThemeProviders>
      </body>
    </html>
  );
}

async function AsyncIntlProvider({ children, locale }) {
  let messages;

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
    console.log(`[i18n] Loaded messages for locale: ${locale}`);
  } catch (err) {
    console.error(`Missing messages for locale: ${locale}`);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
