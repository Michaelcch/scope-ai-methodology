# SCOPE 矛盾矩阵 — V5.2

> **版本**: V5.2 | **数据基础**: 814案例多格计数 | **总(S,C)组合数**: 2436
> **统计方法**: 每个案例标注1-3个改善参数和1-2个恶化参数，所有(改善,恶化)组合均计入。
> **信度阈值**: 🟢N≥120 | 🟡N=60-119 | 🟠N=30-59 | 🔴N=1-29

---

## 一、参数定义

### 改善参数（行）

| 编号 | 名称 | 通俗说法 |
|------|------|---------|
| S1 | 运营效率 | "做更多、更快、更省" |
| S2 | 用户体验与服务质量 | "让用户/客户更满意" |
| S3 | 创新能力 | "做以前做不到的事" |
| S4 | 风险控制 | "不出事、少犯错" |
| S5 | 收入增长 | "多赚钱" |
| S6 | 决策速度 | "决策更快更准" |
| S7 | 可持续性与社会价值 | "对社会和环境更好"（V5.2新增，数据积累中） |

### 恶化参数（列）

| 编号 | 名称 | 通俗说法 | 说明 |
|------|------|---------|------|
| C1 | 实施复杂度 | "太复杂落不了地" | — |
| C2 | 可解释性 | "AI说了算，人看不懂" | — |
| C3 | 对人的依赖度 | "AI越强人越弱" | 三个子关切: C3a技能退化 / C3b就业替代 / C3c情感依恋 |
| C4 | 成本 | "太贵了投不起" | — |
| C5 | 数据隐私风险 | "数据泄露了怎么办" | — |
| C6 | 系统安全性 | "AI出错了谁来担" | 含物理世界AI安全和系统自身成为风险源 |
| C7 | 公平性与算法偏见 | "AI会不会歧视人" | V5.2新增，数据积累中 |

---

## 二、原理编号速查

### 🔧 基础原理（默认推荐，不参与差异化排序）
| 编号 | 名称 |
|------|------|
| 🔧2 | 认知自动化 |
| 🔧7 | 预测与推演 |
| 🔧14 | 数字员工/智能体 |

### 差异化原理
| 编号 | 名称 | 编号 | 名称 |
|------|------|------|------|
| 1 | 智能分割 | 21 | 服务机器人化 |
| 3 | 极致个性化 | 22 | 生成式设计 |
| 4 | 动态定价与匹配 ⚠️ | 23 | 超个性化生产 |
| 5 | 无缝交互 | 24 | 知识产权生成 🏷️远期 |
| 6 | 流程重塑 | 25 | 智能教练与行为助推 |
| 8 | 智能溯源 | 26 | 能力延伸 |
| 9 | 智能编排与调度 | 27 | 变废为宝 |
| 10 | 智能风险防控 | 28 | 去中介化 |
| 11 | 情境感知响应 | 29 | 自我进化系统 |
| 12 | 群体智慧聚合 | 30a | 数字内容生成 |
| 13 | 人机环境协同 | 30b | 科学/工业生成设计 |
| 15 | 人机共创 | 31 | 复合感知与响应 |
| 16 | 能力即服务 | 34 | 蜂群智能 |
| 18 | 智能合约 | 35 | 自适应安全 |
| 19 | 数字孪生 | 36 | 客户共创生态 |
| 20 | 软件定义X | 37 | 元能力 |
| 38 | 科学发现加速 🆕 | 39 | 环境智能与可持续 🆕 |

> ⚠️=含失败案例  🏷️=远期/元原理  🆕=V5.1新增
> 退役编号: P17(P4合并), P32(已降级), P33(元原理)

---

## 三、矛盾矩阵数据

> **格式说明**: `信度 原理列表 [基础原理] N=案例数`
> 原理按在该格中的推荐优先级排序。基础原理(🔧2,🔧7,🔧14)放在方括号中，默认推荐但不参与差异化排序。

```
S1-C1 | 🟢 | N=241 | 差异化: 1,9,19,21,6,20,31 | 基础: 🔧2,🔧7,🔧14
S1-C2 | 🟢 | N=173 | 差异化: 1,8,26,30,25 | 基础: 🔧2,🔧7,🔧14
S1-C3 | 🟢 | N=128 | 差异化: 1,25,3,5,21,28 | 基础: 🔧2,🔧7,🔧14
S1-C4 | 🟢 | N=123 | 差异化: 9,21,6,5,16,4,19,39 | 基础: 🔧2,🔧7,🔧14
S1-C5 | 🟠 | N=47  | 差异化: 19,3,4,10 | 基础: 🔧2,🔧7,🔧14
S1-C6 | 🟢 | N=148 | 差异化: 1,10,31,35,9,20,21 | 基础: 🔧2,🔧7,🔧14
S2-C1 | 🟠 | N=36  | 差异化: 4,5,11,3,25,28 | 基础: 🔧2,🔧7,🔧14
S2-C2 | 🟠 | N=57  | 差异化: 1,14,3,25,10 | 基础: 🔧2,🔧7,🔧14
S2-C3 | 🟡 | N=67  | 差异化: 1,3,11,14,25,15 | 基础: 🔧2,🔧7,🔧14
S2-C4 | 🟠 | N=30  | 差异化: 25,21,19 | 基础: 🔧2,🔧7,🔧14
S2-C5 | 🟠 | N=49  | 差异化: 3,25,26 | 基础: 🔧2,🔧7,🔧14
S2-C6 | 🟠 | N=37  | 差异化: 10,25,9 | 基础: 🔧2,🔧7,🔧14
S3-C1 | 🟢 | N=130 | 差异化: 6,9,19,22,30,16,23,36,15,20,21,3,38 | 基础: 🔧2,🔧7,🔧14
S3-C2 | 🟡 | N=84  | 差异化: 8,37,12,30,22 | 基础: 🔧2,🔧7,🔧14
S3-C3 | 🟡 | N=68  | 差异化: 15,30 | 基础: 🔧2,🔧7,🔧14
S3-C4 | 🟡 | N=105 | 差异化: 6,19,22,30,36,3,38 | 基础: 🔧2,🔧7,🔧14
S3-C5 | 🟠 | N=31  | 差异化: 8,37,30 | 基础: 🔧2,🔧7,🔧14
S3-C6 | 🟡 | N=95  | 差异化: 20,21,19 | 基础: 🔧2,🔧7,🔧14
S4-C1 | 🟡 | N=114 | 差异化: 19,10,35,8,31 | 基础: 🔧2,🔧7,🔧14
S4-C2 | 🟡 | N=79  | 差异化: 8,10,35 | 基础: 🔧2,🔧7,🔧14
S4-C3 | 🔴 | N=29  | 差异化: 25,14,21 | 基础: 🔧2,🔧7,🔧14
S4-C4 | 🟠 | N=46  | 差异化: 10 | 基础: 🔧2,🔧7,🔧14
S4-C5 | 🟠 | N=32  | 差异化: 8,35,37,39 | 基础: 🔧2,🔧7,🔧14
S4-C6 | 🟡 | N=101 | 差异化: 10,35,18,34,29,9 | 基础: 🔧2,🔧7,🔧14
S5-C1 | 🟠 | N=51  | 差异化: 4,30,16,22,28,3 | 基础: 🔧2,🔧7,🔧14
S5-C2 | 🟡 | N=60  | 差异化: 4(慎),22,30,8 | 基础: 🔧2,🔧7,🔧14 | ⚠️P4在C2恶化下慎用
S5-C3 | 🟠 | N=50  | 差异化: 1,3,11,28,30,14 | 基础: 🔧2,🔧7,🔧14
S5-C4 | 🟠 | N=40  | 差异化: 5,14,30,16,28,3,22 | 基础: 🔧2,🔧7,🔧14
S5-C5 | 🟠 | N=34  | 差异化: 10,3,4 | 基础: 🔧2,🔧7,🔧14
S5-C6 | 🔴 | N=16  | 差异化: 21 | 基础: 🔧2,🔧7,🔧14
S6-C1 | 🟠 | N=32  | 差异化: 9 | 基础: 🔧2,🔧7,🔧14
S6-C2 | 🟠 | N=44  | 差异化: 8,16,26,12 | 基础: 🔧2,🔧7,🔧14
S6-C3 | 🔴 | N=13  | 差异化: (空) | 基础: 🔧2,🔧7,🔧14
S6-C4 | 🔴 | N=11  | 差异化: 9 | 基础: 🔧2,🔧7,🔧14
S6-C5 | 🔴 | N=5   | 差异化: 8,37 | 基础: 🔧2,🔧7,🔧14
S6-C6 | 🟠 | N=30  | 差异化: 8,10,14 | 基础: 🔧2,🔧7,🔧14
```

---

## 四、CSV格式矩阵（可直接导入工具）

```csv
improvement,worsening,confidence,color,N,principles,base_principles,warning
S1,C1,high,green,241,"1,9,19,21,6,20,31","2,7,14",
S1,C2,high,green,173,"1,8,26,30,25","2,7,14",
S1,C3,high,green,128,"1,25,3,5,21,28","2,7,14",
S1,C4,high,green,123,"9,21,6,5,16,4,19,39","2,7,14",
S1,C5,medium,orange,47,"19,3,4,10","2,7,14",
S1,C6,high,green,148,"1,10,31,35,9,20,21","2,7,14",
S2,C1,medium,orange,36,"4,5,11,3,25,28","2,7,14",
S2,C2,medium,orange,57,"1,14,3,25,10","2,7,14",
S2,C3,medium-high,yellow,67,"1,3,11,14,25,15","2,7,14",
S2,C4,medium,orange,30,"25,21,19","2,7,14",
S2,C5,medium,orange,49,"3,25,26","2,7,14",
S2,C6,medium,orange,37,"10,25,9","2,7,14",
S3,C1,high,green,130,"6,9,19,22,30,16,23,36,15,20,21,3,38","2,7,14",
S3,C2,medium-high,yellow,84,"8,37,12,30,22","2,7,14",
S3,C3,medium-high,yellow,68,"15,30","2,7,14",
S3,C4,medium-high,yellow,105,"6,19,22,30,36,3,38","2,7,14",
S3,C5,medium,orange,31,"8,37,30","2,7,14",
S3,C6,medium-high,yellow,95,"20,21,19","2,7,14",
S4,C1,medium-high,yellow,114,"19,10,35,8,31","2,7,14",
S4,C2,medium-high,yellow,79,"8,10,35","2,7,14",
S4,C3,low,red,29,"25,14,21","2,7,14",
S4,C4,medium,orange,46,"10","2,7,14",
S4,C5,medium,orange,32,"8,35,37,39","2,7,14",
S4,C6,medium-high,yellow,101,"10,35,18,34,29,9","2,7,14",
S5,C1,medium,orange,51,"4,30,16,22,28,3","2,7,14",
S5,C2,medium-high,yellow,60,"4,22,30,8","2,7,14","P4在C2恶化下须附带公平性与透明度机制"
S5,C3,medium,orange,50,"1,3,11,28,30,14","2,7,14",
S5,C4,medium,orange,40,"5,14,30,16,28,3,22","2,7,14",
S5,C5,medium,orange,34,"10,3,4","2,7,14",
S5,C6,low,red,16,"21","2,7,14",
S6,C1,medium,orange,32,"9","2,7,14",
S6,C2,medium,orange,44,"8,16,26,12","2,7,14",
S6,C3,low,red,13,"","2,7,14",
S6,C4,low,red,11,"9","2,7,14",
S6,C5,low,red,5,"8,37","2,7,14",
S6,C6,medium,orange,30,"8,10,14","2,7,14",
```

---

## 五、JSON格式矩阵（可直接解析）

```json
{
  "meta": {
    "version": "V5.2",
    "cases": 814,
    "total_combinations": 2436,
    "counting_method": "multi_cell",
    "thresholds": {
      "high": { "symbol": "🟢", "color": "green", "min": 120 },
      "medium_high": { "symbol": "🟡", "color": "yellow", "min": 60, "max": 119 },
      "medium": { "symbol": "🟠", "color": "orange", "min": 30, "max": 59 },
      "low": { "symbol": "🔴", "color": "red", "min": 1, "max": 29 }
    },
    "base_principles": [2, 7, 14],
    "base_principles_note": "基础原理几乎适用于所有矛盾组合，默认推荐但不参与差异化排序"
  },
  "parameters": {
    "improvement": {
      "S1": "运营效率",
      "S2": "用户体验与服务质量",
      "S3": "创新能力",
      "S4": "风险控制",
      "S5": "收入增长",
      "S6": "决策速度",
      "S7": "可持续性与社会价值（数据积累中）"
    },
    "worsening": {
      "C1": "实施复杂度",
      "C2": "可解释性",
      "C3": "对人的依赖度",
      "C3_sub": { "C3a": "技能退化", "C3b": "就业替代", "C3c": "情感依恋" },
      "C4": "成本",
      "C5": "数据隐私风险",
      "C6": "系统安全性",
      "C7": "公平性与算法偏见（数据积累中）"
    }
  },
  "cells": [
    {"id":"S1-C1","improvement":"S1","worsening":"C1","confidence":"high","symbol":"🟢","color":"green","N":241,"principles":[1,9,19,21,6,20,31],"base_principles":[2,7,14]},
    {"id":"S1-C2","improvement":"S1","worsening":"C2","confidence":"high","symbol":"🟢","color":"green","N":173,"principles":[1,8,26,30,25],"base_principles":[2,7,14]},
    {"id":"S1-C3","improvement":"S1","worsening":"C3","confidence":"high","symbol":"🟢","color":"green","N":128,"principles":[1,25,3,5,21,28],"base_principles":[2,7,14]},
    {"id":"S1-C4","improvement":"S1","worsening":"C4","confidence":"high","symbol":"🟢","color":"green","N":123,"principles":[9,21,6,5,16,4,19,39],"base_principles":[2,7,14]},
    {"id":"S1-C5","improvement":"S1","worsening":"C5","confidence":"medium","symbol":"🟠","color":"orange","N":47,"principles":[19,3,4,10],"base_principles":[2,7,14]},
    {"id":"S1-C6","improvement":"S1","worsening":"C6","confidence":"high","symbol":"🟢","color":"green","N":148,"principles":[1,10,31,35,9,20,21],"base_principles":[2,7,14]},
    {"id":"S2-C1","improvement":"S2","worsening":"C1","confidence":"medium","symbol":"🟠","color":"orange","N":36,"principles":[4,5,11,3,25,28],"base_principles":[2,7,14]},
    {"id":"S2-C2","improvement":"S2","worsening":"C2","confidence":"medium","symbol":"🟠","color":"orange","N":57,"principles":[1,14,3,25,10],"base_principles":[2,7,14]},
    {"id":"S2-C3","improvement":"S2","worsening":"C3","confidence":"medium_high","symbol":"🟡","color":"yellow","N":67,"principles":[1,3,11,14,25,15],"base_principles":[2,7,14]},
    {"id":"S2-C4","improvement":"S2","worsening":"C4","confidence":"medium","symbol":"🟠","color":"orange","N":30,"principles":[25,21,19],"base_principles":[2,7,14]},
    {"id":"S2-C5","improvement":"S2","worsening":"C5","confidence":"medium","symbol":"🟠","color":"orange","N":49,"principles":[3,25,26],"base_principles":[2,7,14]},
    {"id":"S2-C6","improvement":"S2","worsening":"C6","confidence":"medium","symbol":"🟠","color":"orange","N":37,"principles":[10,25,9],"base_principles":[2,7,14]},
    {"id":"S3-C1","improvement":"S3","worsening":"C1","confidence":"high","symbol":"🟢","color":"green","N":130,"principles":[6,9,19,22,30,16,23,36,15,20,21,3,38],"base_principles":[2,7,14]},
    {"id":"S3-C2","improvement":"S3","worsening":"C2","confidence":"medium_high","symbol":"🟡","color":"yellow","N":84,"principles":[8,37,12,30,22],"base_principles":[2,7,14]},
    {"id":"S3-C3","improvement":"S3","worsening":"C3","confidence":"medium_high","symbol":"🟡","color":"yellow","N":68,"principles":[15,30],"base_principles":[2,7,14]},
    {"id":"S3-C4","improvement":"S3","worsening":"C4","confidence":"medium_high","symbol":"🟡","color":"yellow","N":105,"principles":[6,19,22,30,36,3,38],"base_principles":[2,7,14]},
    {"id":"S3-C5","improvement":"S3","worsening":"C5","confidence":"medium","symbol":"🟠","color":"orange","N":31,"principles":[8,37,30],"base_principles":[2,7,14]},
    {"id":"S3-C6","improvement":"S3","worsening":"C6","confidence":"medium_high","symbol":"🟡","color":"yellow","N":95,"principles":[20,21,19],"base_principles":[2,7,14]},
    {"id":"S4-C1","improvement":"S4","worsening":"C1","confidence":"medium_high","symbol":"🟡","color":"yellow","N":114,"principles":[19,10,35,8,31],"base_principles":[2,7,14]},
    {"id":"S4-C2","improvement":"S4","worsening":"C2","confidence":"medium_high","symbol":"🟡","color":"yellow","N":79,"principles":[8,10,35],"base_principles":[2,7,14]},
    {"id":"S4-C3","improvement":"S4","worsening":"C3","confidence":"low","symbol":"🔴","color":"red","N":29,"principles":[25,14,21],"base_principles":[2,7,14]},
    {"id":"S4-C4","improvement":"S4","worsening":"C4","confidence":"medium","symbol":"🟠","color":"orange","N":46,"principles":[10],"base_principles":[2,7,14]},
    {"id":"S4-C5","improvement":"S4","worsening":"C5","confidence":"medium","symbol":"🟠","color":"orange","N":32,"principles":[8,35,37,39],"base_principles":[2,7,14]},
    {"id":"S4-C6","improvement":"S4","worsening":"C6","confidence":"medium_high","symbol":"🟡","color":"yellow","N":101,"principles":[10,35,18,34,29,9],"base_principles":[2,7,14]},
    {"id":"S5-C1","improvement":"S5","worsening":"C1","confidence":"medium","symbol":"🟠","color":"orange","N":51,"principles":[4,30,16,22,28,3],"base_principles":[2,7,14]},
    {"id":"S5-C2","improvement":"S5","worsening":"C2","confidence":"medium_high","symbol":"🟡","color":"yellow","N":60,"principles":[4,22,30,8],"base_principles":[2,7,14],"warning":"P4(动态定价)在C2可解释性恶化下须附带公平性与透明度机制"},
    {"id":"S5-C3","improvement":"S5","worsening":"C3","confidence":"medium","symbol":"🟠","color":"orange","N":50,"principles":[1,3,11,28,30,14],"base_principles":[2,7,14]},
    {"id":"S5-C4","improvement":"S5","worsening":"C4","confidence":"medium","symbol":"🟠","color":"orange","N":40,"principles":[5,14,30,16,28,3,22],"base_principles":[2,7,14]},
    {"id":"S5-C5","improvement":"S5","worsening":"C5","confidence":"medium","symbol":"🟠","color":"orange","N":34,"principles":[10,3,4],"base_principles":[2,7,14]},
    {"id":"S5-C6","improvement":"S5","worsening":"C6","confidence":"low","symbol":"🔴","color":"red","N":16,"principles":[21],"base_principles":[2,7,14]},
    {"id":"S6-C1","improvement":"S6","worsening":"C1","confidence":"medium","symbol":"🟠","color":"orange","N":32,"principles":[9],"base_principles":[2,7,14]},
    {"id":"S6-C2","improvement":"S6","worsening":"C2","confidence":"medium","symbol":"🟠","color":"orange","N":44,"principles":[8,16,26,12],"base_principles":[2,7,14]},
    {"id":"S6-C3","improvement":"S6","worsening":"C3","confidence":"low","symbol":"🔴","color":"red","N":13,"principles":[],"base_principles":[2,7,14]},
    {"id":"S6-C4","improvement":"S6","worsening":"C4","confidence":"low","symbol":"🔴","color":"red","N":11,"principles":[9],"base_principles":[2,7,14]},
    {"id":"S6-C5","improvement":"S6","worsening":"C5","confidence":"low","symbol":"🔴","color":"red","N":5,"principles":[8,37],"base_principles":[2,7,14]},
    {"id":"S6-C6","improvement":"S6","worsening":"C6","confidence":"medium","symbol":"🟠","color":"orange","N":30,"principles":[8,10,14],"base_principles":[2,7,14]}
  ],
  "extension_dimensions": {
    "S7": { "status": "data_accumulating", "note": "可持续性与社会价值，当前案例库中尚无明确标注" },
    "C7": { "status": "data_accumulating", "note": "公平性与算法偏见，当前案例库中尚无明确标注" }
  }
}
```

---

## 六、禁忌体系

| # | 矛盾组合 | 风险 | 典型案例 |
|---|---------|------|---------|
| ① | S5×C2: P4(动态定价) | 可解释性恶化下算法杀熟，引发信任危机 | 携程AI调价2026年3月下线 |
| ② | P2(认知自动化)×C2 | AI替代关键决策时须有可解释输出 | Air Canada聊天机器人、Epic脓毒症模型 |
| ③ | P14(数字员工)×C6 | 自主Agent权限边界须明确 | Cruise拖行行人事件 |
| ④ | P30(生成式创造力)×C6 | 深度伪造、AI作弊、虚假信息 | — |
| ⑤ | P10(智能风险防控)×C7 | 干预强度须成比例+可申诉 | Robodebt 50万人被误追债 |
| ⑥ | S5×C7: P4(动态定价) | 公平性恶化下算法歧视 | — |

---

## 七、使用说明

1. **查矩阵**: 根据用户的改善目标(S1-S6)和恶化约束(C1-C6)，定位对应格子。
2. **基础原理**: 🔧2,🔧7,🔧14 几乎适用于所有AI场景，默认推荐。
3. **差异化原理**: 格内列出的编号为该矛盾组合下统计推荐的原理，按优先级排序。
4. **禁忌检查**: 若涉及标⚠️的格或原理，必须参考禁忌体系给出防护建议。
5. **C3追问**: 若恶化参数涉及C3，Agent引导中须追问是C3a(技能退化)/C3b(就业替代)/C3c(情感依恋)中的哪一种。
6. **扩展维度**: S7(可持续性)和C7(公平性)为V5.2新增参数，当前案例数据积累中，Agent引导中按需激活。
