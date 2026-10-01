/* 北京人文寻访第一辑。历史事实见每张签的 sources；问题、阅读视角与出行区间为编辑设计。
 * travel 为从对外经济贸易大学校门出发、含步行/候车/换乘的单程分钟估计，不是实时导航。
 * budget 为普通成人门票参考上限 + 公共交通预留，不含餐饮和购书。
 */
const BEIJING_CULTURE_TASKS = [
  {
    id: "bjc_literature", city: "beijing", t: "文学馆：手稿背后的选择", d: "从贸大走到中国现代文学馆，找一份实际展出的手稿或书房陈列，看看一个人的经验怎样成为公共记忆。",
    steps: ["出发前确认当天开放的展厅；先读巴金《随想录》中的一篇", "在实际开放的展厅选一件手稿、书信或书房物件，记录作者与年代", "找一处修改、磨损或使用痕迹；没有实物细节就读展签，不凭空猜测", "写下：如果只保存我生活里的三件物品，它们能讲出什么？"], budget: 0, energy: 1, min: 60, outdoor: false, rainOk: true, times: ["morning", "afternoon"], mood: ["quiet", "fresh", "heal"],
    culture: {
      theme: "literature", place: "中国现代文学馆", address: "朝阳区文学馆路45号", onsite: [60, 90], travel: [15, 30],
      why: "文学馆由巴金倡议建立，保存作家的手稿、书信与生活物件。这里的意义是接近写作的过程，而不只是认出书名。", question: "一份私人经验，如何被写成许多人的记忆？",
      reading: [{title: "巴金《随想录》", relation: "作者与机构关联", note: "任选一篇，带着“诚实记录”这个问题看展；不承诺该书手稿正在展出。"}],
      route: "先比较从校门步行与公交的时间，导航终点选文学馆观众入口。", cost: "馆方参观信息以免费公共展览为主；本签按步行估计0元，乘公交另预留4元。",
      environment: "室内为主，轻雨和低精力也适合；工作日通常更容易慢看。", access: "常规9:00–16:30、周一闭馆。A座部分展览自2026-08-13闭展；只安排实际开放的展厅。", closedWeekdays: [1], openDates: ["2026-10-05"],
      sources: [{title: "文学馆：馆游指南与公告", url: "https://www.wxg.org.cn/"}, {title: "文学馆：2026国庆10月1日至7日开放公告", url: "https://www.wxg.org.cn/gsgg/5738.jhtml"}, {title: "文学馆：A座部分展览闭展公告", url: "https://www.wxg.org.cn/gsgg/5677.jhtml"}, {title: "贸大：校园位置与周边", url: "https://xgb.uibe.edu.cn/yxztw/zjmd/56706.htm"}]
    }
  },
  {
    id: "bjc_yuan_wall", city: "beijing", t: "土城：在学校旁边读古都边界", d: "去元大都城垣遗址公园朝阳段，区分古城遗存、现代园林和今天的通勤生活。",
    steps: ["选离学校近的朝阳段入口，只走一小段，不走完整公园", "读一块遗址说明牌，确认眼前哪些部分属于保护遗址", "从地面看土坡的高度与走向，不攀爬保护区", "画三层小图：城垣遗址、小月河、现代道路；写下边界现在怎样变成公共空间"], budget: 0, energy: 1, min: 45, outdoor: true, rainOk: false, times: ["morning", "afternoon", "evening"], mood: ["quiet", "fresh", "heal"],
    culture: {
      theme: "city", place: "元大都城垣遗址公园（朝阳段）", address: "北土城东路沿线，选邻近贸大的一段", onsite: [45, 75], travel: [10, 25],
      why: "这座线性公园把元大都城垣保护、小月河与居民休闲放在同一个空间。学校周边本身就能成为认识北京历史的入口。", question: "原来用于隔开的城墙，怎样变成今天用来连接人的公园？",
      reading: [{title: "元大都城垣遗址公园官方介绍与现场说明牌", relation: "历史材料", note: "先认清遗址与后建景观；名称古老不等于每一块土、每一座亭子都古老。"}],
      route: "步行往北土城东路，按当前导航选择公共入口；不必跨越整段遗址。", cost: "公共公园免费；按步行出发估计0元。",
      environment: "春秋日间或天亮的傍晚较舒服；海棠花期可能拥挤，冬天土坡周边风大。", access: "公共步道参观，具体入口和施工围挡现场确认；不要攀爬土城遗址。",
      sources: [{title: "首都之窗：元大都城垣遗址公园", url: "https://www.beijing.gov.cn/renwen/rwzyd/lyjq/4A/yddchyzbwg/202210/t20221020_2839753.html"}, {title: "北京旅游网：公园位置与历史", url: "https://s.visitbeijing.com.cn/attraction/117825"}]
    }
  },
  {
    id: "bjc_luxun", city: "beijing", t: "鲁迅：在《野草》与日常之间", d: "去阜成门内的鲁迅博物馆，从生平展、书信和写作环境理解课本之外的鲁迅。",
    steps: ["先读《野草·秋夜》，把文学意象与实际树木分开", "在生平陈列里找一件与写作、编辑或藏书有关的材料", "旧居若开放，观察居住尺度；2026-10-08起改用展厅与线上旧居全景", "写一句：作为一个正在生活的人，他与课本上的形象哪里不同？"], budget: 16, energy: 1, min: 60, outdoor: false, rainOk: true, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "literature", place: "北京鲁迅博物馆（阜成门馆区）", address: "西城区宫门口二条19号", onsite: [60, 90], travel: [50, 70],
      why: "鲁迅在宫门口住处创作了《野草》等作品。博物馆提供手稿、藏书和书信线索，可以把作品重新放回个人生活与时代中。", question: "激烈的文字，是怎样在普通的日常空间里写出来的？",
      reading: [{title: "鲁迅《野草·秋夜》", relation: "写作生活关联", note: "去看创作环境，而不是寻找文学意象的唯一实物原型。"}],
      route: "导航到阜成门馆区；比较从惠新西街南口或芍药居出发的路线，阜成门站后步行。", cost: "博物馆免费；公共交通往返预留16元。",
      environment: "展厅适合轻雨、冬日与低精力；院落体验会受闭馆与天气影响。", access: "常规9:00–17:00，16:30停止入馆，周一闭馆（法定节假日除外）；带身份证，当前公告称无需预约。", closedWeekdays: [1],
      alerts: [{from: "2026-10-08", text: "旧居自2026-10-08暂停开放，恢复时间另行通知；生平陈列厅及其他开放区域照常开放。"}],
      sources: [{title: "文物局：鲁迅博物馆地址与馆藏", url: "https://wwj.beijing.gov.cn/bjww/362771/362773/546583/index.html"}, {title: "首都之窗：鲁迅北京住处与作品", url: "https://www.beijing.gov.cn/renwen/zt/ydbj/lbt/202110/t20211021_2517255.html"}, {title: "鲁迅博物馆公告（京报网转载）", url: "https://news.bjd.com.cn/2026/09/30/11979765.shtml"}]
    }
  },
  {
    id: "bjc_wansong", city: "beijing", t: "砖塔胡同：让一座古塔继续被使用", d: "到万松老人塔院与砖塔胡同，把古塔、北京书籍和鲁迅曾经的租住经历放在一起看。",
    steps: ["先读《在酒楼上》或《祝福》，只把它们当作理解作者处境的入口", "若正阳书局开放，找一张旧地图或一本北京地方史书，翻读15分钟", "从公共道路观察古塔与周边生活的关系，旧居院落只在外面看", "写下：保护一个地方，是让它停住，还是让它继续被使用？"], budget: 16, energy: 1, min: 60, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "literature", place: "万松老人塔院·正阳书局·砖塔胡同", address: "西城区西四南大街43号附近", onsite: [60, 90], travel: [50, 70],
      why: "正阳书局于2014年进驻塔院，为古建加入公共阅读用途。鲁迅在砖塔胡同租住期间完成《祝福》《在酒楼上》等作品，但小说故事地点不能直接等同这里。", question: "一座古建怎样既保留历史，又进入今天的生活？",
      reading: [{title: "鲁迅《在酒楼上》／《祝福》", relation: "作者居住与创作关联", note: "创作经历有关，小说并不是砖塔胡同的实景导览。"}],
      route: "地铁至西四一带，再步行到塔院与砖塔胡同；路线控制在约1公里。", cost: "公共胡同与阅读空间按免费估计，往返交通预留16元；不要求购书或消费。",
      environment: "晴阴天日间适合；书局是小空间，周末不保证安静，先看当天是否接待。", access: "塔院与书店开放安排以正阳书局当天通知为准；不进入私人住宅、不敲门求参观。",
      sources: [{title: "首都之窗：书店与古建活化", url: "https://www.beijing.gov.cn/ywdt/gzdt/202304/t20230404_2966416.html"}, {title: "首都之窗：鲁迅砖塔胡同创作经历", url: "https://www.beijing.gov.cn/renwen/zt/ydbj/lbt/202110/t20211021_2517255.html"}]
    }
  },
  {
    id: "bjc_lao_she", city: "beijing", t: "小羊圈：读《四世同堂》的空间", d: "去今天的小杨家胡同，在居民生活的公共街巷里读小说开头的空间，而不寻找虚构人物的住宅。",
    steps: ["先读《四世同堂》开头描写小羊圈胡同形态的段落", "从公共道路看窄入口与内部开合，画一张不带居民门牌的简图", "记录一个书里与今天仍相通的生活尺度，和一个明显改变的细节", "写下：一条小胡同怎样装得下一部时代小说？"], budget: 16, energy: 1, min: 45, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "literature", place: "小杨家胡同（原小羊圈胡同）", address: "西城区新街口南大街附近", onsite: [45, 60], travel: [50, 70],
      why: "这里是老舍的出生地和童年生活空间，也是《四世同堂》重要的地理背景。今天的保护院落仍与居民生活有关，不应当作开放故居随意进入。", question: "空间的大小，怎样改变邻里关系与故事的讲法？",
      reading: [{title: "老舍《四世同堂》", relation: "直接文学地理关联", note: "人物与情节属于小说；小杨家胡同不是灯市口的老舍纪念馆。"}],
      route: "导航小杨家胡同公共入口；比较新街口或平安里站后的步行路线。", cost: "公共街巷免费，往返交通预留16元。",
      environment: "日间轻声慢走；空间窄，不适合大团体或长期堵在居民门前。", access: "只安排公共街巷，不进入8号等私人院落；临时封闭时改走周边公共道路。",
      sources: [{title: "首都之窗：老舍与小杨家胡同", url: "https://www.beijing.gov.cn/shipin/qushuobeijing/24189.html"}, {title: "北京旅游网：文学里的小羊圈", url: "https://www.visitbeijing.com.cn/article/4IF0qt8UiVh"}]
    }
  },
  {
    id: "bjc_shijia", city: "beijing", t: "史家胡同：谁的生活被写进历史", d: "到史家胡同博物馆，从凌叔华的童年记忆走向普通居民留下的物件与声音。",
    steps: ["先读凌叔华《古韵》中一段童年生活描写", "在展厅找一件普通居民捐赠的生活物件，记下说明牌如何介绍它", "再找一段名人经历，比较两种历史叙述的尺度", "走一小段公共胡同，写下：如果是我来办展，会保存什么普通生活？"], budget: 16, energy: 1, min: 60, outdoor: false, rainOk: true, times: ["morning", "afternoon"], mood: ["quiet", "heal", "fresh"],
    culture: {
      theme: "literature", place: "史家胡同博物馆", address: "东城区史家胡同24号", onsite: [60, 90], travel: [45, 60],
      why: "馆址与凌叔华旧居有关，又是居民参与的社区博物馆。这里能同时看到作家的记忆、胡同公共生活和当代社区协作。", question: "名人故事之外，普通人的日常怎样被保存？",
      reading: [{title: "凌叔华《古韵》", relation: "作者与旧居关联", note: "童年回忆经过文学整理；展厅与院落不等同于当年家宅的完整原貌。"}],
      route: "比较灯市口或东四站后的步行路线，终点为史家胡同24号。", cost: "按免费参观、往返交通预留16元；具体预约规则再核对。",
      environment: "室内与小院结合，轻雨适合；午间有休馆时段，尽量上午或14点后。", access: "参考周二至周日9:30–12:00、14:00–16:30，周一闭馆；预约、讲解和假日安排以馆方为准。", closedWeekdays: [1],
      sources: [{title: "首都之窗：史家胡同博物馆十周年", url: "https://www.beijing.gov.cn/ywdt/gqrd/202310/t20231025_3286465.html"}, {title: "北京旅游网：馆址与《古韵》", url: "https://www.visitbeijing.com.cn/article/47QrVT58Xey"}, {title: "北京旅游网：参观时段", url: "https://s.visitbeijing.com.cn/attraction/120280"}]
    }
  },
  {
    id: "bjc_dongsi", city: "beijing", t: "东四：把“胡同文化”读成生活", d: "去东四四条及胡同博物馆，从门墩、衣柜与院落的日常使用理解胡同文化。",
    steps: ["先读汪曾祺《胡同文化》，选一个你愿意在现场验证的判断", "博物馆若开放，观察一件居民捐赠物；否则只在公共街巷看院落边界", "找一处新设施与旧格局并存的细节，不拍居民正脸和私人室内", "写一条同意作者的观察，再写一条你想补充的观察"], budget: 16, energy: 1, min: 60, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh", "lively"],
    culture: {
      theme: "literature", place: "东四四条·东四胡同博物馆", address: "东城区东四四条77号及周边公共街巷", onsite: [60, 90], travel: [40, 55],
      why: "博物馆收集居民生活物件，也呈现四合院与街区更新。散文提供观察视角，现场生活则允许你补充、修正它。", question: "胡同文化是在消失，还是正在换一种方式继续？",
      reading: [{title: "汪曾祺《胡同文化》", relation: "主题阅读视角", note: "不是此馆的说明文，也不声称作者在77号生活或创作。"}],
      route: "地铁到东四，步行至东四四条；只串两三条公共胡同。", cost: "公共街巷及社区馆按免费估计，往返交通预留16元。",
      environment: "晴阴天日间慢走；馆内与户外各占一部分，雨雪天不安排这条。", access: "馆方不同年份的开放日资料有差异，先确认当天接待；未确认时按公共街巷路线执行，不能保证进馆。",
      sources: [{title: "首都之窗：东四馆与文化空间", url: "https://www.beijing.gov.cn/ywdt/gqrd/202309/t20230904_3248093.html"}, {title: "北京旅游网：居民物件与院落", url: "https://www.visitbeijing.com.cn/article/47QoYo6GU26"}, {title: "中国作家网：北京胡同与文学", url: "https://www.chinawriter.com.cn/n1/2024/0415/c404018-40216026.html"}]
    }
  },
  {
    id: "bjc_fayuan", city: "beijing", t: "法源寺：小说与历史之间", d: "去法源寺，把小说里的历史情绪与寺院说明、碑刻及今天的宗教生活分开看。",
    steps: ["先读李敖《北京法源寺》一段，把小说写法与史实问题分别记下", "按当日开放规则入寺，读一块介绍沿革的说明", "观察院落尺度、花木和来访者如何使用空间，不打扰礼佛", "做两栏手账：资料能证实什么／小说让我想到什么"], budget: 30, energy: 2, min: 60, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh", "heal"],
    culture: {
      theme: "tradition", place: "法源寺", address: "西城区法源寺前街一带", onsite: [60, 90], travel: [60, 80],
      why: "法源寺有长时段的寺院历史，也是中国佛学院所在。李敖的同名小说把它变为思考晚清与个人选择的叙事空间，但小说不能代替史料。", question: "文学怎样赋予一个地点意义，又在哪些地方需要史料纠正？",
      reading: [{title: "李敖《北京法源寺》", relation: "同名历史小说", note: "明确作为文学阅读；小说细节不直接当作现场史实。"}],
      route: "比较牛街或菜市口站后的公共步行路线，终点选法源寺山门。", cost: "寺院门票未取得当前明确价目，先预留14元、交通16元；出发前核对，不含餐饮。",
      environment: "春季丁香是额外线索，秋季适合读院落层次；春花时人可能较多，严寒与大风不适合久坐。", access: "这是仍有宗教与教学活动的寺院，开放时段和可进入院落须当日核对；室内拍摄遵从现场要求。",
      sources: [{title: "首都之窗：法源寺沿革", url: "https://www.beijing.gov.cn/renwen/rwzyd/gdwh/fys/202107/t20210726_2448803.html"}, {title: "北京旅游网：小说与史实边界", url: "https://www.visitbeijing.com.cn/article/4Hjio8fjNhj"}, {title: "园林绿化局：寺院花木传统", url: "https://yllhj.beijing.gov.cn/ztxx/bjhx/hsdt/202106/t20210621_2417663.shtml"}]
    }
  },
  {
    id: "bjc_nanhai", city: "beijing", t: "南海会馆：改革怎样发生在小院里", d: "去大吉巷的南海会馆、康有为故居及《每周评论》旧址文化空间，寻找思想与传播的日常载体。",
    steps: ["先看康有为生平和《每周评论》的介绍，不必一次读完艰深著作", "只进入明确对公众开放的院落，记录一条实际展出的年代线索", "观察会馆怎样组织来自外地的人、文字与信息", "写下：改变社会的想法，在传播之前需要哪些普通条件？"], budget: 16, energy: 2, min: 60, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "reform", place: "大吉巷·南海会馆文化空间", address: "西城区米市胡同、大吉巷片区", onsite: [60, 90], travel: [60, 80],
      why: "2026年官方城市更新案例介绍，这一片区将修缮后的文保院落开放为文化空间，包括康有为故居和《每周评论》旧址。可以把近代思想史落实到会馆与印刷传播中。", question: "思想如何从一个人的书桌走到社会里？",
      reading: [{title: "《每周评论》早期版面与康有为生平材料", relation: "机构与历史人物关联", note: "看实际展出的材料；不把商业街全部建筑都当作原状历史现场。"}],
      route: "比较虎坊桥或菜市口站步行路线，先导航到康有为故居文化空间的公开入口。", cost: "官方案例称文保院落免费开放；交通往返预留16元，不要求店内消费。",
      environment: "街区与室内展陈结合；商业街假日可能热闹，优先上午。", access: "各院落分别管理，免费开放不代表全天开门；先查大吉巷与场馆当天通知，私人院落不进入。",
      sources: [{title: "规划自然资源委：2026大吉巷保护与开放案例", url: "https://ghzrzyw.beijing.gov.cn/zhengwuxinxi/zxzt/csgx/csgxaljpj/aljpjzjsj/202607/t20260701_4742467.html"}, {title:"首都之窗：康有为故居修缮后开放",url:"https://www.beijing.gov.cn/tsbj/sxym/202508/t20250804_4166018.html"}]
    }
  },
  {
    id: "bjc_jingbao", city: "beijing", t: "京报馆：新闻怎样成为公共声音", d: "到魏染胡同的京报馆旧址，从一张报纸的编辑、印刷和读者想象近代公共生活。",
    steps: ["先了解邵飘萍与《京报》，区分报馆历史和展陈叙述", "在展厅找一张实际陈列的版面，抄下日期与一个栏目名", "比较当年的标题、文字密度与今天你使用的信息界面", "写下：我今天判断一条消息可信，靠的是什么？"], budget: 16, energy: 1, min: 60, outdoor: false, rainOk: true, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "reform", place: "京报馆旧址（邵飘萍故居）", address: "西城区魏染胡同30号", onsite: [60, 90], travel: [60, 80],
      why: "邵飘萍创办的《京报》是近代北京新闻史的重要线索。旧址于2021年对公众开放，让“公共声音”有了一处可观察的生产空间。", question: "一张报纸如何决定什么值得被公众看见？",
      reading: [{title: "《京报》历史版面与《邵飘萍生平事迹》展陈", relation: "现场历史材料", note: "以实际展出的日期、栏目和展签为准，不将纪念性布置当作当年原物。"}],
      route: "地铁到虎坊桥一带，再步行进入魏染胡同公共路段。", cost: "按免费参观、往返交通16元预留；不含餐饮。",
      environment: "室内阅读为主，轻雨也合适；看版面需要留出安静时间。", access: "核对当天接待、预约与停止入馆时间；旧旅游名录中的“全天”不能用于判断展厅开门。",
      sources: [{title: "首都之窗：邵飘萍与京报馆开放", url: "https://www.beijing.gov.cn/tsbj/rwjg/tushuomingrenguju/202404/t20240418_3621823.html"}, {title: "北京旅游网：京报馆历史与位置", url: "https://s.visitbeijing.com.cn/attraction/120849"}]
    }
  },
  {
    id: "bjc_shenjiaben", city: "beijing", t: "沈家本：把“制度改变”读具体", d: "去沈家本故居，选一项晚清修律材料，观察制度改变怎样经过文字、讨论与个案。",
    steps: ["先了解沈家本的修律生平与晚清法律转型背景", "在展厅挑一份法制材料，记清是原件、复制件还是说明", "找一项旧制度与新方案的具体差别，不只记“改革”两个字", "写下：制度承认一个人的权利，需要改变哪些细节？"], budget: 16, energy: 1, min: 60, outdoor: false, rainOk: true, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "reform", place: "沈家本故居", address: "西城区金井胡同1号", onsite: [60, 90], travel: [55, 75],
      why: "故居展陈介绍沈家本的晚清修律实践，并以文献、生活物件与案件材料呈现法律近代转型。小院提供的是制度史的具体入口。", question: "所谓进步，怎样落实成对一个人的具体待遇？",
      reading: [{title: "沈家本修律生平材料与故居法制展陈", relation: "历史材料", note: "依据展签辨认文献；参观讨论属于历史观察，不作为现行法律意见。"}],
      route: "导航金井胡同1号，比较宣武门站后的步行线路。", cost: "公开参观信息为免费，交通往返预留16元。",
      environment: "小型室内展陈适合慢读，轻雨与冬日可选。", access: "参观参考周二至周日9:00–16:30，周一闭馆；团队、预约及假日安排另核对。", closedWeekdays: [1],
      sources: [{title:"西城区政府：故居与变法修律人物馆",url:"https://www.bjxch.gov.cn/zt/fzxczll/xxxq/pnidpv931304.html"}, {title: "北京旅游网：沈家本故居与法制展陈", url: "https://r.visitbeijing.com.cn/index.php/attraction/619"}]
    }
  },
  {
    id: "bjc_zhihua", city: "beijing", t: "智化寺：听见仍在传承的古乐", d: "去智化寺，把京音乐、黑琉璃瓦和木构建筑当作同一个文化现场来观察。",
    steps: ["先听一段官方介绍的智化寺京音乐，记一个音色问题", "确认当天是否有10点或15点展演，提前到达，不把日常参考时刻当保证", "现场展演若举行，完整听一段；没有展演就看谱、器物与传承展签", "写下：保存一首曲子，与保存一栋建筑，最不同的困难是什么？"], budget: 40, energy: 1, min: 60, outdoor: false, rainOk: true, times: ["morning", "afternoon"], mood: ["quiet", "fresh", "heal"],
    culture: {
      theme: "tradition", place: "智化寺·北京文博交流馆", address: "东城区禄米仓胡同5号", onsite: [60, 90], travel: [50, 65],
      why: "智化寺保存明代木结构建筑、转轮藏与京音乐传承。古乐依赖人的学习与实践，提供了理解“活态遗产”的机会。", question: "一种文化只剩谱本，还算活着吗？",
      reading: [{title: "智化寺京音乐官方展演与腔谱介绍", relation: "传统艺术作品", note: "听实际曲目、看展签名称；不把它直接等同于未经变化的明代原声。"}],
      route: "比较朝阳门站步行路线，终点选禄米仓胡同5号。", cost: "门票先按20元参考、交通预留20元；优惠及当前票价以馆方为准。",
      environment: "室内展陈为主，院落短距离移动；轻雨可选，演奏时保持安静。", access: "参考周一闭馆；公开资料中的日常展演常为10:00、15:00，节日活动可能调整，先确认。", closedWeekdays: [1],
      sources: [{title: "文物局：智化寺建筑与京音乐", url: "https://wwj.beijing.gov.cn/bjww/362771/362772/545895/index.html"}, {title: "北京旅游网：场馆与展演参考", url: "https://www.visitbeijing.com.cn/article/4Oj2wte4ATt"}, {title: "首都之窗：京音乐传承", url: "https://www.beijing.gov.cn/renwen/sy/whkb/202310/t20231016_3279266.html"}]
    }
  },
  {
    id: "bjc_dongyue", city: "beijing", t: "东岳庙：把民间想象读成生活秩序", d: "去东岳庙与北京民俗博物馆，从碑刻、楹联和实际开放的民俗展理解普通人的愿望。",
    steps: ["先读《聊斋志异》的一篇，只作为理解民间想象的文学入口", "在开放区域读三块展签，分清历史信仰、文学虚构与今天的展览", "找一项与行业、生活或节俗有关的材料，记下它服务谁", "写下：人们怎样把对公正、安稳和好运的愿望变成可见的形式？"], budget: 40, energy: 1, min: 60, outdoor: false, rainOk: true, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "tradition", place: "东岳庙·北京民俗博物馆", address: "朝阳区朝阳门外大街141号", onsite: [60, 90], travel: [45, 65],
      why: "东岳庙始建于元代，现为国办民俗类博物馆。丰富的碑刻与民俗展陈可用来观察信仰、行业和日常秩序的关系。", question: "民间文化把哪些生活愿望变成了制度与图像？",
      reading: [{title: "蒲松龄《聊斋志异》", relation: "主题阅读视角", note: "不是此庙的故事原型或拍摄地证据，也不将小说鬼神叙事当作事实。"}],
      route: "比较朝阳门或东大桥站后的步行路线。", cost: "官方页面有10元与20元两种门票口径，本签按较高20元加交通20元预留；出发前确认。",
      environment: "古建院落与室内展厅结合，轻雨可；节庆活动可能增加客流。", access: "参考8:30–16:30，16:00停止售票；周一展厅关闭。具体参观区域与预约另核对。", closedWeekdays: [1],
      sources: [{title: "首都之窗：常设展与20元票价口径", url: "https://www.beijing.gov.cn/fwcj/calendar/bwgzl/6623ee4c81e5641581784f43.html"}, {title: "首都之窗：2026馆方资料与10元票价口径", url: "https://korean.beijing.gov.cn/beijinginfo/culture/culturaltreasures/cityofmuseums/list/202604/t20260428_4619385.html"}, {title: "首都之窗：东岳庙修缮与民俗展", url: "https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202308/t20230804_3214208.html"}]
    }
  },
  {
    id: "bjc_emperors", city: "beijing", t: "帝王庙：谁被放进共同历史", d: "去历代帝王庙，看后来的王朝如何挑选与陈列更早的历史。",
    steps: ["先读《史记·五帝本纪》的一小段，记住史书也是组织历史的方式", "在实际展陈的入祀介绍里找三位你熟悉的人，核对年代与说明", "观察他们被怎样放在同一个礼制空间，不只拍大殿", "写下：一套共同历史，是怎样通过选择与排列形成的？"], budget: 40, energy: 1, min: 60, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "tradition", place: "历代帝王庙博物馆", address: "西城区阜成门内大街131号", onsite: [60, 90], travel: [50, 70],
      why: "这座明清皇家庙宇祭祀三皇五帝、历代帝王及功臣名将。一个小范围的建筑群能让“历史连续性”这个抽象主题变得可观察。", question: "后来的人，如何决定哪些过去值得共同纪念？",
      reading: [{title: "司马迁《史记·五帝本纪》", relation: "主题阅读视角", note: "阅读视角与祭祀空间对照，不把史书内容全部当作考古已证实事实。"}],
      route: "地铁至西四附近，沿阜成门内大街步行。", cost: "门票普通成人参考20元、交通20元；学生优惠现场核对。",
      environment: "院落参观较多，春秋日间合适；风大或雨雪时改选室内馆。", access: "2026公开信息参考周二至周日9:00–17:00、周一闭馆；旧名录曾写周一周二闭馆，出发前看最新公告。", closedWeekdays: [1],
      sources: [{title: "文物局：历代帝王庙礼制历史", url: "https://wwj.beijing.gov.cn/bjww/362771/362772/546102/index.html"}, {title: "北京旅游网：票价参考", url: "https://s.visitbeijing.com.cn/index.php/attraction/101785"}, {title: "北京旅游网：2026开放信息", url: "https://big5.visitbeijing.com.cn/article/4RbyUckcpKO"}]
    }
  },
  {
    id: "bjc_stones", city: "beijing", t: "五塔寺：石头怎样保存一个人", d: "去北京石刻艺术博物馆，先看金刚宝座塔，再挑一块实际展出的墓志或碑刻慢读。",
    steps: ["先读纳兰性德的一首词，作为思考个人记忆的入口", "观察金刚宝座塔如何把外来形式与本地工艺放在一起", "选一块有可读展签的墓志，记录一个具体的人与生活信息；不保证卢氏墓志正在展出", "写下：碑文保存了哪些人生，又省略了哪些人生？"], budget: 40, energy: 1, min: 75, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh", "heal"],
    culture: {
      theme: "tradition", place: "北京石刻艺术博物馆（五塔寺）", address: "海淀区五塔寺村24号", onsite: [75, 120], travel: [50, 70],
      why: "馆址保存真觉寺金刚宝座塔，并以石刻展示宗教、书法、墓志与社会生活。馆藏资料提及纳兰性德夫人卢氏墓志，但馆藏不等于当日可见。", question: "一个人被铭刻下来的部分，是否就是他的全部？",
      reading: [{title: "《纳兰词》任选一首", relation: "主题阅读与馆藏关联", note: "以词中的个人记忆对照碑文；不据此断言每首词的悼亡对象。"}],
      route: "比较国家图书馆或动物园站后的步行路线，导航观众入口。", cost: "成人20元、全日制本科及以下学生参考10元；本签以成人票加交通预留40元。",
      environment: "露天碑刻较多，晴阴天合适；秋季树色可能吸引更多访客，冬日注意石地面与风。", access: "参考周二至周日9:00–17:00、16:30停止入馆，周一闭馆；不触摸、拓印或攀爬石刻。", closedWeekdays: [1],
      sources: [{title: "北京旅游网：馆藏、票价与开放", url: "https://s.visitbeijing.com.cn/index.php/attraction/119047"}, {title: "文物局：卢氏墓志等石刻资料", url: "https://wwj.beijing.gov.cn/bjww/resource/cms/article/bjww_362762/10845811/2020081209102378689.pdf"}]
    }
  },
  {
    id: "bjc_guo", city: "beijing", t: "郭守敬：把一片水读成基础设施", d: "去西海北岸的郭守敬纪念馆，理解你看到的水面与一座古都的运转有什么关系。",
    steps: ["先看《元史·郭守敬传》的译注或馆方生平介绍，不强求通读古文", "在展厅找一幅大都水系或积水潭材料，记清上下游方向", "回到公开岸线，想象水在交通、供给与城市布局中的作用", "画一张简单因果图：水源—渠道—城市生活；写下哪个环节最关键"], budget: 16, energy: 1, min: 60, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "city", place: "郭守敬纪念馆·西海公共岸线", address: "西城区德胜门西大街甲60号（汇通祠）", onsite: [60, 90], travel: [45, 65],
      why: "纪念馆以生平、元代积水潭、大都治水和测天制历为线索。它让一片漂亮水面成为理解城市水利与科学实践的入口。", question: "一座城市的繁华，依赖哪些平时看不见的工程？",
      reading: [{title: "《元史·郭守敬传》与馆方大都治水材料", relation: "人物史与历史材料", note: "现场水面与元代水系不能一一等同，以展图区分历史层次。"}],
      route: "比较积水潭或新街口站后的步行路线，先到汇通祠入口，再走短岸线。", cost: "纪念馆免费，往返交通预留16元。",
      environment: "有室内展厅但包含水边观察，晴阴天日间最合适；冬日不靠近冰面。", access: "2026参考周二至周日9:00–17:00、16:30停止入馆、周一闭馆；临时展陈调整先核对。", closedWeekdays: [1],
      sources: [{title: "文物局：郭守敬馆四条展陈线索", url: "https://wwj.beijing.gov.cn/bjww/362771/362773/546517/index.html"}, {title: "北京旅游网：2026开放参考", url: "https://big5.visitbeijing.com.cn/article/4RbyUckcpKO"}]
    }
  },
  {
    id: "bjc_mei", city: "beijing", t: "梅兰芳：台上的一分钟，台下的四十年", d: "到梅兰芳纪念馆，寻找舞台艺术如何通过长期训练、绘画和生活积累成形。",
    steps: ["先看《穆桂英挂帅》一段正规影像，或读《舞台生活四十年》一小节", "在展厅找一个关于练功、排戏或跨文化交流的具体细节", "观察院落生活空间，不把纪念性陈设都当作未经变动的原物", "写下：一种看起来轻松的能力，背后需要怎样的长期投入？"], budget: 40, energy: 1, min: 60, outdoor: false, rainOk: true, times: ["morning", "afternoon"], mood: ["quiet", "fresh", "heal"],
    culture: {
      theme: "tradition", place: "梅兰芳纪念馆", address: "西城区护国寺街9号", onsite: [60, 90], travel: [45, 65],
      why: "梅兰芳在这里度过生命最后十年，并排演《穆桂英挂帅》。馆藏影像、剧本、服饰与生活空间能把艺术成就还原成实践过程。", question: "我们欣赏一场表演时，遗漏了多少台下劳动？",
      reading: [{title: "梅兰芳《舞台生活四十年》", relation: "艺术家自述", note: "任选一小节看训练与演出经验。"}, {title: "京剧《穆桂英挂帅》", relation: "旧居排演关联", note: "用正规演出影像预习，不承诺到馆有现场演出。"}],
      route: "比较平安里站后步行路线，终点护国寺街9号。", cost: "未取得当前完整票价确认，先按门票20元、交通20元预留；出发前确认学生优惠。",
      environment: "小型展厅与院落结合，轻雨或冬日可选；若有活动客流会变化。", access: "参考周一闭馆；公开资料的闭馆时刻随季节不同，优先上午或14点后早到，演出另购票另核对。", closedWeekdays: [1],
      sources: [{title: "首都之窗：旧居排演与绘画生活", url: "https://www.beijing.gov.cn/tsbj/rwjg/tushuomingrenguju/202406/t20240603_3702922.html"}, {title: "非遗网：《舞台生活四十年》", url: "https://www.ihchina.cn/luntan_details/7831.html"}, {title: "北京旅游网：开放时段参考", url: "https://s.visitbeijing.com.cn/attraction/101789"}]
    }
  },
  {
    id: "bjc_architecture", city: "beijing", t: "先农坛：仰头之前，先看结构", d: "去古代建筑博物馆，把藻井、斗拱、模型与亲耕空间放回工艺和礼制里理解。",
    steps: ["先翻梁思成《中国建筑史》的图版，认识柱、梁、斗拱三个词即可", "在实际开放的展厅找一个模型或结构图，画出它如何承重", "看隆福寺藻井等展品时先核对展签中的原所在地与迁移经历", "在公共开放的先农坛区域写下：一座建筑如何同时服务结构、美与礼制？"], budget: 40, energy: 2, min: 90, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "architecture", place: "北京古代建筑博物馆（先农坛）", address: "西城区东经路21号", onsite: [90, 120], travel: [60, 80],
      why: "先农坛本身是明清祭祀与亲耕空间，馆内又展示古代建筑技术。可把受欢迎的藻井从拍照对象读成结构、工艺和文物迁移的故事。", question: "建筑是如何把技术、审美与秩序做在一起的？",
      reading: [{title: "梁思成《中国建筑史》图版", relation: "建筑观察视角", note: "辅助理解构件，不声称书中每一图都对应此馆展品。"}],
      route: "导航东经路观众入口，比较天桥或虎坊桥站后的步行路线。", cost: "普通门票先按15元参考，加公共交通25元预留；特展与优惠另核对。",
      environment: "包含户外坛庙步行，春秋日间较适合；藻井已较受欢迎，工作日可能更便于细看。", access: "周一闭馆等常规安排与预约以馆方为准；所选日期需确认藻井和目标展厅是否开放。", closedWeekdays: [1],
      sources: [{title: "北京旅游网：场馆沿革与空间", url: "https://s.visitbeijing.com.cn/index.php/attraction/101867"}, {title: "北京旅游网：2026建筑观察线索", url: "https://www.visitbeijing.com.cn/article/4S0C0ktYrNI"}, {title: "北京旅游网：藻井原址与展陈", url: "https://www.visitbeijing.com.cn/article/47QkWuEIy8H"}]
    }
  },
  {
    id: "bjc_bells", city: "beijing", t: "大钟寺：把声音读成技术", d: "待恢复开放后去古钟博物馆，从永乐大钟的文字、铸造与用途理解声音怎样组织社会。",
    steps: ["先看最新恢复开放公告；2026-10-30及以前不安排到访", "读《天工开物·冶铸》中有关铸钟的说明或图示", "在馆内比较一件乐钟与一件礼仪或宗教用钟的形态与展签", "写下：如果没有现代广播，声音怎样告诉人们时间与秩序？"], budget: 50, energy: 1, min: 75, outdoor: false, rainOk: true, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "architecture", place: "大钟寺古钟博物馆", address: "海淀区北三环西路甲31号", onsite: [75, 120], travel: [35, 55],
      why: "馆藏展示中国古钟，永乐大钟则把大型铸造、铭文与仪式声音汇在一起。它适合把传统工艺看成解决实际问题的技术。", question: "一件器物如何同时传达技术能力与社会秩序？",
      reading: [{title: "宋应星《天工开物·冶铸》", relation: "工艺比较视角", note: "用于理解泥范等工艺；此书晚于永乐大钟，不是该钟的施工记录。"}],
      route: "比较芍药居乘13号线到大钟寺后的步行路线。", cost: "馆方现列成人30元、学生15元；按成人票加交通预留50元。",
      environment: "室内展陈结合院落，轻雨可；不要默认每次参观都能听到大钟现场敲响。", access: "2026-09-19公告：9月25日至10月30日继续闭馆，计划10月31日恢复。恢复后参考周二至周日9:00–17:00，出发前再确认。", closedWeekdays: [1], closedRanges: [{from: "2026-09-25", until: "2026-10-30", reason: "管线改造临时闭馆，公告计划10月31日恢复"}],
      sources: [{title: "文物局：2026延迟开放公告", url: "https://wwj.beijing.gov.cn/bjww/wwjzzcslm/1729028/1729037/1729027/744126995/index.html"}, {title: "文物局：现行参观指南与票价", url: "https://wwj.beijing.gov.cn/bjww/wwjzzcslm/1729028/1729029/index.html"}, {title: "文物局：铸钟与《天工开物》研究", url: "https://wwj.beijing.gov.cn/bjww/resource/cms/article/bjww_362762/10873393/2020101415280356588.pdf"}]
    }
  },
  {
    id: "bjc_tuancheng", city: "beijing", t: "团城演武厅：在建筑里读权力的叙述", d: "到西山脚下的团城演武厅，看城池、碉楼与多语碑刻怎样组织军事训练与官方记忆。",
    steps: ["先看馆方健锐营沿革，预留足够往返时间", "沿开放线路观察城门、城墙与教场的关系，不攀爬非开放处", "找《御制实胜寺后记》多语碑刻的说明或译文，分清原文与展陈解读", "写下：谁在讲这段历史？如果换一位普通士兵，哪些内容会不同？"], budget: 40, energy: 2, min: 60, outdoor: true, rainOk: false, times: ["morning", "afternoon"], mood: ["quiet", "fresh"],
    culture: {
      theme: "architecture", place: "团城演武厅", address: "海淀区香山南路红旗村1号", onsite: [60, 90], travel: [80, 110],
      why: "这处清代武备建筑群把军事用途与纪念性碑文放在一起。多语碑刻和建筑布局提供了辨认官方叙述与实际功能的线索。", question: "一个建筑群，是怎样把力量讲成一段历史的？",
      reading: [{title: "《御制实胜寺后记》现场碑刻及译文", relation: "地点直接历史文本", note: "这是特定立场的历史材料；自己的解释与原文分栏记录。"}],
      route: "地铁加公交或公共交通换乘至香山南路片区；比较当前导航，别把去香山公园的入口当成本馆入口。", cost: "门票先按20元参考、公共交通20元预留；不含打车。",
      environment: "室外空间较多，晴阴天春秋适合；交通与步行更耗精力，需要半日窗口。", access: "常设展参考9:00–17:00、周一闭馆；临时展名和具体票价出发前核对。", closedWeekdays: [1],
      sources: [{title: "北京旅游网：团城建筑与四语碑刻", url: "https://s.visitbeijing.com.cn/attraction/119075"}, {title: "文物局：历史材料与展陈", url: "https://wwj.beijing.gov.cn/bjww/wwjzzcslm/1731063/1731073/1727770/325998011/index.html"}, {title: "文物局：2025健锐营主题展线索", url: "https://wwj.beijing.gov.cn/bjww/362679/362680/482911/743675609/index.html"}]
    }
  }
];
