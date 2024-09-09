// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Gateway - AisBoost</title>
          <meta name="admaven-placement" content="BrHw4rHU4" />
          <script
            async
            data-cfasync="false"
            src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1089762"
          />
          <script
            defer
            data-domain="gw.aisboost.com"
            src="https://plaus.aisboost.com/js/script.js"
          />
          {assets}
        </head>
        <body>
          {children}
          {scripts}
        </body>
      </html>
    )}
  />
));
