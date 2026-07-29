# MassLabs Website

MassLabs’ın Türkçe ve İngilizce kurumsal web sitesi. Proje; yapay zekâ, otomasyon, özel yazılım, SaaS ve Ar-Ge yetkinliklerini tanıtan, Vercel ücretsiz planıyla uyumlu statik sayfalar üretir.

## Teknoloji ve Yerel Kurulum

- Node.js 20 veya üzeri
- Bağımlılıksız statik HTML üreticisi
- Vanilla CSS ve JavaScript
- /tr/ ve /en/ altında SEO uyumlu sayfalar
- Veritabanı veya sürekli çalışan sunucu gerektirmez

Repository klasöründe:

    npm run dev

PowerShell script politikası npm komutunu engellerse:

    npm.cmd run dev

Ardından http://127.0.0.1:4173 adresini açın. Yalnızca yeniden üretmek için npm run build, kontroller için npm run check kullanın.

## İçerik Yönetimi

Temel marka, iletişim, kurucu, sosyal medya, yasal ve proje URL bilgileri site.config.mjs içinde tutulur. Türkçe/İngilizce metinler, hizmetler, projeler, süreç ve SSS içerikleri content/site-content.mjs içindedir. Değişikliklerden sonra npm run build çalıştırılmalıdır.

Aktif logo dosyası:

    assets/masslabs-logo-chatgpt.png

Yeni proje eklemek için projects.tr ve projects.en dizilerine aynı slug değerine sahip kayıt ekleyin. Gerekliyse siteConfig.projectLinks içine dış bağlantı tanımlayın ve üreticideki bağlantı eşlemesini genişletin.

Araştırma sayfası ilk sürümde doğrulanmamış demo yazılar yerine dürüst bir boş durum gösterir. Yeni yazılar daha sonra merkezi JSON, Markdown veya MDX yapısıyla eklenebilir.

## Yayından Önce Doldurulacak Alanlar

- contactEmail
- founders içindeki tam adlar ve biyografiler
- projectLinks.pma ve projectLinks.reviewAi
- socialLinks
- legal.companyName, legal.address ve legal.dataControllerName
- archivedProjectName yazımı

Boş sosyal medya veya proje URL’leri kırık bağlantı oluşturmaz. Eksik proje URL’sinde “Yakında” etiketi gösterilir.

Yasal sayfalardaki metinler başlangıç şablonudur ve hukuki danışmanlık yerine geçmez. Yayından önce hukuk uzmanı tarafından şirket bilgileriyle birlikte gözden geçirilmelidir.

## İletişim Formu

Form alan bazlı doğrulama ve honeypot kontrolü uygular. İlk sürümde veriler sunucuda saklanmaz; başarılı doğrulamadan sonra ziyaretçinin e-posta uygulamasında yapılandırılmış bir mesaj hazırlar.

Doğrudan sunucu üzerinden gönderim istenirse js/main.js içindeki adaptör Vercel serverless route veya tercih edilen e-posta sağlayıcısıyla değiştirilebilir. Gizli anahtarlar frontend koduna eklenmemelidir.

## Environment Variables

.env.example içeriği:

    NEXT_PUBLIC_SITE_URL=https://masslabs.info
    CONTACT_EMAIL=info@masslabs.info
    NEXT_PUBLIC_GA_ID=

NEXT_PUBLIC_SITE_URL canonical ve sitemap adresini, CONTACT_EMAIL iletişim noktalarını build sırasında değiştirir. Analytics ID boşken hiçbir takip scripti yüklenmez.

## Vercel Deployment

1. GitHub repository’sini Vercel’e bağlayın.
2. Framework Preset olarak Other seçin.
3. Build Command alanına npm run build yazın.
4. Output Directory alanını . olarak ayarlayın.
5. Node.js sürümünü 20 veya üzeri seçin.
6. Environment variable değerlerini Production ortamına ekleyin.
7. Deploy işlemini başlatın.

vercel.json güvenlik başlıklarını ve temiz URL davranışını tanımlar. Build; sitemap.xml, robots.txt, 404 sayfası ve tüm yerelleştirilmiş HTML dosyalarını üretir.

## Kalite Kontrolleri

    npm run build
    npm run typecheck
    npm run lint

Check/lint komutu 26 rotada metadata, hreflang, ana landmark, görünür placeholder ve eksik iç bağlantı kontrollerini yapar.
