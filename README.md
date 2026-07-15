# BeachfrontGrado Renderer

Playwright Renderer für BeachfrontGrado.

## Endpoints

### Health

GET

```
/health
```

Antwort

```json
{
  "status": "ok",
  "service": "bfg-renderer"
}
```

---

### Render

GET

```
/render?url=https://beachfrontgrado.com
```

Gibt das vollständig gerenderte HTML zurück.

---

## Lokaler Start

```bash
npm install
npm start
```

---

## Deployment

Dieses Projekt ist für Railway vorgesehen.

Nach dem Deployment:

```
https://YOUR-APP.up.railway.app
```

Healthcheck:

```
https://YOUR-APP.up.railway.app/health
```

Render:

```
https://YOUR-APP.up.railway.app/render?url=https://beachfrontgrado.com
```

---

## Verwendung in Supabase

In der Edge Function:

```ts
const response = await fetch(
  `${Deno.env.get("RENDERER_URL")}/render?url=${encodeURIComponent(url)}`
);

const html = await response.text();
```
