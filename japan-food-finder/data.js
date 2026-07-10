// 일본 맛집 데이터 (실제 유명 맛집 리서치 기반)
// hours: 대표 영업시간 (계절/요일에 따라 변동될 수 있어 방문 전 확인 권장)
// category: ramen | soupcurry | takoyaki | okonomiyaki | kushikatsu | motsunabe
//           misokatsu | tebasaki | unagi | udon | soba | kaiseki | cafe
window.RESTAURANT_DATA = {
  cities: [
    { id: "tokyo",    name: "도쿄",   jp: "東京",   emoji: "🗼" },
    { id: "osaka",    name: "오사카", jp: "大阪",   emoji: "🏯" },
    { id: "sapporo",  name: "삿포로", jp: "札幌",   emoji: "❄️" },
    { id: "fukuoka",  name: "후쿠오카", jp: "福岡", emoji: "🍜" },
    { id: "nagoya",   name: "나고야", jp: "名古屋", emoji: "🏭" },
    { id: "kyoto",    name: "교토",   jp: "京都",   emoji: "⛩️" }
  ],
  places: {
    tokyo: [
      { name: "이치란 시부야", jp: "一蘭 渋谷", type: "음식점", category: "ramen",
        hours: "24시간 영업", area: "시부야",
        menu: ["톤코츠 라멘", "카에다마(면 추가)", "매운 비법 다레"] },
      { name: "라멘 나기", jp: "ラーメン凪", type: "음식점", category: "ramen",
        hours: "화–일 11:30–15:00, 18:00–23:30", area: "시부야 골든가이",
        menu: ["니보시 라멘", "돼지고기 차슈", "특제 츠케멘"] },
      { name: "긴자 하치고", jp: "銀座 八五", type: "음식점", category: "ramen",
        hours: "화–일 11:00 ~ 수프 소진 시 마감", area: "긴자",
        menu: ["츄카소바(시오)", "츄카소바(쇼유)", "와자토 계란"] },
      { name: "모테나시 쿠로키", jp: "饗 くろ喜", type: "음식점", category: "ramen",
        hours: "월–토 11:00–15:00, 18:00–20:00", area: "아사쿠사바시",
        menu: ["쇼유 라멘", "시오 소바", "계절 한정 소바"] },
      { name: "사보루", jp: "さぼうる", type: "카페", category: "cafe",
        hours: "월–토 11:00–23:00 (방문 전 확인)", area: "진보초",
        menu: ["나폴리탄 스파게티", "핸드드립 커피", "크림소다"] }
    ],
    osaka: [
      { name: "혼케 오오타코", jp: "本家 大たこ", type: "음식점", category: "takoyaki",
        hours: "매일 09:00–23:00", area: "도톤보리",
        menu: ["원조 타코야키", "큰 문어 타코야키", "소스+가츠오부시"] },
      { name: "타코야키 도라쿠 와나카", jp: "たこ焼道楽 わなか", type: "음식점", category: "takoyaki",
        hours: "월–금 10:00–23:00, 토·일·공휴일 09:00–23:00", area: "난바 센니치마에",
        menu: ["타코야키 8개 세트", "네기마요 타코야키", "타코센"] },
      { name: "치보 도톤보리", jp: "千房 道頓堀", type: "음식점", category: "okonomiyaki",
        hours: "매일 11:00–23:00 (L.O. 22:00)", area: "도톤보리",
        menu: ["도톤보리 야키(믹스)", "모던야키", "네기야키"] },
      { name: "히시야 텐노지", jp: "串かつ ひしや", type: "음식점", category: "kushikatsu",
        hours: "17:00–01:00", area: "텐노지",
        menu: ["쿠시카츠 모둠", "소고기 쿠시카츠", "새우 쿠시카츠"] },
      { name: "릴로 커피 킷사", jp: "Lilo Coffee Kissa", type: "카페", category: "cafe",
        hours: "매일 12:00–20:00 (방문 전 확인)", area: "미나미호리에",
        menu: ["스페셜티 핸드드립", "사이폰 커피", "푸딩 아라모드"] },
      { name: "블루보틀 우메다 차야마치", jp: "Blue Bottle Coffee 梅田茶屋町", type: "카페", category: "cafe",
        hours: "매일 08:00–20:00", area: "우메다",
        menu: ["싱글 오리진 드립", "카페라떼", "벨기에 와플"] }
    ],
    sapporo: [
      { name: "멘야 사이미", jp: "麺屋 彩未", type: "음식점", category: "ramen",
        hours: "11:00–15:00, 16:00–21:00 (계절 변동)", area: "미소노",
        menu: ["미소 라멘", "차슈멘", "생강 볶음 토핑"] },
      { name: "스미레 본점", jp: "すみれ 本店", type: "음식점", category: "ramen",
        hours: "11:00–15:00, 16:00–21:00", area: "나카노시마",
        menu: ["스미레 미소 라멘", "쇼유 라멘", "시오 라멘"] },
      { name: "오쿠시바 상점", jp: "奥芝商店", type: "음식점", category: "soupcurry",
        hours: "11:00–15:00, 17:00–21:00 (방문 전 확인)", area: "삿포로 도심",
        menu: ["치킨 야채 수프카레", "새우 육수 수프카레", "매운맛 단계 선택"] },
      { name: "수프카레 스아게", jp: "スープカレー Suage", type: "음식점", category: "soupcurry",
        hours: "월·목 11:30–20:00, 화·수·금 11:30–20:30, 토·일 11:00–20:30", area: "스스키노",
        menu: ["라벤더 포크 수프카레", "치킨 수프카레", "구운 야채 토핑"] },
      { name: "수프카레 가라쿠", jp: "スープカレー GARAKU", type: "음식점", category: "soupcurry",
        hours: "11:30–15:30, 17:00–20:30 (방문 전 확인)", area: "타누키코지",
        menu: ["부드러운 닭다리 수프카레", "치즈 토핑", "16종 스파이스 수프"] }
    ],
    fukuoka: [
      { name: "잇푸도 다이묘 본점", jp: "一風堂 大名本店", type: "음식점", category: "ramen",
        hours: "매일 11:00–22:00", area: "다이묘",
        menu: ["시로마루 모토아지", "아카마루 신아지", "가에다마"] },
      { name: "하카타 잇코샤", jp: "博多 一幸舎", type: "음식점", category: "ramen",
        hours: "월–토 11:00–23:30, 일 11:00–21:00", area: "하카타",
        menu: ["톤코츠 라멘", "거품 톤코츠 스프", "차슈멘"] },
      { name: "하카타 모츠나베 오야마", jp: "博多もつ鍋 おおやま", type: "음식점", category: "motsunabe",
        hours: "17:00–24:00 (방문 전 확인)", area: "하카타",
        menu: ["오야마식 미소 모츠나베", "쇼유 모츠나베", "챤폰 사리"] },
      { name: "하카타 모츠나베 쇼라쿠", jp: "博多もつ鍋 笑楽", type: "음식점", category: "motsunabe",
        hours: "16:00–23:00 (L.O. 22:30)", area: "하카타역 3분",
        menu: ["쇼유 모츠나베", "미소 모츠나베", "명란 계란말이"] },
      { name: "마에다야 나카스", jp: "前田屋 中洲", type: "음식점", category: "motsunabe",
        hours: "월–금 17:00–24:00, 토·일 11:00–14:30 · 17:00–24:00", area: "나카스",
        menu: ["특선 모츠나베", "쇼유/미소/미즈타키", "챤폰면"] }
    ],
    nagoya: [
      { name: "미소카츠 야바톤 본점", jp: "矢場とん 本店", type: "음식점", category: "misokatsu",
        hours: "매일 11:00–21:00", area: "야바초",
        menu: ["와라지 돈카츠(미소)", "철판 돈카츠", "쿠시카츠"] },
      { name: "후라이보 에스카점", jp: "風来坊 エスカ店", type: "음식점", category: "tebasaki",
        hours: "매일 11:00–22:00 (방문 전 확인)", area: "나고야역 에스카 지하상가",
        menu: ["테바사키(닭날개 튀김)", "닭날개 카라아게", "토리메시"] },
      { name: "아츠타 호라이켄 본점", jp: "あつた蓬莱軒 本店", type: "음식점", category: "unagi",
        hours: "11:30–14:00, 16:30–20:30 (수·목 정기휴무)", area: "아츠타 신궁 인근",
        menu: ["히츠마부시(장어덮밥)", "우나기동", "장어 시라야키"] }
    ],
    kyoto: [
      { name: "오멘 긴카쿠지 본점", jp: "おめん 銀閣寺本店", type: "음식점", category: "udon",
        hours: "11:00–21:00 (부정기 휴무)", area: "긴카쿠지 인근",
        menu: ["오멘(제철 야채 츠케우동)", "튀김 우동", "볶음 우동"] },
      { name: "총본가 카와미치야", jp: "総本家 河道屋", type: "음식점", category: "soba",
        hours: "11:00–20:00 (목요일 휴무)", area: "가라스마",
        menu: ["호레이 소바(냄비)", "니신 소바", "자루 소바"] },
      { name: "이노다 커피 본점", jp: "イノダコーヒ 本店", type: "카페", category: "cafe",
        hours: "매일 07:00–18:00", area: "산조 사카이마치",
        menu: ["아라비아의 진주 블렌드", "교토식 모닝세트", "치즈케이크"] },
      { name: "스마트 커피", jp: "スマート珈琲店", type: "카페", category: "cafe",
        hours: "매일 08:00–19:00 (2층 런치 11:00–14:30)", area: "테라마치",
        menu: ["에그 샌드위치", "핫케이크", "핸드드립 커피"] },
      { name: "효테이", jp: "瓢亭", type: "음식점", category: "kaiseki",
        hours: "11:00–19:30 (예약 권장, 부정기 휴무)", area: "난젠지 인근",
        menu: ["아침 카이세키", "쇼카도 벤토", "효테이 명물 반숙란"] }
    ]
  }
};
