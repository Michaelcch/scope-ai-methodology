"""
SCOPE 学术论文 — 补充配图
Fig 1: SCOPE五层架构与五步法示意图
Fig 4: 七条AI业务进化路线示意图

注意: 这是示意图/架构图，非纯数据图。用 matplotlib patches 尽力而为。
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Arc
import matplotlib.font_manager as fm
import numpy as np
import os

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

# Find CJK font
CJK_FONTS = ['SimHei', 'Noto Sans CJK SC', 'Source Han Sans SC', 'Microsoft YaHei']
available_fonts = [f.name for f in fm.fontManager.ttflist]
zh_font = None
for fn in CJK_FONTS:
    if fn in available_fonts:
        zh_font = fn
        break
if zh_font is None:
    for f in fm.fontManager.ttflist:
        if any(kw in f.name.lower() for kw in ['hei', 'cjk', 'noto', 'han', 'yahei']):
            zh_font = f.name
            break
if zh_font is None:
    zh_font = 'sans-serif'

print(f"Using font: {zh_font}")

plt.rcParams.update({
    'font.family': 'sans-serif',
    'font.sans-serif': [zh_font, 'DejaVu Sans'],
    'axes.unicode_minus': False,
    'figure.dpi': 150,
    'savefig.dpi': 400,
    'savefig.bbox': 'tight',
})

# ============================================================
# Fig 1: SCOPE五层架构与五步法示意图
# ============================================================

fig, ax = plt.subplots(1, 1, figsize=(7.2, 5.5))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')
ax.set_facecolor('white')

# Color palette
COLORS = {
    'layer1': '#E3F2FD',  # light blue
    'layer2': '#E8F5E9',  # light green
    'layer3': '#FFF3E0',  # light orange
    'layer4': '#F3E5F5',  # light purple
    'layer5': '#FFEBEE',  # light red
    'step': '#1565C0',    # dark blue for steps
    'arrow': '#546E7A',   # gray-blue for arrows
    'outline': '#37474F',
}

def draw_box(ax, x, y, w, h, text, color, title=None, fontsize=7.5, title_size=9):
    """Draw a rounded box with text"""
    rect = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.15",
                          facecolor=color, edgecolor=COLORS['outline'], linewidth=1.2, alpha=0.95)
    ax.add_patch(rect)
    if title:
        ax.text(x + w/2, y + h - 0.28, title, ha='center', va='top', fontsize=title_size,
                fontweight='bold', color='#263238')
    ax.text(x + w/2, y + h/2 - (0.15 if title else 0), text, ha='center', va='center',
            fontsize=fontsize, color='#37474F', linespacing=1.4)

# --- Left side: 5 layers (stacked vertically) ---
layer_data = [
    ('第一层: 业务场景参数', '6个改善参数 + 6个恶化参数\n物理矛盾建模\n"想提升什么 vs 担心什么恶化"', COLORS['layer1']),
    ('第二层: AI业务发明原理库', '36个原理, 五大类\n标准化五段模板\n基础原理/禁忌/信度标记', COLORS['layer2']),
    ('第三层: 矛盾矩阵', '6×6 = 36格, 100%填满率\n210案例交叉统计\n信度等级 + [!]禁忌组合', COLORS['layer3']),
    ('第四层: AI业务进化路线', '7条进化路线 + 回滚分支\n三级跳: 近期→中期→远期\n时间维度的推进策略', COLORS['layer4']),
    ('第五层: AI能力效应库', '14项 AI技术映射\n"发明原理→具体AI技术"\nLLM/CV/RL/时序预测/...', COLORS['layer5']),
]

layer_y = 1.8
layer_h = 1.45
layer_x = 0.3
layer_w = 5.8
gap = 0.18

for i, (title, desc, color) in enumerate(layer_data):
    y = layer_y + i * (layer_h + gap)
    draw_box(ax, layer_x, y, layer_w, layer_h, desc, color, title=title, fontsize=7, title_size=8.5)
    # Layer number badge
    circle = plt.Circle((layer_x + 0.35, y + layer_h/2), 0.22, color=COLORS['outline'], alpha=0.85, zorder=5)
    ax.add_patch(circle)
    ax.text(layer_x + 0.35, y + layer_h/2, str(i+1), ha='center', va='center', fontsize=9,
            fontweight='bold', color='white', zorder=6)

# --- Arrows between layers (upward) ---
for i in range(4):
    y_from = layer_y + i * (layer_h + gap)
    y_to = y_from + layer_h + gap
    arrow = FancyArrowPatch((layer_x + layer_w/2, y_from), (layer_x + layer_w/2, y_to - 0.02),
                            arrowstyle='->,head_width=7,head_length=8',
                            color=COLORS['arrow'], linewidth=1.8, zorder=3)
    ax.add_patch(arrow)

# --- Right side: 5-step flow (S→C→O→P→E) ---
step_x = 6.7
step_w = 2.9
step_h = 1.1
step_gap = 0.53
step_start_y = 2.0

steps = [
    ('S   Strengthen', '增强目标\n明确要提升的核心业务目标', '#1565C0'),
    ('C   Constrain', '约束预警\n识别AI引入后的恶化风险', '#0277BD'),
    ('O   Originate', '创意生成\n查矛盾矩阵→推荐AI发明原理', '#00838F'),
    ('P   Path', '路径规划\n评估进化位置→三级跳路径', '#00695C'),
    ('E   Effect', '效应匹配\n原理→具体AI技术选型', '#2E7D32'),
]

for i, (title, desc, color) in enumerate(steps):
    y = step_start_y + i * (step_h + step_gap)
    rect = FancyBboxPatch((step_x, y), step_w, step_h, boxstyle="round,pad=0.1",
                          facecolor='white', edgecolor=color, linewidth=2.0, alpha=0.95, zorder=4)
    ax.add_patch(rect)
    # Title bar
    title_bar = FancyBboxPatch((step_x, y + step_h - 0.32), step_w, 0.32,
                               boxstyle="round,pad=0.02", facecolor=color, edgecolor='none', zorder=5)
    ax.add_patch(title_bar)
    ax.text(step_x + 0.25, y + step_h - 0.16, title, ha='left', va='center', fontsize=8.5,
            fontweight='bold', color='white', zorder=6)
    ax.text(step_x + step_w/2, y + step_h/2 - 0.15, desc, ha='center', va='center',
            fontsize=7, color='#37474F', linespacing=1.4, zorder=6)

# --- Arrows between steps ---
for i in range(4):
    y_from = step_start_y + i * (step_h + step_gap)
    y_to = y_from + step_h + step_gap
    arrow = FancyArrowPatch((step_x + step_w/2, y_from), (step_x + step_w/2, y_to - 0.02),
                            arrowstyle='->,head_width=6,head_length=7',
                            color='#455A64', linewidth=1.5, zorder=3)
    ax.add_patch(arrow)

# --- Linking arrows from layers to steps ---
link_labels = ['参数\n定义', '原理\n搜索', '矩阵\n查询', '路径\n评估', '技术\n匹配']
for i in range(5):
    ly = layer_y + i * (layer_h + gap) + layer_h/2
    sy = step_start_y + i * (step_h + step_gap) + step_h/2
    # Dashed connector
    ax.annotate('', xy=(step_x - 0.08, sy), xytext=(layer_x + layer_w + 0.08, ly),
                arrowprops=dict(arrowstyle='->', color='#90A4AE', linewidth=1.0,
                               linestyle='dashed', connectionstyle='arc3,rad=0'),
                zorder=2)
    ax.text(layer_x + layer_w + 0.45, (ly + sy)/2, link_labels[i], ha='center', va='center',
            fontsize=5.5, color='#78909C', style='italic', zorder=2,
            bbox=dict(boxstyle='round,pad=0.15', facecolor='white', edgecolor='#B0BEC5', alpha=0.8))

# --- Title ---
ax.text(5, 9.55, '图1  SCOPE方法论五层架构与五步法流程',
        ha='center', va='center', fontsize=12, fontweight='bold', color='#1A237E')
ax.text(5, 9.05, 'Figure 1  Five-Layer Architecture and Five-Step Workflow of the SCOPE Methodology',
        ha='center', va='center', fontsize=8, style='italic', color='#546E7A')

# --- Bottom annotation ---
ax.text(5, 0.5, '注: 左侧五层为方法论的知识库支撑, 右侧五步为用户交互流程, 虚线连接表示每步对应的知识层调用。',
        ha='center', va='center', fontsize=6.5, color='#78909C', style='italic')

fig.savefig(os.path.join(OUTPUT_DIR, 'fig1_scope_architecture.png'), dpi=400, bbox_inches='tight',
            facecolor='white', edgecolor='none')
fig.savefig(os.path.join(OUTPUT_DIR, 'fig1_scope_architecture.pdf'), bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("Fig 1 saved.")
plt.close()

# ============================================================
# Fig 4: 七条AI业务进化路线示意图
# ============================================================

fig, axes = plt.subplots(7, 1, figsize=(7.2, 8.0))
fig.subplots_adjust(hspace=0.45)

ROUTES = [
    ('路线1: 洞察深度', ['报表\n(发生了什么)', '仪表盘\n(正在发生什么)', '预测性警报\n(将要发生什么)', '规范建议\n(该怎么办)', '自主行动'],
     '#1565C0', '南方电网"大瓦特·天象": 报表→AI自主调度'),
    ('路线2: 决策自主度', ['AI给出建议', 'AI+人\n协同决策', 'AI增强人', 'AI替代人\n(特定任务)', 'AI自主执行\n人监督', 'AI完全自主'],
     '#2E7D32', '医疗最保守 | 制造/电网最激进 | 多数处于"AI增强人"'),
    ('路线3: 产品形态', ['流程自动化', '智能产品化', '生态平台化'],
     '#E65100', '杭州城市大脑: 1.0治堵→3.0模型+智能体'),
    ('路线4: 技术范式', ['基于规则', '基于模型', '基于生成', '基于自进化'],
     '#6A1B9A', '主流: 模型→生成过渡期 | Darktrace/西门子: 自进化前沿'),
    ('路线5: 交互方式', ['菜单/表单', '自然语言', '多模态融合', '无感交互\n(环境感知)'],
     '#00838F', '滴滴: 菜单→NL | 美团无人车: 多模态 | Vantiq: 无感'),
    ('路线6: Agent架构', ['单Agent', '多Agent协同', 'Agent生态\n(自主协作)'],
     '#C62828', 'Figma/智联/绝味: 多Agent协同 | 2025-2026爆发趋势'),
    ('路线7: 价值分配', ['层级中介', '平台中介', 'AI使能的\n去中介化'],
     '#37474F', '遂溪仙品荔: 果农+AI→消费者 | 阿桂: 农户+AI→直销'),
]

for idx, (ax, (title, stages, color, example)) in enumerate(zip(axes, ROUTES)):
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 2.5)
    ax.axis('off')

    # Route title
    ax.text(0.1, 2.2, title, fontsize=8.5, fontweight='bold', color=color, va='center')

    n = len(stages)
    spacing = 9.0 / max(n, 1)

    for i, stage in enumerate(stages):
        x = 0.5 + i * spacing
        # Box
        box_w = spacing * 0.72
        rect = FancyBboxPatch((x - box_w/2, 0.55), box_w, 1.35,
                              boxstyle="round,pad=0.1", facecolor='white',
                              edgecolor=color, linewidth=1.8, alpha=0.95)
        ax.add_patch(rect)
        # Gradient fill
        alpha_val = 0.15 + 0.2 * (i / max(n-1, 1))
        fill = FancyBboxPatch((x - box_w/2, 0.55), box_w, 1.35,
                              boxstyle="round,pad=0.1", facecolor=color,
                              edgecolor='none', alpha=alpha_val)
        ax.add_patch(fill)
        # Text
        ax.text(x, 1.25, stage, ha='center', va='center', fontsize=6.5, color='#263238',
                linespacing=1.3, fontweight='bold' if i == n-1 else 'normal')

        # Arrow between stages
        if i < n - 1:
            ax.annotate('', xy=(x + spacing*0.18, 1.25), xytext=(x + box_w/2 + 0.02, 1.25),
                       arrowprops=dict(arrowstyle='->', color=color, lw=1.5))

    # Example annotation
    ax.text(5.0, 0.15, f'代表: {example}', ha='center', va='center', fontsize=5.8,
            color='#78909C', style='italic')

# Overall title
fig.suptitle('图4  SCOPE七条AI业务进化路线\nFigure 4  Seven AI Business Evolution Trajectories of SCOPE',
             fontsize=11, fontweight='bold', color='#1A237E', y=1.0)

fig.savefig(os.path.join(OUTPUT_DIR, 'fig4_evolution_routes.png'), dpi=400, bbox_inches='tight',
            facecolor='white', edgecolor='none')
fig.savefig(os.path.join(OUTPUT_DIR, 'fig4_evolution_routes.pdf'), bbox_inches='tight',
            facecolor='white', edgecolor='none')
print("Fig 4 saved.")
plt.close()

print("\nAll figures generated successfully!")
