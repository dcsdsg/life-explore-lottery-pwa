/* 京郊第二辑。2026-10-01资料整理；双寺阅读与行程补充2026-10-02。路线、交通费用与时长是保守估计，不是实时导航。 */
const BEIJING_OUTSKIRT_TASKS = [
  {
    id:'bjc_fahai',city:'beijing',t:'法海寺：六百年前的一根线',d:'一幅壁画为什么需要限时、限人、限光？去看明代绘画，也看今天保护它的办法。',
    steps:['提前在法海寺官方渠道确认并预约明代壁画真迹场次；约不到就改复制品路线','按讲解挑一个衣纹、金饰或花叶细节，不拍摄真迹、不使用自己的强光','把原作、珂罗版复制品和附近数字艺术馆分栏记录，别混为同一门票','写下：如果看得少一点，能让更多后来的人看到原作，我愿意怎样参观？'],budget:140,energy:2,min:90,outdoor:true,rainOk:false,times:['morning','afternoon'],
    culture:{theme:'architecture',place:'法海寺博物馆（原寺）',address:'石景山区模式口翠微山南麓',onsite:[90,120],travel:[90,120],why:'原寺保留明代壁画。石景山区参观说明区分普通参观与真迹场次，文物保护研究还讨论了环境监测；这不是《白蛇传》中法海故事的地点。',question:'保护与观看，怎样互相让步？',reading:[{title:'法海寺壁画保护研究与现场图像说明',relation:'文物研究',note:'以明代年代及实际展签为准；不使用旅游旧页中误写的元代年代。'}],route:'地铁到金安桥或苹果园片区，再按当前导航换公交、步行上坡；终点是原寺而非数字艺术馆。',cost:'区政府说明：真迹100元且免普通20元票；交通预留40元。普通复制品路线可少花80元。',environment:'含上坡与台阶；晴阴天日间，鞋防滑，真迹场次是路线的锚点。',access:'预约和场次当天核对；真迹票与普通票不重复计费，遵守限光与禁拍规定。',sources:[{title:'石景山区政府：票种与参观说明',url:'https://www.bjsjs.gov.cn/sjsfc/sjswwjd/202502/t20250206_475968.shtml'},{title:'文物局《北京文博2024》：壁画监测研究',url:'https://wwj.beijing.gov.cn/bjww/resource/cms/article/bjww_362762/743728617/2025081116370297647.pdf'},{title:'首都之窗：法海寺明代壁画',url:'https://www.beijing.gov.cn/renwen/rwzyd/qgzdwwbhdw/fhs/202211/t20221101_2849497.html'}]}
  },
  {
    id:'bjc_tanzhe',city:'beijing',t:'潭柘寺：古树不是历史的配角',d:'把目光从香火移到树木：一株古树怎样同时成为自然生命、寺院记忆和民间故事？',
    steps:['读门头沟区政府的寺院介绍，先把晋代始建与今天明清建筑分开','选一株有保护牌的古树，记树种、保护信息与现场可见的养护措施','找一段帝王树或石鱼故事，写上“传说”，不把它当植物学或历史证明','画一张树与殿堂的关系图；不用抱树、摇枝、踩保护圈来完成任务'],budget:90,energy:2,min:90,outdoor:true,rainOk:false,times:['morning','afternoon'],
    culture:{theme:'city',place:'潭柘寺',address:'门头沟区潭柘寺镇',onsite:[90,150],travel:[130,180],why:'区政府资料把寺院的晋代源流、明清建筑和古树放在一起介绍。那句“先有潭柘寺，后有北京城”是民间概括，不意味着此地此前没有聚落。',question:'历史能否也由一株不断生长的树来保存？',reading:[{title:'门头沟区情沿革、寺院介绍与古树保护牌',relation:'地方沿革与现场材料',note:'旧资料对始建年份有不同说法，本任务只写晋代，不强定某一年。'}],route:'地铁到门头沟方向后换公交；山区候车区间较大，提前核对回程，不把两座古寺硬塞进半天。',cost:'旅游参观资料成人50元、大学生25元参考；按成人票加交通40元预留90元。',environment:'山地台阶；秋天适合树木观察，银杏与春花高峰可能很拥挤，并非全年冷门。',access:'开放时段和学生票先核对；暴雨、大风或山区预警时取消。',sources:[{title:'门头沟区政府：2026潭柘寺介绍',url:'https://www.bjmtg.gov.cn/bjmtg/c104898/202507/f9b1a674647042b4be448e63c8b5cab5.shtml'},{title:'首都之窗：门头沟历史沿革',url:'https://www.beijing.gov.cn/renwen/bjgk/mtggk/'},{title:'北京旅游网：票价与位置参考',url:'https://s.visitbeijing.com.cn/attraction/117841'}]}
  },
  {
    id:'bjc_jietai',city:'beijing',t:'戒台寺：给一棵老松写保护档案',d:'古寺的名松并不是靠“古老”两个字自然存活的。追踪养护，看看传统如何成为今天的公共工作。',
    steps:['读区文旅局的古树养护公告，带着“复壮”的问题出发','选一株有名字与保护牌的松树，记录树种、树冠与支撑措施','在开放区域观察戒坛建筑；礼仪空间不当摄影布景，不影响正在进行的宗教活动','给这株树写四行档案：看到的事实、资料出处、我的推测、保护建议'],budget:85,energy:2,min:90,outdoor:true,rainOk:false,times:['morning','afternoon'],
    culture:{theme:'tradition',place:'戒台寺',address:'门头沟区永定镇马鞍山',onsite:[90,120],travel:[120,165],why:'门头沟区文旅局2025养护资料记录了寺内古树分级和复壮工作。戒坛与名松可以把制度传统与生态维护放在一条观察线里。',question:'所谓传承，包含多少不显眼的日常维护？',reading:[{title:'戒台寺古树养护公告与现场戒坛说明',relation:'地方部门工作材料',note:'不同网页对始建年代有分歧，不把有争议的精确年份写成定论。'}],route:'地铁到石厂或苹果园片区后比较当前公交路线；只走景区开放道路，不从寺后自行穿山。',cost:'区政府2025参观信息45元，交通预留40元；斋饭、打车另计。',environment:'山路与台阶，秋冬较早闭园；春季丁香花期人流会上升。',access:'参考秋冬8:30–16:30，当前末次入园和活动安排需再核对。',sources:[{title:'区政府：戒台寺参观指南与45元票价',url:'https://www.bjmtg.gov.cn/bjmtg/c104897/202504/fdeac5d987f74895aac01a4c9071d21d.shtml'},{title:'区文旅局：古树复壮调查与养护',url:'https://www.bjmtg.gov.cn/mtg11J008/ywdt/202503/13c1419f0437431387d05f574ea756ba.shtml'}]}
  },
  {
    id:'bjc_yunju',city:'beijing',t:'云居寺：把一本书保存一千年',d:'纸会腐坏，木会燃烧。曾经有人选择把文字刻进石头：走近这项跨越世代的保存计划。',
    steps:['先读房山区政府的石经介绍，认识石经、纸经和木经三种载体','出发前确认寺院、地宫或目标展厅当日开放，不默认石经山洞窟可进入','从实际展出的经板、复制品或图版找一条捐刻、年代或编号线索，说明载体性质','写下：如果要把今天的一个重要故事保存千年，我会选什么载体？'],budget:100,energy:3,min:120,outdoor:true,rainOk:false,times:['morning','afternoon'],
    culture:{theme:'tradition',place:'房山云居寺（寺院与开放展陈）',address:'房山区大石窝镇水头村南',onsite:[120,180],travel:[160,220],why:'房山石经刻造延续多个历史时期。政府介绍与文物研究提供经板、塔与藏经的线索；这趟旅程不是必须登山才能完成。',question:'一项保存知识的计划，怎样交给下一代继续？',reading:[{title:'房山区情：云居寺；石经施主题记研究',relation:'地方资料与文物研究',note:'宗教信仰叙述与可检验的年代、题记分开阅读，不替宗教遗物的身份作科学担保。'}],route:'地铁房山方向后换当地公交；时间按换乘与候车保守估计，须先查返程末班。',cost:'普通成人40元参考，交通预留60元；不含石经山另票、餐饮或打车。',environment:'距离远，留整日；有台阶，山区预警、雷雨或极低温时不推荐。',access:'旅游参观资料夏季至10月10日9:00–16:30、冬季9:00–16:00参考；五一的限期免费不能推成全年免费。',sources:[{title:'首都之窗：房山云居寺',url:'https://www.beijing.gov.cn/renwen/bjgk/fsgk/fswl/202303/t20230302_2927709.html'},{title:'北京旅游网：季节开放与40元普通票',url:'https://s.visitbeijing.com.cn/attraction/101425'},{title:'文物局：石经题记研究',url:'https://wwj.beijing.gov.cn/bjww/resource/cms/article/bjww_362762/325727931/2025040109511136285.pdf'}]}
  },
  {
    id:'bjc_tongzhou',city:'beijing',t:'通州：沿着塔影读一座水上城市',d:'为何儒、佛、道的建筑能在运河北端相邻？不要只拍塔，试着解释它与码头、河流和城市的关系。',
    steps:['先看通州区公开规划里的运河与公共空间线索','在开放的“三庙一塔”或公共道路上画出文庙、佑胜教寺、紫清宫与燃灯塔的大致相邻关系','沿西海子或北运河公共岸线走短段，观察塔为何能成为远处的方向标记','写下：水运时代的人认出一座城，可能依靠什么？'],budget:50,energy:2,min:90,outdoor:true,rainOk:false,times:['morning','afternoon'],
    culture:{theme:'city',place:'通州三庙一塔·西海子与北运河公共岸线',address:'通州区大成街1号一带',onsite:[90,120],travel:[75,105],why:'2026政府报道确认这里仍在公共文旅活动中使用；旧的2023修缮公告不能当成今天闭园的证明。沿河规划可以帮助理解塔影与当代空间更新。',question:'一座塔的意义，怎样从礼仪建筑变成城市方向感？',reading:[{title:'通州区政府公报中的运河空间规划、现场历史说明',relation:'地方政府材料',note:'不把“三教相邻”推成教义融合，也不把当前修复后的外观当未经改变的古物。'}],route:'地铁往通州后步行到大成街一带；水边只走护栏内公共道路，船票不是任务必需。',cost:'当前票价未完整核实，目标建筑票预留20元，交通30元；关门时可免费走公共岸线。',environment:'晴阴天日间；风大时水岸偏冷，假日不能保证人少。',access:'当天建筑开放与预约另查；闭门可完成公共岸线观察版，不能翻越围挡。',sources:[{title:'通州区政府公报：沿河公共空间方向',url:'https://www.bjtzh.gov.cn/bjtz/xhtml/pdf/zfgb_23_5.pdf'},{title:'首都之窗：2026三庙一塔公共活动',url:'https://www.beijing.gov.cn/renwen/sy/whkb/202605/t20260520_4658807.html'},{title:'北京市水务局：2026运河滨水空间',url:'https://swj.beijing.gov.cn/swdt/ztzl/sstxczl/sstzx/202605/t20260508_4641453.html'}]}
  },
  {
    id:'bjc_changyu',city:'beijing',t:'长峪城：边关的人，如何过日子',d:'边关并不只有战争。去高山古村寻找戏台、寺庙和住宅留下的生活线索，不以登野长城为目标。',
    steps:['读昌平长峪城文保资料，先认出城堡与今天村落的边界','沿公共村道看永兴寺或戏楼外部，现场未开放就不进入','找一条社戏、古树或节庆介绍；没有演出时只读资料，不要求村民表演','写三栏：军事用途、公共生活、今天的村庄；完成后按计划白天返程'],budget:90,energy:3,min:90,outdoor:true,rainOk:false,times:['morning'],
    culture:{theme:'tradition',place:'昌平长峪城村（公共村道）',address:'昌平区流村镇长峪城村',onsite:[90,120],travel:[180,260],why:'文保与农业农村部门资料把这座古村放在边关城堡、社戏和乡村生活的脉络中。宣传文中的爬山路线不等于本任务的安全许可。',question:'当军事职能消失，哪些共同生活留了下来？',reading:[{title:'昌平长峪城文保说明、社戏与节庆记录',relation:'地方文保与乡土传统',note:'2026元宵活动已经结束；不承诺平日有戏曲或灯会。'}],route:'公共交通需往昌平再转山区支线，先核对班次；无法确认回程就暂缓，不按市区地铁频率估计。',cost:'公共村道按免费、交通90元预留；寺院、餐饮、打车另计，山区打车不能依赖临时叫车。',environment:'高海拔村庄较市区冷，带外套；不安排野长城、水库绕行或7公里登山环线。',access:'只走正式开放公共村道；村内场馆逐一确认，雨雪、山区预警或道路管制时取消。',sources:[{title:'文物局：昌平长峪城保护说明',url:'https://wwj.beijing.gov.cn/bjww/362771/362782/dbphdwbdwdbhfwjjkdd/548836/index.html'},{title:'市农业农村局：边关古村与2026社戏节庆线索',url:'https://nyncj.beijing.gov.cn/nyj/zwgk/ztgk/hlgdn_xqjjx/743935573/index.html'}]}
  },
  {
    id:'bjc_yongning',city:'beijing',t:'永宁：一座卫城的旧骨架与新日常',d:'今天的街道还能读出过去的秩序吗？把玉皇阁当方向标，寻找卫城空间与普通市集之间的连接。',
    steps:['读永宁镇国土空间规划的文化遗产部分，带着地名线索出发','从四街公共道路观察玉皇阁与街道交点，画简图','挑一个卫城相关地名与一个当代买卖场景，分别记录，不拍居民特写','写下：仿古重建、历史遗存和活态生活，各提供了哪一种真实？'],budget:80,energy:3,min:90,outdoor:true,rainOk:false,times:['morning'],
    culture:{theme:'city',place:'延庆永宁古城（公共街巷）',address:'延庆区永宁镇玉皇阁周边',onsite:[90,150],travel:[150,210],why:'镇域规划以戍边堡寨、民居与乡土传统为文化资源。旅游资料说明2002年古城改造中玉皇阁依老照片重建；看到仿古外观并不等于看到原建筑。',question:'一座城的历史，在建筑外观里，还是在生活关系里？',reading:[{title:'永宁镇国土空间规划：历史文化资源',relation:'地方政府规划',note:'不采用旧旅游页把重建玉皇阁直接说成唐代原建筑的叙述。'}],route:'比较铁路或公交到延庆后的地方公交；只在确认接驳与末班车后出发。',cost:'公共街巷按免费，交通80元预留；买特产和餐饮不要求消费。',environment:'比市区凉，晴阴天白天；市集人流不固定，不保证每天同样热闹。',access:'公共街道为主；宗教场所和室内点位仅在明确接待游客时进入。',sources:[{title:'规自委：永宁镇国土空间规划',url:'https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/ghcg/xzgh/202404/P020240426520766334674.pdf'},{title:'北京旅游网：卫城街巷与2002年重建',url:'https://www.visitbeijing.com.cn/article/4EhsBCfgXg9'}]}
  },
  {
    id:'bjc_gubeikou',city:'beijing',t:'古北口：同一条路上的商旅与战争',d:'“京师锁钥”不是一句空口号。在潮河两山之间，读出通行、驻守和战争记忆的不同时间层。',
    steps:['先读镇政府引用《密云地名志》的村落介绍，记一条可核对的地名线索','只沿公共村道与合法开放点位观察道路、山口、潮河的关系，不登未开放长城','若抗战纪念馆当天开放，选一件有出处与年代的展览材料；未开放就改读官方史志','回程前写：让人通过的道路，为何也会成为阻挡人的关口？'],budget:130,energy:3,min:120,outdoor:true,rainOk:false,times:['morning'],
    culture:{theme:'reform',place:'密云古北口村（不是古北水镇）',address:'密云区古北口镇古北口村',onsite:[120,180],travel:[180,260],why:'古北口镇政府的区情材料连接了地名、古御道与近代战争记忆。实地看的是古村公共空间，不把商业景区古北水镇替代为同一地点。',question:'地理如何让同一个地方同时成为通道与防线？',reading:[{title:'《北京市密云区地名志》资源与镇政府地名摘述',relation:'地方志线索',note:'提供区政府原书PDF索引；当前任务的具体史实主要核对镇政府摘述，不声称已通读整部志书。'},{title:'古北口抗战纪念馆展签或密云史志',relation:'近代历史材料',note:'现场传说、戏曲人物与有日期的史料分开记录。'}],route:'比较到古北口的铁路与公交，先确认班次、接驳和返程；不是“地铁到了再说”的目的地。',cost:'公共村道按免费、往返公共交通130元预留；铁路座席或其他场馆票额外核对，不含住宿、打车。',environment:'远郊整日任务，山口风较大；无可靠回程或山区预警就取消。',access:'纪念馆预约与场馆收费未完整确认，出发前询问；不进军事禁区和未开放长城。',sources:[{title:'密云区政府：引用地名志的古北口村沿革',url:'https://www.bjmy.gov.cn/stmy/zjmy/zjgk/gbkz/lyxx/202301/t20230103_192042.html'},{title:'密云区政府：《北京市密云区地名志》PDF索引',url:'https://www.bjmy.gov.cn/stmy/zjmy/szzz/202307/P020231219412986380828.pdf'},{title:'密云区政府：文化文物景区与纪念馆线索',url:'https://www.bjmy.gov.cn/stmy/zjmy/zjgk/gbkz/lyxx/202301/t20230104_192049.html'}]}
  },
  {
    id:'bjc_milu',city:'beijing',t:'南海子：从皇家猎场到保护动物',d:'同一片土地，曾经为了狩猎，也可以为了物种生存。去麋鹿苑，看看“保护”具体做了什么。',
    steps:['先看官方麋鹿苑资料中的回归与保护时间线','在开放展陈或公共观察区找一个麋鹿形态或保护措施的事实，不投喂','把历史苑囿范围与今天公园边界分开，不认为二者完全重合','写下：当一块土地不再只服务少数人的娱乐，它还能怎样被使用？'],budget:40,energy:2,min:90,outdoor:true,rainOk:false,times:['morning','afternoon'],
    culture:{theme:'city',place:'南海子麋鹿苑（公共开放区）',address:'大兴区南海子麋鹿苑周边',onsite:[90,120],travel:[100,140],why:'官方资料记录麋鹿保护研究与公众教育。研究著作《南海子》把苑囿放回区域历史，能把生态观察与地方文化连起来。',question:'人与动物的关系，怎样从占有变成保护？',reading:[{title:'《南海子》研究文集与麋鹿苑官方介绍',relation:'地方历史研究与自然教育',note:'可先看出版社简介，现场区分皇家苑囿、现代公园与保护研究机构。'}],route:'地铁到南城后转公交，终点选麋鹿苑实际公共入口；不把南海子公园任意大门当成近距离入口。',cost:'按公共免费参观、交通40元预留；开放预约政策另核对。',environment:'户外较多，夏天防晒、秋冬挡风；不跨围栏、不投喂，禁止走冰面。',access:'麋鹿苑与大公园可能有不同时间和入口，分别确认；研究管理区不是游客区域。',sources:[{title:'首都之窗：麋鹿苑建馆与公众教育',url:'https://www.beijing.gov.cn/renwen/rwzyd/lyjq/3A/mly/202210/t20221021_2841193.html'},{title:'大兴区情：麋鹿苑',url:'https://www.beijing.gov.cn/renwen/bjgk/dxgk/dxwb/202303/t20230320_2940660.html'},{title:'清华大学出版社：《南海子》研究文集',url:'https://www.tup.tsinghua.edu.cn/booksCenter/book_09124501.html'}]}
  },
  {
    id:'bjc_tuanhe',city:'beijing',t:'团河：御苑的边界怎样变成公园',d:'别只看“皇家”两字。沿行宫遗址，追问重建、展览与公共开放怎样重新解释这片地方。',
    steps:['读园林部门的公园介绍，先区分遗址、修复建筑和现代景观','出发前核对2026南海子苑囿文化展是否仍开放，不默认永久展','在实际开放展厅或公园说明牌找一个与苑囿管理、行宫用途有关的证据','画出一段今天可通行的公共路线，写：谁曾能进入，谁现在能进入？'],budget:50,energy:2,min:75,outdoor:true,rainOk:false,times:['morning','afternoon'],
    culture:{theme:'city',place:'团河行宫遗址公园',address:'大兴区团河路行宫遗址公园',onsite:[75,120],travel:[100,145],why:'园林部门资料说明行宫布局与公共公园，2026大兴区政府报道苑囿文化展启幕。它提供把档案与空间放在一起观察的机会，但不能把展览开幕当永久开放保证。',question:'历史场所的开放，怎样改变它的意义？',reading:[{title:'团河行宫公园资料与南海子苑囿展说明',relation:'地方政府与展览材料',note:'档案记载、修复说明、自己的感受分别写；原址不等于建筑全是原物。'}],route:'地铁到大兴片区再转公交，导航园区观众入口，勿与海淀团城演武厅混淆。',cost:'园林部门页面曾列公园免费；交通50元预留，展览预约和收费当天确认。',environment:'室外园林为主，晴阴天日间；风大或严寒时缩短岸边停留。',access:'公园与展厅接待时间分别确认，展览结束可改公共园林版。',sources:[{title:'市园林绿化局：团河行宫遗址公园',url:'https://yllhj.beijing.gov.cn/ggfw/bjsggml/zlgy/dxq/202206/t20220615_2741773.shtml'},{title:'大兴区政府：2026苑囿文化展',url:'https://www.beijing.gov.cn/ywdt/gqrd/202608/t20260820_4830209.html'}]}
  }
];
// 双寺资料增补：保持稳定 ID 和原四项清单顺序，旧完成记录及 v1 备份继续有效。
for(const task of BEIJING_OUTSKIRT_TASKS){
  if(!['bjc_jietai','bjc_tanzhe'].includes(task.id))continue;
  task.checkedAt='2026-10-02';
  task.culture.reading.push({title:'朱自清《潭柘寺戒坛寺》',relation:'近代游记与现场对照',note:'已有对应全文入口。作于1934年；只借观察方法，不按旧游记的后门、古洞和交通路线走。'});
  task.culture.sources.push({title:'2026北京公交集团：通游专线21调整',url:'https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202606/t20260611_4696369.html'});
  if(task.id==='bjc_jietai'){
    task.culture.access+=' 参观页曾提示千佛阁、大悲殿修缮及古树养护区封闭；未确认已恢复，出发前问开放范围。';
    task.culture.sources.push({title:'戒台寺景区：优惠与修缮提示（旧公交规则不采用）',url:'https://mp.visitbeijing.com.cn/a1/4OyX68ijSvx'});
  }else{
    task.culture.access+=' 2026年9月24日通知涉及9月25–27日中秋提前开园，不能推作10月3日接待保证；咨询010-60862505。';
    task.culture.sources.push({title:'2026年9月中秋开园通知：仅对指定日期有效',url:'https://news.bjd.com.cn/2026/09/24/11972837.shtml'});
  }
}
