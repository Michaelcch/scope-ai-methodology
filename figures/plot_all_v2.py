"""
SCOPE 论文四张配图 — V2 防重叠版
严格遵循 scipilot-figure-skill 工作流
核心要求: 文字与图形零重叠，充足留白
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
from matplotlib.lines import Line2D
import seaborn as sns
import pandas as pd
import numpy as np
import os, sys

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

# ── Step 4: Environment Setup ─────────────────────────────
CJK_FONTS = ['SimHei', 'Noto Sans CJK SC', 'Source Han Sans SC', 'Microsoft YaHei']
avail = [f.name for f in fm.fontManager.ttflist]
ZH = next((f for f in CJK_FONTS if f in avail), 'sans-serif')
print(f"CJK font: {ZH}")

plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': [ZH, 'DejaVu Sans', 'Arial'],
    'axes.unicode_minus': False,
    'figure.dpi': 150,
    'savefig.dpi': 400,
    'savefig.bbox': 'tight',
    'savefig.pad_inches': 0.1,
})

# Colorblind-safe palettes
CAT_5 = ['#E69F00','#009E73','#56B4E9','#CC79A7','#D55E00']  # Okabe-Ito variant
CONF_4 = {'High':'#1B7837','Medium':'#E6C800','Low':'#E68A00','Minimal':'#D73027'}

def save_both(fig, name):
    """Save as both PDF and PNG"""
    png = os.path.join(OUTPUT_DIR, f'{name}.png')
    pdf = os.path.join(OUTPUT_DIR, f'{name}.pdf')
    fig.savefig(png, dpi=400, facecolor='white', edgecolor='none')
    fig.savefig(pdf, facecolor='white', edgecolor='none')
    print(f'  {name}.png + .pdf saved')

# ═══════════════════════════════════════════════════════════
# FIGURE 1: SCOPE五层架构与五步法
# ═══════════════════════════════════════════════════════════
print("\n── Fig 1: Architecture ──")

fig1, ax1 = plt.subplots(figsize=(10, 7.2))  # Big canvas
ax1.set_xlim(0, 14)
ax1.set_ylim(0, 14)
ax1.axis('off')
ax1.set_facecolor('white')

# Color palette
LC = ['#E3F2FD','#E8F5E9','#FFF3E0','#F3E5F5','#FFEBEE']
LS = ['#1565C0','#2E7D32','#E65100','#6A1B9A','#C62828']

# ── LEFT: 5 layers ──
lx, lw = 0.3, 7.8        # layer x and width
ly0, lh = 2.0, 1.75       # first layer y, layer height
lgap = 0.50               # GAP between layers (was 0.18, now 0.50!)

layers = [
    ('第一层：业务场景参数', '6个改善参数 + 6个恶化参数\n物理矛盾建模\n"想提升什么 vs 担心什么恶化"'),
    ('第二层：AI业务发明原理库', '36个原理，五大类\n标准化五段模板\n基础原理 / 禁忌 / 信度标记'),
    ('第三层：矛盾矩阵（核心）', '6×6 = 36格，100%填满率\n210案例交叉统计\n信度等级 + 禁忌组合'),
    ('第四层：AI业务进化路线', '7条进化路线 + 回滚分支\n近期 → 中期 → 远期三级跳\n时间维度的推进策略'),
    ('第五层：AI能力效应库', '14项AI技术映射\n"发明原理 → 具体AI技术"\nLLM / CV / RL / 时序预测...'),
]

for i, (title, desc) in enumerate(layers):
    y = ly0 + i * (lh + lgap)
    # Box
    rect = FancyBboxPatch((lx, y), lw, lh, boxstyle='round,pad=0.18',
                          facecolor=LC[i], edgecolor=LS[i], linewidth=1.8, alpha=0.95)
    ax1.add_patch(rect)
    # Number badge
    circ = plt.Circle((lx + 0.4, y + lh/2), 0.28, color=LS[i], alpha=0.9, zorder=5)
    ax1.add_patch(circ)
    ax1.text(lx + 0.4, y + lh/2, str(i+1), ha='center', va='center', fontsize=12,
            fontweight='bold', color='white', zorder=6)
    # Title (inside box top)
    ax1.text(lx + 0.85, y + lh - 0.35, title, ha='left', va='top', fontsize=13,
            fontweight='bold', color='#1A237E')
    # Description (inside box middle)
    ax1.text(lx + 0.85, y + lh/2 - 0.25, desc, ha='left', va='center', fontsize=9.5,
            color='#37474F', linespacing=1.5)

# Arrows between layers (in the gap space, not touching boxes)
for i in range(4):
    y_from = ly0 + i*(lh+lgap) + lh + 0.05
    y_to   = ly0 + (i+1)*(lh+lgap) - 0.05
    arr = FancyArrowPatch((lx + lw/2, y_from), (lx + lw/2, y_to),
                          arrowstyle='->,head_width=10,head_length=10',
                          color='#546E7A', linewidth=2.2, zorder=3)
    ax1.add_patch(arr)

# ── RIGHT: 5 steps ──
rx, rw = 9.0, 4.5
ry0, rh = 1.75, 1.10
rgap = 1.15              # Big gap for step descriptions

steps = [
    ('S  Strengthen', '增强目标\n明确要提升的核心业务目标'),
    ('C  Constrain', '约束预警\n识别AI引入后的恶化风险'),
    ('O  Originate', '创意生成\n查矛盾矩阵 → 推荐AI发明原理'),
    ('P  Path', '路径规划\n评估进化位置 → 三级跳路径'),
    ('E  Effect', '效应匹配\n原理 → 具体AI技术选型'),
]
SC = ['#1565C0','#0277BD','#00838F','#00695C','#2E7D32']

for i, (title, desc) in enumerate(steps):
    y = ry0 + i * (rh + rgap)
    # Box
    rect = FancyBboxPatch((rx, y), rw, rh, boxstyle='round,pad=0.12',
                          facecolor='white', edgecolor=SC[i], linewidth=2.5, alpha=0.95, zorder=4)
    ax1.add_patch(rect)
    # Title bar
    tbar = FancyBboxPatch((rx, y+rh-0.38), rw, 0.38, boxstyle='round,pad=0.03',
                          facecolor=SC[i], edgecolor='none', zorder=5)
    ax1.add_patch(tbar)
    ax1.text(rx + 0.3, y+rh-0.19, title, ha='left', va='center', fontsize=12,
            fontweight='bold', color='white', zorder=6)
    # Description
    ax1.text(rx + rw/2, y + (rh-0.38)/2, desc, ha='center', va='center', fontsize=9.5,
            color='#263238', linespacing=1.4, zorder=6)

# Arrows between steps (in the big gap)
for i in range(4):
    y_from = ry0 + i*(rh+rgap) + rh + 0.05
    y_to   = ry0 + (i+1)*(rh+rgap) - 0.05
    arr = FancyArrowPatch((rx + rw/2, y_from), (rx + rw/2, y_to),
                          arrowstyle='->,head_width=8,head_length=9',
                          color='#455A64', linewidth=1.8, zorder=3)
    ax1.add_patch(arr)

# ── Dashed connectors (in the gap between left and right) ──
link_lbls = ['参数\n定义', '原理\n搜索', '矩阵\n查询', '路径\n评估', '技术\n匹配']
for i in range(5):
    ly_c = ly0 + i*(lh+lgap) + lh/2
    sy_c = ry0 + i*(rh+rgap) + rh/2
    # Dashed line
    ax1.annotate('', xy=(rx - 0.1, sy_c), xytext=(lx + lw + 0.1, ly_c),
                arrowprops=dict(arrowstyle='->', color='#90A4AE', linewidth=1.0,
                               linestyle='dashed'), zorder=2)
    # Label in the gap center
    mx = (lx + lw + rx) / 2
    my = (ly_c + sy_c) / 2
    ax1.text(mx, my, link_lbls[i], ha='center', va='center', fontsize=7.5,
            color='#546E7A', style='italic',
            bbox=dict(boxstyle='round,pad=0.2', facecolor='white', edgecolor='#B0BEC5', alpha=0.85))

# Title area
ax1.text(7, 13.5, '图1  SCOPE方法论五层架构与五步法流程',
        ha='center', va='center', fontsize=17, fontweight='bold', color='#1A237E')
ax1.text(7, 13.0, 'Fig.1  Five-Layer Architecture and Five-Step Workflow of the SCOPE Methodology',
        ha='center', va='center', fontsize=10, style='italic', color='#546E7A')
ax1.text(7, 0.35, '注：左侧五层为方法论知识库支撑，右侧五步为用户交互流程，虚线连接表示每步对应的知识层调用。',
        ha='center', va='center', fontsize=8.5, color='#78909C')

save_both(fig1, 'fig1_scope_architecture')
plt.close()

# ═══════════════════════════════════════════════════════════
# FIGURE 2: Contradiction Matrix Heatmap
# ═══════════════════════════════════════════════════════════
print("\n── Fig 2: Matrix Heatmap ──")

df = pd.read_csv(os.path.join(OUTPUT_DIR, 'matrix_data.csv'))
row_order = ['S1_运营效率','S2_客户满意度','S3_创新能力','S4_风险控制','S5_收入增长','S6_决策速度']
col_order = ['C1_实施复杂度','C2_可解释性','C3_对人的依赖度','C4_成本','C5_数据隐私风险','C6_系统安全性']

pivot_n = df.pivot_table(index='Improvement',columns='Constraint',values='CaseCount',aggfunc='first')
pivot_n = pivot_n.reindex(index=row_order, columns=col_order)
pivot_c = df.pivot_table(index='Improvement',columns='Constraint',values='Confidence',aggfunc='first')
pivot_c = pivot_c.reindex(index=row_order, columns=col_order)

conf_map = {'High':3, 'Medium':2, 'Low':1, 'Minimal':0}
conf_sym = {'High':'■','Medium':'□','Low':'△','Minimal':'▽'}
color_mat = pivot_c.map(lambda x: conf_map.get(x,-1)).values

# Custom colormap: High=green, Medium=gold, Low=orange, Minimal=red
cmap = matplotlib.colors.ListedColormap([
    CONF_4['Minimal'], CONF_4['Low'], CONF_4['Medium'], CONF_4['High']
])

fig2, ax2 = plt.subplots(figsize=(7.5, 5.8))  # Wide, room for colorbar

im = ax2.imshow(color_mat, cmap=cmap, aspect='equal', vmin=0, vmax=3)

# Annotations: larger cells, smaller text = no overlap
short_r = ['S1 运营效率','S2 客户满意度','S3 创新能力','S4 风险控制','S5 收入增长','S6 决策速度']
short_c = ['C1 实施复杂度','C2 可解释性','C3 对人的依赖度','C4 成本','C5 数据隐私风险','C6 系统安全性']

for i in range(6):
    for j in range(6):
        n_val = int(pivot_n.iloc[i,j])
        sym = conf_sym.get(pivot_c.iloc[i,j], '')
        text = f'{sym} N≈{n_val}'
        tc = 'white' if color_mat[i,j]==3 else 'black'
        ax2.text(j, i, text, ha='center', va='center', fontsize=7.5,
                fontweight='bold' if color_mat[i,j]==3 else 'normal',
                color=tc)

# Ticks
ax2.set_xticks(range(6))
ax2.set_yticks(range(6))
ax2.set_xticklabels(short_c, fontsize=8, fontweight='bold')
ax2.set_yticklabels(short_r, fontsize=8, fontweight='bold')
ax2.xaxis.set_label_position('top')
ax2.xaxis.tick_top()

# Grid
for k in range(7):
    ax2.axhline(k-0.5, color='white', linewidth=1.5)
    ax2.axvline(k-0.5, color='white', linewidth=1.5)

# Labels
ax2.set_xlabel('恶化的业务约束 (Constrain)', fontsize=11, fontweight='bold')
ax2.set_ylabel('改善的业务目标 (Strengthen)', fontsize=11, fontweight='bold')

# Colorbar with plenty of room
cbar = fig2.colorbar(im, ax=ax2, shrink=0.82, pad=0.04)
cbar.set_ticks([0.375, 1.125, 1.875, 2.625])
cbar.set_ticklabels(['最低信度 (N=1-2)', '低信度 (N=3-5)', '中信度 (N=6-14)', '高信度 (N≥15)'])
cbar.ax.tick_params(labelsize=7.5)

# Titles — with clear separation
fig2.suptitle('图2  SCOPE矛盾矩阵 — 6×6=36格，210案例交叉统计',
             fontsize=13, fontweight='bold', y=1.01)
ax2.set_title('Fig.2  SCOPE Contradiction Matrix — 6×6 cells, 210 cases cross-statistics',
             fontsize=8.5, style='italic', pad=12)

plt.tight_layout(pad=1.2)
save_both(fig2, 'fig2_contradiction_matrix')
plt.close()

# ═══════════════════════════════════════════════════════════
# FIGURE 3: Principle Frequency Bar Chart
# ═══════════════════════════════════════════════════════════
print("\n── Fig 3: Principle Frequency ──")

dfp = pd.read_csv(os.path.join(OUTPUT_DIR, 'principle_frequency.csv'))
dfp = dfp[dfp['验证次数'] > 0].copy()
dfp = dfp.sort_values('验证次数', ascending=True)  # ascending for hbar

# Abbreviated names to avoid y-label crowding
def short_name(name):
    return name.replace('原理', 'P').replace('_', ' ')

dfp['short'] = dfp['PrincipleName'].apply(short_name)

CAT_COLORS = {
    '第一大类_重构流程与体验': CAT_5[0],
    '第二大类_增强决策与洞察': CAT_5[1],
    '第三大类_重塑生产关系': CAT_5[2],
    '第四大类_颠覆产品与资产': CAT_5[3],
    '第五大类_范式跃迁': CAT_5[4],
}
dfp['color'] = dfp['分类'].map(CAT_COLORS)

# Very tall figure for 34 bars — no crowding
fig3, ax3 = plt.subplots(figsize=(7, 11.5))

bars = ax3.barh(range(len(dfp)), dfp['验证次数'].values, color=dfp['color'].values,
                edgecolor='white', linewidth=0.3, height=0.78)

# Highlight pillars
pillars = ['原理2_认知自动化', '原理7_预测与推演', '原理9_智能编排与调度']
for i, (_, row) in enumerate(dfp.iterrows()):
    if row['PrincipleName'] in pillars:
        bars[i].set_color('#D73027')
        bars[i].set_edgecolor('#333333')
        bars[i].set_linewidth(1.2)

# Y labels — small but readable at full res
y_labels = []
for _, row in dfp.iterrows():
    lbl = row['short']
    if row['PrincipleName'] in pillars:
        lbl = '★ ' + lbl
    y_labels.append(lbl)
ax3.set_yticks(range(len(dfp)))
ax3.set_yticklabels(y_labels, fontsize=6.2)

# Value labels OUTSIDE bars (right side) — never overlap
for i, (_, row) in enumerate(dfp.iterrows()):
    count = row['验证次数']
    is_pillar = row['PrincipleName'] in pillars
    ax3.text(count + 1.5, i, str(count), va='center', fontsize=7.5,
            fontweight='bold' if is_pillar else 'normal', color='#333333')

ax3.set_xlabel('210案例中的验证次数', fontsize=11, fontweight='bold')
ax3.set_xlim(0, 76)  # Extra room for labels

# Legend OUTSIDE — below the chart, never overlap data
legend_items = [
    mpatches.Patch(color=CAT_COLORS['第一大类_重构流程与体验'], label='第一大类：重构流程与体验'),
    mpatches.Patch(color=CAT_COLORS['第二大类_增强决策与洞察'], label='第二大类：增强决策与洞察'),
    mpatches.Patch(color=CAT_COLORS['第三大类_重塑生产关系'], label='第三大类：重塑生产关系'),
    mpatches.Patch(color=CAT_COLORS['第四大类_颠覆产品与资产'], label='第四大类：颠覆产品与资产'),
    mpatches.Patch(color=CAT_COLORS['第五大类_范式跃迁'], label='第五大类：范式跃迁'),
    mpatches.Patch(color='#D73027', label='★ 三大支柱原理（基础原理）'),
]
ax3.legend(handles=legend_items, fontsize=7, loc='lower right',
          ncol=2, framealpha=0.9, edgecolor='#ccc')

# Titles
fig3.suptitle('图3  SCOPE 36项AI业务发明原理验证频次排名（n=210案例）',
             fontsize=13, fontweight='bold', y=1.005)
ax3.set_title('Fig.3  Validation Frequency Ranking of 36 AI Business Inventive Principles (n=210 cases)',
             fontsize=8.5, style='italic', pad=6)

plt.tight_layout(pad=1.0)
save_both(fig3, 'fig3_principle_frequency')
plt.close()

# ═══════════════════════════════════════════════════════════
# FIGURE 4: Evolution Routes
# ═══════════════════════════════════════════════════════════
print("\n── Fig 4: Evolution Routes ──")

FIG4_H = 8.5   # Tall for 7 routes
fig4, axes4 = plt.subplots(7, 1, figsize=(8, FIG4_H))
fig4.subplots_adjust(hspace=0.55)  # Generous vertical spacing

ROUTES = [
    ('路线1：洞察深度', ['报表\n(发生了什么)','仪表盘\n(正在发生什么)','预测性警报\n(将要发生什么)','规范建议\n(该怎么办)','自主行动'],
     5, '#1565C0', '代表：南方电网"大瓦特·天象" — 从负荷报表到AI自主调度'),
    ('路线2：决策自主度', ['AI给出\n建议','AI+人\n协同决策','AI增强人','AI替代人\n(特定任务)','AI自主执行\n人监督','AI完全\n自主'],
     6, '#2E7D32', '代表：多数处于"AI增强人"阶段 | 医疗最保守 | 电网/制造最激进'),
    ('路线3：产品形态', ['流程\n自动化','智能\n产品化','生态\n平台化'],
     3, '#E65100', '代表：杭州城市大脑 — 1.0交通治堵→3.0"模型+智能体"'),
    ('路线4：技术范式', ['基于规则','基于模型','基于生成','基于\n自进化'],
     4, '#6A1B9A', '代表：主流处于模型→生成过渡期 | Darktrace/西门子已进入自进化'),
    ('路线5：交互方式', ['菜单/\n表单','自然\n语言','多模态\n融合','无感交互\n(环境感知)'],
     4, '#00838F', '代表：滴滴(菜单→NL) | 美团无人车(多模态) | Vantiq(无感)'),
    ('路线6：Agent架构', ['单Agent','多Agent\n协同','Agent生态\n(自主协作)'],
     3, '#C62828', '代表：Figma/智联/绝味 — 多Agent协同，2025-2026爆发趋势'),
    ('路线7：价值分配', ['层级中介','平台中介','AI使能的\n去中介化'],
     3, '#37474F', '代表：遂溪仙品荔(果农+AI→消费者) | 阿桂(农户+AI→直销)'),
]

for idx, (ax, (title, stages, n, color, ex)) in enumerate(zip(axes4, ROUTES)):
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 3.0)
    ax.axis('off')

    # Route title — left side, clear space
    ax.text(0.05, 2.55, title, fontsize=10.5, fontweight='bold', color=color, va='center')

    spacing = 9.0 / n
    for si, stage in enumerate(stages):
        cx = 0.5 + si * spacing
        bw = spacing * 0.68  # box width
        # Box
        rect = FancyBboxPatch((cx - bw/2, 0.7), bw, 1.5, boxstyle='round,pad=0.1',
                              facecolor='white', edgecolor=color, linewidth=2.0, alpha=0.95)
        ax.add_patch(rect)
        # Fill gradient
        t = si / max(n-1, 1)
        r,g,b = int(color[1:3],16), int(color[3:5],16), int(color[5:7],16)
        fr = int(r + (255-r)*(1-t*0.55))
        fg = int(g + (255-g)*(1-t*0.55))
        fb = int(b + (255-b)*(1-t*0.55))
        fill = FancyBboxPatch((cx - bw/2, 0.7), bw, 1.5, boxstyle='round,pad=0.1',
                              facecolor=(fr/255, fg/255, fb/255), edgecolor='none', alpha=0.5)
        ax.add_patch(fill)
        # Text
        is_last = (si == n-1)
        ax.text(cx, 1.45, stage, ha='center', va='center', fontsize=7.5,
               fontweight='bold' if is_last else 'normal', color='#1A237E', linespacing=1.3)
        # Arrow
        if si < n-1:
            ax.annotate('', xy=(cx + spacing*0.18, 1.45), xytext=(cx + bw/2 + 0.03, 1.45),
                       arrowprops=dict(arrowstyle='->', color=color, lw=1.8))

    # Example text — BELOW boxes, never overlapping
    ax.text(5.0, 0.25, ex, ha='center', va='center', fontsize=7.2,
           color='#607D8B', style='italic')

# Overall titles
fig4.suptitle('图4  SCOPE七条AI业务进化路线',
             fontsize=14, fontweight='bold', color='#1A237E', y=1.005)
# Add English subtitle as a separate suptitle-like text on first axis
axes4[0].text(5, 3.15, 'Fig.4  Seven AI Business Evolution Trajectories of SCOPE',
            ha='center', va='bottom', fontsize=9, style='italic', color='#546E7A')

save_both(fig4, 'fig4_evolution_routes')
plt.close()

print("\n✓ All 4 figures regenerated with anti-overlap measures.")
print(f"  Output: {OUTPUT_DIR}/")
