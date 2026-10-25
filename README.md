# 💍 Interactive Wedding Invitation | نموذج دعوة زفاف إلكترونية تفاعلية
> **مُقدَّم لتقييم التعاون العملي مع شركة SY Tech**  
> **بواسطة:** أحمد دبيش (Ahmed Dabish) - Full Stack .NET & Angular Developer  
> **التقنيات المستخدمة:** **Angular 18 (Standalone Components, Signals, RxJS)** + **ASP.NET Core 8 Web API** + **Tailwind CSS & Custom Luxury Animations**

---

## 🌟 الفكرة والإبداع في التصميم (Creative Vision & UX)

تم تصميم هذا النموذج ليتجاوز مجرد فكرة "صفحة ويب ثابتة"، حيث يقدم **تجربة تفاعلية سينمائية فاخرة (Luxury Experience)** تحاكي فتح بطاقة دعوة زفاف ملكية حقيقية، مع مزيج متناغم بين الطابع الشرقي العربي الأصيل والتصميم الرقمي العصري.

### ✨ أبرز مميزات وتفاصيل التجربة:
1. **الشاشة الافتتاحية التفاعلية (Interactive Royal Envelope Screen):**
   - تصميم مظروف ملكي ثلاثي الأبعاد مع ختم شمعي ذهبي (Wax Seal).
   - عند الضغط على الختم، يبدأ أنيميشن فتح المظروف بانسيابية، وخروج بطاقة الدعوة مع هطول بتلات الورد والزينة (Flower Petals Animation).
   - إتاحة خيار فتح الدعوة مباشرة مع تشغيل الموسيقى تلقائياً.

2. **مشغل الموسيقى الفاخر (Floating Music Player):**
   - زر عائم أنيق لتشغيل وإيقاف الموسيقى الهادئة المرافقة للدعوة.
   - مؤشر تردد صوتي متحرك (Equalizer Waves) يتفاعل مع حالة التشغيل.
   - موسيقى هادئة مولّدة محلياً بواسطة Web Audio API دون ملفات صوت أو تبعيات خارجية؛ يمكن تشغيلها وإيقافها بسهولة.

3. **البيانات الاحتفالية والأسماء:**
   - خطوط عربية ملكية منسقة (Amiri و Tajawal) مع ترجمة بصرية أنيقة.
   - أبيات شعرية وعبارات ترحيبية مهداة من العائلتين.

4. **العدّ التنازلي التفاعلي اللحظي (Live Precision Countdown):**
   - حساب دقيق بالثواني، الدقائق، الساعات، والأيام حتى لحظة انطلاق الحفل.
   - تصميم بطاقات زجاجية فاخرة (Glassmorphism) مع أرقام متحركة وسلسة.

5. **مكان الحفل والتوجيه الذكي (Venue & Navigation):**
   - عرض اسم القاعة، العنوان بالتفصيل، وتوقيت الحفل.
   - زر تفاعلي ينقلك مباشرة إلى موقع الحفل عبر **Google Maps** بنقرة واحدة.

6. **تأكيد الحضور الذكي عبر واتساب والباك إند (Interactive RSVP System):**
   - نموذج لتأكيد الحضور يطلب (الاسم، رقم الهاتف، عدد المرافقين، ورسالة تهنئة).
   - زر فوري لفتح **WhatsApp** مع رسالة مهيأة مسبقاً ومخصصة باسم الضيف وبيانات حضوره لإرسالها للعروسين مباشرة.
   - يُرسل النموذج بيانات الحضور إلى **ASP.NET Core Web API** ليحفظها في قاعدة SQLite المحلية عند تشغيل الباك إند.

7. **حائط تهاني الضيوف الحي (Live Wishes Wall / Guestbook):**
   - يمكن للمدعوين كتابة تهنئة ومباركة للعروسين وتظهر فوراً على حائط التهاني.
   - استرجاع التهاني لحظياً عبر الـ API.

8. **جدول فقرات الحفل (Event Timeline):**
   - مخطط زمني احترافي يوضح مراحل الحفل: (استقبال الضيوف، عقد القران، الزفة الملكية، العشاء، وفقرة التصوير).

9. **التجاوب والأداء الفائق (Responsive & Performance):**
   - متوافق 100% مع شاشات الهواتف الذكية (iOS & Android) والأجهزة اللوحية والشاشات الكبيرة.
   - تجربة استخدام فائقة السرعة مع تقنيات Angular Standalone الحديثة.

---

## 🏗️ هيكلية المشروع (Project Architecture)

المشروع مبني بأسلوب Clean Architecture و Separation of Concerns:

```text
├── backend/                       # ASP.NET Core 8 Web API
│   ├── Controllers/               # API Controllers (Invitation, RSVP, Wishes)
│   │   ├── InvitationController.cs
│   │   ├── RsvpController.cs
│   │   └── WishesController.cs
│   ├── Models/                    # Data Entities
│   │   ├── InvitationDetails.cs
│   │   ├── RsvpEntry.cs
│   │   ├── GuestWish.cs
│   │   └── TimelineEvent.cs
│   ├── DTOs/                      # Data Transfer Objects & Validation
│   │   ├── RsvpRequestDto.cs
│   │   └── WishRequestDto.cs
│   ├── Services/                  # Business Logic & Repository interfaces
│   │   ├── IWeddingService.cs
│   │   └── WeddingService.cs
│   ├── Data/                      # DbContext & Database Configurations
│   │   └── WeddingDbContext.cs
│   ├── Program.cs                 # App entry point, CORS, DI, Swagger
│   └── appsettings.json
│
└── frontend/                      # Angular 18 Standalone Client
    ├── src/
    │   ├── app/
    │   │   ├── components/        # Isolated Feature Components
    │   │   │   ├── envelope-intro/     # الشاشة الافتتاحية والمظروف التفاعلي
    │   │   │   ├── hero-header/        # أسماء العروسين وتاريخ الحفل
    │   │   │   ├── countdown/          # العداد التنازلي التفاعلي
    │   │   │   ├── venue-location/     # تفاصيل القاعة وزر الخريطة
    │   │   │   ├── timeline/           # جدول فقرات الحفل
    │   │   │   ├── rsvp-section/       # نموذج تأكيد الحضور وزر واتساب
    │   │   │   ├── wishes-guestbook/   # حائط التهاني وسجل الزوار
    │   │   │   └── music-player/       # مشغل الصوت والعناصر العائمة
    │   │   ├── services/          # Services (Http, Audio, Countdown)
    │   │   │   ├── invitation.service.ts
    │   │   │   └── audio.service.ts
    │   │   ├── models/            # TypeScript Interfaces & Types
    │   │   └── app.component.*    # Root Container
    │   ├── styles.css             # Tailwind Directives & Luxury Styling
    │   └── index.html
    ├── angular.json
    └── package.json
```

---

## 🚀 طريقة تشغيل المشروع (How to Run)

### المتطلبات الأساسية (Prerequisites):
- تثبيت **.NET 8 SDK** (أو أحدث).
- تثبيت **Node.js** (الإصدار 18 أو 20+).
- تثبيت **Angular CLI** (اختياري: `npm install -g @angular/cli`).

---

### أولاً: تشغيل الباك إند (.NET Web API)
```bash
# 1. الدخول لمجلد الباك إند
cd backend

# 2. استرجاع الحزم وبناء المشروع
dotnet restore
dotnet build

# 3. تشغيل الـ API
dotnet run
```
- سيعمل الـ API على `http://localhost:5000` (حسب إعدادات التشغيل المرفقة).
- يمكنك تجربة جميع الـ Endpoints عبر **Swagger UI** من خلال فتح المتصفح على:  
  👉 `http://localhost:5000/swagger`

---

### ثانياً: تشغيل الفرونت إند (Angular 18)
```bash
# 1. الدخول لمجلد الفرونت إند في نافذة terminal أخرى
cd frontend

# 2. تثبيت الحزم المطلوبة
npm install

# 3. تشغيل خادم التطوير
npm start
# أو
ng serve
```
- افتح المتصفح على: `http://localhost:4200`
- ستظهر لك الدعوة التفاعلية بكامل مؤثراتها البصرية والصوتية!

---

## 📡 واجهات الـ API المتاحة (API Endpoints)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/invitation` | جلب بيانات الدعوة، أسماء العروسين، الموعد، والقاعة |
| `GET` | `/api/invitation/timeline` | جلب جدول فقرات الحفل الزمني |
| `POST` | `/api/rsvp` | تسجيل تأكيد الحضور وحفظه في قاعدة البيانات |
| `GET` | `/api/wishes` | جلب قائمة تهاني وتبريكات الضيوف |
| `POST` | `/api/wishes` | إضافة تهنئة جديدة تظهر مباشرة على حائط التبريكات |

---

## 💎 معايير الجودة المتبعة (SY Tech Evaluation Criteria)
- **Code Cleanliness:** كود منظم ومقروء مع الالتزام باتفاقيات التسمية الموحدة (Naming Conventions) لـ C# و TypeScript.
- **Modern Angular Features:** استخدام Standalone Components و Signals لإدارة الحالة بكفاءة بدون تعقيد.
- **Dependency Injection & Clean Separation:** فصل طبقات الـ API عبر Services و Interfaces لسهولة الصيانة والتطوير المستقبلي.
- **No Heavy Templates:** تصميم مخصص بالكامل تم بناؤه من الصفر ليعكس لمسة فريدة وغير مكررة.
- **Fault Tolerance:** التطبيق مصمم ليعمل بسلاسة حتى في حال غياب الاتصال بالإنترنت من خلال بيانات Fallback محلية مدمجة.

---
****ملاحظات:** بيانات الدعوة تجريبية. تُخزَّن تأكيدات الحضور والتهاني في SQLite عند تشغيل الـ API. عند تعذّر الاتصال بالباك إند، يعرض Angular بيانات تجريبية للقراءة؛ لا تُحفظ الإرسالات محلياً. الموسيقى نغمة جوّية مولّدة بـ Web Audio وليست ملف أغنية مرخّصاً.

تم إعداد هذا المشروع بكل شغف واحترافية لفريق SY Tech.**
