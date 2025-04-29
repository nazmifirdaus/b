const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const cron = require('node-cron');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: 'new', // atau true
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});
const app = express();
const PORT = process.env.PORT || 3000;

let latestQRData = null;

app.use(cors());

// Menyajikan file statis (termasuk qr.png)
app.use('/static', express.static(path.join(__dirname)));

app.get('/qr', (req, res) => {
    const qrPath = path.join(__dirname, 'public', 'qr.png');
    if (fs.existsSync(qrPath)) {
        res.sendFile(qrPath);
    } else {
        res.status(404).send('QR belum tersedia.');
    }
});


app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});

app.listen(PORT, () => {
    console.log(`📡 Express aktif di port ${PORT}`);
});


const TARGET_CHAT_ID = '6285694193698@c.us';
const qrDir = path.join(__dirname, 'public');
if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
}
QRCode.toFile(path.join(qrDir, 'qr.png'), qr, {
    width: 300
}, function (err) {
    if (err) {
        console.error('❌ Gagal menyimpan QR:', err.message);
    } else {
        console.log('🖼️ QR Code berhasil disimpan!');
    }
});


client.on('ready', () => {
    console.log('✅ bot siap digunakan!');

    cron.schedule('0 5 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'selamat pagiii sayangg 😘 semangat ya harinya, aku tahu hari ini bakal jadi hari yang seru banget buat kamu! 🥳');
        }, 5000);
    });

    cron.schedule('47 11 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'selamat mam yaaa, jangan lupa sholat yaaah 😇 semoga harimu menyenangkan babaiiii?');
        }, 5000);
    });

    cron.schedule('30 18 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'oiiii mandiii 🛁 jangan malesan! mau ngapain hari ini? ada rencana spesial?');
        }, 5000);
    });

    cron.schedule('0 17 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'aku udaahh pulangg 😁 bolee cita tidaaa? aku kangen banget nih! 🤗');
        }, 5000);
    });

    cron.schedule('49 21 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'boleee call? 😳 pengen denger suaramu, lagi ngapain?');
        }, 5000);
    });

    cron.schedule('20 22 * * *', () => {
        setTimeout(() => {
            client.sendMessage(TARGET_CHAT_ID, 'good night yaaa 💗 have a sweet dream 😴 semoga tidurmu nyenyak dan bangun besok lebih bahagia!');
        }, 5000);
    });
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

        const bantuinAkuReplies = [
            'gamauukk akuu gii sibukk tauu',
            'kiss duluu baru aku bantuinn🙄',
            'GAAAMAUUU'
        ];

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

        if (msg.includes('hai')) {
            replyText = 'kangenn yaa, jadi pengen ngobrol panjang nih 😆';
        } else if (
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
