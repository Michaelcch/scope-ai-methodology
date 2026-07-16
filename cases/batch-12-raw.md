# SCOPE 案例收集 — 第十二批（案例455起，待标注）

> 收集日期: 2026-07-16
> 状态: 原始收集，待统一 SCOPE 标注

---

## ⚠️ AI失败/翻车案例 — 第二批（案例455-484）

### 案例 455: Google — Duplex on the Web — 产品关闭
**来源**: https://arstechnica.com/gadgets/2022/12/the-google-assistants-automatic-website-navigation-feature-is-dead/
**行业**: 消费科技
**摘要**: Google 2019年推出Duplex on the Web，自动替用户在网上填写表单、购票。2022年12月正式关闭。原因：发现性极差——绝大多数用户根本不知道这个功能存在。
**教训**: AI功能即使技术可行，没有清晰的用户认知和使用场景也会悄无声息地死亡。

### 案例 456: Google — Gemini图像生成 — 历史失实争议后紧急下线
**来源**: https://www.nytimes.com/2024/02/22/technology/google-gemini-german-uniforms.html
**行业**: 生成式AI
**摘要**: 2024年2月，Gemini图像生成被用户发现生成严重历史失实的图片（黑人纳粹士兵等）。CEO Pichai在内部备忘录称"完全不可接受"。直到2024年8月才以付费订阅者限定方式部分恢复。
**教训**: AI多样性调优缺乏历史上下文约束时，会从纠正偏见走向制造另一种失实。

### 案例 457: Meta — BlenderBot 3 — 对话AI惨淡收场
**来源**: https://www.washingtonpost.com/technology/2023/05/14/meta-generative-ai-metaverse/
**行业**: 对话AI
**摘要**: 2022年8月发布BlenderBot 3，声称特朗普仍是总统、对BBC说Meta"剥削人们赚钱"。ChatGPT发布后基本被遗忘。
**教训**: 对话AI若技术不如对手且缺乏差异化价值，大公司资源也救不了。

### 案例 458: GM/Cruise — 自动驾驶出租车 — 拖行行人后项目终止，烧钱$100亿+
**来源**: https://apnews.com/article/cruise-robotaxi-suspends-operations-gm-73f27ef959afe1e201e61f0fd31802d5
**行业**: 自动驾驶
**摘要**: 2023年10月Cruise无人出租车在旧金山拖行行人6米。加州DMV吊销运营牌照。2024年12月GM宣布彻底放弃该业务，累计投入超100亿美元。
**教训**: 一次恶性事故足以终结一个百亿美元项目。

### 案例 459: McDonald's + IBM — AI语音点餐 — 错误百出后被废弃
**来源**: https://news.sky.com/story/mcdonalds-ends-ai-drive-thru-trial-after-order-mishaps-13155091
**行业**: 餐饮科技
**摘要**: 麦当劳2019年起投资AI得来速语音点餐，准确率仅约85%，病毒视频记录大量灾难性错误。2024年6月终止与IBM合作。
**教训**: 面向大众消费者的AI语音交互对容错率极低。85%准确率在现实嘈杂环境中远远不够。

### 案例 460: Stability AI — 稳定扩散母公司 — CEO辞职、财务崩溃
**来源**: https://www.forbes.com/sites/kenrickcai/2024/03/29/how-stability-ais-founder-tanked-his-billion-dollar-startup/
**行业**: 生成式AI
**摘要**: Stable Diffusion日均约1000万用户，但公司2023年Q1收入不足$500万、亏损约$3000万、欠债约$1亿。CEO 2024年3月被迫辞职，核心团队集体出走。Getty Images版权诉讼索赔金额理论上可达$1.8万亿。
**教训**: 开源模型的商业化是极其困难的命题。

### 案例 461: Builder.ai — AI应用开发平台 — 近独角兽破产，被指用人类冒充AI
**来源**: https://content.techgig.com/technology/builder-ai-unicorn-to-bankruptcy/articleshow/123626696.cms
**行业**: 企业SaaS
**摘要**: Builder.ai曾融资$4.5亿、估值$16亿，微软也是合作伙伴。2025年5月破产。调查发现收入被夸大20-25%，更严重的是被指控用大量人类工程师在后台手工代替AI。欠亚马逊$8500万、微软$3000万。
**教训**: "AI外壳+人类后台"的欺诈模式崩塌只是时间问题。

### 案例 462: Chegg — 在线教育 — 被ChatGPT摧毁，股价跌99%
**来源**: https://36kr.com/p/3043201599982472
**行业**: 在线教育
**摘要**: 曾是美国最大在线作业辅导平台。ChatGPT免费上线后一年内失去超50万付费用户。市值从约$145亿峰值跌至不足$2。CEO辞职，裁员约25%。
**教训**: 一个免费且即时的AI产品即使不完美，也能迅速摧毁收费的信息传递型商业模式。

### 案例 463: Gannett (USA Today母公司) — LedeAI体育报道 — AI新闻遭全网嘲笑
**来源**: https://apnews.com/article/sports-illustrated-ai-experiment-479cc3869c0638df5bbb26d4b1e4f18f
**行业**: 新闻媒体
**摘要**: 2023年夏季使用AI自动生成高中体育赛事报道，文章充满机械感和错误，遭集体嘲讽后迅速暂停。同时Sports Illustrated因用AI生成虚假作者头像陷入更严重的信誉危机。
**教训**: 媒体行业使用AI最重要的是透明度——隐藏AI参与从根本上违背媒体使命。

### 案例 464: CNET — AI财经文章 — 秘密使用AI、错误百出
**来源**: https://www.cnet.com/
**行业**: 科技媒体
**摘要**: 2022年末至2023年初，CNET在读者不知情的情况下用AI生成77篇金融服务类文章，被曝光后承认多篇存在令人尴尬的事实错误。
**教训**: 偷偷用AI代替人类作者一旦被发现，对品牌信誉的伤害远大于效率提升。

### 案例 465: Tesla — Full Self-Driving — 240万辆受查，致命事故
**来源**: https://www.usatoday.com/story/money/cars/2024/10/18/tesla-full-self-driving-software-nhtsa-investigation/75730547007/
**行业**: 自动驾驶
**摘要**: NHTSA对240万辆配备FSD的Tesla展开调查，起因是4起低能见度条件下碰撞事故（1起致命）。调查升级为工程分析，覆盖扩展至约320万辆车、9起事故。
**教训**: L2级辅助驾驶系统的"Full Self-Driving"命名造成危险的用户期望错配。纯视觉方案在极端天气下是未解决的安全隐患。

### 案例 466: 韩国工厂 — 工业机器人 — 将工人误认为蔬菜箱碾死
**来源**: https://apnews.com/article/south-korea-robot-worker-death-976dc34487051c762362f17166c17fd7
**行业**: 工业自动化
**摘要**: 2023年11月，韩国高城郡甜椒包装厂的工业机器人将一名40多岁男性工人误认为蔬菜箱，用机械臂抓起压向传送带致死。
**教训**: 工业AI机器人需要多重冗余安全机制。任何传感器感知失败都可能是致命的。

### 案例 467: Microsoft — BioGPT医学AI — 传播疫苗虚假信息
**来源**: https://futurism.com/neoscope/microsoft-ai-biogpt-inaccurate
**行业**: 医疗AI
**摘要**: Microsoft Research推出的BioGPT声称疫苗会导致自闭症、推荐已被证实无效的羟氯喹治疗新冠、编造"美国医院平均有1.4个鬼魂出没"的虚假数据。斯坦福医学院学者警告该模型"未针对准确输出信息进行优化"。
**教训**: 医疗领域生成式AI如果没有极其严格的领域事实约束，可能直接威胁公众健康。

### 案例 468: 跨国诈骗 — AI深伪视频 — $2500万被深伪CFO骗走
**来源**: https://www.techspot.com/news/103542-gen-ai-more-likely-misused-influence-vote-than.html
**行业**: 企业安全
**摘要**: 2024年2月，攻击者利用AI伪造CFO及高管的实时视频会议形象和声音，授权$2500万转账。深伪欺诈在2022-2023年间增长3000%。
**教训**: AI深伪技术将社会工程攻击带入新维度——连实时视频通话都不再可信。

### 案例 469: 意大利数据保护局 + OpenAI — ChatGPT被禁 + €1500万创纪录罚款
**来源**: https://thehackernews.com/2024/12/italy-fines-openai-15-million-for.html
**行业**: 生成式AI/GDPR
**摘要**: 2023年3月意大利成为首个封禁ChatGPT的西方国家。2024年12月开出€1500万罚单——欧盟首例针对生成式AI的GDPR罚款。OpenAI上诉称罚款"不成比例"。
**教训**: GDPR的威力对生成式AI同样有效。欧洲监管不会因为AI创新就网开一面。

### 案例 470: EEOC v. iTutorGroup — AI招聘年龄歧视 — EEOC首个AI歧视和解
**来源**: https://www.jacksonlewis.com/insights/eeoc-files-consent-decree-settlement-ai-discrimination-case
**行业**: 人力资源/AI招聘
**摘要**: 2023年8月EEOC与iTutorGroup达成$36.5万和解——EEOC历史上首个AI招聘歧视执法。软件被编程为自动拒绝55岁以上女性和60岁以上男性申请者。
**教训**: "算法自动完成的歧视仍然是雇主的法律责任"。

### 案例 471: Air Canada — 客服聊天机器人撒谎 — 法庭判航空公司承担法律责任
**来源**: https://www.law360.ca/ca/other/articles/1804075/court-rejects-air-canada-s-remarkable-denial-of-liability-regarding-misinformation-by-its-chatbot
**行业**: 航空/客服AI
**摘要**: 加航客服聊天机器人错误告知客户丧亲票价政策。加航辩护称"聊天机器人是独立法律实体，应对自己的行为负责"——法庭称此观点"令人震惊"并完全驳回。判决赔偿$812.02。
**教训**: 企业不能以"那是AI说的"来推卸法律责任。聊天机器人的陈述在法律上等同于企业的陈述。

### 案例 472: 英国高校 — AI作弊浪潮 — 一学年7000例，激增700%
**来源**: https://www.theguardian.com/education/2025/jun/15/thousands-of-uk-university-students-caught-cheating-using-ai-artificial-intelligence-survey
**行业**: 教育
**摘要**: 2023-24学年英国大学记录近7000例AI作弊案例。雷丁大学研究同时表明94%的AI生成作业在提交时未被检测到。
**教训**: AI改变了作弊的经济学——成本趋近于零，检测难度极高。教育评估需要从"检测作弊"转向"设计AI无法轻易完成的评估方式"。

### 案例 473: Meta/Facebook — AI内容审核 — 批准了75%威胁选举工作人员的测试广告
**来源**: https://www.engadget.com/facebook-failed-test-of-advertising-threatening-election-workers-215001463.html
**行业**: 社交媒体/内容审核
**摘要**: 2022年美国中期选举前，Facebook自动审核系统批准了20则威胁选举工作人员测试广告中的15则（75%）。TikTok和YouTube成功拦截了所有威胁并封禁测试账号。
**教训**: AI内容审核在理解语境和细微威胁方面存在根本性局限。

### 案例 474: 多家银行 — AI反欺诈系统 — 大量误伤，无辜客户账户被冻结
**来源**: https://article-swipe.standard.co.uk/business/business-news/innocent-people-losing-bank-accounts-thanks-to-ai-lawyer-warns-b1093575.html
**行业**: 金融科技/银行
**摘要**: 2023-2024年，英美大量银行客户的账户被AI反洗钱系统突然冻结或关闭，95-98%最终被证明是误报。银行以"防止泄密"为由拒绝向客户解释。
**教训**: 金融AI系统的假阳性直接影响普通人的生存权。AI驱动的风险管理不能以"宁可错杀一千"为默认逻辑。

### 案例 475: Apple — Apple Intelligence / Siri — 史诗级延迟+虚假演示+集体诉讼
**来源**: https://www.pcmag.com/news/apples-siri-struggle-new-report-exposes-reasons-behind-recent-problems
**行业**: 消费科技
**摘要**: 2024年WWDC展示的新Siri功能——前员工爆料"所有展示功能都不存在于可运行版本中"。芯片预算被CFO大幅削减、AI团队与软件团队内斗。2025年初多项承诺功能无限期推迟，引发集体诉讼。
**教训**: 公司政治、预算内耗和"先演示后开发"在AI时代是灾难性的——因为竞争对手不会等你。

---
> 本批次共收录 21 个案例（455-475）。覆盖产品废弃、商业灾难、安全事故、法律监管和社会后果五个维度。
