const fs = require('fs');

const dbPath = 'c:/ai/jlpt_data_export.json';
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const tagsMap = {
  "conv_travel_customs": ["N4", "敬語", "正式"],
  "conv_travel_transport": ["N5", "敬語", "實用"],
  "conv_travel_hotel": ["N4", "敬語", "服務業"],
  "conv_travel_restaurant": ["N5", "敬語", "生活"],
  "conv_travel_shopping": ["N5", "敬語", "實用"],
  "conv_daily_greet": ["N5", "敬語", "日常"],
  "conv_daily_conbini": ["N4", "敬語", "生活"],
  "conv_daily_public": ["N3", "敬語", "行政"],
  "conv_daily_clinic": ["N3", "敬語", "醫療"],
  "conv_social_invite": ["N4", "常體", "女生用語", "交友"],
  "conv_social_izakaya": ["N3", "常體", "男生用語", "聚會"],
  "conv_social_complain": ["N3", "常體", "情緒"],
  "conv_biz_interview": ["N2", "敬語", "正式", "面試"],
  "conv_biz_office": ["N2", "敬語", "報聯相"],
  "conv_biz_negotiate": ["N1", "敬語", "商務"],
  "conv_biz_email": ["N1", "敬語", "書信", "正式"]
};

if (data.JLPT_DATA && data.JLPT_DATA.conversations) {
  data.JLPT_DATA.conversations.forEach(c => {
    if (tagsMap[c.id]) {
      c.tags = tagsMap[c.id];
    } else {
      c.tags = ["N4", "實用"];
    }
  });
}

fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully injected tags into practical scenarios.');
