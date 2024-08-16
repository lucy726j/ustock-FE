import { StockItemProps, NewsProps } from "../constants/interface"
import Discord from "../img/logo/Discord.png"
import GitHub from "../img/logo/GitHub.png"
import Instagram from "../img/logo/Instagram.png"
import Line from "../img/logo/Line.png"
import Spotify from "../img/logo/Spotify.png"
import Telegram from "../img/logo/Telegram.png"
import TikTok from "../img/logo/TikTok.png"
import Twitter from "../img/logo/Twitter.png"
import Whatsapp from "../img/logo/Whatsapp.png"
import Youtube from "../img/logo/Youtube.png"

export const data : StockItemProps[] = [ 
    {
      "id": 1,
      "name": "디스코드",
      "logo": Discord,
      "code": "111111",
      "price": 11111,
      "growth": 11.11
    },
    {
      "id": 2,
      "name": "깃허브",
      "logo": GitHub,
      "code": "222222",
      "price": 22222,
      "growth": -22.22
    },
    {
      "id": 3,
      "name": "인스타그램",
      "logo": Instagram,
      "code": "333333",
      "price": 33333,
      "growth": 33.33
    },
    {
      "id": 4,
      "name": "라인",
      "logo": Line,
      "code": "444444",
      "price": 44444,
      "growth": -44.44
    },
    {
      "id": 5,
      "name": "스포티파이",
      "logo": Spotify,
      "code": "555555",
      "price": 55555,
      "growth": 55.55
    },
    {
      "id": 6,
      "name": "텔레그램",
      "logo": Telegram,
      "code": "666666",
      "price": 66666,
      "growth": -66.66
    },
    {
      "id": 7,
      "name": "틱톡",
      "logo": TikTok,
      "code": "777777",
      "price": 77777,
      "growth": 77.77
    },
    {
      "id": 8,
      "name": "트위터",
      "logo": Twitter,
      "code": "888888",
      "price": 88888,
      "growth": -88.88
    },
    {
      "id": 9,
      "name": "왓츠앱",
      "logo": Whatsapp,
      "code": "999999",
      "price": 99999,
      "growth": 99.99
    },
    {
      "id": 10,
      "name": "유튜브",
      "logo": Youtube,
      "code": "101010",
      "price": 101010,
      "growth": -10.1
    }
]

export const newsData: NewsProps[] = [
    {
        "id": 1,
        "title": "코로나 재유행에 엠폭스까지… 의료체계에 상당한 압박",
        "publisher": "동아일보",
        "date": "2024-01-01 01:01",
        "img" : Discord,
        "url" : "https://n.news.naver.com/article/277/0005459748?cds=news_media_pc"
    },
    {
        "id": 2,
        "title": "비트코인으로 번 돈이 100조원…스페이스X 타는 중국계 거물의 정체",
        "publisher": "아시아경제",
        "date": "2024-02-02 02:02",
        "img" : GitHub,
        "url" : "https://n.news.naver.com/article/277/0005459696?cds=news_media_pc"
    },
    {
        "id": 3,
        "title": "구글, AI 탑재 검색 기능 'AI 오버뷰' 6개국 추가 확대…한국은 아직",
        "publisher": "조선일보",
        "date": "2024-03-03 03:03",
        "img" : Instagram,
        "url" : "https://n.news.naver.com/mnews/article/030/0003231973"
    },
    {
        "id": 4,
        "title": "김영호 '北, 대화협의체 호응 촉구…남북 통신선 재가동해야",
        "publisher": "동아일보",
        "date": "2024-04-04 04:04",
        "img" : Youtube,
        "url" : "https://n.news.naver.com/article/421/0007733313?cds=news_media_pc&type=breakingnews"
    },
    {
        "id": 5,
        "title": "SNS 논란·화제 동시에 빚었던…'노잼도시' 밈은 무엇?",
        "publisher": "조선일보",
        "date": "2024-05-05 05:05",
        "img" : Twitter,
        "url" : "https://n.news.naver.com/article/277/0005459807?cds=news_media_pc"
    }
]
