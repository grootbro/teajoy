const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://spacefox:goodwin2025@localhost:27017/teajoy?authSource=admin';

const products = [
  {
    id: 1,
    name: {
      en: "'Sugar Baby' – Sensi seeds",
      ru: "'Сахарная малышка' – Sensi seeds",
      th: "'Sugar Baby' – Sensi seeds",
    },
    gr: 10,
    img: "https://res.cloudinary.com/dov6nv91n/image/upload/v1725040838/Untitled_11_dm1u2y.png",
    price: 2000,
    int: 4,
    qty: 0,
    text: {
      en: "Sugar Baby, not to be confused with the like-named \"Sugar Babe,\" is an indica dominant hybrid strain created as a descendant of Mount Cook X an unknown ruderalis strain. This delicious baby has one of the most sweet and sugary flavors you'll ever get the opportunity to taste – just one toke and you'll be in love. The aroma is just as sweet, although with a touch of mellow florals and rich earth to it. The Sugar Baby high is the perfect highly medicinal stone that hits both mind and body with a high level of potency. You'll feel it creep up on you slowly, spreading from your spine throughout the rest of your body in soothing waves, lulling you into a state of pure relaxation and ease.",
      ru: "Sugar Baby, не путать с одноименным \"Sugar Babe\", - это гибридный сорт с доминированием индики, созданный как потомок Mount Cook X неизвестного штамма рудералиса. У этого вкусного малыша один из самых сладких и сахарных вкусов, которые вы когда-либо сможете попробовать - всего одна затяжка, и вы влюбитесь. Аромат такой же сладкий, хотя с нотками мягких цветов и насыщенной земли. Эффект Sugar Baby - это идеальный медицинский стоун, который воздействует на разум и тело с высоким уровнем потенции. Вы почувствуете, как он медленно подкрадывается к вам, распространяясь от позвоночника по всему телу успокаивающими волнами, погружая вас в состояние чистого расслабления и покоя.",
      th: "Sugar Baby ไม่ควรสับสนกับชื่อที่คล้ายกัน \"Sugar Babe\" เป็นสายพันธุ์ไฮบริดที่มีอินดิก้าเป็นหลัก สร้างขึ้นเป็นลูกหลานของ Mount Cook X กับรูเดอราลิสสายพันธุ์ที่ไม่รู้จัก ตัวน้อยแสนอร่อยนี้มีรสชาติหวานและเหมือนน้ำตาลที่สุดที่คุณจะได้ลอง เพียงสูบครั้งเดียวคุณก็จะตกหลุมรัก กลิ่นหอมก็หวานเช่นกัน แม้ว่าจะมีกลิ่นดอกไม้อ่อนๆ และดินที่เข้มข้น ความไฮของ Sugar Baby เป็นสโตนที่มีคุณสมบัติทางการแพทย์สูง ส่งผลกระทบต่อทั้งจิตใจและร่างกายด้วยความแรงสูง คุณจะรู้สึกว่ามันค่อยๆ คืบคลานมาหาคุณ แพร่กระจายจากกระดูกสันหลังไปทั่วร่างกายด้วยคลื่นที่ผ่อนคลาย ทำให้คุณเข้าสู่สภาวะผ่อนคลายและสบายอย่างแท้จริง",
    },
    active: true
  },
  {
    id: 3,
    name: {
      en: "'Cherry Buff' – Zen Seeds",
      ru: "'Вишнёвый баф' – Zen Seeds",
      th: "'Cherry Buff' – Zen Seeds",
    },
    gr: 10,
    img: "https://res.cloudinary.com/dov6nv91n/image/upload/v1725057218/kjsvrtcqnqkwlb9o5mwt.png",
    price: 2500,
    int: 6,
    qty: 0,
    text: {
      en: "The Super Cherry Buff strain is a hybrid that has high levels of cannabinoids, including THC and CBD. This variety is known for its fruity aromas and flavors, giving it a unique profile. Our Super Cherry Buff buds is recognized as champion of people best choice.",
      ru: "Сорт Super Cherry Buff - это гибрид с высоким уровнем каннабиноидов, включая THC и CBD. Этот сорт известен своими фруктовыми ароматами и вкусами, что придает ему уникальный профиль. Наши шишки Super Cherry Buff признаны чемпионом народного выбора.",
      th: "สายพันธุ์ Super Cherry Buff เป็นไฮบริดที่มีระดับแคนนาบินอยด์สูง รวมถึง THC และ CBD สายพันธุ์นี้เป็นที่รู้จักจากกลิ่นหอมและรสชาติของผลไม้ ทำให้มีลักษณะเฉพาะตัว ดอก Super Cherry Buff ของเราได้รับการยอมรับว่าเป็นแชมป์ของทางเลือกที่ดีที่สุดของผู้คน",
    },
    active: true
  },
  {
    id: 5,
    name: {
      en: "'Sweet & Slow' – Exotic strains",
      ru: "'Сладко и медленно' – Exotic strains",
      th: "'Sweet & Slow' – Exotic strains",
    },
    gr: 10,
    img: "https://res.cloudinary.com/dov6nv91n/image/upload/v1725041190/Untitled_12_vcsn3d.png",
    price: 2300,
    int: 5,
    qty: 0,
    text: {
      en: "Slow N Sweet is a hybrid weed strain made from a genetic cross between Runtz and Sundae Driver. This strain is 50% sativa and 50% indica. Slow N Sweet is 29% THC, making this strain an ideal choice for experienced cannabis consumers. Ninjabuds customers tell us Slow N Sweet effects include feeling relaxed, happy, and euphoric. Medical marijuana patients often choose Slow N Sweet when dealing with symptoms associated with stress, insomnia, and pain. Bred by Cresco, Slow N Sweet features flavors like sweet, creamy chocolate, sugary fruit. The dominant terpene of this strain is myrcene, which contributes to its sedating and anti-inflammatory properties.",
      ru: "Slow N Sweet - это гибридный сорт, созданный путем генетического скрещивания Runtz и Sundae Driver. Этот сорт на 50% сатива и на 50% индика. Slow N Sweet содержит 29% THC, что делает этот сорт идеальным выбором для опытных потребителей каннабиса. Клиенты Ninjabuds говорят нам, что эффекты Slow N Sweet включают чувство расслабления, счастья и эйфории. Пациенты с медицинской марихуаной часто выбирают Slow N Sweet при борьбе с симптомами, связанными со стрессом, бессонницей и болью. Выведенный компанией Cresco, Slow N Sweet имеет вкусы сладкого кремового шоколада и сахарных фруктов. Доминирующим терпеном этого сорта является мирцен, который способствует его успокаивающим и противовоспалительным свойствам.",
      th: "Slow N Sweet เป็นสายพันธุ์ไฮบริดที่สร้างจากการผสมพันธุกรรมระหว่าง Runtz และ Sundae Driver สายพันธุ์นี้เป็น 50% sativa และ 50% indica Slow N Sweet มี THC 29% ทำให้สายพันธุ์นี้เป็นตัวเลือกที่เหมาะสำหรับผู้บริโภคกัญชาที่มีประสบการณ์ ลูกค้า Ninjabuds บอกเราว่าผลของ Slow N Sweet รวมถึงความรู้สึกผ่อนคลาย มีความสุข และรู้สึกเบิกบานใจ ผู้ป่วยกัญชาทางการแพทย์มักเลือก Slow N Sweet เมื่อรับมือกับอาการที่เกี่ยวข้องกับความเครียด อาการนอนไม่หลับ และความเจ็บปวด ผลิตโดย Cresco, Slow N Sweet มีรสชาติเหมือนช็อคโกแลตครีมหวาน ผลไม้รสหวาน เทอร์ปีนหลักของสายพันธุ์นี้คือไมร์ซีน ซึ่งมีส่วนช่วยในคุณสมบัติการทำให้สงบและต้านการอักเสบ",
    },
    active: true
  }
];

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: {
    en: { type: String, required: true },
    ru: { type: String, required: true },
    th: { type: String, required: true }
  },
  gr: { type: Number, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  int: { type: Number, required: true },
  qty: { type: Number, default: 0 },
  text: {
    en: { type: String, required: true },
    ru: { type: String, required: true },
    th: { type: String, required: true }
  },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function migrateProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log(`Migrated ${products.length} products successfully`);

    await mongoose.connection.close();
    console.log('Migration completed');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

migrateProducts();
