// Data នៃផលិតផលឌីជីថលទាញយករូបភាពពី folder images/ (គ្មានតម្លៃ - សាកសួរតម្លៃតាម Telegram)
const productsData = [
  {
    id: "yt-premium",
    title: "YouTube Premium (2025)",
    titleKh: "YouTube Premium (កំណែ ២០២៥)",
    category: "entertainment",
    categoryKh: "កម្សាន្ត",
    badge: "TOP SELLER",
    image: "images/ChatGPT Image Jun 8, 2026, 05_02_56 PM (2).png",
    rating: 4.9,
    reviewsCount: 328,
    tags: ["No Ads", "Background Play", "4K Ultra HD", "Multi-Devices"],
    description: "មើលវីដេអូ YouTube គ្មានពាណិជ្ជកម្មរំខាន អាចចាក់វីដេអូពេលចាក់សោរអេក្រង់ (Background Play) ទាញយកវីដេអូមើលក្រៅបណ្តាញ និងរួមបញ្ចូល YouTube Music Premium ដោយឥតគិតថ្លៃ។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "មើល Video ដោយគ្មានពាណិជ្ជកម្ម 100% NO ADS",
      "ចាក់វីដេអូ ឬចម្រៀងក្នុង Background ពេលបិទអេក្រង់",
      "ទាញយកវីដេអូមើល Offline គុណភាពខ្ពស់ 4K/Full HD",
      "ប្រើបានគ្រប់ Devices: iOS, Android, PC, Mac, Smart TV",
      "Upgrade លើ Email ផ្ទាល់ខ្លួន មិនបាត់ Playlist"
    ],
    warranty: "ធានាពេញមួយរយៈពេលប្រើប្រាស់ (100% Full Warranty)"
  },
  {
    id: "netflix-4k",
    title: "Netflix 4K Ultra HD Premium",
    titleKh: "Netflix 4K Ultra HD Premium",
    category: "entertainment",
    categoryKh: "កម្សាន្ត",
    badge: "POPULAR",
    image: "images/ChatGPT Image Jun 8, 2026, 04_30_16 PM (2).png",
    rating: 5.0,
    reviewsCount: 512,
    tags: ["4K HDR", "Stable Account", "No Logout", "All Devices"],
    description: "ទស្សនាភាពយន្ត និងរឿងភាគល្បីៗលើ Netflix កម្រិតរូបភាពច្បាស់បំផុត 4K Ultra HD + HDR គណនីមានស្ថេរភាពខ្ពស់ មិនងាយ Logout ឬ screen limit។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៣ ខែ (3 Months)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "កម្រិតរូបភាព 4K Ultra HD & HDR",
      "គណនី Stable 100% មិនបាច់ប្តូរ Account រាល់ថ្ងៃ",
      "គ្មានបញ្ហាជាប់ Screen Limit",
      "មាន Profile ផ្ទាល់ខ្លួន ជាមួយលេខកូដសម្ងាត់ PIN",
      "ប្រើប្រាស់បានលើទូរស័ព្ទ កុំព្យូទ័រ និង Smart TV"
    ],
    warranty: "ធានា ១០០% ដោះស្រាយជូនភ្លាមៗ (Instant Replacement)"
  },
  {
    id: "spotify-premium",
    title: "Spotify Premium Account",
    titleKh: "Spotify Premium គណនីស្តាប់តន្ត្រី",
    category: "entertainment",
    categoryKh: "កម្សាន្ត",
    badge: "OFFICIAL",
    image: "images/photo_2026-09-19_08-51-08.jpg",
    rating: 4.9,
    reviewsCount: 420,
    tags: ["High Quality Sound", "Download Songs", "Unlimited Skips"],
    description: "ស្តាប់តន្ត្រីរាប់លានបទដោយគ្មានពាណិជ្ជកម្ម សំឡេងកម្រិត Very High Quality អាចទាញយកចម្រៀងស្តាប់ Offline និងរំលងបទគ្មានដែនកំណត់។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "គុណភាពសំឡេងខ្ពស់បំផុត (Very High Quality Audio)",
      "ទាញយកបទចម្រៀងស្តាប់ Offline គ្រប់ទីកន្លែង",
      "Skip បទចម្រៀងបានគ្មានដែនកំណត់",
      "គ្មានពាណិជ្ជកម្មរំខានអារម្មណ៍ទាល់តែសោះ",
      "គណនី Private ប្រើប្រាស់ផ្ទាល់ខ្លួន សុវត្ថិភាព 100%"
    ],
    warranty: "ធានារយៈពេលប្រើប្រាស់ពេញលេញ 100% No Ban"
  },
  {
    id: "hbo-netflix-bundle",
    title: "HBO Max & Netflix 4K Bundle",
    titleKh: "កញ្ចប់រួម HBO Max + Netflix 4K",
    category: "entertainment",
    categoryKh: "កម្សាន្ត",
    badge: "SUPER BUNDLE",
    image: "images/ChatGPT Image Jun 4, 2026, 08_58_06 PM (2).png",
    rating: 4.9,
    reviewsCount: 195,
    tags: ["Bundle 2-in-1", "4K Ultra HD", "Cinema Movies"],
    description: "កញ្ចប់កម្សាន្តពិសេស ២ ក្នុង ១! រីករាយជាមួយភាពយន្តហូលីវូដល្បីៗលើ HBO Max និងស៊េរីភាពយន្តពេញនិយមលើ Netflix ក្នុងតម្លៃសន្សំសំចៃបំផុត។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៣ ខែ (3 Months)" },
      { name: "៦ ខែ (6 Months)" }
    ],
    features: [
      "ទទួលបានទាំង HBO Max និង Netflix 4K",
      "មើលបានគ្រប់ Smart TV, PC, Laptop, Phone, Tablet",
      "គុណភាពរូបភាពច្បាស់ដល់កម្រិត 4K UHD + HDR",
      "គាំទ្រសម្លេង Dolby Atmos ដូចក្នុងរោងកុន",
      "កញ្ចប់សន្សំសំចៃបំផុត"
    ],
    warranty: "ធានាពេញមួយរយៈពេលនៃកញ្ចប់"
  },
  {
    id: "prime-video",
    title: "Amazon Prime Video 4K Premium",
    titleKh: "Amazon Prime Video 4K Premium",
    category: "entertainment",
    categoryKh: "កម្សាន្ត",
    badge: "4K ULTRA HD",
    image: "images/ChatGPT Image Jun 8, 2026, 04_35_53 PM.png",
    rating: 4.8,
    reviewsCount: 140,
    tags: ["Prime Originals", "4K UHD", "Multi-Device"],
    description: "ទស្សនាភាពយន្តល្បីៗ និង Exclusive Series លើ Amazon Prime Video កម្រិត 4K Ultra HD គណនីមានស្ថេរភាព និងសុវត្ថិភាពខ្ពស់។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "100% Stable & 100% Secure",
      "ទស្សនាកម្រិត 4K Ultra HD Quality",
      "គាំទ្រឧបករណ៍ iOS, Android, Smart TV, Web",
      "មិនបាច់ផ្លាស់ប្តូរ Account ញឹកញាប់",
      "ទាញយកភាពយន្តទុកមើលក្រៅបណ្តាញបាន"
    ],
    warranty: "ធានាពេញរយៈពេលប្រើប្រាស់"
  },
  {
    id: "adobe-master-poster",
    title: "Adobe Creative Cloud Pro Edition (All Apps)",
    titleKh: "Adobe Creative Cloud Pro Edition (20+ Apps)",
    category: "design",
    categoryKh: "រចនា & កាត់ត",
    badge: "PRO EDITION",
    image: "images/photo_2026-09-19_08-51-06.jpg",
    rating: 5.0,
    reviewsCount: 390,
    tags: ["20+ Apps", "Generative Fill", "Genuine CC", "24/7 Support"],
    description: "កញ្ចប់ពិសេស Pro Service Premium សម្រាប់អ្នករចនាអាជីព រួមបញ្ចូលកម្មវិធី Adobe CC ទាំងអស់ Cloud Storage និងការធានាផ្លូវការ 100% Safe & Secure។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "ទទួលបាន Adobe Apps ជាង 20+ សម្រាប់ Windows & Mac",
      "សិទ្ធិប្រើប្រាស់មុខងារ Generative Fill (Beta) Apps",
      "Download ផ្ទាល់តាម Adobe Creative Cloud Desktop",
      "រួមបញ្ចូល Cloud Storage ផ្ទុកឯកសារ",
      "ជំនួយបច្ចេកទេស 24/7 ពីក្រុមការងារជំនាញ"
    ],
    warranty: "ធានា ១០០% Stable Account គ្មានការរអាក់រអួល"
  },
  {
    id: "canva-pro-edu",
    title: "Canva Pro EDU Lifetime / Yearly",
    titleKh: "Canva Pro EDU គណនីរចនាក្រាហ្វិក",
    category: "design",
    categoryKh: "រចនា & កាត់ត",
    badge: "LIFETIME",
    image: "images/ChatGPT Image Jun 8, 2026, 04_34_08 PM (2).png",
    rating: 4.9,
    reviewsCount: 630,
    tags: ["Brand Kit", "AI Magic Studio", "Unlimited Assets"],
    description: "ដោះសោររាល់ templates, រូបភាព stock, fonts, មុខងារ Background Remover និង AI Magic Studio លើ Canva Pro ដោយមិនបាច់បារម្ភរឿងទឹកប្រាក់។",
    plans: [
      { name: "១ ឆ្នាំ (1 Year)" },
      { name: "ពេញមួយជីវិត (Lifetime)" }
    ],
    features: [
      "ដោះសោរ Premium Templates & Elements រាប់លាន",
      "មុខងារ Background Remover ដោយគ្រាន់តែ 1-Click",
      "Cloud Storage ផ្ទុកការងារបានយ៉ាងច្រើន",
      "ប្រើបានទាំងលើទូរស័ព្ទ កុំព្យូទ័រ និង Tablet",
      "Update លើ Email ផ្ទាល់ខ្លួន មិនប៉ះពាល់ការងារចាស់"
    ],
    warranty: "ធានា Full Warranty មានជំនួយបច្ចេកទេស 24/7"
  },
  {
    id: "capcut-pro",
    title: "CapCut Pro Plan (All Devices)",
    titleKh: "CapCut Pro គណនីកាត់តវីដេអូកម្រិតខ្ពស់",
    category: "design",
    categoryKh: "រចនា & កាត់ត",
    badge: "HOT VIP",
    image: "images/photo_2026-09-19_08-54-40.jpg",
    rating: 5.0,
    reviewsCount: 710,
    tags: ["Video Editing", "AI Tools", "No Watermark", "4K 60FPS"],
    description: "កម្មវិធីកាត់តវីដេអូពេញនិយមបំផុតសម្រាប់ TikTok, Facebook Reels, YouTube Shorts។ ដោះសោរ Pro effects, AI caption, video upscaler និង Pro transitions។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "Private Account 100% Official ប្រើប្រាស់ផ្ទាល់ខ្លួន",
      "ប្រើប្រាស់បានលើ Windows PC, Mac, iOS និង Android",
      "ដោះសោរ Pro Effects, Filters & Animations ទាំងអស់",
      "ឧបករណ៍ AI ស្វ័យប្រវត្តិ៖ Auto Captions, Vocal Isolation, AI Script",
      "Export វីដេអូដល់កម្រិត 4K 60FPS គ្មាន Watermark"
    ],
    warranty: "ធានា ១ ឆ្នាំពេញ (1 Year Full Warranty)"
  },
  {
    id: "picsart-premium",
    title: "PicsArt Premium Gold Account",
    titleKh: "PicsArt Premium Gold (កំណែ ២០២៥)",
    category: "design",
    categoryKh: "រចនា & កាត់ត",
    badge: "OFFICIAL",
    image: "images/photo_2026-09-19_08-51-28.jpg",
    rating: 4.8,
    reviewsCount: 290,
    tags: ["Photo Editing", "AI Filters", "No Ads"],
    description: "ដោះសោររាល់ឧបករណ៍កែរូបថត និងវីដេអូកម្រិត Pro លើទូរស័ព្ទដៃ ស្ទីគ័រឥតកំណត់ fonts ស្អាតៗ និងការលុបផ្ទៃខាងក្រោយភ្លាមៗ។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "ប្រើបានគ្រប់ Devices (iOS & Android)",
      "Original & Genuine PicsArt Account មិនមែន Mod/APK",
      "តម្លើងស្របច្បាប់តាម App Store & Play Store",
      "ដោះសោរ AI Enhance, Remove Object & Background",
      "គ្មានពាណិជ្ជកម្ម និង export រូបភាពច្បាស់កម្រិតខ្ពស់"
    ],
    warranty: "ធានាពេញមួយរយៈពេលប្រើប្រាស់"
  },
  {
    id: "grammarly-business",
    title: "Grammarly Business Plan (Private Account)",
    titleKh: "Grammarly Business Plan គណនីផ្ទាល់ខ្លួន",
    category: "productivity",
    categoryKh: "ការងារ & ការិយាល័យ",
    badge: "PRIVATE 5 DEVICES",
    image: "images/ChatGPT Image Jun 8, 2026, 04_54_51 PM.png",
    rating: 4.9,
    reviewsCount: 380,
    tags: ["AI Writing", "Plagiarism Checker", "5 Devices", "Tone Detector"],
    description: "ជំនួយការសរសេរភាសាអង់គ្លេសដ៏ឆ្លាតវៃ កែកំហុសវេយ្យាករណ៍ ពាក្យពេចន៍ និងពិនិត្យការលួចចម្លង (Plagiarism)។ Upgrade លើ Gmail ផ្ទាល់ខ្លួន ប្រើបានដល់ 5 ឧបករណ៍។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "Update លើ Gmail ផ្ទាល់ខ្លួន 100% Private (មិន Share ជាមួយអ្នកដទៃ)",
      "ប្រើបានរហូតដល់ 5 Devices ដំណាលគ្នា (Windows, Mac, iOS, Android)",
      "ពិនិត្យ Plagiarism Detection គ្មានដែនកំណត់",
      "សរសេរឡើងវិញដោយ AI (Clarity-focused sentence rewrites)",
      "កំណត់កម្រិត Formality & Tone សម្រាប់ការងារ និងការសិក្សា"
    ],
    warranty: "ធានា ១ ឆ្នាំពេញ (1 Year Official Warranty)"
  },
  {
    id: "grammarly-enterprise-dark",
    title: "Grammarly Business & Enterprise (1 Year Warranty)",
    titleKh: "Grammarly Business & Enterprise (ធានា ១ ឆ្នាំ)",
    category: "productivity",
    categoryKh: "ការងារ & ការិយាល័យ",
    badge: "1 YEAR WARRANTY",
    image: "images/photo_2026-09-19_08-51-12.jpg",
    rating: 4.9,
    reviewsCount: 220,
    tags: ["Enterprise", "100% Official", "iOS/Android/PC", "Rocket Speed"],
    description: "គណនី Grammarly កម្រិតខ្ពស់ Enterprise Plan សម្រាប់ក្រុមហ៊ុន និងស្ថាប័ន។ កែសម្រួលអត្ថបទភាសាអង់គ្លេសឱ្យកាន់តែមានទំនុកចិត្ត ធានាពេញ ១ ឆ្នាំ។",
    plans: [
      { name: "១ ឆ្នាំ (1 Year Package)" },
      { name: "២ ឆ្នាំ (2 Years Package)" }
    ],
    features: [
      "100% Official Account ធានាពេញ ១ ឆ្នាំ (1 Year Warranty)",
      "ដំណើរការលើ iOS, Android, Mac, Windows",
      "AI Writing Assistance ជួយកែលម្អរចនាបថនៃការសរសេរ",
      "ពិនិត្យ Grammar, Spelling, Punctuation ត្រឹមត្រូវ 100%",
      "ការការពារសុវត្ថិភាពទិន្នន័យកម្រិត Enterprise"
    ],
    warranty: "ធានាពេញ ១ ឆ្នាំ (1 Year Official Warranty)"
  },
  {
    id: "office-365",
    title: "Microsoft Office 365 Pro / Apps",
    titleKh: "Microsoft Office 365",
    category: "productivity",
    categoryKh: "ការងារ & ការិយាល័យ",
    badge: "LIFETIME / 1 YEAR",
    image: "images/ChatGPT Image Jun 8, 2026, 04_39_29 PM (2).png",
    rating: 5.0,
    reviewsCount: 560,
    tags: ["Word & Excel", "PowerPoint", "Windows & Mac", "Lifetime/Yearly"],
    description: "ឈុតកម្មវិធីការិយាល័យពេញលេញ Word, Excel, PowerPoint, Outlook, OneNote, Microsoft Teams គណនីមានស្ថេរភាព និងសុវត្ថិភាពខ្ពស់។",
    plans: [
      { name: "១ ឆ្នាំ (1 Year)" },
      { name: "ប្រើប្រាស់ពេញមួយជីវិត (Lifetime)" }
    ],
    features: [
      "រួមបញ្ចូល Word, Excel, PowerPoint, Outlook, Teams, OneNote",
      "គាំទ្រការតម្លើងលើឧបករណ៍ Windows, Mac, iOS, Android",
      "ការតម្លើងងាយស្រួល 100% Genuine License / Installer",
      "មុខងារ Update កំណែចុងក្រោយបំផុតស្វ័យប្រវត្តិ",
      "Stable Account មិនបារម្ភរឿង Error ឬបាត់ឯកសារសំខាន់"
    ],
    warranty: "ធានា Stable 100% និង Support 24/7"
  },
  {
    id: "google-workspace-gemini",
    title: "Google Workspace with Gemini AI",
    titleKh: "Google Workspace + Gemini AI",
    category: "productivity",
    categoryKh: "ការងារ & ការិយាល័យ",
    badge: "AI ENTERPRISE",
    image: "images/photo_2026-09-19_08-50-54.jpg",
    rating: 5.0,
    reviewsCount: 410,
    tags: ["Gemini AI", "Gmail & Drive", "Docs & Meet", "Enterprise Ready"],
    description: "កញ្ចប់ Google Workspace រួមបញ្ចូលជាមួយជំនួយការ AI ឆ្លាតវៃ Gemini សម្រាប់បំពេញការងារ កែលម្អផលិតភាពជាមួយ Gmail, Docs, Drive, Meet, និង Calendar សុវត្ថិភាពកម្រិត Enterprise។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "ជំនួយការ Gemini AI ឆ្លាតវៃជួយសរសេរ និងវិភាគទិន្នន័យ",
      "Google Drive Cloud Storage សុវត្ថិភាពខ្ពស់",
      "ប្រើប្រាស់ពេញលេញលើ Docs, Sheets, Slides, Gmail, Meet",
      "សុវត្ថិភាពកម្រិត Enterprise Ready & Secure by design",
      "គាំទ្រគ្រប់ Devices: PC, Mac, iOS, Android"
    ],
    warranty: "ធានាពេញមួយរយៈពេលប្រើប្រាស់ (100% Full Warranty)"
  },
  {
    id: "surfshark-vpn",
    title: "Surfshark VPN One+ Unlimited",
    titleKh: "Surfshark VPN One+ សុវត្ថិភាព & ល្បឿនលឿន",
    category: "security",
    categoryKh: "សុវត្ថិភាព & ហិរញ្ញវត្ថុ",
    badge: "TOP VPN",
    image: "images/ChatGPT Image Jun 8, 2026, 04_37_10 PM (2).png",
    rating: 4.9,
    reviewsCount: 310,
    tags: ["Military Encryption", "3200+ Servers", "Unlimited Devices", "No Logs"],
    description: "ការពារសុវត្ថិភាពអ៊ីនធឺណិត ប្តូរទីតាំង IP ទៅកាន់ជាង 100+ ប្រទេស ល្បឿនលឿនខ្លាំង ប្រើប្រាស់ឧបករណ៍គ្មានដែនកំណត់ និងដោះសោរគ្រប់គេហទំព័រ។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "Military-Grade Encryption ការពារព័ត៌មានផ្ទាល់ខ្លួន",
      "Server ជាង 3,200+ ក្នុង 100+ ប្រទេសជុំវិញពិភពលោក",
      "Unlimited Devices ប្រើប្រាស់លើឧបករណ៍ប៉ុន្មានក៏បាន",
      "No-Log Policy 100% Private គ្មានអ្នកដឹងពីសកម្មភាពរបស់អ្នក",
      "ល្អបំផុតសម្រាប់ Stream Netflix US, Hulu, HBO និងលេងហ្គេម"
    ],
    warranty: "ធានា Stable 100% ពេញមួយរយៈពេល"
  },
  {
    id: "coursera-plus",
    title: "Coursera Plus Plan (Private Account)",
    titleKh: "Coursera Plus សិក្សាជំនាញអន្តរជាតិ",
    category: "education",
    categoryKh: "ការសិក្សា & ភាសា",
    badge: "OFFICIAL CERT",
    image: "images/ChatGPT Image Jun 8, 2026, 04_44_00 PM (2).png",
    rating: 5.0,
    reviewsCount: 215,
    tags: ["Certificates", "Google & IBM", "Learn Anywhere"],
    description: "រៀនវគ្គសិក្សារាប់ពាន់ពីសាកលវិទ្យាល័យកំពូលៗលើពិភពលោក (Google, IBM, Meta, Stanford) និងទទួលបានវិញ្ញាបនបត្រផ្លូវការសម្រាប់ CV របស់អ្នក។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៣ ខែ (3 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "រៀនវគ្គសិក្សាជាង 7,000+ និងទទួលបាន Professional Certificates",
      "ចេញវិញ្ញាបនបត្រឈ្មោះរបស់អ្នកផ្ទាល់ 100% Official",
      "រៀនតាមពេលវេលាផ្ទាល់ខ្លួន គ្មានការបង្ខិតបង្ខំ",
      "គាំទ្រទាំងលើ Windows, Mac, iOS និង Android",
      "កសាងជំនាញថ្មីដើម្បីបង្កើនឱកាសការងារ"
    ],
    warranty: "ធានា ១ ឆ្នាំពេញ (1 Year Warranty)"
  },
  {
    id: "quickbooks-enterprise",
    title: "QuickBooks Enterprise Solution Accountant 2024",
    titleKh: "QuickBooks Enterprise 2024 កម្មវិធីគណនេយ្យ",
    category: "security",
    categoryKh: "សុវត្ថិភាព & ហិរញ្ញវត្ថុ",
    badge: "LIFETIME",
    image: "images/ChatGPT Image Jun 8, 2026, 05_01_13 PM (2).png",
    rating: 4.9,
    reviewsCount: 180,
    tags: ["Accounting", "Payroll", "Invoicing", "Lifetime Installer"],
    description: "កម្មវិធីគ្រប់គ្រងគណនេយ្យ វិក្កយបត្រ ចំណូលចំណាយ សន្និធិ និងពន្ធ សម្រាប់អាជីវកម្មខ្នាតតូចនិងមធ្យម។ តម្លើងម្តងប្រើប្រាស់បានមួយជីវិត។",
    plans: [
      { name: "Lifetime Installer (1 PC)" },
      { name: "Lifetime Multi-User (3 PCs)" }
    ],
    features: [
      "Key Activation & Updatable 100% Safe & Secure",
      "គ្រប់គ្រង Accounting, Payroll, Reporting, Tax ងាយស្រួល",
      "សន្សំសំចៃពេលវេលារៀបចំរបាយការណ៍ហិរញ្ញវត្ថុ និងវិក្កយបត្រ",
      "Lifetime Updates ប្រើប្រាស់គ្មានដែនកំណត់",
      "មានវីដេអូបង្រៀនតម្លើង និងការជួយគាំទ្រពីអ្នកជំនាញ"
    ],
    warranty: "ធានា Lifetime Activation & Support"
  },
  {
    id: "tradingview",
    title: "TradingView Track All Markets",
    titleKh: "TradingView ឧបករណ៍វិភាគភាគហ៊ុន & Crypto",
    category: "security",
    categoryKh: "សុវត្ថិភាព & ហិរញ្ញវត្ថុ",
    badge: "PRO TRADER",
    image: "images/photo_2026-09-19_08-50-59.jpg",
    rating: 4.9,
    reviewsCount: 410,
    tags: ["Charts", "Crypto & Stocks", "Real-Time 24/7", "Multiple Indicators"],
    description: "ឧបករណ៍វិភាគតារាងបច្ចេកទេសឈានមុខគេលើពិភពលោកសម្រាប់អ្នកជួញដូរភាគហ៊ុន Forex មាស និងរូបិយប័ណ្ណឌីជីថល (Crypto) ជាមួយទិន្នន័យ Real-Time។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៣ ខែ (3 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "ទិន្នន័យ Real-time 24/7 គ្រប់ទីផ្សារ Stocks, Crypto, Forex, Gold",
      "ប្រើប្រាស់ Multiple Indicators និង Charts លើអេក្រង់តែមួយ",
      "កំណត់ Alert ជូនដំណឹងតម្លៃបានគ្មានកំណត់",
      "ដំណើរការលើ Desktop, Web, iOS, Android",
      "ឧបករណ៍ចាំបាច់សម្រាប់ Trader ជំនាញ"
    ],
    warranty: "ធានាគណនីមានស្ថេរភាពពេញមួយរយៈពេល"
  },
  {
    id: "duolingo-premium",
    title: "Duolingo Super Premium (All Languages)",
    titleKh: "Duolingo Super Premium រៀនភាសាឆ្លាតវៃ",
    category: "education",
    categoryKh: "ការសិក្សា & ភាសា",
    badge: "TOP SELLER",
    image: "images/photo_2026-09-19_08-50-21.jpg",
    rating: 5.0,
    reviewsCount: 540,
    tags: ["Unlimited Hearts", "No Ads", "100+ Languages", "Streak Shield"],
    description: "រៀនភាសាជាង 100+ ជាមួយកម្មវិធី Duolingo Super បេះដូងគ្មានដែនកំណត់ (Unlimited Hearts) គ្មានពាណិជ្ជកម្មរំខាន និង Streak Protection ការពារមិនឱ្យដាច់ថ្ងៃ។",
    plans: [
      { name: "១ ខែ (1 Month)" },
      { name: "៦ ខែ (6 Months)" },
      { name: "១ ឆ្នាំ (1 Year)" }
    ],
    features: [
      "រៀនភាសាអង់គ្លេស ចិន កូរ៉េ ជប៉ុន បារាំង និងជាង 100+ ភាសាផ្សេងទៀត",
      "Unlimited Hearts រៀនខុសប៉ុន្មានដងក៏មិនអស់បេះដូង",
      "Ad-Free Learning គ្មានពាណិជ្ជកម្មរំខានការផ្ដោតអារម្មណ៍",
      "Streak Protection ការពារ Streak របស់អ្នកឱ្យនៅគង់វង្ស",
      "ចូលរៀនលំហាត់អនុវត្តកម្រិតខ្ពស់ (Mistakes Review)"
    ],
    warranty: "Stable Access 100% Trusted & Warranty Included"
  }
];
