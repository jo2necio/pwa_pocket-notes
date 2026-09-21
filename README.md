# Pocket Notes — iPhone PWA example

This tiny Progressive Web App saves notes on the device and keeps working offline after its first successful load.

## Files

- `index.html` — app screen
- `styles.css` — responsive iPhone-friendly design
- `app.js` — notes and local storage
- `service-worker.js` — offline cache
- `manifest.webmanifest` — install information
- `icons/` — Home Screen icons

## Fastest test from Windows 10 to iPhone 8

The final phone test must use **HTTPS**. Upload the contents of this folder to GitHub Pages, Netlify, Cloudflare Pages, or another static host. Opening an ordinary `http://192.168.x.x` address from your laptop can display the page, but iOS will not treat that LAN page as a fully installable/offline PWA because it is not a secure context.

### Simple GitHub Pages route

1. Create a new public GitHub repository, for example `pocket-notes-pwa`.
2. Upload all files and folders from this project. Keep `index.html` in the repository root.
3. Open the repository's **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch **main**, folder **/(root)**, then save.
6. Wait for the HTTPS Pages address, then open that address in Safari on the iPhone.
7. In Safari, tap **Share → Add to Home Screen → Add**.
8. Open **Pocket Notes** from the Home Screen, add a note, close it, then reopen it.
9. Turn on Airplane Mode and reopen the app to verify offline use.

## Quick laptop-only check

From this folder in Command Prompt:

```bat
py -m http.server 8080
```

Then open `http://localhost:8080` on the laptop. This checks the interface, storage, manifest, and service worker locally. Use the HTTPS deployment above for the iPhone installation test.

## When changing the app

Change `pocket-notes-v1` in both `app.js` (storage only if you intentionally want new storage) and `service-worker.js` (cache name) as appropriate. For ordinary code updates, increment the cache name in `service-worker.js`, such as `pocket-notes-v2`, so installed copies refresh cleanly.
