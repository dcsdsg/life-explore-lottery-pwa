/* 点位只作街区/景区参考，不是入口导航。bd字段为官方旅游页BD-09，展示时转WGS84。
 * reference字段为公开坐标或按地址整理的近似点。精度与来源见每张任务的地图信息。
 */
const QUEST_META = {
 bjc_literature:{region:'nearby',stars:3,bd:[116.436684,39.990717],geoSource:'https://r.visitbeijing.com.cn/museum/673',hook:'如果把一个人的一生缩成一只档案盒，会留下什么？'},
 bjc_yuan_wall:{region:'nearby',stars:3,reference:[39.973,116.420],geoNote:'朝阳段邻近贸大的街区参考点；不是公园唯一入口。',hook:'你每天经过的土坡，也许曾经是世界大城的边界。'},
 bjc_luxun:{region:'oldcity',stars:3,bd:[116.365289,39.931618],geoSource:'https://s.visitbeijing.com.cn/attraction/118052',hook:'课本里的人物，也曾为院子、藏书和一张书桌安排日常。'},
 bjc_wansong:{region:'oldcity',stars:4,reference:[39.922,116.367],hook:'古塔没有退出生活，它把今天的入口换成了一家书店。'},
 bjc_lao_she:{region:'oldcity',stars:3,reference:[39.943,116.368],hook:'一个窄窄的入口，如何容得下四代人和一段国难？'},
 bjc_shijia:{region:'oldcity',stars:4,bd:[116.428946,39.924416],geoSource:'https://s.visitbeijing.com.cn/attraction/120280',hook:'被写进历史的，不该只有曾经出名的人。'},
 bjc_dongsi:{region:'oldcity',stars:4,reference:[39.927,116.416],hook:'胡同不是灰墙的集合，而是一套相处的距离。'},
 bjc_fayuan:{region:'oldcity',stars:4,bd:[116.376513,39.890454],geoSource:'https://s.visitbeijing.com.cn/attraction/118154',hook:'小说把许多时代放进古寺；你要把故事与史料重新分开。'},
 bjc_nanhai:{region:'oldcity',stars:4,reference:[39.891,116.379],hook:'远离家乡的人，曾在北京搭起一间共同的客厅。'},
 bjc_jingbao:{region:'oldcity',stars:4,bd:[116.3871626513,39.8972790217],geoSource:'https://s.visitbeijing.com.cn/attraction/120849',hook:'在信息按纸张流通的年代，一座院子能怎样改变公共讨论？'},
 bjc_shenjiaben:{region:'oldcity',stars:4,reference:[39.898,116.369],hook:'改变一套规则的人，也需要在普通的院子里工作。'},
 bjc_zhihua:{region:'oldcity',stars:4,bd:[116.438917,39.923207],geoSource:'https://s.visitbeijing.com.cn/attraction/101751',hook:'如果建筑会呼吸，它的声音也许藏在一次笙管合奏里。'},
 bjc_dongyue:{region:'oldcity',stars:4,reference:[39.92361,116.43778],geoSource:'https://zh.wikipedia.org/wiki/北京东岳庙',hook:'普通人对公平、疾病与日常的愿望，曾被放进哪些形象？'},
 bjc_emperors:{region:'oldcity',stars:4,reference:[39.92361,116.36125],geoSource:'https://zh.wikipedia.org/wiki/历代帝王庙',geoNote:'公开WGS84坐标参考；旅游旧页的点位与地址不符，未采用。',hook:'谁能进入一座纪念的殿堂，本身就是一段历史。'},
 bjc_stones:{region:'west',stars:4,bd:[116.336778,39.950681],geoSource:'https://s.visitbeijing.com.cn/attraction/119047',hook:'石头上的文字，是写给当时的人，还是后来的人？'},
 bjc_guo:{region:'oldcity',stars:4,reference:[39.948006,116.374092],geoSource:'https://zh.wikipedia.org/wiki/郭守敬纪念馆',hook:'把水送进城市，可能比把城墙筑起来更加困难。'},
 bjc_mei:{region:'oldcity',stars:3,bd:[116.385895,39.941664],geoSource:'https://s.visitbeijing.com.cn/attraction/101789',hook:'台上的一分钟，藏着台下多少次没有观众的练习？'},
 bjc_architecture:{region:'oldcity',stars:4,bd:[116.397962,39.883382],geoSource:'https://s.visitbeijing.com.cn/attraction/101867',hook:'漂亮的屋顶之下，先有一套让它站住的办法。'},
 bjc_bells:{region:'west',stars:4,reference:[39.968756,116.33794],geoSource:'https://zh.wikipedia.org/wiki/大钟寺',hook:'在没有广播的城里，一口钟能把多少人放进同一个时间？'},
 bjc_tuancheng:{region:'west',stars:4,reference:[39.9852,116.2044],geoSource:'https://zh.wikipedia.org/wiki/团城演武厅',hook:'城门、教场与碑文，分别讲述了力量的哪一种语言？'},
 bjc_fahai:{region:'west',stars:5,bd:[116.167902,39.94264],geoSource:'https://s.visitbeijing.com.cn/attraction/117905'},
 bjc_tanzhe:{region:'west',stars:5,bd:[116.036493,39.884836],geoSource:'https://s.visitbeijing.com.cn/attraction/117841'},
 bjc_jietai:{region:'west',stars:5,bd:[116.117235,39.908819],geoSource:'https://s.visitbeijing.com.cn/attraction/101507'},
 bjc_yunju:{region:'fangshan',stars:5,bd:[115.781256,39.61546],geoSource:'https://s.visitbeijing.com.cn/attraction/101425'},
 bjc_tongzhou:{region:'east',stars:4,bd:[116.672468,39.920812],geoSource:'https://s.visitbeijing.com.cn/attraction/118319'},
 bjc_changyu:{region:'north',stars:5,reference:[40.207,115.904],geoSource:'https://jw.122cha.com/5085.html',geoNote:'村委会附近约略参考，来源未明示坐标系；误差可能数百米。'},
 bjc_yongning:{region:'north',stars:5,reference:[40.52355,116.16003],geoSource:'https://www.openstreetmap.org/way/1372941717'},
 bjc_gubeikou:{region:'northeast',stars:5,reference:[40.6864,117.1528],geoSource:'https://fallingrain.com/world/CH/22/Gubeikoucun.html',geoNote:'古北口村范围参考点；不是纪念馆入口。'},
 bjc_milu:{region:'south',stars:4,reference:[39.772,116.462],geoNote:'麋鹿苑街区约略参考点；从公园公共入口另走一段。'},
 bjc_tuanhe:{region:'south',stars:4,bd:[116.385386,39.753811],geoSource:'https://s.visitbeijing.com.cn/attraction/118446',geoNote:'仅采用旧旅游页的地址参考点；旧页“暂停营业”与新开放资料冲突，接待状态另确认。'}
};
const CITY_CONFIG={
 beijing:{name:'北京',chapter:'人文详篇',origin:'对外经济贸易大学校门',center:[39.94,116.39],zoom:11,intro:'老城街巷、京西古建与远郊线索。',regions:['nearby','oldcity','west','fangshan','east','north','northeast','south']},
 suzhou:{name:'苏州',chapter:'人文详篇',origin:'地铁文昌路站（按你说的“文昌站”理解）',center:[31.31,120.60],zoom:11,intro:'从文昌路站出发，追问园林、运河、工艺和教育的来路。',regions:['sz_nearby','sz_west','sz_oldcity','sz_north','sz_south','sz_east','sz_outskirts']},
 qinhuangdao:{name:'秦皇岛',chapter:'旅行简篇',origin:'住宿地未设定 · 只估现场游览时间，不含往返',center:[39.95,119.66],zoom:10,intro:'海岸之外的玻璃、港口、长城与遗址；六条轻量旅行线索。',regions:['qhd_harbor','qhd_pass','qhd_beidaihe']}
};
const REGION_LABELS={nearby:'贸大附近',oldcity:'老城街巷',west:'京西与西山',fangshan:'房山',east:'通州与运河',north:'昌平与延庆',northeast:'密云',south:'南城与大兴',sz_nearby:'文昌路出发 · 高新区',sz_west:'城西与枫桥',sz_oldcity:'古城西部',sz_north:'古城北部与山塘',sz_south:'古城南部',sz_east:'古城东部',sz_outskirts:'甪直 · 专程探索',qhd_harbor:'海港区 · 工业与港口',qhd_pass:'山海关 · 墙与海',qhd_beidaihe:'北戴河 · 遗址'};
const THEME_LABELS={literature:'文学寻踪',city:'城与日常',architecture:'古建与工艺',tradition:'传统与声音',reform:'时代与变革'};
const QUESTS=[...BEIJING_CULTURE_TASKS,...BEIJING_OUTSKIRT_TASKS,...SUZHOU_QUESTS,...QINHUANGDAO_QUESTS].map(t=>{
 const m=QUEST_META[t.id]||t;if(!m.reference&&!m.bd)throw new Error('缺少任务地图信息：'+t.id);
 const xy=m.bd?coordtransform.gcj02towgs84(...coordtransform.bd09togcj02(...m.bd)):null;
 return {...t,...m,province:t.province||'北京',city:t.city||'beijing',hook:m.hook||t.d,latlng:xy?[xy[1],xy[0]]:m.reference,geoNote:m.geoNote||(m.bd?'官方旅游页参考点，BD-09经近似转换到WGS84；不是入口导航。':'依据地址整理的WGS84近似街区参考点，未逐一测绘；误差可能数百米或更大，不可用于入口导航，请搜索地点名称。'),checkedAt:'2026-10-01'};
});
const RESEARCH_PORTALS={beijing:[
 {title:'北京市数字方志馆',url:'https://bjsfzg.bjdsdfz.cn/',note:'从旧志集成、区县志、风物图志与年鉴找地名线索；索引链接不等于已通读原书。'},
 {title:'史志北京 · 北京方志',url:'https://www.bjdsdfz.cn/bjfz.jhtml',note:'查地方史研究、地区风物与区级史志入口。'},
 {title:'密云区政府 · 地名志原书',url:'https://www.bjmy.gov.cn/stmy/zjmy/szzz/202307/P020231219412986380828.pdf',note:'原书PDF较大，适合联网在电脑上检索，不包含在离线包中。'},
 {title:'北京市文物局',url:'https://wwj.beijing.gov.cn/',note:'文保范围、场馆公告、修缮工程与研究；历史网页的开放时间仍需查最新公告。'},
 {title:'首都之窗 · 北京概况',url:'https://www.beijing.gov.cn/renwen/bjgk/',note:'以区情、地方沿革和文化资源形成线索，再查场馆当日接待安排。'}
],suzhou:[
 {title:'苏州市地方志办公室 · 地情故事',url:'https://dfzb.suzhou.gov.cn/',note:'苏州篇以地方志办地情文章作入口，遇到引述旧志再找原书核对；未宣称全文通读所有原志。'},
 {title:'苏州市园林和绿化管理局',url:'https://ylj.suzhou.gov.cn/',note:'核对园史、修护、开放公告；历史介绍里的数字与当日售票政策分开。'},
 {title:'苏州市文化广电和旅游局',url:'https://wglj.suzhou.gov.cn/',note:'场馆名录、文化遗产与最新接待信息；逐条任务另附直接资料链接。'},
 {title:'苏州市政府 · 跟着地名看苏州',url:'https://www.suzhou.gov.cn/gzdmksz/gzdmksz.shtml',note:'按地名找文化与生活线索，不是精确导航或当日开放证明。'},
 {title:'苏州博物馆',url:'https://www.szmuseum.com/',note:'西馆、本馆不同地址与预约办法，出发前查目标馆的最新通知。'}
],qinhuangdao:[
 {title:'河北省文物局',url:'https://wenwu.hebei.gov.cn/',note:'以场馆简介、文物保护与工程资料核对新旧馆、遗址和修复层次；接待仍看馆方最新通知。'},
 {title:'河北省文化和旅游厅',url:'https://whly.hebei.gov.cn/',note:'民间传说、地方传统和产业转型的资料入口；传说与工程史实分开。'},
 {title:'秦皇岛市政府',url:'https://www.qhd.gov.cn/',note:'先查地方介绍和文旅通知，再按自己的住宿地规划市内路线。'},
 {title:'北戴河区政府',url:'https://www.beidaihe.gov.cn/',note:'区情与规划帮助找到文化线索；规划目标不等于已建成和可参观。'}
]};
