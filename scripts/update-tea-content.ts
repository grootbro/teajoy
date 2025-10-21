import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';
import Product from '../models/Product';

const teaProducts = [
  {
    id: 1,
    name: {
      en: "Sweet Baby - Premium White Tea",
      ru: "Сладкая малышка - Премиум белый чай",
      th: "สวีท เบบี้ - ชาขาวพรีเมียม"
    },
    text: {
      en: "Sweet Baby is an exquisite white tea blend harvested from the pristine mountains of Northern Thailand. This delicate tea features naturally sweet, sugary notes that will captivate your senses from the very first sip. The aroma is wonderfully sweet with subtle floral undertones and rich earthy notes. The Sweet Baby experience offers a perfect balance that soothes both mind and body with its gentle, calming properties. You'll feel the warmth spreading slowly through your body in comforting waves, bringing you to a state of pure relaxation and tranquility.",
      ru: "Сладкая малышка - это изысканный купаж белого чая, собранный в горах Северного Таиланда. Этот деликатный чай обладает естественно сладким вкусом, который покорит ваши чувства с первого глотка. Аромат удивительно сладкий с тонкими цветочными нотками и богатыми земляными оттенками. Сладкая малышка предлагает идеальный баланс, успокаивающий разум и тело своими мягкими, расслабляющими свойствами. Вы почувствуете, как тепло медленно распространяется по всему телу успокаивающими волнами, погружая вас в состояние чистого расслабления и умиротворения.",
      th: "สวีท เบบี้ เป็นชาขาวผสมพิเศษที่เก็บเกี่ยวจากภูเขาทางตอนเหนือของประเทศไทย ชาที่ละเอียดอ่อนนี้มีรสชาติหวานธรรมชาติที่จะดึงดูดประสาทสัมผัสของคุณตั้งแต่จิบแรก กลิ่นหอมหวานอย่างยอดเยี่ยมพร้อมกลิ่นดอกไม้อ่อนๆ และกลิ่นดินที่เข้มข้น ประสบการณ์ของสวีท เบบี้ให้ความสมดุลที่สsempurณ์ซึ่งช่วยผ่อนคลายทั้งจิตใจและร่างกายด้วยคุณสมบัติที่อ่อนโยนและสงบ คุณจะรู้สึกถึงความอบอุ่นที่แผ่ซ่านไปทั่วร่างกายอย่างช้าๆ ในคลื่นที่ให้ความสบาย นำคุณสู่สภาวะแห่งความผ่อนคลายและความสงบอย่างแท้จริง"
    }
  },
  {
    id: 3,
    name: {
      en: "Cherry Bliss - Fruit Infusion Tea",
      ru: "Вишнёвое блаженство - Фруктовый чай",
      th: "เชอร์รี่ บลิส - ชาผลไม้"
    },
    text: {
      en: "Cherry Bliss is a premium fruit infusion blend featuring high-quality ingredients and natural antioxidants. This variety is renowned for its vibrant cherry and berry flavors, creating a unique and memorable taste profile. Our Cherry Bliss blend has been recognized as a customer favorite and award-winning tea for its exceptional quality and delightful taste.",
      ru: "Вишнёвое блаженство - это премиальный фруктовый чай с высококачественными ингредиентами и натуральными антиоксидантами. Этот сорт известен своими яркими вишнёвыми и ягодными вкусами, создающими уникальный и запоминающийся профиль. Наш купаж Вишнёвое блаженство признан фаворитом покупателей и удостоен наград за исключительное качество и восхитительный вкус.",
      th: "เชอร์รี่ บลิส เป็นชาผลไม้ผสมพรีเมียมที่มีส่วนผสมคุณภาพสูงและสารต้านอนุมูลอิสระตามธรรมชาติ สายพันธุ์นี้มีชื่อเสียงในด้านรสชาติเชอร์รี่และเบอร์รี่ที่สดใส สร้างรสชาติที่เป็นเอกลักษณ์และน่าจดจำ ชาเชอร์รี่ บลิสของเราได้รับการยอมรับว่าเป็นที่ชื่นชอบของลูกค้าและเป็นชาที่ได้รับรางวัลสำหรับคุณภาพที่เป็นเลิศและรสชาติที่น่าพึงพอใจ"
    }
  },
  {
    id: 5,
    name: {
      en: "Sweet & Slow - Oolong Blend",
      ru: "Сладко и медленно - Улун купаж",
      th: "สวีท แอนด์ สโลว์ - ชาอูหลง"
    },
    text: {
      en: "Sweet & Slow is a masterfully crafted oolong tea blend combining traditional processing methods with modern flavor profiles. This tea is 50% oxidized, creating an ideal balance between green and black tea characteristics. Sweet & Slow is perfect for experienced tea enthusiasts. Our customers tell us that Sweet & Slow provides feelings of relaxation, happiness, and contentment. Tea lovers often choose Sweet & Slow when seeking relief from stress, improving sleep quality, and general wellness. Carefully processed in small batches, Sweet & Slow features flavors of sweet caramel, creamy vanilla, and subtle fruit notes. The dominant compounds in this tea contribute to its calming and wellness-supporting properties.",
      ru: "Сладко и медленно - это мастерски созданный купаж чая улун, сочетающий традиционные методы обработки с современными вкусовыми профилями. Этот чай ферментирован на 50%, создавая идеальный баланс между характеристиками зелёного и чёрного чая. Сладко и медленно идеально подходит для опытных ценителей чая. Наши клиенты говорят, что Сладко и медленно дарит чувство расслабления, счастья и удовлетворения. Любители чая часто выбирают Сладко и медленно для снятия стресса, улучшения качества сна и общего благополучия. Тщательно обработанный небольшими партиями, Сладко и медленно обладает вкусами сладкой карамели, кремовой ванили и тонкими фруктовыми нотками. Доминирующие соединения в этом чае способствуют его успокаивающим свойствам и поддержанию здоровья.",
      th: "สวีท แอนด์ สโลว์ เป็นชาอูหลงผสมที่สร้างสรรค์อย่างเชี่ยวชาญโดยผสมผสานวิธีการแปรรูปแบบดั้งเดิมกับรสชาติสมัยใหม่ ชานี้ออกซิไดซ์ 50% สร้างความสมดุลที่สมบูรณ์แบบระหว่างลักษณะของชาเขียวและชาดำ สวีท แอนด์ สโลว์ เหมาะสำหรับผู้ชื่นชอบชาที่มีประสบการณ์ ลูกค้าของเราบอกเราว่าสวีท แอนด์ สโลว์ให้ความรู้สึกผ่อนคลาย มีความสุข และพึงพอใจ ผู้รักชามักเลือกสวีท แอนด์ สโลว์เมื่อต้องการบรรเทาความเครียด ปรับปรุงคุณภาพการนอนหลับ และสุขภาพโดยรวม แปรรูปอย่างระมัดระวังเป็นชุดเล็กๆ สวีท แอนด์ สโลว์มีรสชาติของคาราเมลหวาน วานิลลาครีม และโน้ตผลไม้ที่ละเอียดอ่อน สารประกอบหลักในชานี้มีส่วนช่วยในคุณสมบัติการผ่อนคลายและสนับสนุนสุขภาพ"
    }
  }
];

async function updateTeaContent() {
  try {
    console.log('🍵 Connecting to database...');
    await connectDB();
    console.log('✅ Connected successfully');

    for (const tea of teaProducts) {
      console.log(`\n📝 Updating product ID ${tea.id}...`);

      const result = await Product.updateOne(
        { id: tea.id },
        {
          $set: {
            name: tea.name,
            text: tea.text,
            updatedAt: new Date()
          }
        }
      );

      if (result.modifiedCount > 0) {
        console.log(`✅ Product ${tea.id} updated successfully`);
        console.log(`   EN: ${tea.name.en}`);
        console.log(`   RU: ${tea.name.ru}`);
        console.log(`   TH: ${tea.name.th}`);
      } else {
        console.log(`⚠️  Product ${tea.id} not found or no changes made`);
      }
    }

    console.log('\n🎉 All products updated successfully!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error updating tea content:', error);
    process.exit(1);
  }
}

updateTeaContent();
