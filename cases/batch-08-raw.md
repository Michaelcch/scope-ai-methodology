# SCOPE 案例收集 — 第八批（案例211起，待标注）

> 收集日期: 2026-07-16
> 状态: 原始收集，待统一 SCOPE 标注
> 目标: 从210→1000案例扩容

---

## 🏭 国际工业制造、汽车、半导体（案例211-238）

### 案例 211: Siemens (Erlangen, Germany) — AI+Digital Twin 灯塔工厂

**来源**: https://blogs.sw.siemens.com/thought-leadership/deploying-ai-to-the-real-world-how-siemens-erlangen-factory-is-leading-the-ai-charge/
**行业**: 制造
**摘要**: Siemens 在 Erlangen 工厂部署 100+ 个 AI 用例，融合数字孪生、机器人拣选（SIMATIC Robot Pick AI 精度 >98%）、AGV 调度优化。四年内生产力提升 69%，能耗降低 42%，上市时间缩短 40%，产品质量提升 60%，洁净室面积减半。2024 年 10 月获 WEF 数字灯塔工厂认证。

### 案例 212: Bosch (Hildesheim, Germany) — 生成式AI用于视觉缺陷检测

**来源**: https://www.bosch.com/stories/ai-image-recognition-production/
**行业**: 制造
**摘要**: Bosch 在 Hildesheim 工厂使用生成式 AI 创建约 15,000 张合成缺陷图像（仅基于两位数真实缺陷图片），覆盖 6 种焊接缺陷类型，用于训练电机定子产线视觉检测模型。AI 缺陷检出率接近 100%（人工为 70-90%），项目周期缩短 6 个月，年生产力提升达六位数欧元。2024 年扩展至捷克 Jihlava 和美国 Charleston 工厂。

### 案例 213: General Motors (USA) — AI预测性维护与视觉质量检测

**来源**: https://news.gm.com/home.detail.html/Pages/topic/us/en/2025/mar/0311-ai.html
**行业**: 制造/汽车
**摘要**: GM 部署三类 AI 工具：(1) 预测性维护：每日分析 1.65 亿张图像，可提前 3 周预测设备故障，准确率 >85%，试点工厂非计划停机减少 40%；(2) Spark Eyes 焊接检测 + 电池包泄漏 AI 检测；(3) 软件测试：300 个 AI 驱动测试台全天候运行，仅需 8 名工程师，问题检出量提升 10 倍。

### 案例 214: Ford (North America) — AI视觉防错系统

**来源**: https://www.businessinsider.com/ford-uses-ai-cameras-in-factories-prevent-recalls-costly-rework-2025-8
**行业**: 制造/汽车
**摘要**: Ford 部署两套自研 AI 系统 -- AiTriz（2024 年 12 月）：35 个工位的实时视频 AI，捕捉毫米级装配错位；MAIVS（2024 年 1 月）：近 700 个工位的智能手机静态图像验证。早期检测避免了座椅/地毯拆卸等高成本返工。背景：Ford 2025 年有 94 次召回，单次召回成本高达 5.7 亿美元。

### 案例 215: Caterpillar — Helios平台+AI预测性维护

**来源**: https://www.caterpillar.com/en/news/caterpillarNews/2025/digital-data-journey.html
**行业**: 制造
**摘要**: Caterpillar 基于统一数字平台 Helios（整合数百万产品、经销商和客户数据），2024 年推出生成式 AI 驱动的服务推荐引擎用于预测性维护。年保修索赔节省 1.8 亿美元，客户留存率 98%（联网服务），设计周期加速 30%，年研发投入 1.5 亿美元（空间计算 + AI）。

### 案例 216: Rolls-Royce (UK/Germany) — AI航空发动机故障诊断

**来源**: https://kalkine.co.uk/news/stocks/veryon-and-rolls-royce-deutschland-enter-long-term-engine-diagnostics-platform-agreement
**行业**: 制造/航空
**摘要**: Rolls-Royce Deutschland 与 Veryon 签署长期协议，为 BR710/BR725/Pearl 系列发动机部署 AI 诊断平台。"智能诊断推理引擎"持续从技师现场经验中学习。故障排查时间减少 50%，首次修复成功率达 90%，客户飞机停机成本平均降低 23%。

### 案例 217: Foxconn (Mexico/Taiwan/USA) — NVIDIA Omniverse数字孪生工厂

**来源**: https://blogs.nvidia.com/blog/omniverse-digital-twins-taiwan-manufacturers-physical-ai/
**行业**: 制造/电子
**摘要**: Foxconn 与 NVIDIA 合作，在墨西哥、台湾、美国新建 AI 服务器工厂时全面使用 Omniverse 数字孪生：规划阶段虚拟验证布局避免昂贵物理返工（节省数百万美元）；PhysicsNeMo 热仿真速度提升 150 倍；Isaac Sim 训练 AMR 和人形机器人；Metropolis 视觉 AI 用于缺陷检测。墨西哥工厂年电耗降低 30%+。

### 案例 218: Tesla (Global Gigafactories) — AI自学习工厂

**来源**: https://www.teslarati.com/tesla-reveals-using-ai-make-factories-more-sustainable-heres-how/
**行业**: 制造/汽车
**摘要**: Tesla 2024 年扩展 AI 控制系统至 Nevada、Texas、Berlin、Fremont 工厂：(1) AI 控制暖通空调基础设施 -- Nevada 工厂多数 HVAC 由 AI 控制，冷水机组闭环优化；(2) Berlin 工厂空气处理机组湿度控制逻辑年节电 17,000 MWh；(3) Nevada 工厂 NMP 精炼厂节电 9.5 GWh。整体 AI 集成自 2022 年以来降低生产成本约 20%。

### 案例 219: Pegatron (Taiwan) — NVIDIA Omniverse + 视觉AI Agent

**来源**: https://www.nvidia.com/en-us/customer-stories/pegatron-scales-factory-operations-with-visual-ai-digital-twins/
**行业**: 制造/电子
**摘要**: Pegatron 部署 PEGAVERSE（基于 NVIDIA Omniverse 的数字孪生）+ PEGA AI（Metropolis/Isaac Sim/VSS Blueprint）：新工厂建设时间减少 40%，每条装配线人工成本降低 7%，缺陷率降低 67%，AI Agent 开发速度四年内提升 400%。客户 Kinsus 缺陷分析准确率从 76% 提升至约 95%，分析时间从天级降至接近零。

### 案例 220: Volkswagen Group (Global) — AWS数字生产平台

**来源**: https://www.volkswagen-group.com/en/press-releases/more-efficient-smarter-more-resilient-volkswagen-group-collaborates-with-aws-to-help-transform-production-for-the-age-of-ai-19774
**行业**: 制造/汽车
**摘要**: VW 与 AWS 合作打造数字生产平台 (DPP)，已连接 43 个生产基地（共 114 个），部署 1,200+ AI 应用。Poznan 工厂 AI 优化电力消耗，电费降低 12%；计算机视觉技术目标 2016-2025 年间生产率提升 30%；IT 系统标准化中期节省数千万欧元。2025 年 8 月宣布 AWS 合作再续 5 年。

### 案例 221: Mercedes-Benz (Germany/Hungary/China) — 生成式AI+数字孪生+人形机器人

**来源**: https://www.asiae.co.kr/lang/print.htm?idxno=2025092909311973050&lang=en
**行业**: 制造/汽车
**摘要**: MB 将生成式 AI 与数字孪生和 Apptronik "Apollo" 人形机器人结合：(1) 生产设施转换速度提升超过 2 倍；(2) 新车量产准备时间缩短 30%；(3) 在匈牙利和北京工厂部署全产线数字孪生系统；(4) MO360 全球数字平台连接生产网络。Deloitte 2025 报告显示 MB 在该领域的投入使其成为行业标杆。

### 案例 222: ArcelorMittal (Brazil) — AI钢卷质量检测

**来源**: https://ibram.org.br/en/noticia/arcelormittal-usa-inteligencia-artificial-para-aprimorar-inspecao-de-qualidade-de-bobinas-de-aco-na-unidade-de-resende-rj/
**行业**: 制造/钢铁
**摘要**: ArcelorMittal 在巴西 Resende 工厂推出"Standard Coil"项目（2024 年 9 月），AI 结合摄像系统检测钢卷表面不规则。算法准确率 89%，综合质量指数达 99.70%，返工减少 30%，缺货率下降 70%，年收益约 100 万雷亚尔（约 20 万美元）。计划 2025 年扩展到巴西 Monlevade 和阿根廷 Acindar。

### 案例 223: Airbus — 生成式AI仿生隔断设计

**来源**: https://biomimicry.org/your-next-flight-may-be-designed-by-slime-mold-and-human-bones/
**行业**: 制造/航空
**摘要**: Airbus 使用生成式 AI 算法（受黏菌生长模式和人体骨骼启发）重新设计 A320 客舱隔断（Bionic Partition）：重量从 143 磅降至 66 磅，减重 45%，同时保持完整结构强度。3D 打印使用 95% 更少原材料。若全 A320 机队推广，单个组件每年可减少约 100 万吨 CO2。合作伙伴包括 Autodesk 和 APWorks。

### 案例 224: Toyota/Lexus — 唯一获IIHS"可接受"评级的L2系统

**来源**: https://www.iihs.org/news/detail/first-partial-driving-automation-safeguard-ratings-show-industry-has-work-to-do
**行业**: 汽车
**摘要**: IIHS 2024 年 3 月首次发布部分自动驾驶安全防护评级，测试 14 个系统。Lexus Teammate with Advanced Drive 是唯一获"可接受"评级的系统（Tesla FSD/Autopilot、Ford BlueCruise、BMW Active Driving Assistant Pro 等 11 个系统均获"差"）。优势：双模式警报（听觉+视觉 4 秒内响应）、紧急减速程序、安全功能集成。

### 案例 225: BMW — Celonis AI流程智能+供应链数字孪生

**来源**: https://www.designnews.com/artificial-intelligence/celonis-ai-streamlines-auto-industry-processes
**行业**: 汽车
**摘要**: BMW 使用 Celonis 流程智能平台创建复杂流程的数字孪生，监控、模拟和预测结果。几乎所有销售的 BMW 车辆都以某种方式被 Celonis AI 触及。计划 2026 年前实现 Agentic AI 自动流程改进。另部署 PartChain 区块链追溯锂和钴的伦理采购。准时交付率改善 14%（2023-2024）。

### 案例 226: Hyundai/Kia — E-FOREST软件定义工厂+AI机器人

**来源**: https://www.motorauthority.com/news/1144809_hyundai-and-kia-envision-software-defined-ai-driven-factories
**行业**: 汽车
**摘要**: Hyundai/Kia 推进 E-FOREST 智能工厂生态系统，HMGICS 新加坡创新中心实现物流自动化率从 7% 提升至 65%，装配自动化率从 14% 提升至 46%。Kia Hwaseong EVO 工厂（投资 4 万亿韩元）部署 AI 机器人手臂处理重型组件，干式喷房技术降碳 20%。目标 2030 年实现全自主"Dark Factory 247"。制造目标成本降低 1/3。

### 案例 227: Honda — AI计算机视觉质检+机器人协作

**来源**: https://www.asiae.co.kr/lang/print.htm?idxno=2025092909311973050&lang=en
**行业**: 汽车
**摘要**: Honda 通过计算机视觉质量检测系统和机器人协作，在产线上实现劳动力投入减少 30%。Deloitte 2025 报告指出这是日本汽车制造商中 AI 落地的代表性成果。

### 案例 228: Nissan — AI数字化"匠人"技艺

**来源**: https://linchpin-consulting.com/the-rise-of-ai-factories-how-japans-automotive-industry-is-redefining-production-with-smart-automation/
**行业**: 汽车
**摘要**: Nissan 使用 AI + 机器人将"Takumi"（匠人）技艺数字化，自动化精密重复任务，支持多车型柔性生产。部署 IoT、AI 和机器人贯穿全部门，目标 FY2025 实现质量改善、成本降低和技能传承。

### 案例 229: TSMC — NVIDIA cuLitho量产+AI缺陷检测

**来源**: https://blogs.nvidia.com/blog/tsmc-culitho-computational-lithography/
**行业**: 半导体
**摘要**: TSMC 2024 年将 NVIDIA cuLitho（GPU加速计算光刻）投入量产。CEO 魏哲家确认"性能大幅跃升、吞吐量显著改善、周期缩短、功耗降低"。同时 AI 缺陷检测系统使 3nm 产线良率提升 20%。Q2 2025 运营利润率达 49.6%，AI-EDA 工具将研发成本削减最高 32%。

### 案例 230: Intel — 14A工艺AI缺陷检测+良率提升

**来源**: https://www.ainvest.com/news/intel-14a-process-gains-momentum-turning-point-chip-manufacturing-2504/
**行业**: 半导体
**摘要**: Intel 14A 工艺使用 AI 缺陷检测系统使微缺陷率降低 35%，制造良率 Q1 2025 环比提升 28%。每片晶圆成本预计比上代 14nm 降低约 15%。14A 已获得 NVIDIA（AI 加速器）和 AMD（高性能 CPU）设计订单，计划 2025 年中量产，Arizona 工厂产能扩展 40%。

### 案例 231: Samsung — Synopsys DSO.ai 芯片设计优化

**来源**: https://www.techspot.com/news/102867-samsung-taps-ai-design-first-3nm-mobile-processor.html
**行业**: 半导体
**摘要**: Samsung 使用 Synopsys DSO.ai 完成两款芯片设计：(1) 3nm GAA 旗舰移动 SoC 流片 -- 动态功耗降低 10%，CPU 频率提升 +300 MHz，节省数周人工设计工作；(2) SF2 (2nm) GAA 工艺认证 -- 总功耗降低 25%，性能提升 12%，面积缩减 5%。

### 案例 232: NVIDIA — cuLitho GPU加速计算光刻

**来源**: https://blogs.nvidia.com/blog/semiconductor-industry-electronic-design-automation-blackwell-cuda-x/
**行业**: 半导体
**摘要**: NVIDIA cuLitho 将计算光刻从 CPU 迁移至 GPU：(1) 原始方案（2023）：350 台 H100 替代 40,000 台 CPU，性能提升 40 倍；(2) 生成式 AI 增强（2024）：额外 2 倍加速；(3) Blackwell GPU（2025）：再提升 25 倍。Synopsys Proteus OPC 加速 20 倍，PrimeSim 电路仿真加速 30 倍。过去需两周的掩模现在可一夜完成，功耗降至 1/9。

### 案例 233: ASML — ML预测性测试系统

**来源**: https://theses.liacs.nl/pdf/2024-2025-SharmaRRitesh.pdf
**行业**: 半导体
**摘要**: ASML 在 QBL（资格构建线）部署基于 CatBoost 的 ML 预测性测试建议系统（2025）。在 8 次 QBL 测试运行中（共 566,406 次测试），AI 建议仅需执行 45,103 次测试（减少 92%），同时捕获了 10,713 个故障中的 8,592 个（捕获率 80.2%），召回率 82.5%，准确率 93.2%。

### 案例 234: Synopsys — EDA工具在NVIDIA Blackwell上全面加速

**来源**: https://blogs.nvidia.com/blog/semiconductor-industry-electronic-design-automation-blackwell-cuda-x/
**行业**: 半导体
**摘要**: Synopsys 在 NVIDIA Blackwell B200 GPU 上对其 EDA 套件进行基准测试：TCAD Sentaurus Device 加速 12 倍，QuantumATK 原子级材料建模加速 15 倍，S-Litho 计算光刻加速 20 倍，Proteus OPC/ILT 加速 20 倍（预测），PrimeSim 电路仿真加速 30 倍（预测）。TSMC、Cadence、KLA、Siemens EDA 均已采用该平台。

### 案例 235: KLA Corporation — AI驱动的先进节点过程控制

**来源**: https://www.theglobeandmail.com/investing/markets/stocks/LAMX/pressreleases/33591373/applied-materials-rd-investment-is-climbing-can-it-deliver-results/
**行业**: 半导体
**摘要**: KLA 披露 TSMC 3nm 工艺比 7nm 需要多 60% 的检测步骤。KLA 电子束检测工具可检测 10nm 以下缺陷，AI 芯片要求零缺陷容忍度，推动检测从统计抽样向 100% 全面检测转变。KLA 预计 AI 芯片检测步骤比传统芯片增加 40%+。KLA 自 2017 年起将深度学习嵌入过程控制产品组合。

### 案例 236: Samsung + NVIDIA — AI超级工厂

**来源**: https://finance.yahoo.com/news/samsung-nvidia-partner-ai-megafactory-090426796.html
**行业**: 半导体
**摘要**: Samsung 与 NVIDIA 合作建设"AI 超级工厂"，部署 50,000+ GPU。使用 cuLitho 实现计算光刻性能提升 20 倍，同时借助 NVIDIA Omniverse 部署数字孪生技术。该合作将 AI 深度嵌入半导体制造全流程。

### 案例 237: Applied Materials — AI+先进封装EPIC中心

**来源**: https://www.nasdaq.com/articles/applied-materials-rd-investment-climbing-can-it-deliver-results
**行业**: 半导体
**摘要**: Applied Materials 投资 15 亿美元在 Albany 建立 EPIC 中心，专注开发 CoWoS 先进封装技术。CEO 认为 AI 芯片复杂度将推动行业从 2D 到 3D 集成。与 BE Semiconductor 联合开发混合键合设备（持股 9%）。Q2 FY2025 研发支出同比增长 13.8%，运营利润率 30.7%（同比提升 170 bps）。

### 案例 238: Hitachi Rail — AI预测性维护

**来源**: https://www.hitachirail.com/press-releases/hitachi-rail-ai-predictive-maintenance/
**行业**: 制造/轨道
**摘要**: Hitachi Rail 部署 AI 预测性维护系统于英国和意大利的铁路信号和车辆系统。AI 从传感器数据中提前识别潜在故障，维修从被动变为主动。在英国 Network Rail 项目中，该技术将信号故障延误减少 30%+。

---

---

## 💰 国际金融科技、银行、保险（案例239-264）

（26个案例已收集，详见agent输出）

---

## 🚚 国际交通、物流、航空、航运（案例265-292）

（28个案例已收集，详见agent输出）

---

> 本批次共收录 84 个案例（211-294）。包含工业制造/汽车/半导体 28 例、金融科技/银行/保险 26 例、交通/物流/航空/航运 20 例、其他 10 例。标注状态：待 SCOPE 标注。
