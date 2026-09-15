# MassLabs Website

Türkçe ve İngilizce statik kurumsal site. Node.js 20+ ile çalışır; ek paket, veritabanı veya sunucu API’si gerektirmez.

## Geliştirme

- `npm run dev`: siteyi üretir ve http://127.0.0.1:4173 adresinde açılabilir hâle getirir.
- `npm run build`: 26 yerelleştirilmiş sayfayı ve eski Review AI adreslerinin yönlendirmelerini `public/` altında üretir.
- `npm run check`: bağlantıları ve temel metadata alanlarını denetler.
- `npm run typecheck`: JavaScript sözdizimini denetler.
- `npm run smoke`: örnek sayfaların HTTP yanıtlarını kontrol eder.

Windows PowerShell gerekirse `npm.cmd` kullanabilir.

## İçerik

- `site.config.mjs`: masslabs.tech ana adresi, iletişim ve sosyal bağlantılar.
- `content/site-content.mjs`: Türkçe ve İngilizce içerikler, projeler ve rotalar.
- `scripts/build.mjs`: sayfa şablonları ve HTML üretimi.
- `css/styles.css`: aktif tasarım.
- `js/main.js`: mobil menü ve görünürlük efektleri.

Üretilen HTML yerine bu kaynakları düzenleyin, ardından build çalıştırın.

## İletişim ve projeler

Form yoktur. Proje talepleri sales@masslabs.tech, destek ve gizlilik talepleri support@masslabs.tech, güvenlik bildirimleri security@masslabs.tech adreslerine yönlendirilir. E-posta bağlantıları ziyaretçinin e-posta uygulamasını açar.

Reveram: https://reveram.com
GetClawClaw: https://getclawclaw.tech/

Eski `/tr/projeler/review-ai/` ve `/en/projects/review-ai/` adresleri yeni Reveram sayfalarına yönlendirilir. Araştırmalar sayfası ilk yayınlar için hazırlık durumundadır.

## Vercel

Framework: Other. Build: `npm run build`. Çıktı klasörü: `public`. Ayarlar `vercel.json` içinde tanımlıdır. Site adresi ve e-postalar doğrudan `site.config.mjs` içinde tutulur; ortam değişkeni gerekmez. Analytics entegrasyonu yoktur.

Kökteki `style.css`, `script.js` ve eski yasal HTML dosyaları önceki sürümden kalmıştır; build çıktısına alınmaz. Eski tasarım ayrıca `old-design` branch’indedir.
