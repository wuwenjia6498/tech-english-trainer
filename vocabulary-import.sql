-- 清空旧数据并重置自增 ID
TRUNCATE TABLE vocabulary RESTART IDENTITY;

INSERT INTO vocabulary (word, phonetic, category, translation, tech_context, code_example)
VALUES
  (E'Algorithm', E'[ˈæl.ɡə.rɪ.ðəm]', E'编程基础', E'算法', E'解决特定问题的一系列明确步骤，就像做菜的食谱，告诉计算机一步一步做什么。', E'# Algorithm — 算法
def binary_search(arr, target):
    left, right = 0, len(arr)-1
    while left <= right:
        mid = (left+right)//2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid+1
        else: right = mid-1
    return -1'),
  (E'Variable', E'[ˈver.i.ə.bəl]', E'编程基础', E'变量', E'一个带名字的容器，用来存放会变化的数据，比如用户的年龄、购物车里的商品数量。', E'# Variable — 变量
user_name = "Alice"
user_age = 25
print(f"{user_name} is {user_age} years old.")'),
  (E'Function', E'[ˈfʌŋk.ʃən]', E'编程基础', E'函数', E'一段打包好的、可以重复使用的代码块，给它输入，它执行任务并返回输出。', E'# Function — 函数
def greet(name):
    return f"Hello, {name}!"
print(greet("Bob"))'),
  (E'Loop', E'[luːp]', E'编程基础', E'循环', E'让计算机重复做某件事，直到满足停止条件，比如打印列表里的每一个名字。', E'# Loop — 循环
for i in range(5):
    print(f"Iteration {i}")'),
  (E'Conditional', E'[kənˈdɪʃ.ən.əl]', E'编程基础', E'条件语句', E'让程序根据不同情况做不同的事，就像十字路口的红绿灯决定停还是走。', E'# Conditional — 条件语句
temperature = 20
if temperature > 30:
    print("It''s hot.")
elif temperature > 15:
    print("It''s warm.")
else:
    print("It''s cold.")'),
  (E'Array', E'[əˈreɪ]', E'编程基础', E'数组', E'一排整齐的格子，每个格子里可以放一个数据，按位置编号访问。', E'# Array — 数组
fruits = ["apple", "banana", "cherry"]
print(fruits[0])  # 输出 apple'),
  (E'String', E'[strɪŋ]', E'编程基础', E'字符串', E'一串字符，可以是一个单词、一句话，或者一整篇文本。', E'# String — 字符串
message = "Welcome to AI world!"
print(message.upper())'),
  (E'Integer', E'[ˈɪn.tɪ.dʒər]', E'编程基础', E'整数', E'没有小数点的数字，比如 -3, 0, 42。', E'# Integer — 整数
count = 10
next_count = count + 1'),
  (E'Float', E'[floʊt]', E'编程基础', E'浮点数', E'带小数点的数字，用来表示更精确的数值，比如 3.14 或 0.001。', E'# Float — 浮点数
pi = 3.14159
radius = 2.5
area = pi * radius ** 2'),
  (E'Boolean', E'[ˈbuː.li.ən]', E'编程基础', E'布尔值', E'只有两种状态：真 (True) 或假 (False)，用于逻辑判断。', E'# Boolean — 布尔值
is_raining = False
if is_raining:
    print("Take an umbrella.")'),
  (E'Dictionary', E'[ˈdɪk.ʃən.er.i]', E'编程基础', E'字典', E'一种''键-值''配对的数据结构，像真正的字典一样，通过查''词条''快速找到对应的''解释''。', E'# Dictionary — 字典
person = {"name": "Alice", "age": 25, "city": "Beijing"}
print(person["name"])'),
  (E'List', E'[lɪst]', E'编程基础', E'列表', E'Python 里一种可以动态增删改查的有序集合，相当于其他语言中的数组。', E'# List — 列表
numbers = [1, 2, 3]
numbers.append(4)
print(numbers)'),
  (E'Tuple', E'[tʌpəl]', E'编程基础', E'元组', E'一个不可变的列表，一旦创建就不能修改里面的元素。', E'# Tuple — 元组
coordinates = (10, 20)
x, y = coordinates'),
  (E'Set', E'[set]', E'编程基础', E'集合', E'一个不允许有重复元素的无序容器，适合用来去重或做数学集合运算。', E'# Set — 集合
unique_ids = {101, 102, 103, 101}
print(unique_ids)  # {101, 102, 103}'),
  (E'Class', E'[klæs]', E'编程基础', E'类', E'创建对象的蓝图或模板，定义了这类对象有哪些属性和行为。', E'# Class — 类
class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        print(f"{self.name} says woof!")'),
  (E'Object', E'[ˈɑːb.dʒekt]', E'编程基础', E'对象', E'根据类创建出来的具体实例，有自己独立的状态（数据）和行为（方法）。', E'# Object — 对象
my_dog = Dog("Buddy")
my_dog.bark()'),
  (E'Method', E'[ˈmeθ.əd]', E'编程基础', E'方法', E'定义在类里面的函数，用来描述对象能做什么动作。', E'# Method — 方法
class Calculator:
    def add(self, a, b):
        return a + b'),
  (E'Attribute', E'[ˈæ.trɪ.bjuːt]', E'编程基础', E'属性', E'对象内部存储的数据变量，比如一辆车的颜色、品牌。', E'# Attribute — 属性
class Car:
    def __init__(self, color):
        self.color = color  # color 是属性'),
  (E'Module', E'[ˈmɑː.dʒuːl]', E'开发环境', E'模块', E'一个单独的 Python 文件，里面可以包含函数、类，供其他程序导入复用。', E'# Module — 模块
# 文件: math_utils.py
def add(a, b): return a+b

# 另一文件
import math_utils
print(math_utils.add(2,3))'),
  (E'Package', E'[ˈpæk.ɪdʒ]', E'开发环境', E'包', E'一个包含多个模块的文件夹，通常用来组织大型项目或分发工具库。', E'# Package — 包
# 安装第三方包
pip install numpy'),
  (E'Library', E'[ˈlaɪ.brər.i]', E'开发环境', E'库', E'预先写好的代码集合，帮你解决特定领域的问题，比如 NumPy 做数值计算，Requests 发网络请求。', E'# Library — 库
import requests
response = requests.get("https://api.github.com")'),
  (E'Framework', E'[ˈfreɪm.wɝːk]', E'开发环境', E'框架', E'一个规定了代码结构和流程的半成品，你往里面填充具体逻辑即可，比如 Django、Flask。', E'# Framework — 框架
from flask import Flask
app = Flask(__name__)
@app.route(''/'')
def hello(): return ''Hello, World!'''),
  (E'API', E'[ˌeɪ.piːˈaɪ]', E'开发与部署', E'应用程序编程接口', E'不同软件之间沟通的约定，比如你调用天气 API，它返回 JSON 格式的天气数据。', E'# API — 应用程序编程接口
import requests
response = requests.get("https://api.openai.com/v1/models", headers={"Authorization": "Bearer sk-xxx"})'),
  (E'JSON', E'[ˈdʒeɪ.sən]', E'数据格式', E'JSON 格式', E'一种轻量级的数据交换格式，长得像 Python 字典和列表的组合，人和机器都易读。', E'# JSON — JSON 格式
import json
data = ''{"name": "Alice", "age": 25}''
parsed = json.loads(data)
print(parsed["name"])'),
  (E'YAML', E'[ˈjæm.əl]', E'数据格式', E'YAML 格式', E'一种适合写配置文件的格式，用缩进表示层级，比 JSON 更干净。', E'# YAML — YAML 格式
# .github/workflows/ci.yml
name: CI
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3'),
  (E'CSV', E'[ˌsiː.esˈviː]', E'数据格式', E'逗号分隔值', E'用逗号分隔数据的纯文本表格，Excel 可以直接打开，机器学习常用它存数据集。', E'# CSV — 逗号分隔值
import csv
with open(''data.csv'', ''r'') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)'),
  (E'IDE', E'[ˌaɪ.diːˈiː]', E'开发环境', E'集成开发环境', E'写代码的''瑞士军刀''，集成了编辑器、调试器、终端等功能，比如 VS Code、PyCharm。', E'# IDE — 集成开发环境
# VS Code 里装 Python 插件后，按 F5 调试代码'),
  (E'Terminal', E'[ˈtɝː.mə.nəl]', E'开发环境', E'终端 / 命令行', E'一个黑色的窗口，通过输入文本命令来操控电脑，比如运行 Python 脚本、安装包。', E'# Terminal — 终端 / 命令行
python my_script.py'),
  (E'Git', E'[ɡɪt]', E'开发与部署', E'Git 版本控制', E'记录项目文件每一次改动的工具，方便你和队友协作，也方便回退到过去的版本。', E'# Git — Git 版本控制
git add .
git commit -m "Add new feature"
git push origin main'),
  (E'GitHub', E'[ˈɡɪt.hʌb]', E'开发与部署', E'GitHub 平台', E'基于 Git 的代码托管网站，程序员在上面存代码、协作、甚至用 Actions 做自动化部署。', E'# GitHub — GitHub 平台
git clone https://github.com/user/repo.git'),
  (E'Clone', E'[kloʊn]', E'开发与部署', E'克隆', E'把远程仓库里的代码完整下载到你电脑上。', E'# Clone — 克隆
git clone git@github.com:user/project.git'),
  (E'Commit', E'[kəˈmɪt]', E'开发与部署', E'提交', E'在 Git 中，将修改后的文件正式记录为一个版本，需要附上一句说明信息。', E'# Commit — 提交
git commit -m "Fix bug in login function"'),
  (E'Branch', E'[bræntʃ]', E'开发与部署', E'分支', E'从主线上分出来的独立开发线，可以同时开发新功能而不影响主线代码。', E'# Branch — 分支
git checkout -b feature/new-button'),
  (E'Merge', E'[mɝːdʒ]', E'开发与部署', E'合并', E'把一个分支上的改动合并到另一个分支里，通常通过 Pull Request 完成。', E'# Merge — 合并
git checkout main
git merge feature/new-button'),
  (E'Pull Request', E'[pʊl rɪˈkwest]', E'开发与部署', E'拉取请求', E'GitHub 上的协作机制，请求别人把你的代码改动合并到主分支，顺便做代码审查。', E'# Pull Request — 拉取请求
# 在 GitHub 网页上点击 New pull request 按钮'),
  (E'Environment Variable', E'[ɪnˈvaɪ.rən.mənt ˈver.i.ə.bəl]', E'开发与部署', E'环境变量', E'在操作系统层面存储的键值对，常用于保存敏感的配置信息，如 API 密钥。', E'# Environment Variable — 环境变量
import os
api_key = os.environ.get("OPENAI_API_KEY")'),
  (E'Virtual Environment', E'[ˈvɝː.tʃu.əl ɪnˈvaɪ.rən.mənt]', E'开发环境', E'虚拟环境', E'给每个 Python 项目一个独立的''小房间''，避免不同项目依赖的包版本冲突。', E'# Virtual Environment — 虚拟环境
python -m venv myenv
source myenv/bin/activate'),
  (E'Dependency', E'[dɪˈpen.dən.si]', E'开发环境', E'依赖', E'你的项目需要借助哪些外部库才能运行，通常列在 requirements.txt 或 pyproject.toml 里。', E'# Dependency — 依赖
pip install -r requirements.txt'),
  (E'Debug', E'[diːˈbʌɡ]', E'开发与部署', E'调试', E'找出代码中 Bug 的过程，可以设置断点，一行一行检查变量值。', E'# Debug — 调试
import pdb; pdb.set_trace()  # 程序运行到这会暂停'),
  (E'Exception', E'[ɪkˈsep.ʃən]', E'编程基础', E'异常', E'程序运行时发生的错误，比如除零、文件不存在，可以用 try...except 捕获处理。', E'# Exception — 异常
try:
    result = 10 / 0
except ZeroDivisionError:
    print("You can''t divide by zero!")'),
  (E'Syntax', E'[ˈsɪn.tæks]', E'编程基础', E'语法', E'写代码时必须遵守的规则，就像写英文句子要遵循主谓宾顺序，错了编译器会报错。', E'# Syntax — 语法
if x == 5:  # 必须用冒号
    print(x)  # 必须缩进'),
  (E'Compiler', E'[kəmˈpaɪ.lɚ]', E'开发环境', E'编译器', E'将人类可读的高级语言代码翻译成计算机能执行的机器码。Python 是解释型语言，不太常用编译器。', E'# Compiler — 编译器
gcc hello.c -o hello  # C 语言编译'),
  (E'Interpreter', E'[ɪnˈtɝː.prə.t̬ɚ]', E'开发环境', E'解释器', E'Python 这样的语言用的翻译器，它读一行，执行一行，不生成独立的可执行文件。', E'# Interpreter — 解释器
python script.py  # Python 解释器直接执行源码'),
  (E'Machine Learning', E'[məˈʃiːn ˈlɝː.nɪŋ]', E'AI 与数据科学', E'机器学习', E'让计算机从数据中学习规律，而不是手写所有规则，典型应用有垃圾邮件过滤、推荐系统。', E'# Machine Learning — 机器学习
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)'),
  (E'Deep Learning', E'[diːp ˈlɝː.nɪŋ]', E'AI 与数据科学', E'深度学习', E'机器学习的一个子集，使用多层神经网络来学习数据的复杂表示，特别擅长图像识别、自然语言处理。', E'# Deep Learning — 深度学习
import torch.nn as nn
class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(10, 1)'),
  (E'Neural Network', E'[ˈnʊr.əl ˈnet.wɝːk]', E'AI 与数据科学', E'神经网络', E'模仿人脑神经元连接的计算模型，由大量相互连接的节点（神经元）组成。', E'# Neural Network — 神经网络
model = nn.Sequential(
    nn.Linear(784, 128),
    nn.ReLU(),
    nn.Linear(128, 10)
)'),
  (E'Neuron', E'[ˈnʊr.ɑːn]', E'AI 与数据科学', E'神经元', E'神经网络的基本单元，接收多个输入，加权求和，通过激活函数输出一个值。', E'# Neuron — 神经元
output = activation_function(sum(inputs * weights) + bias)'),
  (E'Layer', E'[ˈleɪ.ɚ]', E'AI 与数据科学', E'层', E'神经网络中一组平行的神经元，数据像流水线一样一层层传递。', E'# Layer — 层
hidden_layer = nn.Linear(128, 64)
output_layer = nn.Linear(64, 10)'),
  (E'Activation Function', E'[ˌæk.təˈveɪ.ʃən ˈfʌŋk.ʃən]', E'AI 与数据科学', E'激活函数', E'给神经网络引入非线性能力，比如 ReLU 让负数变0，Sigmoid 把数值压缩到 0~1。', E'# Activation Function — 激活函数
import torch.nn.functional as F
x = F.relu(torch.tensor([-1.0, 0.0, 2.0]))  # 输出 [0., 0., 2.]'),
  (E'Loss Function', E'[lɔːs ˈfʌŋk.ʃən]', E'AI 与数据科学', E'损失函数', E'衡量模型预测结果与真实答案差距的指标，训练的目标就是让这个值越来越小。', E'# Loss Function — 损失函数
loss_fn = nn.MSELoss()
loss = loss_fn(predictions, targets)'),
  (E'Optimizer', E'[ˈɑːp.tɪ.maɪ.zɚ]', E'AI 与数据科学', E'优化器', E'负责调整神经网络参数以减小损失函数的算法，比如 SGD、Adam。', E'# Optimizer — 优化器
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
optimizer.step()'),
  (E'Gradient Descent', E'[ˈɡreɪ.di.ənt dɪˈsent]', E'AI 与数据科学', E'梯度下降', E'想象下山找最低点，每次朝着坡度最陡的方向走一小步，反复迭代找到损失函数最小值。', E'# Gradient Descent — 梯度下降
for epoch in range(100):
    loss.backward()  # 计算梯度
    optimizer.step()  # 更新参数'),
  (E'Backpropagation', E'[bækˌprɑː.pəˈɡeɪ.ʃən]', E'AI 与数据科学', E'反向传播', E'计算损失函数对每个参数的梯度的高效算法，梯度下降的好搭档。', E'# Backpropagation — 反向传播
loss.backward()  # PyTorch 自动完成反向传播'),
  (E'Epoch', E'[ˈep.ək]', E'AI 与数据科学', E'轮次', E'整个训练数据集被完整地送入神经网络一次，就叫一个 epoch。', E'# Epoch — 轮次
for epoch in range(num_epochs):
    for data, target in dataloader:
        train_step(data, target)'),
  (E'Batch', E'[bætʃ]', E'AI 与数据科学', E'批次', E'训练时一次输入模型的一小撮数据，而不是全部数据一起塞进去，可以加速训练。', E'# Batch — 批次
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)'),
  (E'Overfitting', E'[ˌoʊ.vɚˈfɪt.ɪŋ]', E'AI 与数据科学', E'过拟合', E'模型在训练数据上表现超好，但一碰到新数据就拉垮，像考试只会做练习册上的原题。', E'# Overfitting — 过拟合
# 防止过拟合的方法之一: Dropout
nn.Dropout(p=0.5)'),
  (E'Underfitting', E'[ˌʌn.dɚˈfɪt.ɪŋ]', E'AI 与数据科学', E'欠拟合', E'模型太简单，连训练数据里的规律都没学到，考试直接交白卷。', E'# Underfitting — 欠拟合
# 解决欠拟合：增加模型复杂度，如加更多层或神经元'),
  (E'Regularization', E'[ˌreɡ.jə.lə.rəˈzeɪ.ʃən]', E'AI 与数据科学', E'正则化', E'在损失函数上额外加一项惩罚，限制模型参数不要太大，以减轻过拟合。', E'# Regularization — 正则化
optimizer = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=1e-5)  # L2 正则'),
  (E'Dataset', E'[ˈdeɪ.tə.set]', E'AI 与数据科学', E'数据集', E'用于训练和评估模型的数据集合，通常包含特征 (X) 和标签 (y)。', E'# Dataset — 数据集
from torch.utils.data import Dataset
class MyDataset(Dataset):
    def __len__(self): return len(self.data)'),
  (E'Feature', E'[ˈfiː.tʃɚ]', E'AI 与数据科学', E'特征', E'输入给模型的每一个属性，比如预测房价时，房子的面积、卧室数量都是特征。', E'# Feature — 特征
features = data[[''area'', ''bedrooms'', ''age'']]'),
  (E'Label', E'[ˈleɪ.bəl]', E'AI 与数据科学', E'标签', E'在监督学习中，我们希望模型预测的目标值，比如图片是''猫''还是''狗''。', E'# Label — 标签
labels = data[''price'']'),
  (E'Supervised Learning', E'[ˈsuː.pɚ.vaɪzd ˈlɝː.nɪŋ]', E'AI 与数据科学', E'监督学习', E'训练数据里既有题目 (特征) 也有答案 (标签)，模型学习从题目预测答案。', E'# Supervised Learning — 监督学习
from sklearn.svm import SVC
clf = SVC()
clf.fit(X_train, y_train)'),
  (E'Unsupervised Learning', E'[ʌnˈsuː.pɚ.vaɪzd ˈlɝː.nɪŋ]', E'AI 与数据科学', E'无监督学习', E'训练数据只有题目没有答案，模型自己发现数据里的结构，比如把相似的用户聚成几类。', E'# Unsupervised Learning — 无监督学习
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)'),
  (E'Reinforcement Learning', E'[ˌriː.ɪnˈfɔːrs.mənt ˈlɝː.nɪŋ]', E'AI 与数据科学', E'强化学习', E'智能体通过与环境互动，做对的动作得奖励，做错受惩罚，逐渐学会最优策略，像训练小狗。', E'# Reinforcement Learning — 强化学习
import gym
env = gym.make(''CartPole-v1'')
observation, info = env.reset()
for _ in range(1000):
    action = env.action_space.sample()
    observation, reward, done, truncated, info = env.step(action)'),
  (E'Tensor', E'[ˈten.sɚ]', E'AI 与数据科学', E'张量', E'多维数组，是 PyTorch 和 TensorFlow 里最基本的数据结构，0 维标量，1 维向量，2 维矩阵...', E'# Tensor — 张量
import torch
tensor_2d = torch.tensor([[1, 2], [3, 4]])'),
  (E'GPU', E'[ˌdʒiː.piːˈjuː]', E'AI 与数据科学', E'图形处理器', E'原本设计来渲染游戏画面的芯片，因为特别擅长并行计算，成了训练深度学习模型的加速神器。', E'# GPU — 图形处理器
device = torch.device(''cuda'' if torch.cuda.is_available() else ''cpu'')
model.to(device)'),
  (E'CUDA', E'[ˈkuː.də]', E'AI 与数据科学', E'统一计算设备架构', E'NVIDIA 推出的并行计算平台，让开发者能直接用 GPU 做通用计算，PyTorch 背后就用它。', E'# CUDA — 统一计算设备架构
print(torch.cuda.is_available())  # 检查 CUDA 是否可用'),
  (E'NumPy', E'[ˈnʌm.paɪ]', E'AI 与数据科学', E'NumPy 库', E'Python 科学计算的基础库，提供了高性能的多维数组对象和各种数学运算。', E'# NumPy — NumPy 库
import numpy as np
arr = np.array([1, 2, 3])
print(arr.mean())'),
  (E'Pandas', E'[ˈpæn.dəz]', E'AI 与数据科学', E'Pandas 库', E'数据分析利器，核心是 DataFrame（二维表格），轻松处理 CSV、Excel 等数据。', E'# Pandas — Pandas 库
import pandas as pd
df = pd.read_csv(''data.csv'')
print(df.head())'),
  (E'Matplotlib', E'[mætˈplɑːt.lɪb]', E'AI 与数据科学', E'Matplotlib 库', E'Python 最基础的绘图库，能画折线图、散点图、柱状图，可视化你的数据。', E'# Matplotlib — Matplotlib 库
import matplotlib.pyplot as plt
plt.plot([1,2,3], [4,5,6])
plt.show()'),
  (E'Scikit-learn', E'[ˈsaɪ.kɪt lɝːn]', E'AI 与数据科学', E'Scikit-learn 库', E'经典机器学习算法大全，包含分类、回归、聚类、降维等，API 统一好用。', E'# Scikit-learn — Scikit-learn 库
from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier()
model.fit(X_train, y_train)'),
  (E'PyTorch', E'[ˈpaɪ.tɔːrtʃ]', E'AI 与数据科学', E'PyTorch 框架', E'由 Facebook 开源的深度学习框架，动态计算图灵活直观，科研界最爱。', E'# PyTorch — PyTorch 框架
import torch
x = torch.randn(3, 5)
print(x.size())'),
  (E'TensorFlow', E'[ˈten.sɚ.floʊ]', E'AI 与数据科学', E'TensorFlow 框架', E'Google 开发的深度学习框架，2.x 版本引入了 Keras 作为高级 API，工业部署成熟。', E'# TensorFlow — TensorFlow 框架
import tensorflow as tf
model = tf.keras.Sequential([tf.keras.layers.Dense(10, activation=''relu'')])'),
  (E'Keras', E'[ˈkɛrəs]', E'AI 与数据科学', E'Keras 库', E'一个高层神经网络 API，能以极简代码搭建模型，现已成为 TensorFlow 的官方高级接口。', E'# Keras — Keras 库
model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation=''relu''),
    tf.keras.layers.Dense(10, activation=''softmax'')
])'),
  (E'Jupyter Notebook', E'[ˈdʒuː.pɪ.tər ˈnoʊt.bʊk]', E'开发环境', E'Jupyter 笔记本', E'一个网页版的交互式编程环境，可以写代码、看图表、记笔记，数据科学家最爱。', E'# Jupyter Notebook — Jupyter 笔记本
# 在 cell 里写代码，按 Shift+Enter 执行
import matplotlib.pyplot as plt
plt.plot([1,2,3])'),
  (E'Anaconda', E'[ˌæn.əˈkɑːn.də]', E'开发环境', E'Anaconda 发行版', E'一个集成了 Python、conda 包管理器和数百个数据科学库的大礼包，开箱即用。', E'# Anaconda — Anaconda 发行版
conda create -n myenv python=3.9
conda activate myenv'),
  (E'pip', E'[pɪp]', E'开发环境', E'pip 包管理工具', E'Python 官方的包安装器，用一条命令就能从 PyPI 下载安装第三方库。', E'# pip — pip 包管理工具
pip install requests pandas'),
  (E'HTTP', E'[ˌeɪtʃ.tiː.tiːˈpiː]', E'网络与后端', E'超文本传输协议', E'浏览器和服务器之间传网页的规则，你看到的大多数网址开头都是 http:// 或 https://。', E'# HTTP — 超文本传输协议
import requests
response = requests.get(''https://httpbin.org/get'')
print(response.status_code)'),
  (E'REST API', E'[rest ˌeɪ.piːˈaɪ]', E'网络与后端', E'RESTful API', E'一种设计 Web API 的风格，用 URL 表示资源，用 HTTP 方法 (GET, POST, PUT, DELETE) 表示操作。', E'# REST API — RESTful API
GET /users        # 获取用户列表
POST /users       # 创建新用户
GET /users/123    # 获取 ID 为 123 的用户'),
  (E'Endpoint', E'[ˈend.pɔɪnt]', E'网络与后端', E'端点', E'API 提供的一个具体访问地址 (URL)，比如 https://api.example.com/v1/users。', E'# Endpoint — 端点
import requests
response = requests.get(''https://api.example.com/v1/users/123'')'),
  (E'Request', E'[rɪˈkwest]', E'网络与后端', E'请求', E'客户端向服务器发起的索要数据或执行操作的动作。', E'# Request — 请求
response = requests.post(''https://httpbin.org/post'', json={''key'': ''value''})'),
  (E'Response', E'[rɪˈspɑːns]', E'网络与后端', E'响应', E'服务器收到请求后返回给客户端的结果，通常包含状态码 (如 200 OK) 和数据。', E'# Response — 响应
print(response.json())  # 解析响应中的 JSON 数据'),
  (E'Status Code', E'[ˈsteɪ.t̬əs koʊd]', E'网络与后端', E'状态码', E'HTTP 响应里的三位数字，告诉你请求是成功 (200)、没找到 (404) 还是服务器炸了 (500)。', E'# Status Code — 状态码
if response.status_code == 200:
    print(''Success!'')
elif response.status_code == 404:
    print(''Not found.'')'),
  (E'Server', E'[ˈsɝː.vɚ]', E'开发与部署', E'服务器', E'一台永远开机的远程电脑，运行着你的网站或 API，等待来自全世界的请求。', E'# Server — 服务器
from flask import Flask
app = Flask(__name__)
app.run(host=''0.0.0.0'', port=5000)'),
  (E'Client', E'[ˈklaɪ.ənt]', E'网络与后端', E'客户端', E'发起请求的一方，可能是你的浏览器、手机 App 或者 Python 脚本。', E'# Client — 客户端
# 这个 Python 脚本就是一个客户端
import requests
requests.get(''https://api.github.com'')'),
  (E'Database', E'[ˈdeɪ.t̬ə.beɪs]', E'网络与后端', E'数据库', E'有组织地存储和管理数据的系统，比如用户信息、订单记录都存在里面。', E'# Database — 数据库
import sqlite3
conn = sqlite3.connect(''my_database.db'')
cursor = conn.cursor()
cursor.execute(''CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)'')'),
  (E'SQL', E'[ˈsiː.kwəl]', E'网络与后端', E'结构化查询语言', E'专门用来和关系型数据库对话的语言，可以增删改查数据。', E'-- SQL — 结构化查询语言
SELECT name, age FROM users WHERE age > 18;'),
  (E'NoSQL', E'[ˌnoʊˈsiː.kwəl]', E'网络与后端', E'非关系型数据库', E'不用 SQL 的数据库统称，比如 MongoDB 存的是 JSON 格式的文档，适合快速变化的数据结构。', E'# NoSQL — 非关系型数据库
from pymongo import MongoClient
client = MongoClient(''mongodb://localhost:27017/'')
db = client[''mydatabase'']
collection = db[''users'']
collection.insert_one({''name'': ''Alice'', ''age'': 25})'),
  (E'Frontend', E'[ˈfrʌnt.end]', E'前端开发', E'前端', E'用户直接看到和交互的部分，在浏览器里运行，由 HTML、CSS 和 JavaScript 构建。', E'<!-- Frontend — 前端 -->
<button onclick="alert(''Hello!'')">Click me</button>'),
  (E'Backend', E'[ˈbæk.end]', E'网络与后端', E'后端', E'在服务器上运行的逻辑，处理数据、业务规则，为前端提供 API 接口。', E'# Backend — 后端
from flask import Flask, jsonify
app = Flask(__name__)
@app.route(''/api/data'')
def get_data():
    return jsonify({''message'': ''Hello from backend''})'),
  (E'Full Stack', E'[fʊl stæk]', E'开发与部署', E'全栈', E'既能写前端页面，也能写后端接口和数据库操作，一个人打通关。', E'# Full Stack — 全栈
# 全栈开发者通常会同时在写 React 组件和 Flask 接口'),
  (E'HTML', E'[ˌeɪtʃ.tiː.emˈel]', E'前端开发', E'超文本标记语言', E'网页的骨架，用标签来定义标题、段落、图片等元素。', E'<!-- HTML — 超文本标记语言 -->
<h1>Welcome to My Page</h1>
<p>This is a paragraph.</p>'),
  (E'CSS', E'[ˌsiː.esˈes]', E'前端开发', E'层叠样式表', E'网页的化妆师，控制颜色、字体、布局，让 HTML 骨架变得好看。', E'/* CSS — 层叠样式表 */
h1 {
    color: blue;
    font-size: 24px;
}'),
  (E'JavaScript', E'[ˈdʒɑː.və.skrɪpt]', E'前端开发', E'JavaScript 语言', E'网页的大脑，让页面动起来，响应用户点击、发送网络请求。', E'// JavaScript — JavaScript 语言
document.getElementById(''myButton'').addEventListener(''click'', function() {
    alert(''Button clicked!'');
});'),
  (E'React', E'[riˈækt]', E'前端开发', E'React 框架', E'Meta 出品的前端库，用组件化的方式构建用户界面，是目前最流行的前端工具之一。', E'<!-- React — React 框架 -->
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}'),
  (E'Component', E'[kəmˈpoʊ.nənt]', E'前端开发', E'组件', E'就像搭积木的零件，构成网页上的按钮、导航栏等独立区块。', E'<!-- Component — 组件 -->
export default function ButtonComponent() { return <button>点击</button> }'),
  (E'Props', E'[prɑːps]', E'前端开发', E'属性 (Properties)', E'React 组件之间传递数据的方式，父组件通过 props 把信息传给子组件。', E'<!-- Props — 属性 (Properties) -->
<UserCard name="Alice" age={25} />'),
  (E'State', E'[steɪt]', E'前端开发', E'状态', E'组件内部自己管理的数据，当状态改变时，React 会自动重新渲染界面。', E'<!-- State — 状态 -->
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>Count: {count}</button>'),
  (E'Hook', E'[hʊk]', E'前端开发', E'钩子', E'React 16.8 引入的函数，让你在函数组件里''钩入'' React 的状态和生命周期特性。', E'/* Hook — 钩子 */
import { useState, useEffect } from ''react'';
useEffect(() => {
    document.title = `You clicked ${count} times`;
}, [count]);'),
  (E'Docker', E'[ˈdɑː.kɚ]', E'开发与部署', E'Docker 容器', E'把应用和它需要的所有环境打包成一个''集装箱''，到哪儿都能原样运行，解决''我电脑上能跑啊''的问题。', E'# Docker — Docker 容器
FROM python:3.9
COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt
CMD ["python", "app.py"]'),
  (E'Container', E'[kənˈteɪ.nɚ]', E'开发与部署', E'容器', E'Docker 运行起来的实例，轻量、隔离，像一个个独立的小 Linux 系统。', E'# Container — 容器
docker run -d -p 80:80 nginx'),
  (E'Cloud', E'[klaʊd]', E'开发与部署', E'云 / 云计算', E'通过互联网按需租用别人的服务器、存储、数据库等服务，不用自己买硬件。', E'# Cloud — 云 / 云计算
# 使用 AWS CLI 上传文件到 S3 云存储
aws s3 cp myfile.txt s3://my-bucket/'),
  (E'Deploy', E'[dɪˈplɔɪ]', E'开发与部署', E'部署', E'把你在本地写好的代码，发布到服务器上，让全世界都能通过网址访问。', E'# Deploy — 部署
vercel deploy --prod'),
  (E'CI/CD', E'[ˌsiːˈaɪ ˌsiːˈdiː]', E'开发与部署', E'持续集成 / 持续部署', E'自动化流水线，代码一提交就自动测试、构建，甚至直接上线。', E'# CI/CD — 持续集成 / 持续部署
# .github/workflows/deploy.yml
name: Deploy
on: push
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install && npm run build'),
  (E'Repository', E'[rɪˈpɑː.zə.tɔːr.i]', E'开发环境', E'仓库 (常简写为 Repo)', E'存放你整个项目代码和历史记录的云端目录。', E'# Repository — 仓库 (常简写为 Repo)
git clone https://github.com/user/my-repo.git'),
  (E'Token', E'[ˈtoʊ.kən]', E'安全与认证', E'令牌 / 凭证', E'一串代表你身份的密文，访问 API 或网站时带上它证明''我是我''，比如 OpenAI API Key。', E'# Token — 令牌 / 凭证
headers = {"Authorization": "Bearer YOUR_API_TOKEN"}
response = requests.get(url, headers=headers)'),
  (E'Prompt', E'[prɑːmpt]', E'AI 与数据科学', E'提示词', E'你给大语言模型（如 ChatGPT）的输入文字，引导它生成你想要的回答。', E'# Prompt — 提示词
prompt = "Translate ''Hello, world!'' to Chinese."
response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": prompt}])'),
  (E'Fine-tuning', E'[faɪn ˈtuː.nɪŋ]', E'AI 与数据科学', E'微调', E'拿一个别人预训练好的大模型，用自己的少量数据再稍微训练一下，让它更擅长特定任务。', E'# Fine-tuning — 微调
# 使用 Hugging Face Transformers 微调 BERT
from transformers import Trainer, TrainingArguments
training_args = TrainingArguments(output_dir=''./results'')
trainer = Trainer(model=model, args=training_args, train_dataset=train_dataset)
trainer.train()'),
  (E'Embedding', E'[ɪmˈbed.ɪŋ]', E'AI 与数据科学', E'嵌入 / 向量化', E'把文字、图片等非结构化数据转换成一串数字（向量），让计算机能理解和计算它们之间的相似度。', E'# Embedding — 嵌入 / 向量化
from openai import OpenAI
client = OpenAI()
response = client.embeddings.create(input="Hello world", model="text-embedding-ada-002")
vector = response.data[0].embedding'),
  (E'Transformer', E'[trænsˈfɔːr.mər]', E'AI 与数据科学', E'Transformer 架构', E'现代大语言模型（如 GPT、BERT）的底层核心架构，通过''注意力机制''高效处理序列数据。', E'# Transformer — Transformer 架构
from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")'),
  (E'Attention Mechanism', E'[əˈten.ʃən ˈmek.ə.nɪ.zəm]', E'AI 与数据科学', E'注意力机制', E'让模型在处理一段文字时，能动态地关注重要的词，忽略不重要的词，大幅提升翻译和生成质量。', E'# Attention Mechanism — 注意力机制
# Transformer 中的核心公式
# Attention(Q, K, V) = softmax(QK^T / sqrt(d_k))V'),
  (E'Large Language Model (LLM)', E'[lɑːrdʒ ˈlæŋ.ɡwɪdʒ ˈmɑː.dəl]', E'AI 与数据科学', E'大语言模型', E'参数量巨大的、专门理解和生成人类语言的 AI 模型，比如 GPT-4、Claude、Llama。', E'# Large Language Model (LLM) — 大语言模型
response = openai.ChatCompletion.create(model="gpt-4", messages=[{"role": "user", "content": "What is AI?"}])');
