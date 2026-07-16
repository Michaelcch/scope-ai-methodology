"""
SCOPE 学术论文配图生成
图2: 矛盾矩阵热力图 (6×6 Contradiction Matrix Heatmap)
图3: 36原理验证频次排名图 (Principle Validation Frequency Bar Chart)

目标期刊: 《智能系统学报》(中文核心期刊)
全宽 ~15cm = 5.9 inches
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.font_manager as fm
import seaborn as sns
import pandas as pd
import numpy as np
import os
import sys

# ============================================================
# Step 4: 环境配置 — 中文期刊规范
# ============================================================

# Find a CJK font for Chinese text
CJK_FONTS = ['Noto Sans CJK SC', 'Source Han Sans SC', 'SimHei', 'Microsoft YaHei', 'WenQuanYi Micro Hei']
available_fonts = [f.name for f in fm.fontManager.ttflist]
zh_font = None
for font_name in CJK_FONTS:
    if font_name in available_fonts:
        zh_font = font_name
        break

if zh_font is None:
    # Try to find any CJK font
    for f in fm.fontManager.ttflist:
        if any(kw in f.name.lower() for kw in ['cjk', 'hei', 'song', 'ming', 'yuan', 'kai', 'fang', 'noto', 'han']):
            zh_font = f.name
            break

if zh_font is None:
    print("WARNING: No CJK font found! Chinese characters may display as boxes.")
    print("Available fonts:", available_fonts[:20])
    zh_font = 'sans-serif'

print(f"Using CJK font: {zh_font}")

# Serif font for numbers (Times New Roman style for Chinese journals)
SERIF_FONT = 'Times New Roman'
if SERIF_FONT not in available_fonts:
    SERIF_FONT = 'serif'

plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': [zh_font, 'DejaVu Sans', 'Arial'],
    'font.size': 8,
    'axes.unicode_minus': False,  # Fix negative sign display
    'figure.dpi': 150,
    'savefig.dpi': 400,
    'savefig.bbox': 'tight',
    'savefig.pad_inches': 0.05,
})

# Colorblind-safe palette (Okabe-Ito)
CB_PALETTE = ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7']

# Category colors for 5 major groups
CATEGORY_COLORS = {
    '第一大类_重构流程与体验': '#E69F00',   # orange
    '第二大类_增强决策与洞察': '#009E73',   # green
    '第三大类_重塑生产关系': '#56B4E9',     # blue
    '第四大类_颠覆产品与资产': '#CC79A7',   # purple
    '第五大类_范式跃迁': '#D55E00',         # red
}

CONFIDENCE_COLORS = {
    'High': '#1B7837',     # dark green
    'Medium': '#E6C800',   # yellow/gold
    'Low': '#E68A00',      # orange
    'Minimal': '#D73027',  # red
}

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

# ============================================================
# 图2: 矛盾矩阵热力图
# ============================================================

print("\n" + "="*60)
print("FIG 2: Contradiction Matrix Heatmap")
print("="*60)

df_matrix = pd.read_csv(os.path.join(OUTPUT_DIR, 'matrix_data.csv'))

# Pivot to 6x6
pivot = df_matrix.pivot_table(
    index='Improvement',
    columns='Constraint',
    values='CaseCount',
    aggfunc='first'
)

# Ensure correct ordering
row_order = ['S1_运营效率', 'S2_客户满意度', 'S3_创新能力', 'S4_风险控制', 'S5_收入增长', 'S6_决策速度']
col_order = ['C1_实施复杂度', 'C2_可解释性', 'C3_对人的依赖度', 'C4_成本', 'C5_数据隐私风险', 'C6_系统安全性']
pivot = pivot.reindex(index=row_order, columns=col_order)

# Confidence pivot
conf_pivot = df_matrix.pivot_table(
    index='Improvement',
    columns='Constraint',
    values='Confidence',
    aggfunc='first'
).reindex(index=row_order, columns=col_order)

# Create labels: "N≈55\n🟢" format
short_rows = ['S1 运营效率', 'S2 客户满意度', 'S3 创新能力', 'S4 风险控制', 'S5 收入增长', 'S6 决策速度']
short_cols = ['C1 实施\n复杂度', 'C2 可解释性', 'C3 对人的\n依赖度', 'C4 成本', 'C5 数据\n隐私风险', 'C6 系统\n安全性']

conf_symbols = {'High': '■高', 'Medium': '□中', 'Low': '△低', 'Minimal': '▲最'}

# Build color matrix (numerical: High=3, Medium=2, Low=1, Minimal=0)
conf_map = {'High': 3, 'Medium': 2, 'Low': 1, 'Minimal': 0}
color_matrix = conf_pivot.map(lambda x: conf_map.get(x, -1)).values
annot_matrix = pivot.map(lambda x: f'N≈{int(x)}' if pd.notna(x) else '').values

# Add confidence symbol to annotation
for i in range(6):
    for j in range(6):
        conf_val = conf_pivot.iloc[i, j]
        symbol = conf_symbols.get(conf_val, '')
        annot_matrix[i][j] = f'{symbol}\n{annot_matrix[i][j]}'

# Colors: green (high) → yellow → orange → red (minimal)
cmap = matplotlib.colors.ListedColormap(['#F4A582', '#FDDBC7', '#D1E5F0', '#92C5DE'][::-1])
# Actually let's use a custom 4-color map: High=dark green, Medium=gold, Low=orange, Minimal=red
cmap = matplotlib.colors.ListedColormap([
    CONFIDENCE_COLORS['Minimal'],  # 0
    CONFIDENCE_COLORS['Low'],      # 1
    CONFIDENCE_COLORS['Medium'],   # 2
    CONFIDENCE_COLORS['High'],     # 3
])

fig, ax = plt.subplots(figsize=(6.2, 4.8))  # slightly wider than 5.9 for colorbar

im = ax.imshow(color_matrix, cmap=cmap, aspect='equal', vmin=0, vmax=3)

# Annotate
for i in range(6):
    for j in range(6):
        text = annot_matrix[i][j]
        # Determine text color for readability
        if color_matrix[i][j] >= 2:  # High/Medium → dark text
            text_color = 'white' if color_matrix[i][j] == 3 else 'black'
        else:
            text_color = 'black'
        ax.text(j, i, text, ha='center', va='center', fontsize=6.5,
                fontweight='bold' if color_matrix[i][j] == 3 else 'normal',
                color=text_color, linespacing=1.2)

# Ticks
ax.set_xticks(range(6))
ax.set_yticks(range(6))
ax.set_xticklabels(short_cols, fontsize=7, fontweight='bold')
ax.set_yticklabels(short_rows, fontsize=7, fontweight='bold')

# Grid lines
for i in range(7):
    ax.axhline(i - 0.5, color='white', linewidth=1.2)
    ax.axvline(i - 0.5, color='white', linewidth=1.2)

# Labels
ax.set_xlabel('恶化的业务约束 (Constrain)', fontsize=9, fontweight='bold', labelpad=8)
ax.set_ylabel('改善的业务目标 (Strengthen)', fontsize=9, fontweight='bold', labelpad=8)
ax.xaxis.set_label_position('top')
ax.xaxis.tick_top()

# Colorbar
cbar = fig.colorbar(im, ax=ax, shrink=0.82, pad=0.02)
cbar.set_ticks([0.375, 1.125, 1.875, 2.625])
cbar.set_ticklabels(['▲ 最低信度\n   (N=1-2)', '△ 低信度\n   (N=3-5)', '□ 中信度\n   (N=6-14)', '■ 高信度\n   (N≥15)'])
cbar.ax.tick_params(labelsize=6)

# Title
fig.suptitle('图2  SCOPE矛盾矩阵 — 6×6=36格，210案例交叉统计',
             fontsize=10, fontweight='bold', y=1.02)
ax.set_title('Figure 2  SCOPE Contradiction Matrix — 6×6 cells, 210 cases cross-statistics',
             fontsize=7, fontstyle='italic', pad=4, y=0)

plt.tight_layout()
fig.savefig(os.path.join(OUTPUT_DIR, 'fig2_contradiction_matrix.png'), dpi=400, bbox_inches='tight')
fig.savefig(os.path.join(OUTPUT_DIR, 'fig2_contradiction_matrix.pdf'), bbox_inches='tight')
print(f"Fig 2 saved → {OUTPUT_DIR}/fig2_contradiction_matrix.{'pdf,png'}")
plt.close()

# ============================================================
# 图3: 36原理验证频次排名 (横向柱状图)
# ============================================================

print("\n" + "="*60)
print("FIG 3: Principle Validation Frequency Bar Chart")
print("="*60)

df_principles = pd.read_csv(os.path.join(OUTPUT_DIR, 'principle_frequency.csv'))

# Filter out 远期原理 and 元原理 (count = 0)
df_plot = df_principles[df_principles['验证次数'] > 0].copy()
df_plot = df_plot.sort_values('验证次数', ascending=True)  # ascending for horizontal bar

# Map category to color
df_plot['color'] = df_plot['分类'].map(CATEGORY_COLORS)

# Create figure
fig, ax = plt.subplots(figsize=(6.0, 8.5))  # tall for 34 bars

# Draw bars
bars = ax.barh(range(len(df_plot)), df_plot['验证次数'].values, color=df_plot['color'].values,
               edgecolor='white', linewidth=0.3, height=0.75)

# Highlight top 3 pillars with asterisk and bold
pillar_principles = ['原理2_认知自动化', '原理7_预测与推演', '原理9_智能编排与调度']
pillar_colors = ['#D73027', '#D73027', '#FC8D59']  # red for pillars

for i, (_, row) in enumerate(df_plot.iterrows()):
    if row['PrincipleName'] in pillar_principles:
        # Re-color pillar bars
        bars[i].set_color(pillar_colors[pillar_principles.index(row['PrincipleName'])])
        bars[i].set_edgecolor('#333333')
        bars[i].set_linewidth(1.0)

# Labels
y_labels = []
for _, row in df_plot.iterrows():
    name = row['PrincipleName'].replace('_', ' ')
    if row['PrincipleName'] in pillar_principles:
        name = f"★ {name}"
    y_labels.append(name)

ax.set_yticks(range(len(df_plot)))
ax.set_yticklabels(y_labels, fontsize=5.5)

# Value labels on bars
for i, (_, row) in enumerate(df_plot.iterrows()):
    count = row['验证次数']
    ax.text(count + 1.0, i, str(count), va='center', fontsize=6,
            fontweight='bold' if row['PrincipleName'] in pillar_principles else 'normal',
            color='#333333')

ax.set_xlabel('210案例中的验证次数', fontsize=9, fontweight='bold')
ax.set_xlim(0, 72)  # max 63 + some padding

# Legend for 5 categories
from matplotlib.patches import Patch
legend_elements = [
    Patch(facecolor=CATEGORY_COLORS['第一大类_重构流程与体验'], label='第一大类: 重构流程与体验'),
    Patch(facecolor=CATEGORY_COLORS['第二大类_增强决策与洞察'], label='第二大类: 增强决策与洞察'),
    Patch(facecolor=CATEGORY_COLORS['第三大类_重塑生产关系'], label='第三大类: 重塑生产关系'),
    Patch(facecolor=CATEGORY_COLORS['第四大类_颠覆产品与资产'], label='第四大类: 颠覆产品与资产'),
    Patch(facecolor=CATEGORY_COLORS['第五大类_范式跃迁'], label='第五大类: 范式跃迁'),
]
# Add pillar legend
legend_elements.append(Patch(facecolor='#D73027', label='★ 三大支柱原理 (基础原理)'))

ax.legend(handles=legend_elements, fontsize=5.5, loc='lower right',
          ncol=2, framealpha=0.9, edgecolor='#cccccc')

# Title
fig.suptitle('图3  SCOPE 36项AI业务发明原理验证频次排名 (n=210案例)',
             fontsize=10, fontweight='bold', y=1.01)
ax.set_title('Figure 3  Validation Frequency Ranking of 36 AI Business Inventive Principles (n=210 cases)',
             fontsize=7, fontstyle='italic', pad=2)

# Annotation for pillars
ax.annotate('双引擎:\n认知自动化 & 预测推演',
            xy=(63, len(df_plot)-1), xytext=(50, len(df_plot)-6),
            fontsize=6, ha='center',
            arrowprops=dict(arrowstyle='->', color='#666666', lw=1.2),
            bbox=dict(boxstyle='round,pad=0.3', facecolor='#FFF3CD', edgecolor='#E6C800', alpha=0.9))

plt.tight_layout()
fig.savefig(os.path.join(OUTPUT_DIR, 'fig3_principle_frequency.png'), dpi=400, bbox_inches='tight')
fig.savefig(os.path.join(OUTPUT_DIR, 'fig3_principle_frequency.pdf'), bbox_inches='tight')
print(f"Fig 3 saved → {OUTPUT_DIR}/fig3_principle_frequency.{{pdf,png}}")
plt.close()

# ============================================================
# Summary
# ============================================================
print("\n" + "="*60)
print("FIGURE GENERATION COMPLETE")
print("="*60)
print(f"Output directory: {OUTPUT_DIR}")
print("Files:")
for f in os.listdir(OUTPUT_DIR):
    fpath = os.path.join(OUTPUT_DIR, f)
    size_kb = os.path.getsize(fpath) / 1024
    print(f"  {f} ({size_kb:.1f} KB)")
print("\nDone!")
