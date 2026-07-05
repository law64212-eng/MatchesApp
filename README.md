# تطبيق نتائج المباريات 📱⚽

تطبيق موبايل (React Native + Expo) يعرض:
- نتائج ومواعيد المباريات (تلقائي عبر API حقيقي)
- القنوات الناقلة وتردداتها (تُجلب تلقائيًا من ملف JSON خارجي تتحكم به أنت)

---

## 1. المتطلبات قبل البدء

- تثبيت [Node.js](https://nodejs.org) (نسخة 18 أو أحدث)
- تثبيت تطبيق **Expo Go** على موبايلك (من Google Play أو App Store) للتجربة السريعة
- حساب مجاني على [football-data.org](https://www.football-data.org/client/register) للحصول على مفتاح API لنتائج المباريات

---

## 2. تثبيت المشروع

```bash
cd MatchesApp
npm install
```

---

## 3. ربط مفتاح API لنتائج المباريات

افتح الملف:
```
src/services/footballApi.js
```
وضع مفتاحك بدل `ضع_مفتاحك_هنا`:
```js
const API_TOKEN = 'مفتاحك_هنا';
```

**رموز الدوريات المتاحة بالباقة المجانية:**
| الرمز | الدوري |
|---|---|
| PD | الدوري الإسباني (لا ليغا) |
| PL | الدوري الإنجليزي |
| BL1 | الدوري الألماني |
| SA | الدوري الإيطالي |
| FL1 | الدوري الفرنسي |
| CL | دوري أبطال أوروبا |
| WC | كأس العالم |

---

## 4. تفعيل التحديث التلقائي لبيانات القنوات والتردد (الجزء المهم)

⚠️ **لا يوجد API عربي رسمي يوفر ترددات القنوات تلقائيًا** — هذي المعلومة تتغيّر باستمرار
وتُجمع يدويًا حتى في المواقع المتخصصة. الحل العملي المطبّق بهذا المشروع:

### الخطوات:
1. أنشئ حساب مجاني على [GitHub](https://github.com) إذا ما عندك
2. روح إلى [gist.github.com](https://gist.github.com)
3. أنشئ ملف جديد باسم `channels.json` وانسخ محتوى ملف `channels.example.json`
   الموجود بهذا المشروع، وعدّل فيه القنوات والترددات الصحيحة (تأكد منها من مصدر رسمي)
4. اضغط **Create public gist**
5. اضغط على زر **Raw** بأعلى الملف، وانسخ الرابط الذي يفتح (سينتهي بـ `/raw/...`)
6. افتح الملف:
   ```
   src/services/channelsService.js
   ```
   وضع الرابط:
   ```js
   const REMOTE_JSON_URL = 'https://gist.githubusercontent.com/.../raw/channels.json';
   ```

**النتيجة:** بعد هذا، أي تحديث تسويه على ملف الـ Gist (تضيف مباراة، تعدّل تردد...)
سينعكس **تلقائيًا** داخل التطبيق مباشرة من دون الحاجة لإعادة بناء أو نشر التطبيق من جديد،
لأنه يسحب أحدث نسخة من الرابط كل مرة يفتح فيها المستخدم تفاصيل المباراة.

### كيف تربط مباراة بقنواتها؟
المفتاح داخل ملف JSON يُبنى من اسمَي الفريقين بالإنجليزية (كما ترجعهم football-data.org)
بصيغة: `الفريق1_الفريق2` بحروف صغيرة وفراغات مستبدلة بـ `_`.
مثال: `Barcelona` و `Real Madrid CF` → `fc_barcelona_real_madrid_cf`

أسهل طريقة تعرف الاسم الدقيق: افتح تفاصيل أي مباراة بالتطبيق وشوف اسم الفريق كما
يظهر بالكونسول (console.log) أو زِد سطر مؤقت لطباعته.

---

## 5. تشغيل التطبيق للتجربة

```bash
npx expo start
```
افتح تطبيق **Expo Go** على موبايلك وامسح رمز QR الذي يظهر.

---

## 6. بناء التطبيق الحقيقي (APK / نشر على المتاجر)

Expo توفر خدمة بناء سحابية مجانية جزئيًا:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android    # لبناء ملف APK/AAB لأندرويد
eas build --platform ios        # لبناء لآيفون (يحتاج حساب Apple Developer)
```

بعد اكتمال البناء، تحصل على رابط تنزيل مباشر لملف APK تقدر تنصبه على أي جهاز أندرويد،
أو رفعه لاحقًا على Google Play / App Store.

---

## هيكلية المشروع

```
MatchesApp/
├── App.js
├── app.json
├── package.json
├── channels.example.json        ← نموذج بيانات القنوات (تنشره على GitHub Gist)
└── src/
    ├── constants/colors.js
    ├── services/
    │   ├── footballApi.js       ← جلب النتائج (football-data.org)
    │   └── channelsService.js   ← جلب القنوات تلقائيًا من رابط خارجي
    ├── data/channelsTemplate.js ← نسخة احتياطية محلية + دالة المطابقة
    ├── components/
    │   ├── MatchCard.js
    │   └── ChannelItem.js
    ├── screens/
    │   ├── MatchesScreen.js
    │   └── MatchDetailScreen.js
    └── navigation/AppNavigator.js
```
