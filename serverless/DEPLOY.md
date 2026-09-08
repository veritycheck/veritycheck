# Deploy the comments worker (optional fallback)

The guestbook already loads comments live in the browser from tikwm, so this
worker is only a fallback for if tikwm ever goes down or blocks a visitor.

1. Open a terminal in the `serverless/` folder.
2. Run:

   ```
   npx wrangler login
   npx wrangler deploy
   ```

3. Wrangler prints a URL like `https://veritycheck-comments.<you>.workers.dev`.
   Paste it into `COMMENT_FEED_URL` at the top of `everyone/index.html`:

   ```js
   const COMMENT_FEED_URL = "https://veritycheck-comments.<you>.workers.dev";
   ```

4. Commit and push. The page then tries: worker -> comments.json.

The worker is locked to @veritycheck video URLs only, caches responses for 30
seconds, and follows TikTok's cursor pagination up to ~1000 comments.
