# Content Workflow (AZ)

Bu prototipdə məlumatlar lokal olaraq idarə olunur.

## 1) Şəkilləri əlavə edin

1. Yeni fotoşəkilləri `content/photos/` qovluğuna yerləşdirin.
2. Dəstəklənən formatlar: `.jpg`, `.jpeg`, `.png`, `.webp`.

## 2) Adları `content/names.csv` faylına yazın

CSV formatı:

```csv
filename,name
example.jpg,Ad Soyad
```

Qaydalar:
- `filename` şəkil faylının tam adı ilə eyni olmalıdır.
- `name` boş ola bilməz.
- Eyni `filename` iki dəfə istifadə olunmamalıdır.

## 3) Məlumatı generasiya edin

```bash
pnpm data:check
pnpm data:build
```

Nəticə:
- `client/src/data/heroes.json` yenilənir.
- Şəkillər `client/public/photos/` qovluğuna kopyalanır.

## 4) Lokal yoxlama

```bash
pnpm dev
```

Axtarış və şəkillərin düzgün görünməsini mobil ölçüdə yoxlayın.

## 5) Build yoxlaması

```bash
pnpm check
pnpm build
```
