// file: pages/_document.js
//
// Custom Document docs: https://nextjs.org/docs/advanced-features/custom-document
//

import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/bible.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

//
// end of file: pages/_document.js
