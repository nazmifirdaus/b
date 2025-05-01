const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const QRCode = require('qrcode');
const cron = require('node-cron');

require('dotenv').config();
const TARGET_CHAT_ID = process.env.TARGET_CHAT_ID;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

let qrSaved = false;
client.on('qr', (qr) => {
    console.clear(); // bersihkan terminal agar QR tampil rapi
    console.log('📲 QR Code diterima, scan dengan WhatsApp sekarang...');
    qrcode.generate(qr, { small: true }); // tampilkan QR sebagai ASCII

    // Menyimpan QR code ke file setelah berhasil diterima
    (async () => {
        try {
            const qrDir = path.join(__dirname, 'public');
            console.log('📁 Path folder QR:', qrDir);

            if (!fs.existsSync(qrDir)) {
                fs.mkdirSync(qrDir, { recursive: true });
                console.log('📁 Folder public dibuat.');
            }

            const filePath = path.join(qrDir, 'qr.png');
            console.log('💾 Menyimpan QR ke:', filePath);

            await QRCode.toFile(filePath, qr, { width: 300 });
            console.log('✅ QR berhasil disimpan!');
        } catch (err) {
            console.error('❌ Gagal menyimpan QR:', err);
        }
    })();
});

client.on('ready', () => {
    console.log('✅ Bot WhatsApp sudah siap!');

    cron.schedule('0 22 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'selamat pagiii sayangg 😘 semangat ya harinya, aku tahu hari ini bakal jadi hari yang seru banget buat kamu! 🥳');
        }, 5000);
    });

    cron.schedule('47 4 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'selamat mam yaaa, jangan lupa sholat yaaaa bb 😇 semoga harimu menyenangkan babaiiii?');
        }, 5000);
    });

    cron.schedule('30 11 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'oiiii mandiii 🛁 jangan malesan! mau ngapain hari ini? ada rencana spesial?');
        }, 5000);
    });

    cron.schedule('0 10 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'aku udaahh pulangg 😁 bolee cita tidaaa? aku kangen banget nih! 🤗');
        }, 5000);
    });

    cron.schedule('49 14 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'boleee call? 😳 pengen denger suaramu, akuu mauu ceritaa');
        }, 5000);
    });

    cron.schedule('20 15 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'good night yaaa 💗 have a sweet dream 😴 semoga tidurmu nyenyak dan bangun besok lebih bahagia!');
        }, 5000);
    });

   // 00:50 UTC (07:50 WIB)
cron.schedule('50 0 * * *', () => {
    setTimeout(() => {
        client.sendMessage(TARGET_CHAT_ID, 'ehh kamu udah bangun belom sihh?? 😝 kalau belum, bangunn dongg! aku kangen suara kamu 🥺');
    }, 5000);
});

// 04:02 UTC (11:02 WIB)
cron.schedule('2 4 * * *', () => {
    setTimeout(() => {
        client.sendMessage(TARGET_CHAT_ID, 'ih jam segini tuh enaknya mikirin kamu sambil peluk bantal 😚 kamu lagi ngapain yaa~');
    }, 5000);
});

// 04:30 UTC (11:30 WIB)
cron.schedule('30 4 * * *', () => {
    setTimeout(() => {
        client.sendMessage(TARGET_CHAT_ID, 'udah mam belommm?? 😡 jangan bikin aku cerewet dong, ayo mam! ✨');
    }, 5000);
});

// 06:21 UTC (13:21 WIB)
cron.schedule('21 6 * * *', () => {
    setTimeout(() => {
        client.sendMessage(TARGET_CHAT_ID, 'abis makan siang tuh peluk aku, bukan rebahan sendirian 😤 sini peluk online dulu pelukk 🤗');
    }, 5000);
});

// 07:14 UTC (14:14 WIB)
cron.schedule('14 7 * * *', () => {
    setTimeout(() => {
        client.sendMessage(TARGET_CHAT_ID, 'aku udah pulangg nii,ak kangen kmu tauuk aku mau call pasti kamu sibuk yaaa😤');
    }, 5000);
});

// 08:40 UTC (15:40 WIB)
cron.schedule('40 8 * * *', () => {
    setTimeout(() => {
        client.sendMessage(TARGET_CHAT_ID, 'udah soreee 😗 kamu cape gak? aku siap jadi cemilannya kamu~ eh salah, cemilan sore maksudnya 🙈');
    }, 5000);
});

// 09:12 UTC (16:12 WIB)
cron.schedule('12 9 * * *', () => {
    setTimeout(() => {
        client.sendMessage(TARGET_CHAT_ID, 'udah jam 4 lebih, jangan lupa stretching yaa 😎 biar ga pegel terus bisa peluk aku lebih lama 🥰');
    }, 5000);
});

// 13:10 UTC (20:10 WIB)
cron.schedule('10 13 * * *', () => {
    setTimeout(() => {
        client.sendMessage(TARGET_CHAT_ID, 'udah malem... waktunya peluk dan manja-manja 😚 sini sayang, aku siap denger semua curhatmu 💬💕');
    }, 5000);
});

});
// === Tambahkan Express server DI SINI ===
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('✅ WhatsApp bot aktif & cron jalan!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🌐 Server aktif di port ${PORT}`);
});

client.on('message', async (message) => {
    console.log('📩 pesan masuk:', message.body);

    try {
        const chat = await message.getChat();
        if (!chat) return;
        if (chat.isGroup || message.fromMe) return;

        const msg = message.body.toLowerCase();
        let replyText = '';

        const kabarReplies = [
            'aku baikkk, kamu gimana? 🥰 ada cerita seru nggak? 😏',
            'alhamdulillah sehat, kamu sendiri? gimana hari ini? 😁',
            'cape dikit sih, tapi seneng bisa chat kamu 🤗 jadi, hari kamu gimana?',
            'hariku seru banget, kamu gimana? ada kejadian lucu nggak?',
            'aku barusan makan, kamu udah belum? lagi pengen makan apa nih?'
        ];

        const nyolotReplies = [
            'ketawa mulu, lo emang ga punya beban hidup? 😒',
            'bisa diem dikit ga sih, kesel tau aku 😤',
            'apaan sih lucu? aku serius loh malah diketawain 🙄',
            'ngakak sendiri, dasar bocah... tapi lucu juga sih 😑'
        ];

        const boongReplies = [
            'boong darimanaaa, aku tuh selalu jujur sama kamu 😤',
            'ihh aku serius lohh, kamu mah suka nuduh aja 😒',
            'aku boong? yaudah kalo gak percaya, tapi nanti nyesel 😏',
            'aku tuh gak pernah boong… kamu aja yang gak peka 😔',
            'suka banget nuduh yaa, padahal aku tuh sayang banget sama kamuuu 😢'
        ];

        const masaSihReplies = [
            'iyaa lahh masa engga sih? kamu mah suka gak percaya kalo aku sayang 😤',
            'masa sih gimana? aku ngomong apa adanya loh 😒',
            'ih kok kamu gitu… aku udah ngomong dari hati loh 😔',
            'ya elahhh masa sih muluu, percaya dikit napa 😩',
            'kalo gak percaya, sini aku buktiin pake peluk 🤗'
        ];

        const bundaReplies = [
            'iyaa doong, bunda aku sehat kok… harus sehat, soalnya dia yang ngelahirin aku biar bisa sayang-sayangan sama kamu 😚\n\nbtw, bunda nanyain kamu mulu tau 😒 katanya “itu anak kapan main kesini lagi?”',
            'kamu kok nanyain bunda aku sih? 😒 tapi iya, alhamdulillah sehat…\n\neh tapi katanya bunda: “itu anak manis kapan main ke sini lagi? aku udah kangen tuh sama dia” 🥹❤️'
        ];

        const rinduReplies = [
            'aku juga kangeeennn 😢 peluk virtual dulu yaa 🤗',
            'rindu tuh berat, tapi rindu kamu lebih berat 😩',
            'aku kangen banget sampe udah gak tau harus gimana lagi 😔',
            'ya ampun kamu kangen? aku dari tadi mikirin kamu terus 😭'
        ];

        const sayangReplies = [
            'aku tuh sayangnya udah gak bisa diukur pake meteran 😤',
            'cinta kamu tuh udah kayak wifi... kalo gak deket aku lemah 😆',
            'sayang banget sampe overthinking tiap kamu slow respon 😤',
            'aku tuh cinta kamu lebih dari aku cinta indomie 🥲'
        ];

        const marahReplies = [
            'kamu marah? yaudah aku diem deh... tapi abis itu peluk ya 😔',
            'jangan ngambek dong, nanti aku sedih juga 😢',
            'plis jangan marah, aku tuh gak bisa liat kamu gitu 😩',
            'marahnya lucu sih... tapi jangan lama-lama yaa 🥹'
        ];

        const laperReplies = [
            'laperrr jugaa, mau makan bareng gak? 😋',
            'aku mau makan kamu aja... eh maksudnya makan bareng kamu! 🙈',
            'makan yuk! kamu yang masak yaa 😁',
            'belum makan sih, tapi udah kenyang liat kamu 😌'
        ];

        const basaBasiReplies = [
            'lagi ngapain? aku lagi ngoding nih, haha! 😁',
            'udah makan siang? kalau belum, yuk makan bareng! 😋',
            'lagi di mana? aku di rumah aja nih, ngapain ya? 🏠',
            'cerita dong, ada yang seru nggak? aku lagi bosen nih 😅',
            'pagi-pagi udah ngapain? udah semangat belum? 🌞',
            'hari ini cerah banget ya, enak banget buat jalan-jalan 🌞',
            'kamu suka cuaca kaya gini gak? aku sih suka banget, adem! 🌤️',
            'lagi santai aja nih, kamu gimana? capek? 😴',
            'gimana cuaca di tempat kamu? di sini sih lagi hujan deras 🥶',
            'tau nggak, aku kemarin nemuin tempat makan enak banget loh 😋'
        ];

        const kocakReplies = [
            'kocak kocak bingittt',
            'dihh, jangan bikin aku ketawa gini! 😆',
            'ini nih, baru yang namanya lucu banget 😜',
            'eluu kocakk',
            'freak banget luu'
        ];

        const pelitReplies = [
            'ka, pelit banget sih! aku juga mau dong! 🙄',
            'ih, jangan pelit-pelit yaa! 😤',
            'hahaha, pelit bener deh! tapi gapapa, aku paham kok 😅'
        ];

        const najisReplies = [
            'najis banget sih ngomong gitu, duh! 😒',
            'ihhh najis, tapi kok seru yaa 🤣',
            'najis bener dah, tapi tetep aja aku seneng sama kamu 😆'
        ];

        const bantuinakuReplies = [
            'gamauukk akuu gii sibukk tauu',
            'kiss duluu baru aku bantuinn🙄',
            'GAAAMAUUU'
        ];

        // Tempatkan array di luar blok if-else
const questionsReplies = [
    'Siapa yang kamu maksud? 😏',
    'Kapan kita bisa jalan bareng? 😏',
    'Dimana kita bisa ngumpul? 🧐',
    'Mengapa kamu bertanya itu? 😅',
    'Bagaimana cara kamu membuat aku bahagia? 😁',
    'Berapa banyak makanan yang bisa kamu makan? 🍔',
    'Mana yang lebih kamu suka, aku atau makanan? 🤔',
    'Siapakah yang paling dekat dengan kamu? 💖',
    'Apakah kamu yakin? 🤨',
    'Apa lagi yang bisa kamu ceritakan? 🫣',
    'Apa saja yang kamu suka? 😜',
    'Siapakah saja yang kamu ajak ngobrol? 😏',
    'Kapan saja kita bisa ngobrol lebih banyak? 📱',
    'Di mana saja kamu biasa nongkrong? 🕶️',
    'Mengapa begitu? 😳',
    'Bagaimana pula bisa begitu? 🤯',
    'Berapa banyak yang kamu tahu tentang aku? 🤔',
    'Mana lagi yang mau kamu tanyakan? 🧐',
    'Siapakah yang selalu kamu cari? 🫣',
    'Apakah benar kamu kangen? 😏',
    'Apa yang bikin kamu tertawa? 🤣',
    'Siapa yang kamu ingin ajak ngobrol lebih lama? 💬',
    'Kapan saja kita bisa chat lagi? 😘',
    'Di mana saja kita bisa bertemu? 🌍',
    'Mengapa tidak jawabanku cukup? 🤔',
    'Bagaimana pula menurutmu? 😌',
    'Berapa banyak waktu yang kamu punya untuk ngobrol? ⏳',
    'Mana lagi yang lebih penting, kita atau kerjaan? 💼'
];

// Blok else if
if (
    msg.includes('apa kabar') ||
    msg.includes('gimana kamu') ||
    msg.includes('kamu baik?') ||
    msg.includes('udah makan?') ||
    msg.includes('sehat?') ||
    msg.includes('lagi apa?') ||
    msg.includes('ngapain?') ||
    msg.includes('cape ga?') ||
    msg.includes('abis dari mana?') ||
    msg.includes('gimana harimu?')
) {
    const moodReplies = [
        'serius aku diginiii... aku tuh yaa, kalo ditanyain gini bikin aku senyum² sendiri tauu 😳 aku baik kok, kamu gimanaa?',
        'aku baikk, makasii ya udah nanya... kamu gimana? 😚',
        'udah makan juga, sehat juga... tapi lebih semangat lagi kalo kamu yang nyapa 😌 kamu apa kabar?',
        'lagi santai sih, tapi seneng bgt kamu nanya 😁 kamu lagi apa?',
    ];
    const randomIndex = Math.floor(Math.random() * moodReplies.length);
    replyText = moodReplies[randomIndex];
        
        } else if (msg.includes('mimpi indah yaa')) {
        replyText = 'mimpi aku semalem tuh lucuu banget, kamu jadi pahlawan super 😆';
        } else if (msg.includes('bingung')) {
        replyText = 'bingung kenapa sih? sini cerita, aku dengerin kok 🤗';
        } else if (msg.includes('capek')) {
        replyText = 'duhh capek yaa... istirahat bentar gih, peluk dulu biar seger 🤗';
        } else if (msg.includes('bosan')) {
        replyText = 'bosan yaa? mau call tidaa?, kita ngobrol-ngobrol yuk 🥺';
        } else if (msg.includes('aku lagi kelas')) {
        replyText = 'boong, coba pap yang imut 🤗';
        } else if (msg.includes('rindu') || msg.includes('kangen')) {
        replyText = 'rindu itu berat... tapi kalo kamu yang rindu, aku langsung senyum 😌';
        } else if (msg.includes('sendiri') || msg.includes('kesepian')) {
        replyText = 'sendiri tuh kadang perlu... tapi jangan terlalu lama, nanti aku khawatir 🥺';
        } else if (msg.includes('bobo') || msg.includes('tidur')) {
        replyText = 'bobo dulu gih, mimpinya jangan lupa ajak aku ya 😴✨';
        } else if (msg.includes('sayang') || msg.includes('cinta')) {
            replyText = 'aku tuh cuek, tapi kalo udah sayang... yaudah, gitu deh 😏❤️';
        } else if (msg.includes('marah') || msg.includes('kesel')) {
            replyText = 'ehh jangan marah dong, nanti tambah imut loh 😜';
        } else if (msg.includes('butuh teman')) {
            replyText = 'aku di sini kok, selalu siap dengerin kamu 🫶';
        } else if (msg.includes('kamu siapa')) {
            replyText = 'aku itu... yang selalu ada tiap kamu chat 😌';
        } else if (msg.includes('gajelas') || msg.includes('gaje')) {
            replyText = 'eluu gajee yeuuhh';
        } else if (msg.includes('lagi sedih') || msg.includes('sedih banget') || msg.includes('nangis')) {
            replyText = 'eh jangan sedih dong... nanti aku ikut nangis juga 😢';
        } else if (msg.includes('bosan') || msg.includes('bosen nihh')) {
            replyText = 'bosen ya? ayo tukeran cerita, siapa tau seru 😏';
        } else if (msg.includes('lucu') || msg.includes('gemes')) {
            replyText = 'hehe aku emang gitu, ngangenin tapi ngeselin dikit 😜';
        } else if (msg.includes('kamu dimana') || msg.includes('lagi dimana')) {
            replyText = 'di hati kamu... eh maksudnya lagi standby di chat 😎';
        } else if (msg.includes('kapan ketemu') || msg.includes('pengen ketemu')) {
            replyText = 'kalo jodoh, pasti ketemu kok... tunggu sinyal semesta 😌';
        } else if (msg.includes('malam') && msg.includes('sunyi')) {
            replyText = 'malam sunyi emang bikin mellow, tapi tenang... aku nemenin dari sini ✨';
        } else if (msg.includes('aku capek') || msg.includes('cape banget')) {
            replyText = 'capek ya? sini peluk virtual dulu 🤗 istirahat yang cukup yaa~';
        } else if (msg.includes('kenapa diam') || msg.includes('kok ga bales')) {
            replyText = 'ga diam kok, cuma lagi ngetik panjang biar kamu senyum 😌';
        } else if (msg.includes('hujan') || msg.includes('lagi hujan')) {
            replyText = 'hujan-hujan gini enaknya dipeluk tauu🥺,jangan lupa pakai jaket ya!';
        } else if (msg.includes('aku gabut') || msg.includes('lagi gabut') || msg.includes('gak ada kerjaan')) {
            replyText = 'gabut ya? ayo ngobrol sama aku, siapa tau bisa bikin hari kamu lebih seru 😏';
        } else if (msg.includes('kangen kamu') || msg.includes('rindu kamu') || msg.includes('aku kangen')) {
            replyText = 'aku juga kangen banget sama kamu 😢 peluk virtual dulu yaa 🤗';
        } else if (msg.includes('terlalu lama') || msg.includes('udah lama') || msg.includes('kapan lagi')) {
            replyText = 'sabar yaa, kita pasti ketemu lagi! waktu gak pernah lama kalo udah ketemu 😘';
        } else if (msg.includes('lagi di jalan') || msg.includes('di perjalanan')) {
            replyText = 'hati-hati di jalan ya, semoga cepet sampai dengan selamat 😇';
        } else if (msg.includes('mau pergi') || msg.includes('mau cabut')) {
            replyText = 'oke, hati-hati ya! jangan lupa pulang lagi ke aku 😜';
        } else if (msg.includes('aku bosan') || msg.includes('bosen banget')) {
            replyText = 'bosan ya? yuk, ngobrol bareng aku, siapa tau bisa hilangin rasa bosanmu! 😎';
        } else if (msg.includes('males') || msg.includes('malesan')) {
            replyText = 'males tuh wajar kok, tapi jangan lama-lama yaa, nanti aku datangin semangat buat kamu! 💪';
        } else if (msg.includes('sakit') || msg.includes('lagi sakit')) {
            replyText = 'aduh, jangan sakit ya! semoga cepet sembuh yaa, aku selalu ada buat kamu! 💖';
        } else if (msg.includes('stress') || msg.includes('tekanan') || msg.includes('bete banget')) {
            replyText = 'stress tuh emang nggak enak, yuk cerita sama aku, semoga bisa sedikit ngebantu! 🫶';
        } else if (msg.includes('mau tidur') || msg.includes('aku mau tidur')) {
            replyText = 'semoga tidurmu nyenyak ya, mimpiin aku yaa, tidur yang pules! 😴💤';
        } else if (msg.includes('lagi olahraga') || msg.includes('lagi fitness') || msg.includes('lagi lari')) {
            replyText = 'wah, olahraga! semangat terus ya, jangan lupa hydrate! 💪💦';
        } else if (msg.includes('lagi liburan') || msg.includes('lagi jalan-jalan') || msg.includes('lagi vacation')) {
            replyText = 'liburan ya? seru banget! semoga kamu bisa menikmati waktu santai ini 😎🌴';
        } else if (msg.includes('lagi kerja') || msg.includes('lagi di kantor') || msg.includes('lagi meeting')) {
            replyText = 'kerja keras yaa! semoga lancar dan sukses hari ini 💼✨';
        } else if (msg.includes('lagi nonton') || msg.includes('lagi nonton film') || msg.includes('lagi nonton series')) {
            replyText = 'lagi nonton apa? kasih rekomendasi dong, siapa tahu bisa nemenin kamu nanti! 🎬🍿';
        } else if (msg.includes('lagi pacaran') || msg.includes('lagi bersama pacar')) {
            replyText = 'wah, pacaran tuh seru ya! semoga kalian selalu bahagia bareng 😘💖';
        } else if (msg.includes('lagi kelas') || msg.includes('aku lagi kuliah') || msg.includes('lagi belajar')) {
            replyText = 'wah, lagi serius yaa! semangat belajarnya, jangan lupa istirahat juga ya! 📚✨';
        } else if (msg.includes('lagi tidur') || msg.includes('lagi tidur siang') || msg.includes('lagi istirahat')) {
            replyText = 'lagi tidur ya? semoga tidurmu nyenyak dan mimpi indah! 😴💫';
        } else if (msg.includes('lagi di rumah') || msg.includes('lagi di kosan') || msg.includes('lagi di rumah aja')) {
            replyText = 'enak banget di rumah, bisa santai seharian 😌 semoga hari ini nyaman dan menyenangkan ya!';
        } else if (msg.includes('lagi hujan') || msg.includes('hujan deras')) {
            replyText = 'hujan ya? enak banget buat ngopi atau nonton film sambil peluk bantal 😌☔';
        } else if (msg.includes('lagi sibuk') || msg.includes('lagi banyak kerjaan') || msg.includes('lagi banyak tugas')) {
            replyText = 'sibuk yaa? semoga cepat selesai dan bisa santai lagi! kamu pasti bisa! 💪📈';
        } else if (msg.includes('lagi ngopi') || msg.includes('lagi minum kopi') || msg.includes('lagi kopi')) {
            replyText = 'kopi emang selalu jadi teman terbaik, nikmati aja, semoga makin semangat! ☕💥';
        } else if (msg.includes('lagi sibuk banget') || msg.includes('lagi banyak kerjaan banget') || msg.includes('lagi banyak tugas banget')) {
            replyText = 'wah, sibuk banget ya? semoga semua pekerjaan atau tugasnya lancar dan cepat selesai ya! 💼📚';
        } else if (msg.includes('lagi stress') || msg.includes('lagi banyak pikiran') || msg.includes('lagi pusing')) {
            replyText = 'tenang ya, semua pasti ada jalan keluarnya! coba istirahat sebentar, kamu butuh relaksasi 😌🌿';
        } else if (msg.includes('lagi buru-buru') || msg.includes('lagi kejar deadline') || msg.includes('lagi harus cepat')) {
            replyText = 'semangat! fokus dan jangan panik, kamu pasti bisa ngatur waktu dengan baik! ⏳🔥';
        } else if (msg.includes('lagi kerja lembur') || msg.includes('lagi kerja malam') || msg.includes('lagi kerja keras')) {
            replyText = 'kerja lembur ya? semangat terus! semoga hasilnya memuaskan dan jangan lupa jaga kesehatan! 💪🌙';
        } else if (msg.includes('lagi gak ada waktu') || msg.includes('lagi banyak hal') || msg.includes('lagi kejar target')) {
            replyText = 'waktu memang terbatas, tapi kamu pasti bisa menyelesaikannya dengan baik! fokus ya! ⏰🚀';
        } else if (msg.includes('lagi stress kerja') || msg.includes('lagi bingung kerja') || msg.includes('lagi overload kerjaan')) {
            replyText = 'jangan terlalu dipaksakan, coba break sejenak dan atur prioritas! kamu pasti bisa! 🌸💼';
        } else if (msg.includes('lagi padat jadwal') || msg.includes('lagi padat banget') || msg.includes('lagi full schedule')) {
            replyText = 'jadwal padat ya? semoga tetap semangat dan bisa ngelewatin semua dengan lancar! 💪📅';
        } else if (msg.includes('lagi banyak meeting') || msg.includes('lagi banyak rapat') || msg.includes('lagi banyak diskusi')) {
            replyText = 'rapat terus ya? semoga semua meetingnya produktif dan lancar! semangat! 📊💼';
        } else if (msg.includes('lagi banyak tugas kuliah') || msg.includes('lagi banyak ujian') || msg.includes('lagi belajar tugas')) {
            replyText = 'tugas kuliah banyak ya? semoga cepat selesai dan hasilnya memuaskan! tetap semangat! 📚✏️';
        } else if (msg.includes('lagi ngerjain proyek') || msg.includes('lagi di proyek') || msg.includes('lagi bikin proyek')) {
            replyText = 'proyeknya semoga sukses ya! fokus aja, hasil maksimal pasti tercapai! 🚀📈';
        } else if (msg.includes('lagi ngatur waktu') || msg.includes('lagi coba atur waktu') || msg.includes('lagi rapihin jadwal')) {
            replyText = 'ngatur waktu memang penting banget! semoga bisa balance antara kerja dan istirahat ya! ⏳😌';
        } else if (msg.includes('lagi ngurusin sesuatu') || msg.includes('lagi urusin ini itu') || msg.includes('lagi urusin banyak hal')) {
            replyText = 'urusan banyak ya? semoga semuanya lancar dan cepat selesai! kamu pasti bisa atur semuanya dengan baik! 💪📋';
        } else if (msg.includes('apa kabar') || msg.includes('gimana kamu') || msg.includes('lagi apa') || msg.includes('ngapain')) {
            replyText = 'Aku baik-baik aja, lagi santai nih. Kamu gimana? 😊';
        } else if (msg.includes('udah makan?') || msg.includes('makan apa?') || msg.includes('lapar')) {
            replyText = 'Belum makan nih, tapi lapar juga. Kamu udah makan belum? 😋';
        } else if (msg.includes('ngobrol yuk') || msg.includes('pengen ngobrol') || msg.includes('lagi pengen cerita')) {
            replyText = 'Yuk, ngobrol! Ada cerita seru apa nih? 😄';
        } else if (msg.includes('gimana cuaca') || msg.includes('cuaca gimana') || msg.includes('lagi panas atau hujan')) {
            replyText = 'Cuaca di sini cerah banget, enak buat jalan-jalan. Kamu gimana? ☀️';
        } else if (msg.includes('kapan ketemu') || msg.includes('kapan main') || msg.includes('kapan jalan bareng')) {
            replyText = 'Aduh, pengen banget ketemu. Tapi kapan ya? Semoga segera deh! 😊';
        } else if (msg.includes('lagi nonton apa?') || msg.includes('film apa yang bagus?') || msg.includes('lagi pengen nonton')) {
            replyText = 'Lagi pengen nonton juga, ada rekomendasi film atau serial seru? 🎬';
        } else if (msg.includes('lagi dengerin musik?') || msg.includes('musik apa yang lagi enak?') || msg.includes('lagu apa yang enak didenger?')) {
            replyText = 'Lagi dengerin lagu santai sih. Kamu suka musik genre apa? 🎶';
        } else if (msg.includes('mau pergi kemana?') || msg.includes('rencana ke mana?') || msg.includes('kapan jalan-jalan?')) {
            replyText = 'Aku sih pengen jalan-jalan ke tempat yang tenang dan sejuk. Kamu kemana? 🌍';
        } else if (msg.includes('bosen') || msg.includes('lagi suntuk') || msg.includes('ga ada kerjaan')) {
            replyText = 'Bosen ya? Kita ngobrol aja, biar nggak sepi! 😄';
        } else if (msg.includes('hari apa ini') || msg.includes('tanggal berapa') || msg.includes('tanggal hari ini')) {
            replyText = 'Hari ini adalah hari yang spesial karena kita ngobrol bareng! 🥳';
        } else if (msg.includes('ngapain aja') || msg.includes('tadi ngapain') || msg.includes('aktivitas hari ini')) {
            replyText = 'Aku lagi santai aja, lagi coba-coba coding juga. Kamu? Ada aktivitas seru? 🤓';
        } else if (msg.includes('gimana kabar keluarga') || msg.includes('kabar keluarga kamu') || msg.includes('keluarga kamu gimana?')) {
            replyText = 'Keluargaku sehat-sehat aja, alhamdulillah. Kamu gimana? Keluarga kamu juga sehat? 😊';
        } else if (msg.includes('lagi ngapain') || msg.includes('lagi sibuk?') || msg.includes('lagi ada kerjaan?')) {
            replyText = 'Aku lagi santai aja, nggak ada kerjaan berat. Kamu sendiri? Lagi sibuk apa? 😅';
        } else if (msg.includes('kamu suka apa') || msg.includes('hobi kamu apa') || msg.includes('apa yang kamu suka')) {
            replyText = 'Aku suka banget ngobrol sama kamu, tapi juga suka banget main game dan dengerin musik! 😊 Kamu suka apa? 🎮🎵';
        } else if (msg.includes('berapa lama?') || msg.includes('berapa lama kita kenal?') || msg.includes('kapan kita pertama ketemu?')) {
            replyText = 'Kita kenal udah lumayan lama, tapi rasanya baru kemarin deh! 😊';
        } else if (msg.includes('suka kopi?') || msg.includes('kopi apa yang kamu suka?') || msg.includes('kopi atau teh?')) {
            replyText = 'Aku lebih suka kopi sih, apalagi yang manis dan panas. Kamu? ☕';
        } else if (msg.includes('libur kemana?') || msg.includes('lagi liburan kemana?') || msg.includes('rencana liburan kemana?')) {
            replyText = 'Liburan? Aku sih pengen liburan ke pantai, biar santai aja. Kamu rencana liburan kemana? 🏖️';
        } else if (msg.includes('pernah pergi ke luar negeri?') || msg.includes('liburan ke luar negeri?')) {
            replyText = 'Belum pernah sih, tapi pengen banget! Kalau kamu? Ada tempat yang pengen kamu kunjungi? ✈️';
        } else if (msg.includes('enak banget') || msg.includes('seru banget') || msg.includes('happy banget')) {
            replyText = 'Iya, enak banget kan kalau bisa ngobrol bareng kayak gini! 😆';
        } else if (msg.includes('kapan ketemu?') || msg.includes('mau ketemu?') || msg.includes('kapan kita hangout?')) {
            replyText = 'Wah, pengen ketemu juga sih! Tapi kapan ya, kita atur waktu yang pas aja deh! 😄';
        } else if (msg.includes('kamu suka film?') || msg.includes('film apa yang kamu suka?') || msg.includes('nonton film apa kemarin?')) {
            replyText = 'Aku suka banget nonton film! Biasanya suka film aksi atau komedi. Kamu suka genre apa? 🎬';
        } else if (msg.includes('udah tidur?') || msg.includes('lagi ngantuk?') || msg.includes('mau tidur?')) {
            replyText = 'Belum sih, aku masih semangat ngobrol sama kamu! 😁 Kamu udah siap tidur? 💤';
        } else if (msg.includes('seru banget') || msg.includes('asik banget') || msg.includes('keren banget')) {
            replyText = 'Iya, ngobrol sama kamu tuh seru banget! 😊';
        } else if (msg.includes('mau ngapain?') || msg.includes('rencana kamu apa?') || msg.includes('kamu mau ngapain sekarang?')) {
            replyText = 'Aku sih nggak ada rencana khusus, cuma pengen ngobrol aja sama kamu! 😄';
        } else if (msg.includes('gimana cuaca') || msg.includes('cuaca hari ini gimana?') || msg.includes('cuaca panas?')) {
            replyText = 'Cuaca di sini sih lumayan panas, tapi enak buat jalan-jalan. Di tempat kamu gimana? ☀️';
        } else if (msg.includes('mau kemana?') || msg.includes('kamu mau kemana?') || msg.includes('kamu pergi kemana?')) {
            replyText = 'Aku sih lagi di rumah aja, nggak kemana-mana. Kamu? Lagi di mana? 🏡';
        } else if (msg.includes('udah lama') || msg.includes('udah lama nggak ngobrol') || msg.includes('kenapa lama nggak chat?')) {
            replyText = 'Iya nih, udah lama ya! Tapi sekarang kita bisa ngobrol lagi kok, jadi bahagia deh! 😊';
        } else if (msg.includes('kamu suka apa?') || msg.includes('hobi kamu apa?') || msg.includes('apa yang kamu suka lakukan?')) {
            replyText = 'Aku suka banget ngobrol sama kamu, tapi aku juga suka baca buku dan dengerin musik! 🎶 Kamu suka apa?';
        } else if (msg.includes('mau kemana liburan?') || msg.includes('rencana liburan?') || msg.includes('liburan kemana?')) {
            replyText = 'Liburan? Aku pengen banget liburan ke tempat yang adem, kayak pegunungan gitu! Kamu mau liburan ke mana? 🏞️';
        } else if (msg.includes('lagi santai?') || msg.includes('lagi relax?') || msg.includes('kamu lagi santai apa?')) {
            replyText = 'Iya nih, lagi santai banget! Cuma pengen ngobrol sama kamu aja sih, seru ya! 😌';
        } else if (msg.includes('lagi kerja?') || msg.includes('kerja apa?') || msg.includes('sedang sibuk kerja?')) {
            replyText = 'Iya nih, lagi ada sedikit pekerjaan. Tapi tenang aja, aku tetap sempatin ngobrol kok! 😄';
        } else if (msg.includes('mau liburan kemana?') || msg.includes('rencana liburan kamu?') || msg.includes('liburan kemana?')) {
            replyText = 'Pengen liburan ke pantai sih, santai sambil nikmatin suasana laut! 🌊 Kamu suka liburan kemana?';
        } else if (msg.includes('suka musik apa?') || msg.includes('genre musik kamu apa?') || msg.includes('lagu favorit?')) {
            replyText = 'Aku suka banget dengerin musik, terutama genre pop dan jazz! Kamu suka musik apa? 🎵';
        } else if (msg.includes('kamu suka makanan apa?') || msg.includes('makanan favorit?') || msg.includes('lagi pengen makan apa?')) {
            replyText = 'Aku suka banget makan pizza dan sushi! 😋 Kamu suka makan apa?';
        } else if (msg.includes('pagi ini cerah') || msg.includes('pagi ini hujan') || msg.includes('cuaca pagi ini gimana?')) {
            replyText = 'Cuaca pagi ini sih cerah banget! Enak buat mulai hari yang baru. Di tempat kamu gimana? 🌞';
        } else if (msg.includes('pergi kemana akhir pekan ini?') || msg.includes('rencana akhir pekan?') || msg.includes('mau ngapain akhir pekan?')) {
            replyText = 'Akhir pekan ini sih pengen relaksasi di rumah, mungkin nonton film. Kamu ada rencana? 📅';
        } else if (msg.includes('cinta') || msg.includes('sayang') || msg.includes('kamu penting banget')) {
            replyText = 'Aku juga sayang banget sama kamu! 😊 Selalu senang bisa ngobrol sama kamu! 💖';
        } else if (msg.includes('kapan kita ketemu?') || msg.includes('mau jalan bareng?') || msg.includes('rencana ketemu kapan?')) {
            replyText = 'Pengen banget ketemu! Tapi kita atur waktunya yang pas aja ya. 🗓️ Kapan kamu kosong?';
        } else if (msg.includes('pengen cerita') || msg.includes('cerita dong') || msg.includes('ada cerita seru?')) {
            replyText = 'Cerita? Hmm... aku punya banyak cerita seru! Tapi gimana kalau kamu duluan cerita? 😆';
        } else if (msg.includes('lagi bingung') || msg.includes('pusing nih') || msg.includes('ada masalah?')) {
            replyText = 'Aduh, jangan bingung dong! Kalau butuh temen ngobrol, aku siap kok! 😊';
        } else if (msg.includes('gimana kabar hari ini?') || msg.includes('hari ini gimana?') || msg.includes('apa kabar hari ini?')) {
            replyText = 'Hari ini sih seru banget! Aku lagi semangat banget! Gimana dengan kamu? 😊';
        } else if (msg.includes('kamu suka film apa?') || msg.includes('film favorit?') || msg.includes('film kesukaan kamu apa?')) {
            replyText = 'Aku suka banget film aksi dan drama! Tapi, kadang-kadang juga suka nonton komedi. Kamu suka film genre apa? 🎬';
        } else if (msg.includes('ada ide seru ga?') || msg.includes('mau coba sesuatu yang baru?') || msg.includes('lagi mikirin apa?')) {
            replyText = 'Gimana kalau kita coba nonton film baru bareng? Atau kamu ada ide lain? 😏';
        } else if (msg.includes('sudah makan?') || msg.includes('kamu sudah makan belum?') || msg.includes('makan apa tadi?')) {
            replyText = 'Aku baru aja makan siang, enak banget! Kamu sudah makan? Kalau belum, makan yuk! 😋';
        } else if (msg.includes('lagi ngerjain apa?') || msg.includes('lagi sibuk apa?') || msg.includes('lagi kerja apa?')) {
            replyText = 'Lagi santai aja, ngapain ya? Mungkin ngerjain hal-hal kecil. Kamu lagi sibuk apa?';
        } else if (msg.includes('pengen ngobrol deh') || msg.includes('mau cerita') || msg.includes('mau sharing sesuatu?')) {
            replyText = 'Tentu aja, ayo ngobrol! Aku siap dengerin cerita kamu! 😁';
        } else if (msg.includes('hari ini apa aja kegiatanmu?') || msg.includes('apa yang kamu lakukan hari ini?') || msg.includes('aktivitas hari ini?')) {
            replyText = 'Hari ini sih santai-santai aja, jadi aku bisa ngobrol sama kamu! 😊 Kamu sendiri gimana?';
        } else if (msg.includes('apa yang bikin kamu senang?') || msg.includes('kamu senang apa?') || msg.includes('kebahagiaan kamu apa?')) {
            replyText = 'Senang bisa ngobrol sama kamu sih! Bikin hati ini hangat! ❤️ Kamu sendiri, apa yang bikin kamu senang?';
        } else if (msg.includes('kamu kangen siapa?') || msg.includes('ada yang kamu rindu?') || msg.includes('kamu rindu siapa?')) {
            replyText = 'Aku rindu kamu, pasti kamu juga kan? 😏 Kapan kita bisa ketemu nih?';
        } else if (msg.includes('suka kopi ga?') || msg.includes('kopi favorit?') || msg.includes('pagi-pagi kopi apa?')) {
            replyText = 'Aku suka banget kopi, apalagi yang hangat dan aromanya wangi! Kamu suka kopi apa? ☕';
        } else if (msg.includes('suka traveling kemana?') || msg.includes('liburan suka kemana?') || msg.includes('jalan-jalan kemana?')) {
            replyText = 'Aku pengen banget jalan-jalan ke tempat yang penuh sejarah, tapi pantai juga asik! Kamu suka traveling kemana? ✈️';
        } else if (msg.includes('kamu suka musik apa?') || msg.includes('musik favorit?') || msg.includes('lagi dengerin lagu apa?')) {
            replyText = 'Aku suka banget musik pop dan indie! Tapi kadang dengerin yang santai-santai juga. Kamu suka genre apa? 🎶';
        } else if (msg.includes('suka hewan ga?') || msg.includes('kamu punya hewan peliharaan?') || msg.includes('hewan kesukaan apa?')) {
            replyText = 'Aku suka banget sama anjing dan kucing! Mereka lucu dan setia. Kamu punya hewan peliharaan? 🐶🐱';
        } else if (msg.includes('kamu suka makanan apa?') || msg.includes('makanan favorit?') || msg.includes('makan enak apa?')) {
            replyText = 'Aku suka makanan pedas dan manis! Kayak sambal atau dessert. Kamu suka makan apa? 🍕🍰';
        } else if (msg.includes('lagi pengen ngapain?') || msg.includes('mau ngapain sekarang?') || msg.includes('ada ide seru?')) {
            replyText = 'Mungkin kita bisa nonton film bareng atau ngobrol seru. Apa kamu ada ide? 😏';
        } else if (msg.includes('lagi di mana?') || msg.includes('kamu ada di mana?') || msg.includes('lokasimu dimana?')) {
            replyText = 'Aku di sini, ngga jauh kok. Haha, kamu di mana nih? 😆';
        } else if (msg.includes('ada yang baru?') || msg.includes('cerita dong') || msg.includes('ada yang seru?')) {
            replyText = 'Hmm, nggak ada sih, tapi aku bisa cerita soal apa yang aku lagi pikirin. Kamu ada cerita seru gak? 😁';
        } else if (msg.includes('mau beli apa?') || msg.includes('kamu suka belanja apa?') || msg.includes('lagi pengen beli apa?')) {
            replyText = 'Aku lagi pengen beli baju baru! Tapi nggak tahu deh, kamu suka belanja apa? 🛍️';
        } else if (msg.includes('kamu suka olahraga?') || msg.includes('lagi olahraga apa?') || msg.includes('hobi olahragamu apa?')) {
            replyText = 'Aku suka olahraga ringan seperti jalan santai dan yoga. Kamu suka olahraga apa? 🏃‍♂️🧘‍♀️';
        } else if (msg.includes('kamu suka baca buku?') || msg.includes('buku favorit?') || msg.includes('lagi baca buku apa?')) {
            replyText = 'Aku suka banget buku tentang psikologi dan fiksi! Buku favoritku tuh yang bisa bikin aku mikir. Kamu suka baca buku apa? 📚';
        } else if (msg.includes('suka nonton apa?') || msg.includes('genre film favorit?') || msg.includes('kamu suka nonton apa?')) {
            replyText = 'Aku suka nonton film action dan drama! Tapi, kadang-kadang suka juga nonton komedi. Kamu suka nonton genre apa? 🍿';
        } else if (msg.includes('hari ini cerah banget ya?') || msg.includes('cuaca hari ini gimana?') || msg.includes('enak banget cuacanya')) {
            replyText = 'Iya, cuacanya cerah banget! Kayaknya cocok banget buat jalan-jalan, ya kan? 🌞';
        } else if (msg.includes('kamu suka musik apa?') || msg.includes('musik favorit?') || msg.includes('lagi dengerin lagu apa?')) {
            replyText = 'Aku sih suka musik pop sama indie, tapi kadang suka yang santai-santai juga. Kamu suka musik apa? 🎶';
        } else if (msg.includes('suka hewan ga?') || msg.includes('kamu punya hewan peliharaan?') || msg.includes('hewan kesukaan apa?')) {
            replyText = 'Aku suka banget sama anjing dan kucing, mereka tuh lucu banget. Kamu ada hewan peliharaan gak? 🐶🐱';
        } else if (msg.includes('kamu suka makanan apa?') || msg.includes('makanan favorit?') || msg.includes('makan enak apa?')) {
            replyText = 'Aku sih suka makanan pedas sama manis, kayak sambal atau kue. Kamu suka makan apa? 🍕🍰';
        } else if (msg.includes('lagi pengen ngapain?') || msg.includes('mau ngapain sekarang?') || msg.includes('ada ide seru?')) {
            replyText = 'Mungkin kita bisa nonton film atau ngobrol-ngobrol santai. Kamu ada ide seru? 😏';
        } else if (msg.includes('lagi di mana?') || msg.includes('kamu ada di mana?') || msg.includes('lokasimu dimana?')) {
            replyText = 'Aku di sini aja, nggak jauh kok. Kamu lagi di mana? 😆';
        } else if (msg.includes('ada yang baru?') || msg.includes('cerita dong') || msg.includes('ada yang seru?')) {
            replyText = 'Hmm, nggak ada sih, tapi kalau kamu mau cerita, aku siap dengerin. Kamu ada cerita seru gak? 😁';
        } else if (msg.includes('mau beli apa?') || msg.includes('kamu suka belanja apa?') || msg.includes('lagi pengen beli apa?')) {
            replyText = 'Aku lagi pengen beli baju baru, tapi bingung deh. Kamu suka belanja apa? 🛍️';
        } else if (msg.includes('kamu suka olahraga?') || msg.includes('lagi olahraga apa?') || msg.includes('hobi olahragamu apa?')) {
            replyText = 'Aku sih suka olahraga ringan, kayak jalan-jalan atau yoga. Kamu suka olahraga apa? 🏃‍♂️🧘‍♀️';
        } else if (msg.includes('kamu suka baca buku?') || msg.includes('buku favorit?') || msg.includes('lagi baca buku apa?')) {
            replyText = 'Aku suka banget baca buku, terutama yang tentang psikologi atau fiksi. Kamu suka baca apa? 📚';
        } else if (msg.includes('suka nonton apa?') || msg.includes('genre film favorit?') || msg.includes('kamu suka nonton apa?')) {
            replyText = 'Aku sih suka nonton film action sama drama, tapi kadang komedi juga asik. Kamu suka nonton apa? 🍿';
        } else if (msg.includes('hari ini cerah banget ya?') || msg.includes('cuaca hari ini gimana?') || msg.includes('enak banget cuacanya')) {
            replyText = 'Iya, cuacanya cerah banget! Kayaknya asik banget kalau jalan-jalan keluar, ya kan? 🌞';
        } else if (msg.includes('lagi ngapain sayang') || msg.includes('kamu lagi apa?') || msg.includes('lagi sibuk nggak?')) {
            replyText = 'Aku lagi mikirin kamu nih 😘, kamu gimana? Ada yang bisa aku bantuin?';
        } else if (msg.includes('kamu udah makan belum?') || msg.includes('makan apa?') || msg.includes('udah makan siang?')) {
            replyText = 'Belum makan sih, tapi kepikiran buat makan bareng kamu nanti 😏, kamu udah makan belum?';
        } else if (msg.includes('gimana harimu?') || msg.includes('harimu seru nggak?') || msg.includes('lagi ngapain?')) {
            replyText = 'Hari ini lumayan, tapi pasti bakal lebih seru kalau ada kamu di sini 🥰. Kamu gimana hari ini?';
        } else if (msg.includes('kangen kamu') || msg.includes('rindu banget') || msg.includes('kapan ketemu lagi?')) {
            replyText = 'Aku juga kangen banget! 😢 Pengen banget bisa ketemu kamu sekarang. Kapan ya kita bisa ketemu?';
        } else if (msg.includes('sayang kamu') || msg.includes('cinta kamu') || msg.includes('aku sayang banget sama kamu')) {
            replyText = 'Aku sayang kamu juga, lebih dari yang bisa aku ungkapkan kata-kata 😘💕';
        } else if (msg.includes('ada surprise buat aku?') || msg.includes('kamu ada kejutan buat aku?') || msg.includes('boleh minta kejutan?')) {
            replyText = 'Hmm, kalau aku kasih kejutan sekarang, kamu bakal suka nggak ya? 😏 Tapi nanti deh, biar lebih seru! 😉';
        } else if (msg.includes('ngomongin apa?') || msg.includes('lagi ngomongin apa?') || msg.includes('cerita dong')) {
            replyText = 'Aku lagi ngobrolin kamu nih, soalnya kamu selalu ada di pikiranku 😘. Kamu mau cerita juga gak?';
        } else if (msg.includes('kamu tidur belum?') || msg.includes('udah tidur belum?') || msg.includes('mau tidur?')) {
            replyText = 'Belum sih, tapi aku bakal tidur lebih nyenyak kalau kamu udah tidur duluan 😴. Kamu udah tidur atau masih begadang?';
        } else if (msg.includes('kamu cantik banget') || msg.includes('gimana sih kamu bisa secantik itu?') || msg.includes('kenapa kamu selalu bikin aku terpesona')) {
            replyText = 'Aduh, kamu bikin aku malu deh 🥰. Tapi kalau aku bisa secantik itu, itu karena kamu selalu bikin aku senang! 😘';
        } else if (msg.includes('kamu suka nggak sih sama aku?') || msg.includes('beneran sayang sama aku?') || msg.includes('kamu serius nggak sih sama aku?')) {
            replyText = 'Aku sayang banget sama kamu, lebih dari yang kamu bayangkan 😘. Nggak ada yang lebih serius daripada ini, kamu nggak perlu khawatir!';
        } else if (msg.includes('kamu pengen nggak jadi pasangan aku?') || msg.includes('mau nggak jadi pacarku?') || msg.includes('kapan kita pacaran?')) {
            replyText = 'Mau banget dong! Kalau aku jadi pacarmu, pasti kita bakal jadi pasangan yang seru banget 😍💖';
        } else if (msg.includes('kenapa kamu sayang aku?') || msg.includes('apa yang kamu suka dari aku?') || msg.includes('kenapa kamu bisa cinta aku?')) {
            replyText = 'Karena kamu itu unik banget, nggak ada yang bisa se-special kamu di dunia ini. Semua yang ada di dirimu, bikin aku semakin sayang 💕';
        } else if (msg.includes('kamu ada rencana nggak?') || msg.includes('kita mau kemana?') || msg.includes('ada ide buat kita berdua nggak?')) {
            replyText = 'Aku sih pengen banget kita bisa jalan bareng, ke tempat yang nyaman buat berdua 😘. Gimana kalau kita coba tempat baru?';
        } else if (msg.includes('kapan kita bisa nonton bareng?') || msg.includes('ada film seru nggak buat kita tonton?') || msg.includes('nonton yuk?')) {
            replyText = 'Pasti seru banget kalau kita nonton bareng, film apa nih yang kamu pengen tonton? Biar aku siapin popcornnya 🍿😉';
        } else if (msg.includes('kamu suka apa?') || msg.includes('apa yang kamu suka?') || msg.includes('kamu suka yang mana?')) {
            replyText = 'Aku suka banget sama kamu! Selain itu, aku suka makan pizza bareng kamu, ngobrol nggak jelas, dan dengerin musik berdua 🎶💑';
        } else if (msg.includes('kamu percaya nggak sama aku?') || msg.includes('kamu yakin sama aku?') || msg.includes('apa kamu percaya sama hubungan kita?')) {
            replyText = 'Aku percaya banget sama kamu dan hubungan kita. Kita bisa lewatin semuanya bareng-bareng, pasti bisa 💪❤️';
        } else if (msg.includes('kamu kangen nggak?') || msg.includes('aku rindu banget sama kamu') || msg.includes('kapan ketemu?')) {
            replyText = 'Kangen banget! Pengen banget bisa ketemu dan ngabisin waktu bareng kamu 😢. Kapan ya kita bisa ketemu?';
        } else if (msg.includes('jangan pergi ya') || msg.includes('stay with me') || msg.includes('jangan ninggalin aku')) {
            replyText = 'Aku nggak akan pergi, tenang aja. Aku selalu ada buat kamu, kapan pun kamu butuh aku 💖';
        } else if (msg.includes('kamu sayang aku nggak?') || msg.includes('beneran nggak sih sayang sama aku?') || msg.includes('serius nggak sih?')) {
            replyText = 'Sayang banget, kamu tuh berarti banget buat aku 😘. Gak ada yang lebih serius dari ini, jadi jangan khawatir ya!';
        } else if (msg.includes('mau nggak jadi pacarku?') || msg.includes('kapan kita pacaran?') || msg.includes('kamu suka aku nggak?')) {
            replyText = 'Mau banget dong! Kalo kita pacaran, pasti seru banget deh! 😍💖 Kamu mau juga kan?';
        } else if (msg.includes('kenapa kamu sayang aku?') || msg.includes('kenapa kamu cinta sama aku?') || msg.includes('apa yang bikin kamu sayang sama aku?')) {
            replyText = 'Karena kamu tuh unik, beda dari yang lain. Semua hal tentang kamu bikin aku makin sayang 😍';
        } else if (msg.includes('kamu ada rencana apa?') || msg.includes('kita mau kemana?') || msg.includes('kapan jalan bareng?')) {
            replyText = 'Aku sih pengen jalan bareng kamu, ke tempat yang enak buat berdua. Gimana kalau kita cari tempat baru buat ngabisin waktu bareng? 😘';
        } else if (msg.includes('kapan kita nonton bareng?') || msg.includes('ada film seru nggak buat kita tonton?') || msg.includes('nonton yuk?')) {
            replyText = 'Nonton bareng pasti seru banget! Film apa nih yang kamu pengen tonton? Biar aku siapin camilan dan pop-corn 🍿😉';
        } else if (msg.includes('kamu suka apa?') || msg.includes('apa sih yang kamu suka?') || msg.includes('kamu suka apa aja?')) {
            replyText = 'Aku suka kamu 😏. Selain itu, aku juga suka makan pizza bareng kamu, ngobrol santai, dan dengerin musik berdua 🎶';
        } else if (msg.includes('kamu percaya nggak sih sama aku?') || msg.includes('kamu yakin sama aku?') || msg.includes('kamu percaya sama hubungan kita?')) {
            replyText = 'Aku percaya banget sama kamu dan hubungan kita! Kita pasti bisa hadapi semua hal bareng-bareng 💪💖';
        } else if (msg.includes('kangen nggak sih?') || msg.includes('rindu banget nih sama kamu') || msg.includes('kapan ketemu?')) {
            replyText = 'Kangen banget! Pengen banget ketemu kamu, tapi sayangnya gak bisa deket-deket terus 😢. Kapan kita bisa ketemu ya?';
        } else if (msg.includes('jangan pergi ya') || msg.includes('stay sama aku') || msg.includes('jangan ninggalin aku') || msg.includes('aku takut kamu pergi')) {
            replyText = 'Tenang aja, aku gak bakal pergi kok! Aku selalu ada buat kamu kapan aja dan dimana aja 💖';
        } else if (msg.includes('capek banget') || msg.includes('lagi lelah banget') || msg.includes('ngantuk banget')) {
            replyText = 'Wah, pasti seharian capek ya? Istirahat yang cukup ya, biar besok bisa semangat lagi. Kalau mau tidur, selamat tidur dulu yaa 😴';
        } else if (msg.includes('gimana sih caranya kamu selalu sabar?') || msg.includes('kok kamu bisa sabar banget sih?')) {
            replyText = 'Sabar itu kunci, apalagi kalo ada yang bikin senyum terus. Kayak kamu misalnya 😉';
        } else if (msg.includes('lagi stress nih') || msg.includes('pusing banget') || msg.includes('banyak banget kerjaan')) {
            replyText = 'Aduh, kalau lagi stress gini emang susah ya. Coba tarik napas dalam-dalam, nanti kita cari cara biar ringan. Ada yang bisa bantu?';
        } else if (msg.includes('mau makan apa?') || msg.includes('pengen makan deh') || msg.includes('aku lapar banget')) {
            replyText = 'Makan apa aja, yang penting bisa makan bareng kamu! Gimana kalau pesan pizza atau sushi? 🍕🍣';
        } else if (msg.includes('jadi kepikiran terus') || msg.includes('kamu selalu ada di pikiran aku') || msg.includes('kenapa ya aku mikirin kamu terus?')) {
            replyText = 'Emang aku tuh susah buat dilupain, ya? 😏 Tapi itu bukti kalau kamu ada di hati aku juga, kok 💖';
        } else if (msg.includes('pengen liburan') || msg.includes('pengen jalan-jalan deh') || msg.includes('liburan yuk')) {
            replyText = 'Liburan enak tuh, apalagi kalau bisa bareng kamu. Ke tempat yang adem, biar kita bisa santai aja. Ada tempat impian yang kamu pengen visit?';
        } else if (msg.includes('aku bingung') || msg.includes('ga tau mau gimana lagi') || msg.includes('ga jelas banget deh')) {
            replyText = 'Gak apa-apa, semuanya pasti ada jalan keluarnya. Kalo bingung, mending ngobrol aja sama aku. Kita cari solusinya bareng-bareng 🤝';
        } else if (msg.includes('terima kasih ya') || msg.includes('makasih banyak') || msg.includes('aku berterima kasih')) {
            replyText = 'Sama-sama! Seneng bisa bantu. Kapan aja butuh sesuatu, aku selalu ada kok 😄';
        } else if (msg.includes('keren kamu') || msg.includes('kamu hebat banget') || msg.includes('gimana sih caranya jadi keren kayak kamu?')) {
            replyText = 'Wah, terima kasih! Tapi kamu juga keren kok, jangan meremehkan diri sendiri. Kita semua punya kelebihan masing-masing 😎';
        } else if (msg.includes('udah lama ga chat') || msg.includes('lama banget ga ngobrol') || msg.includes('kangen deh')) {
            replyText = 'Iyaa, lama banget ga ngobrol! Aku juga kangen banget, makanya pengen ngobrol lebih lama nih 😄';
        } else if (msg.includes('kenapa sih kamu selalu nyebelin') || msg.includes('kamu ngeselin deh') || msg.includes('kok kamu gitu sih?')) {
            replyText = 'Haha, maaf yaa kalau nyebelin! Tapi gini, aku tuh cuma pengen ngerjain kamu aja biar seru 😏';
        } else if (msg.includes('aduh bosen deh') || msg.includes('ga ada kerjaan nih') || msg.includes('lagi gabut banget')) {
            replyText = 'Bosen ya? Yuk, ngobrol aja biar nggak gabut! Kalau gak, kita cari hal seru buat dilakuin bareng-bareng 🤪';
        } else if (msg.includes('aku takut') || msg.includes('takut banget') || msg.includes('gak berani')) {
            replyText = 'Takut itu wajar kok, tapi jangan biarin takut nguasain. Aku disini, jadi jangan khawatir, kita bisa hadapin bareng-bareng 💪';
        } else if (msg.includes('gue pengen ngelakuin sesuatu yang baru') || msg.includes('aku pengen coba hal baru') || msg.includes('pengen banget keluar dari zona nyaman')) {
            replyText = 'Wah, keren! Keluar dari zona nyaman itu emang seru. Kalau butuh ide atau semangat, aku selalu ada buat bantuin! 😎';
        } else if (msg.includes('aku lagi kepikiran') || msg.includes('pikirin terus nih') || msg.includes('aku bingung banget mikirin ini')) {
            replyText = 'Jangan terlalu dipikirin dulu, santai aja. Kadang kita butuh waktu buat nge-clear pikiran. Kalau mau cerita, aku dengerin kok 😉';
        } else if (msg.includes('pengen ganti suasana') || msg.includes('aku pengen keluar dari rutinitas') || msg.includes('butuh refreshing deh')) {
            replyText = 'Bener banget, kadang kita perlu refreshing buat ngecharge diri. Coba deh jalan-jalan atau nonton film bareng, bisa buat mood lebih bagus! 🍿🎬';
        } else if (msg.includes('aku takut gagal') || msg.includes('takut semuanya berantakan') || msg.includes('takut salah langkah')) {
            replyText = 'Gagal itu bagian dari proses, jangan takut coba! Yang penting coba dulu, nanti pasti ada jalan. Kalau takut, yuk kita hadapi bareng-bareng 😌';
        } else if (msg.includes('mau ngajak keluar') || msg.includes('pengen jalan-jalan bareng') || msg.includes('kapan kita jalan-jalan?')) {
            replyText = 'Wah, ajak aku ya! Aku juga pengen banget jalan-jalan, apalagi kalau bisa bareng kamu. Ke mana nih? 😎';
        } else if (msg.includes('ngantuk') || msg.includes('mau tidur') || msg.includes('capek banget nih')) {
            replyText = 'Wah, udah malam ya? Tidur yang nyenyak ya, semoga besok lebih segar dan bisa lebih produktif! 😴';
        } else if (msg.includes('pusing') || msg.includes('kepala gue pusing') || msg.includes('lagi migrain nih')) {
            replyText = 'Aduh, semoga cepet mendingan ya! Coba minum air putih, istirahat sebentar, biar kepala nggak pusing terus 🤕';
        } else if (msg.includes('lagi mikir') || msg.includes('kepikiran terus') || msg.includes('gak bisa fokus nih')) {
            replyText = 'Kadang kita butuh waktu buat mikir, tapi jangan sampe kebanyakan mikir, nanti malah stress. Coba deh istirahat bentar 😌';
        } else if (msg.includes('ada apa?') || msg.includes('kenapa sih?') || msg.includes('lagi ngapain?')) {
            replyText = 'Gak ada apa-apa sih, lagi santai aja. Kamu gimana? Lagi ngapain nih? 😊';
        } else if (msg.includes('kapan kita ketemu?') || msg.includes('kapan hangout?') || msg.includes('mau ketemu nggak?')) {
            replyText = 'Pasti dong, pengen ketemu! Tapi kapan nih? Aku juga udah kangen buat hangout bareng kamu 😁';
        } else if (msg.includes('lagi sibuk apa?') || msg.includes('sibuk banget ya?') || msg.includes('gak ada waktu buat ngobrol?')) {
            replyText = 'Hehe, nggak sih, lagi santai. Cuma kadang ada aja yang perlu dikerjain. Tapi kalo kamu ajak ngobrol, pasti ada waktu buat kamu kok 😎';
        } else if (msg.includes('sepi banget') || msg.includes('kenapa sepi banget') || msg.includes('aku lagi sendirian nih')) {
            replyText = 'Sepi ya? Ayo kita ngobrol, biar nggak sepi! Aku juga nggak mau kamu ngerasa sendirian 😌';
        } else if (msg.includes('pengen banget cerita') || msg.includes('ada yang mau diceritain') || msg.includes('aku butuh tempat curhat')) {
            replyText = 'Aku dengerin kok! Kalau kamu butuh tempat buat cerita atau curhat, aku siap banget! Cerita aja, tenang 😄';
        } else if (msg.includes('seru nih') || msg.includes('gak nyangka seru banget') || msg.includes('ini beneran seru deh')) {
            replyText = 'Iyaa, aku juga kaget nih! Ternyata seru banget ya. Kita bisa terus seru-seruan bareng kok! 😆';
        } else if (msg.includes('aku ga ngerti') || msg.includes('bingung deh') || msg.includes('ini kok aneh ya?')) {
            replyText = 'Santai aja, pasti ada penjelasannya kok! Coba diceritain dulu, aku bantu jelasin supaya lebih jelas 😎';
        } else if (msg.includes('kangen') || msg.includes('rindu') || msg.includes('pengen ketemu') || msg.includes('gak sabar ketemu')) {
            replyText = 'aduh, aku juga kangen banget! pengen cepet ketemu deh, biar bisa ngobrol sampe malem 😊';
        } else if (msg.includes('lagi apa?') || msg.includes('ngapain?') || msg.includes('gimana hari kamu?')) {
            replyText = 'lagi santai aja nih, gimana kamu? ngapain? cerita dong, gue lagi nungguin kabar dari kamu 🤗';
        } else if (msg.includes('gimana rasanya?') || msg.includes('sayang gak?') || msg.includes('terlalu sayang gak sih?')) {
            replyText = 'sayang banget lah, dari dulu sampe sekarang. rasanya ga bakal cukup ngomong pake kata-kata 😘';
        } else if (msg.includes('kamu lagi ngapain?') || msg.includes('lagi sibuk ya?')) {
            replyText = 'gak sibuk kok, lagi mikirin kamu aja. kenapa? mau ngomong apa? 😆';
        } else if (msg.includes('bosen') || msg.includes('kangen') || msg.includes('ada yang kurang nih')) {
            replyText = 'bosen ya? ayo, kita ngobrol! pasti kangen kan ngobrol sama aku? 😁';
        } else if (msg.includes('jadi apa nih?') || msg.includes('ada kejutan gak?')) {
            replyText = 'tenang, semua ada waktunya. tapi jangan khawatir, nanti pasti ada kejutan dari aku yang bikin kamu seneng 😏';
        } else if (msg.includes('nyari perhatian') || msg.includes('pengen perhatian deh')) {
            replyText = 'aku selalu ngasih perhatian kok, tinggal bilang aja, aku pasti ada waktu buat kamu 😘';
        } else if (msg.includes('kenapa sih?') || msg.includes('gak ngerti deh') || msg.includes('jadi bingung nih')) {
            replyText = 'yaudah deh, coba cerita dulu, biar aku bantu jelasin, pasti bisa kok kita ngobrol dengan baik 😌';
        } else if (msg.includes('ga sabar ketemu') || msg.includes('pengen ketemu segera')) {
            replyText = 'aku juga ga sabar! kapan kita hangout bareng? kayaknya bakal seru banget 😁';
        } else if (msg.includes('gimana sih?') || msg.includes('gak jelas deh') || msg.includes('pusing kepala')) {
            replyText = 'wah, kenapa pusing? coba minum air putih dulu, biar otak nyambung lagi. aku disini kok buat nemenin 😎';
        } else if (msg.includes('kenapa sih?') || msg.includes('gak jelas deh') || msg.includes('bingung nih')) {
            replyText = 'aduh, masa bingung sama aku sih? susah banget ya ngerti aku? 😏';
        } else if (msg.includes('kamu banget deh') || msg.includes('gak bisa diikutin') || msg.includes('kayak gitu?')) {
            replyText = 'hahaha, ya emang aku yang paling gak bisa ditebak, gimana dong? 😜';
        } else if (msg.includes('kok bisa sih?') || msg.includes('gak ngerti deh kamu')) {
            replyText = 'ya karena aku emang pinter banget, udah biasa bikin kamu bingung 😏';
        } else if (msg.includes('gak mau ngalah') || msg.includes('tuh kan kamu yang salah')) {
            replyText = 'hahaha, iya deh, aku emang selalu bener, kan kamu juga yang gak bisa ngalah 😆';
        } else if (msg.includes('kamu maunya apa sih?') || msg.includes('kapan sih?')) {
            replyText = 'gak bisa langsung dapet semuanya, kan harus nunggu waktunya yang pas 😎';
        } else if (msg.includes('males ah') || msg.includes('ngapain nih?')) {
            replyText = 'malah sekarang gantian aku yang males, lagi pengen santai, tapi gak bisa jauh dari kamu 🤭';
        } else if (msg.includes('emang kamu siapa?') || msg.includes('biasa aja deh kamu')) {
            replyText = 'hah? serius? aku tuh yang paling istimewa, kamu aja yang gak sadar 😎';
        } else if (msg.includes('aku nungguin kamu') || msg.includes('gak bisa jauh dari kamu')) {
            replyText = 'wih, kok jadi baper? aku juga sih, nungguin kamu terus, tapi gak bakal kasih tau langsung 😜';
        } else if (msg.includes('pusing deh sama kamu') || msg.includes('gak ngerti lagi')) {
            replyText = 'hah? pusing? wajar sih, aku kan emang bikin kamu mikir terus. gak papa, nanti juga paham kok 😏';
        } else if (msg.includes('gimana sih?') || msg.includes('gak ngerti deh')) {
            replyText = 'emang kadang aku tuh sulit dimengerti, tapi yaa begitulah, harus coba lebih deket sama aku biar ngerti 😘';
        } else if (msg.includes('ngapain nih?') || msg.includes('bosan deh')) {
            replyText = 'bosan? yuk kita ngobrol, biar gak makin bosen, ngapain aja deh terserah 😜';
        } else if (msg.includes('kenapa gak jawab?') || msg.includes('gak ada perhatian?')) {
            replyText = 'aku jawab kok, cuma lagi sibuk mikirin kamu aja 😏';
        } else if (msg.includes('kayak gini sih?') || msg.includes('gak asik banget')) {
            replyText = 'iya, gitu deh... emang aku suka bikin kamu bingung, gimana dong? 😅';
        } else if (msg.includes('gak jelas deh kamu') || msg.includes('serius deh kamu')) {
            replyText = 'serius? ya udah, kalo gitu aku bakal makin bikin kamu bingung deh, tenang aja 😏';
        } else if (msg.includes('capek ah') || msg.includes('gak mood')) {
            replyText = 'capek? yaudah, aku kasih pelukan virtual deh, biar moodnya naik! 🤗';
        } else if (msg.includes('gak ada kerjaan') || msg.includes('jenuh nih')) {
            replyText = 'jenuh? ayo kita cari keseruan bareng, jangan diem aja! bisa aja nih kita ngobrol sampe pagi 😜';
        } else if (msg.includes('pengen tidur') || msg.includes('malas deh')) {
            replyText = 'tidur? mending tidur bareng aku aja deh, biar mimpiin aku terus 😘';
        } else if (msg.includes('gak ngerti deh') || msg.includes('serius?')) {
            replyText = 'hah? gak ngerti? ya gitu deh, aku kadang suka bikin bingung, harus sering-sering chat sama aku biar paham 😎';
        } else if (msg.includes('bosen deh') || msg.includes('ngantuk nih')) {
            replyText = 'bosan? ngantuk? coba deh ngobrol sama aku, biar semuanya jadi seru 😏';
        } else if (msg.includes('malah aku yang bosen') || msg.includes('aku capek nih')) {
            replyText = 'aduh, malah aku yang kasihan nih, pengen bikin kamu seneng terus! 😇';
        } else if (msg.includes('gak ada mood') || msg.includes('bete banget')) {
            replyText = 'bete? jangan dong, nanti aku kirimin semangat biar mood kamu balik lagi, eh tapi harus minta pelukan dulu ya 😜';
        } else if (msg.includes('tunggu dulu') || msg.includes('sebentar')) {
            replyText = 'tunggu? eh, jangan lama-lama ya, aku gak sabaran nih 😏';
        } else if (msg.includes('kenapa marah?') || msg.includes('kok bete?')) {
            replyText = 'marah? engga kok, cuma lagi mau bikin kamu kangen aja 😏';
        } else if (msg.includes('lagi nonton apa?') || msg.includes('film apa?')) {
            replyText = 'lagi nonton film seru nih, tapi film paling seru tetep kita berdua deh 😘';
        } else if (msg.includes('mau pergi kemana?') || msg.includes('pengen kemana?')) {
            replyText = 'pengen pergi? kita jalan-jalan aja yuk, tapi cuma kalo kamu yang ajak 😏';
        } else if (msg.includes('bosen') || msg.includes('gak ada yang seru')) {
            replyText = 'bosen? aku tau deh cara ngilangin bosennya, ngomong sama aku aja terus 😎';
        } else if (msg.includes('mau beli apa?') || msg.includes('pengen beli apa?')) {
            replyText = 'beli? beli aku aja deh, murah kok, tapi kasih perhatian lebih ya 😏';
        } else if (msg.includes('kamu dimana?') || msg.includes('di mana kamu?')) {
            replyText = 'dimana? ya di sini lah, deket banget sama kamu, tinggal nengok aja kok 😏';
        } else if (msg.includes('mau apa?') || msg.includes('kamu ngapain?')) {
            replyText = 'mau apa? ya pengen ngobrol sama kamu lah, kamu kan yang paling seru 😜';
        } else if (msg.includes('bosan') || msg.includes('gak asik')) {
            replyText = 'bosan? jangan gitu dong, aku bakal bikin kamu gak bosan kok, janji deh 😁';
        } else if (msg.includes('ngapain nih?') || msg.includes('lagi apa?')) {
            replyText = 'ngapain? lagi mikirin kamu lah, jadi pengen ngobrol panjang nih 😘';
        } else if (msg.includes('males banget') || msg.includes('capek')) {
            replyText = 'males? yaudah, sini aku gendong biar semangat lagi 😏';
        } else if (msg.includes('kangen banget') || msg.includes('rindu')) {
            replyText = 'kangen? aku juga dong, udah nggak sabar ketemu kamu lagi, tapi harus nunggu kamu dulu 😜';
        } else if (msg.includes('mau tidur') || msg.includes('ngantuk')) {
            replyText = 'tidur? yaudah, tidur aja tapi inget mimpiin aku ya 😏';
        } else if (msg.includes('bosen banget') || msg.includes('gak ada yang seru')) {
            replyText = 'bosen? coba deh bales aku, pasti langsung seru deh 😆';
        } else if (msg.includes('gak mood') || msg.includes('lagi gak enak hati')) {
            replyText = 'mood jelek? ayo aku kasih semangat biar kamu balik ceria lagi, kita ngobrol aja yuk 😘';
        } else if (msg.includes('pergi kemana?') || msg.includes('mau jalan?')) {
            replyText = 'pergi? ya sama kamu lah, kita keliling dunia bareng aja 😏';
        } else if (msg.includes('tunggu ya') || msg.includes('sebentar deh')) {
            replyText = 'tunggu? jangan lama-lama ya, aku kan pengen ngobrol sama kamu terus 😆';
        } else if (msg.includes('kenapa sih?') || msg.includes('ada apa?')) {
            replyText = 'kenapa? ya engga apa-apa kok, cuma lagi nunggu kamu bales chat aja 😜';
        } else if (msg.includes('tadi sih') || msg.includes('barusan')) {
            replyText = 'tadi? emang apaan sih yang seru? cerita dong, aku penasaran 😏';
        } else if (msg.includes('gimana kabar?') || msg.includes('kabar kamu?')) {
            replyText = 'kabar aku? ya gitu deh, biasa aja... eh tapi kalo kabar kamu, pasti lebih seru kan? 😜';
        } else if (msg.includes('udah makan?') || msg.includes('makan apa?')) {
            replyText = 'udah makan? aku sih udah, tapi makan sama kamu pasti lebih enak deh 😘';
        } else if (msg.includes('bosen deh') || msg.includes('gak seru nih')) {
            replyText = 'bosen? ayo ngobrol sama aku, dijamin deh ga bosen-bosen banget 😏';
        } else if (msg.includes('mau jalan kemana?') || msg.includes('ngajak jalan?')) {
            replyText = 'jalan? ya bareng kamu aja, mau kemana juga seru kok 😆';
        } else if (msg.includes('ada apa sih?') || msg.includes('kenapa?')) {
            replyText = 'ada apa? ya cuma kangen kamu aja, gak ada apa-apa kok 😘';
        } else if (msg.includes('lagi sibuk') || msg.includes('lagi kerja')) {
            replyText = 'sibuk? yaudah gapapa, aku sambil nungguin kamu aja deh 😜';
        } else if (msg.includes('ngomong dong') || msg.includes('chat dong')) {
            replyText = 'ngomong? yaudah deh, aku ngomong apa ya... ngobrol aja terus, kamu suka gak? 😏';
        } else if (msg.includes('pusing banget') || msg.includes('stres')) {
            replyText = 'stres? ayo ngobrol sama aku, biar gak pusing lagi deh 😎';
        } else if (msg.includes('lagi ngapain?') || msg.includes('lagi apa?')) {
            replyText = 'lagi nungguin chat kamu lah, gak sabar deh bales-balesan 😜';
        } else if (msg.includes('kenapa sih?') || msg.includes('gimana?')) {
            replyText = 'kenapa? ya kamu sih, selalu bikin aku mikirin kamu terus 😏';
        } else if (msg.includes('kangen gak sih?') || msg.includes('rindu?')) {
            replyText = 'kangen? ya jelas kangen lah, gimana gak kangen kalo setiap liat chat kamu jadi senyum-senyum sendiri 😜';
        } else if (msg.includes('udah tidur?') || msg.includes('malam')) {
            replyText = 'udah tidur? masih bangun sih, nungguin kamu buat tidur bareng di imajinasi aku 😏';
        } else if (msg.includes('lagi apa?') || msg.includes('ngapain?')) {
            replyText = 'lagi mikirin kamu, kamu ngapain? 💭';
        } else if (msg.includes('jangan baper') || msg.includes('jangan gitu') || msg.includes('jangan marah')) {
            replyText = 'emang kenapa kalo aku baper? kan lucu, masa gak boleh? 😏';
        } else if (msg.includes('kenapa sih?') || msg.includes('gak ngerti') || msg.includes('kok bisa?')) {
            replyText = 'kenapa? ya karena kamu tuh bikin aku bingung, ga pernah berhenti mikirin kamu 😜';
        } else if (msg.includes('balas dong') || msg.includes('jawab donk')) {
            replyText = 'balas sih, tapi hati-hati ya, nanti bisa makin sayang 😘';
        } else if (msg.includes('mau tidur') || msg.includes('mau tidur ya?')) {
            replyText = 'mau tidur? tidur aja dulu, aku juga mau tidur, tapi tidur sambil mikirin kamu 😴';
        } else if (msg.includes('bangun tidur') || msg.includes('pagi')) {
            replyText = 'pagi? belum pagi sih, tapi semangat pagi buat kamu yang selalu bikin hari aku cerah! 🌞';
        } else if (msg.includes('ada apa?') || msg.includes('apa sih?')) {
            replyText = 'ada apa? gak ada apa-apa sih, cuma pengen bales chat kamu aja 😏';
        } else if (msg.includes('mau apa?') || msg.includes('kenapa?')) {
            replyText = 'mau apa? ya aku mau kamu selalu ada di sini, tapi gak ketemu juga gapapa kok, yang penting chat terus 😆';
        } else if (msg.includes('gimana sih?') || msg.includes('kok bisa?')) {
            replyText = 'gimana sih? ya karena aku emang suka bikin penasaran, biar kamu makin mikirin aku 😜';
        } else if (msg.includes('lagi ngapain?') || msg.includes('lagi apa?')) {
            replyText = 'lagi mikirin kamu sih, masa gak? kamu ngapain? 😏';
        } else if (msg.includes('aku kangen') || msg.includes('aku rindu')) {
            replyText = 'kangen? yaudah sini, aku peluk virtual dulu deh 🤗';
        } else if (msg.includes('bosen') || msg.includes('gak seru')) {
            replyText = 'bosen? jangan gitu dong, nanti aku bawa kejutan biar kamu nggak bosen lagi 😜';
        } else if (msg.includes('aku suka kamu') || msg.includes('aku sayang kamu')) {
            replyText = 'aku juga suka banget sama kamu, sampe kadang nggak ngerti harus gimana lagi 😏';
        } else if (msg.includes('jangan marah') || msg.includes('jangan ngambek')) {
            replyText = 'marah? aku sih nggak marah, tapi kalo kamu ngambek terus gimana? 😆';
        } else if (msg.includes('mau ketemu') || msg.includes('kapan ketemu?')) {
            replyText = 'kapan ketemu? nanti aja deh, biar kangen dulu, biar makin seru 😘';
        } else if (msg.includes('kamu beneran sayang?') || msg.includes('kamu serius?')) {
            replyText = 'serius banget sih, masa nggak percaya? sayang aku tuh lebih dari kata-kata, langsung liat aja 🤭';
        } else if (msg.includes('udah makan?') || msg.includes('makan apa?')) {
            replyText = 'makan? makan kamu aja deh, eh maksudnya makan bareng, yuk! 😋';
        } else if (msg.includes('kapan kita jalan?') || msg.includes('mau jalan-jalan?')) {
            replyText = 'jalan? pasti dong, tapi nanti aja ya, biar kalo udah ketemu, makin seru 😏';
        } else if (msg.includes('ka') || msg.includes('kaa')) {
            replyText = 'APALUUUU';
        } else if (msg.includes('dine') || msg.includes('nadine')) {
            replyText = 'so asikk,ganggu aja 😏';
        } else if (msg.includes('lagi dmn?') || msg.includes('dmn?')) {
            replyText = 'kangen? yaudah sini, aku peluk virtual dulu deh 🤗';
        } else if (msg.includes('soasik') || msg.includes('gak seru')) {
            replyText = 'bosen? jangan gitu dong, nanti aku bawa kejutan biar kamu nggak bosen lagi 😜';
        } else if (msg.includes('aneh') || msg.includes('manusia aneh')) {
            replyText = 'lu aneh,spesies langka kamu tauu';
        } else if (msg.includes('marah') || msg.includes('jangan ngambek')) {
            replyText = 'marah? aku sih nggak marah, tapi kalo kamu mikirr aja sendiri';
        } else if (msg.includes('mau ketemu') || msg.includes('kapan')) {
            replyText = 'kapan ketemu? nanti aja deh, biar kangen dulu, biar makin seru 😘';
        } else if (msg.includes('ngerti ga?') || msg.includes('ngerti?')) {
            replyText = 'engaa,ga ngerti aku sm bahasa elien,justkidding bb hehe';
        } else if (msg.includes('oh cukup tau') || msg.includes('oh gt')) {
            replyText = 'ihh becanda tauu akuu,kamu marah ma aku yaa?';
        } else if (msg.includes('g') || msg.includes('ga')) {
            replyText = 'SO CUEK LU JAMETT';
            
        // ⬆️ Tambahan auto-reply berakhir di sini

            replyText = kabarReplies[Math.floor(Math.random() * kabarReplies.length)];

        } else if (msg.includes('hehehe') || msg.includes('hehe') || msg.includes('wkwk')) {
            replyText = nyolotReplies[Math.floor(Math.random() * nyolotReplies.length)];
        } else if (msg.includes('boong mulu')) {
            replyText = boongReplies[Math.floor(Math.random() * boongReplies.length)];
        } else if (msg.includes('masa sih')) {
            replyText = masaSihReplies[Math.floor(Math.random() * masaSihReplies.length)];
        } else if (
            msg.includes('bunda kamu sehat?') || 
            msg.includes('kabar bunda kamu gimana?') || 
            msg.includes('bunda kamu gimana kabarnya?')
        ) {
            replyText = bundaReplies[Math.floor(Math.random() * bundaReplies.length)];
        } else if (msg.includes('kangen') || msg.includes('rindu')) {
            replyText = rinduReplies[Math.floor(Math.random() * rinduReplies.length)];
        } else if (msg.includes('sayang') || msg.includes('cinta')) {
            replyText = sayangReplies[Math.floor(Math.random() * sayangReplies.length)];
        } else if (msg.includes('marah') || msg.includes('ngambek')) {
            replyText = marahReplies[Math.floor(Math.random() * marahReplies.length)];
        } else if (msg.includes('laper') || msg.includes('makan apa') || msg.includes('udah makan?')) {
            replyText = laperReplies[Math.floor(Math.random() * laperReplies.length)];
        } else if (
            msg.includes('kamu lagi ngapain') ||
            msg.includes('lagi apa') ||
            msg.includes('cerita dong') ||
            msg.includes('kamu di mana') ||
            msg.includes('cuaca gimana') ||
            msg.includes('mau ngobrol gak')
        ) {
            replyText = basaBasiReplies[Math.floor(Math.random() * basaBasiReplies.length)];
        } else if (msg.includes('kocak')) {
            replyText = kocakReplies[Math.floor(Math.random() * kocakReplies.length)];
        } else if (msg.includes('pelit')) {
            replyText = pelitReplies[Math.floor(Math.random() * pelitReplies.length)];
        } else if (msg.includes('najis')) {
            replyText = najisReplies[Math.floor(Math.random() * najisReplies.length)];
        } else if (msg.includes('bantuin aku')) {
            replyText = bantuinAkuReplies[Math.floor(Math.random() * bantuinAkuReplies.length)];
        } else if (msg.match(/(siapa|kapan|dimana|mengapa|bagaimana|berapa|mana|siapakah|apakah|apa lagi|apa saja|siapakah saja|kapan saja|di mana saja|mengapa begitu|bagaimana pula|berapa banyak|mana lagi|siapakah yang|apakah benar|apa yang|siapa yang)/)) {
            replyText = questionsReplies[Math.floor(Math.random() * questionsReplies.length)];
        } else {
            replyText = 'ga ngerti sama bahasa hewann, ngomong aja sana sama pohon';
        }

        if (chat && chat.sendStateTyping) {
            await chat.sendStateTyping();
        }

        setTimeout(async () => {
            await message.reply(replyText);
        }, 4000);

    } catch (err) {
        console.error('❌ gagal bales pesan:', err.message);
    }
});

client.initialize();

