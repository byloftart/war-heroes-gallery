# Müharibə Qəhrəmanları Qalereyası

Mobil cihazlar üçün sadə fotoqalereya prototipi.

Fokus:
- rahat mobil baxış
- yeni şəkilləri tez əlavə etmək
- ad üzrə axtarış

## Texnologiyalar
- React + TypeScript + Vite
- Tailwind CSS

## Başlatma

```bash
pnpm install
pnpm data:build
pnpm dev
```

## Məlumat strukturu

- `content/photos/` — mənbə şəkillər
- `content/names.csv` — `filename,name`
- `client/src/data/heroes.json` — tətbiqin oxuduğu yekun data
- `client/public/photos/` — tətbiqdə göstərilən şəkillər

## Yeni şəkil əlavə etmək

1. Şəkli `content/photos/` qovluğuna qoyun.
2. `content/names.csv` faylına yeni sətr əlavə edin:

```csv
filename,name
example.jpg,Ad Soyad
```

3. Komandaları işə salın:

```bash
pnpm data:check
pnpm data:build
```

4. Lokal yoxlayın:

```bash
pnpm dev
```

## Faydalı komandalar

```bash
pnpm data:check   # CSV və faylları yoxlayır
pnpm data:build   # heroes.json yaradır və şəkilləri public qovluğa kopyalayır
pnpm check        # TypeScript yoxlaması
pnpm build        # Production build
```
