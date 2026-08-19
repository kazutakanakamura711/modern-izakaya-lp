export const navigation = [
  { label: 'お品書き', href: '#menu' },
  { label: '日本酒', href: '#sake' },
  { label: '店内', href: '#interior' },
  { label: '店舗情報', href: '#access' },
] as const;

export const menuItems = [
  { title: '炭焼き銀鱈', price: '¥1,280', image: '/assets/fish.jpg', wide: false },
  {
    title: '阿波尾鶏の炭火焼',
    price: '¥1,480',
    image: '/assets/skewers.jpg',
    wide: false,
  },
  {
    title: '季節野菜の炭焼き盛り',
    price: '¥980',
    image: '/assets/veggie.jpg',
    wide: false,
  },
  {
    title: '和牛炭火焼',
    price: '¥2,480',
    image: '/assets/wagyu-charcoal-v2.png',
    wide: false,
  },
  { title: '鯛茶漬け', price: '¥780', image: '/assets/tai-chazuke-v2.png', wide: true },
] as const;

export const sakeItems = [
  ['新政 No.6', '秋田'],
  ['風の森', '奈良'],
  ['仙禽', '栃木'],
  ['天狗舞', '石川'],
] as const;

export const seats = [
  ['カウンター', '8席'],
  ['テーブル', '20席'],
  ['個室', '6席'],
] as const;

export const courses = [
  {
    name: '余白コース',
    price: '¥5,500',
    description: '旬の小皿と炭火の定番を、ゆっくりと。',
  },
  {
    name: '季節コース',
    price: '¥7,500',
    description: 'その日いちばんの素材を、少し贅沢に。',
  },
] as const;
