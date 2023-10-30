import { useEffect, useState } from 'react';

import 'src/styles/fonts.css';
import 'src/styles/base.css';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import Head from 'next/head';
import { ModalsProvider } from '@mantine/modals';
import { logConsoleWarning } from '@utils/functions/consoleWarning';
import SupabaseCTXProvider from 'src/store/SupabaseCTX';
import { QueryCTXProvider } from 'src/store/QueryCTX';
import { AuthCTXProvider } from 'src/store/auth/CTX';
import { GlobalCTXProvider } from 'src/store/ol-global/CTX';

const App = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => logConsoleWarning(), []);

  return (
    <QueryCTXProvider>
      <AuthCTXProvider>
        <SupabaseCTXProvider initialSession={pageProps.initialSession}>
          <GlobalCTXProvider>
            <ColorSchemeProvider colorScheme={'dark'} toggleColorScheme={() => {}}>
              <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                  colorScheme: 'dark',
                  primaryColor: 'blue',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                <ModalsProvider>
                  <Head>
                    <title>Khofly Auth</title>
                    <meta name="description" content="Khofly Tech authentication" />
                    <link rel="icon" href="/favicon.ico" />

                    <link rel="manifest" href="/manifest.json" />
                  </Head>

                  {/* Toast notifications */}
                  <Notifications />

                  {getLayout(<Component {...pageProps} />)}
                </ModalsProvider>
              </MantineProvider>
            </ColorSchemeProvider>
          </GlobalCTXProvider>
        </SupabaseCTXProvider>
      </AuthCTXProvider>
    </QueryCTXProvider>
  );
};

export default App;
