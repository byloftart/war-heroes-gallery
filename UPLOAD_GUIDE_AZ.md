# Müharibə Qəhrəmanları Qalereya — Fotoğrafları Yükləmə Bələdçisi

## 📱 Seçim 1: Fotoğrafları Buluta Yükləyin (Ən Asan)

Bu seçim ən sürətli və ən sadədir. Fotoğraflarınızı bulut xidmətinə yükləyin və sonra URL-ləri istifadə edin.

### Addım 1: Bulut Xidmətini Seçin

**Seçim A: Imgur (Pulsuz, Ən Asan)**
1. [imgur.com](https://imgur.com) saytına keçin
2. "New post" düyməsinə klikləyin
3. Fotoğraflarınızı seçin (bir-bir və ya hamısı birlikdə)
4. Hər bir fotoğraf üçün URL-ni kopyalayın

**Seçim B: Cloudinary (Pulsuz, Daha Güclü)**
1. [cloudinary.com](https://cloudinary.com) saytına keçin
2. Pulsuz hesab yaradın
3. "Upload" bölməsinə keçin
4. Fotoğrafları yükləyin
5. Hər bir fotoğraf üçün URL-ni kopyalayın

**Seçim C: Google Photos (Pulsuz, Ən Sadə)**
1. [photos.google.com](https://photos.google.com) saytına keçin
2. Fotoğrafları yükləyin
3. Hər bir fotoğraf üçün "Paylaş" → "Link əldə edin"

### Addım 2: Fotoğraf Məlumatlarını Hazırlayın

Excel və ya Google Sheets-də bu cədvəli yaradın:

| Ad | Rütbə | Bölmə | Doğum İli | Ölüm İli | Fotoğraf URL | Teqlər |
|---|---|---|---|---|---|---|
| Adı Soyadı | Kapitan | 101st Airborne | 1920 | 1945 | https://imgur.com/... | Airborne,Avropa |
| ... | ... | ... | ... | ... | ... | ... |

---

## 🖥️ Seçim 2: Manus İdarə Panelində Redaktə Edin (Ən Rahat)

Manus-da **Visual Editor** var — siz kodu yazmadan fotoğrafları və məlumatları dəyişə bilərsiniz.

### Addım 1: Manus Panelini Açın

1. Sağ tərəfdə **Management UI** panelini açın
2. **Preview** sekmesini seçin
3. Sağ üstdə **Visual Editor** düyməsinə klikləyin

### Addım 2: Məlumatları Redaktə Edin

Visual Editor-da:
- Hər bir fotoğraf kartını seçə bilərsiniz
- Rəngləri, şriftləri dəyişə bilərsiniz
- Mətn məlumatlarını düzəldə bilərsiniz

---

## 💻 Seçim 3: Kod Redaktəsi (Ən Güclü)

Əgər siz web-developer-sinizsə, kodu birbaşa redaktə edə bilərsiniz.

### Addım 1: Fotoğraf Məlumatlarını Hazırlayın

`client/src/pages/Home.tsx` faylını açın və `SAMPLE_PHOTOS` massivini redaktə edin:

```typescript
const SAMPLE_PHOTOS: HeroPhoto[] = [
  {
    id: '1',
    name: 'Adı Soyadı',
    imageUrl: 'https://imgur.com/YOUR_IMAGE_URL.jpg',
    rank: 'Kapitan',
    unit: '101st Airborne Division',
    birthYear: 1920,
    deathYear: 1945,
    description: 'Qısa təsvir (isteğe bağlı)',
    tags: ['Airborne', 'Avropa'],
  },
  // Daha çox fotoğrafları əlavə edin...
];
```

### Addım 2: Sahəni Doldurun

| Sahə | Məcburi? | Nümunə |
|---|---|---|
| `id` | ✅ Bəli | '1', '2', '3' |
| `name` | ✅ Bəli | 'Adı Soyadı' |
| `imageUrl` | ✅ Bəli | 'https://imgur.com/abc123.jpg' |
| `rank` | ❌ Xeyr | 'Kapitan', 'Leytenant' |
| `unit` | ❌ Xeyr | '101st Airborne Division' |
| `birthYear` | ❌ Xeyr | 1920 |
| `deathYear` | ❌ Xeyr | 1945 |
| `description` | ❌ Xeyr | 'Qısa məlumat' |
| `tags` | ❌ Xeyr | ['Airborne', 'Avropa'] |

### Addım 3: Dəyişiklikləri Yadda Saxlayın

Faylı yadda saxladıqdan sonra, Manus avtomatik olaraq yenidən qurulacaq və dəyişikliklər görünəcəkdir.

---

## 🎯 Tez Başlamaq (5 Dəqiqə)

**Ən Sürətli Yol:**

1. Fotoğraflarınızı Imgur-a yükləyin (2 dəq)
2. URL-ləri kopyalayın
3. Manus-da **Code** panelini açın
4. `client/src/pages/Home.tsx` faylını redaktə edin
5. `SAMPLE_PHOTOS` massivini doldurun
6. Yadda saxlayın — bitdi! ✅

---

## 📸 Fotoğraf URL-lərini Necə Almaq

### Imgur-dan:
1. Fotoğraf yükləyin
2. Sağ klikləyin → "Copy image link"
3. URL-ni istifadə edin: `https://i.imgur.com/xxxxx.jpg`

### Cloudinary-dən:
1. Fotoğraf yükləyin
2. "Copy URL" düyməsinə klikləyin
3. URL-ni istifadə edin

### Google Photos-dan:
1. Fotoğraf üzərində sağ klik
2. "Paylaş" → "Link əldə edin"
3. URL-ni istifadə edin

---

## ✅ Yoxlama Siyahısı

- [ ] Fotoğrafları buluta yüklədiniz
- [ ] URL-ləri kopyaladınız
- [ ] Fotoğraf məlumatlarını hazırladınız (ad, rütbə, il)
- [ ] Home.tsx faylını redaktə etdiniz
- [ ] Dəyişiklikləri yadda saxladınız
- [ ] Saytda fotoğraflar görünür

---

## 🆘 Problemlər

**Sual: Fotoğraflar yüklənmədi**
- Cavab: URL-nin düzgün olduğunu yoxlayın. Imgur-dan `.jpg` ilə bitən URL istifadə edin.

**Sual: Mətn əvəzlənmədi**
- Cavab: Faylı yadda saxladıqdan sonra səhifəni yenilə (F5 və ya Cmd+R)

**Sual: Fotoğraf çox böyükdür**
- Cavab: Fotoğrafı 400x400px ölçüsünə dəyişin. Imgur avtomatik olaraq ölçü dəyişir.

---

## 💡 İpuçları

1. **Fotoğraf Ölçüsü:** 400x400px (kvadrat) ideal ölçüdür
2. **Format:** JPG və ya WebP istifadə edin
3. **Sıra:** Fotoğrafları əlavə etdiyiniz sırada görünəcəkdir
4. **Axtarış:** Adı, rütbəsi və ya bölməsi ilə axtarış işləyir

---

**Hər hansı sual varsa, məni soruşun! 😊**
