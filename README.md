<div dir="rtl">

# ⛵ رحلة أبطال الرياضيات

لعبة تفاعلية للأطفال لتعلّم الحساب. يختار الطفل شخصيته، **يامن** أو **يمنى** باللباس الدمشقي التقليدي، ثم يبحر بالسفينة إلى إحدى الجزر ويجيب عن الأسئلة ليجمع النجوم.

[إلعب](https://loai-k.github.io/math-game/)

## المزايا

- **أربع جزر**: الجمع، الطرح، الضرب، القسمة (5 أسئلة لكل جزيرة).
- **تحدي الأبطال**: 8 أسئلة تجمع العمليات الأربع.
- **شخصيتان متحركتان**: تلوّحان، تقفزان فرحاً عند الإجابة الصحيحة وتشجّعان عند الخطأ.
- **رحلة بالسفينة** متحركة إلى الجزيرة المختارة (يمكن تخطّيها بلمسة).
- **رمز QR** داخل اللعبة لفتحها على الجوال، ويعمل بدون إنترنت.
- **موسيقى اختيارية** ومؤثرات صوتية، لكل منهما زر مستقل.
- **تطبيق PWA**: يُثبَّت على الجوال والكمبيوتر ويعمل بدون إنترنت. يظهر شريط «ثبّت اللعبة» بزر واحد، ومع المتصفحات التي لا تدعم التثبيت المباشر (iPhone وiPad وSafari على Mac وFirefox) تظهر خطوات مصوّرة تناسب المتصفح.
- **اختصارات**: اضغط مطولاً على أيقونة اللعبة المثبّتة للدخول مباشرة إلى أي جزيرة.
- حفظ النجوم وأفضل نتيجة لكل جزيرة على الجهاز.

## التشغيل محلياً

اللعبة ملفات ثابتة بلا أي خطوة بناء. شغّل خادماً بسيطاً من مجلد المشروع:

```bash
python3 -m http.server 8000
```

ثم افتح `http://localhost:8000`.

> فتح `index.html` مباشرة من القرص يشغّل اللعبة، لكن التثبيت والعمل بدون إنترنت ورمز QR تحتاج إلى خادم.

## النشر على GitHub Pages

1. ارفع محتويات المجلد إلى مستودع على GitHub (الفرع `main`).
2. من **Settings ← Pages** اختر **GitHub Actions** كمصدر للنشر (مرة واحدة فقط).
3. كل دفع إلى `main` ينشر اللعبة تلقائياً عبر `.github/workflows/pages.yml` على `https://<اسم-المستخدم>.github.io/<اسم-المستودع>/`.

كل المسارات نسبية، فتعمل اللعبة من أي مجلد فرعي بلا تعديل.

**رمز QR**: افتح اللعبة من رابطها العام واضغط زر **QR** في الأعلى، ثم امسح الرمز بكاميرا الجوال.

## عند تعديل اللعبة

تُحمَّل أحدث نسخة من الملفات تلقائياً عند الاتصال بالإنترنت، والنسخة المحفوظة تُستخدم فقط بدون إنترنت. لتغيير الموسيقى استبدل `assets/sound.mp3` ثم أعد تحميل الصفحة.

## الرخصة

الشيفرة مرخّصة برخصة [MIT](LICENSE).

## بنية الملفات

</div>

```
index.html              الصفحة الرئيسية
manifest.webmanifest    إعدادات PWA
sw.js                   Service worker (العمل بدون إنترنت)
assets/
  style.css             التصميم والحركات
  script.js             منطق اللعبة والشخصيات
  qrcode.js             مولّد QR (qrcode-generator, MIT)
  sound.mp3             الموسيقى
  icon.svg, *.png       الأيقونات
  screenshots/          لقطات تظهر في نافذة التثبيت
```

---

# ⛵ Math Heroes Journey

An interactive math game for kids, in Arabic. The player picks a character, **Yamen** or **Yumna**, both in traditional Damascene dress, then sails to an island and answers questions to collect stars.

[Lets Start](https://loai-k.github.io/math-game/)

## Features

- **Four islands**: addition, subtraction, multiplication, division (5 questions each).
- **Heroes' Challenge**: 8 questions mixing all four operations.
- **Two animated characters** that wave, jump for a correct answer and encourage after a wrong one.
- **Animated ship voyage** to the chosen island (tap to skip).
- **Built-in QR code** to open the game on a phone; generated on the device, so it works offline.
- **Optional music** and sound effects, each with its own toggle.
- **PWA**: installable on phones and computers, playable offline. A one-tap "Install" banner appears on the menus; browsers without an install prompt (iPhone/iPad, Safari on Mac, Firefox, in-app browsers) get step-by-step instructions for that browser instead.
- **Shortcuts**: long-press the installed icon to jump straight to any island (`?island=add|sub|mul|div|challenge`).
- Stars and the best result per island are saved on the device.
- Respects the system "reduce motion" setting.

## Run locally

The game is plain static files with no build step. Serve the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

> Opening `index.html` straight from disk runs the game, but installing, offline play and the QR code need a server.

## Deploy to GitHub Pages

1. Push the contents of this folder to a GitHub repository (branch `main`).
2. In **Settings → Pages**, set the source to **GitHub Actions** (one time only).
3. Every push to `main` then deploys the game through `.github/workflows/pages.yml` to `https://<user>.github.io/<repo>/`.

All paths are relative, so the game runs from any subfolder unchanged.

**QR code**: open the game from its public URL, press the **QR** button in the top bar, and scan it with a phone camera.

## When you change the game

The newest files are always loaded when online; the saved copy is only used offline. To change the music, replace `assets/sound.mp3` and reload the page.

## License

The code is released under the [MIT License](LICENSE).

## Credits

- QR generation: [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) by Kazuhiko Arase, MIT license.
- Font: [Baloo Bhaijaan 2](https://fonts.google.com/specimen/Baloo+Bhaijaan+2), SIL Open Font License.
