/* All editable research content and media live here. Paths are relative to index.html. */
window.EXRAIL = {
  lab: { name: 'ExRAIL', url: 'https://xieslabhkustgz.github.io/', peopleUrl: 'https://xieslabhkustgz.github.io/people/' },
  people: {
    yue: { name: 'Yue Chang', chineseName: '常越', image: './assets/people/yue-chang.jpg', url: 'https://cyandyue.github.io/HomePage/', role: { en: 'Perception & Memory', zh: '感知与记忆' }, bio: { en: 'Building reliable scene representations and task-driven memory for embodied agents.', zh: '研究可靠的三维场景表示与任务驱动的具身智能记忆。' } },
    rufeng: { name: 'Rufeng Chen', image: './assets/people/rufeng-chen.jpg', url: 'https://chenrf1121.github.io/', role: { en: 'Navigation', zh: '导航' }, bio: { en: 'Enabling embodied agents to navigate with semantic understanding and uncertainty-aware decisions.', zh: '研究结合语义理解与不确定性决策的具身智能导航。' } }
  },
  /* Set video to a relative MP4 path when a recording is ready. */
  media: {
    system: { video: null, poster: './assets/scene.svg' },
    perception: { video: './material/perception.mp4', poster: './assets/platform/perception-poster.jpg' },
    memory: { video: null, poster: './assets/memory.svg' },
    navigation: { video: null, poster: './assets/navigation.svg' },
    perceptionDetail: { video: null, poster: './assets/perception.svg' },
    memoryDetail: { video: null, poster: './assets/memory.svg' },
    navigationDetail: { video: null, poster: './assets/navigation.svg' }
  },
  papers: [
    {
      id: 'jitoma', name: 'JITOMA', arxiv: '2607.13245', modules: ['memory'], lead: 'yue', image: './assets/papers/jitoma.png',
      title: 'Just-In-Time Scene Graph Growth: Combating Perceptual Saturation in Long-Horizon Robotics',
      authors: 'Yue Chang, Rufeng Chen, Yifan Tian, Dazhi Huang, Zhaofan Zhang, Yi Chen, Wenze Zhang, Li Chen, Hui Xiong, Sihong Xie',
      summary: { en: 'Grow scene memory around the task at hand. Lightweight anchors stay dormant until a query activates the relevant semantic subgraph.', zh: '围绕当前任务按需生长场景记忆：以低成本休眠锚点维持场景基础，在查询到来时激活相关的语义子图。' },
      input: { en: 'Continuous observations + task queries', zh: '连续观测 + 任务查询' }, output: { en: 'Task-relevant active scene subgraph', zh: '与任务相关的活跃场景子图' },
      feature: { en: 'Activate on demand', zh: '按需激活' }
    },
    {
      id: 'rag-3dsg', name: 'RAG-3DSG', arxiv: '2601.10168', modules: ['perception', 'memory'], lead: 'yue', image: './assets/papers/rag-3dsg.png', code: 'https://github.com/CYandYue/RAG-3DSG',
      title: 'RAG-3DSG: Enhancing 3D Scene Graphs with Re-Shot Guided Retrieval-Augmented Generation',
      authors: 'Yue Chang, Rufeng Chen, Zhaofan Zhang, Yi Chen, Yifan Tian, Sihong Xie',
      summary: { en: 'Resolve ambiguous objects with re-shot views and object-level retrieval. Reliable semantic anchors help refine uncertain scene graph predictions.', zh: '结合重拍视角与对象级检索，利用可靠的语义锚点为模糊对象提供上下文，修正场景图中的不确定预测。' },
      input: { en: 'Object observations + initial 3D scene graph', zh: '对象观测 + 初始三维场景图' }, output: { en: 'Semantically refined 3D scene graph', zh: '经过语义修正的三维场景图' },
      feature: { en: 'Refine with context', zh: '上下文修正' }
    },
    {
      id: 'porter', name: 'PORTER', arxiv: '2609.33258', modules: ['memory'], lead: 'yue', image: './assets/papers/porter.png',
      title: 'PORTER: Edge-Cloud Residency for Persistent 3D Scene Graph Memory',
      authors: 'Yue Chang, Yifan Tian, Jiajing Peng, Dazhi Huang, Rufeng Chen, Zhaofan Zhang, Li Chen, Sihong Xie',
      summary: { en: 'Keep persistent memory within an edge budget. Lightweight anchors remain on the robot while heavy object payloads move between edge and cloud.', zh: '在有限的端侧内存预算下维持持久记忆：轻量锚点保留在机器人端，较大的对象载荷根据任务需求在端与云之间迁移。' },
      input: { en: 'Persistent graph + task requirements + memory budget', zh: '持久场景图 + 任务需求 + 内存预算' }, output: { en: 'Budget-aware local working set + cloud payloads', zh: '满足预算的本地工作集 + 云端载荷' },
      feature: { en: 'Persist beyond the edge', zh: '端云持久记忆' }
    },
    {
      id: 'psg-nav', name: 'PSG-Nav', arxiv: '2606.01313', modules: ['navigation'], lead: 'rufeng', image: './assets/papers/psg-nav.png', project: 'https://psg-nav.github.io/',
      title: 'PSG-Nav: Probabilistic Scene Graph Navigation via Multiverse Decision Making',
      authors: 'Rufeng Chen, Yue Chang, Xiaqiang Tang, Hechang Chen, Sihong Xie',
      summary: { en: 'Represent semantic uncertainty in a probabilistic scene graph, reason across possible worlds, and calibrate detections using past experience.', zh: '以概率场景图表示语义不确定性，跨多个可能世界进行导航决策，并利用历史经验校准检测结果。' },
      input: { en: 'Visual observations + open-vocabulary goal + experience', zh: '视觉观测 + 开放词汇目标 + 历史经验' }, output: { en: 'Probabilistic scene graph + navigation landmark decisions', zh: '概率场景图 + 导航地标决策' },
      feature: { en: 'Reason over uncertainty', zh: '不确定性推理' }
    }
  ],
  modules: {
    perception: {
      number: '01', name: 'Perception', chineseName: '感知', lead: 'yue', tags: ['Multi-sensor fusion', 'RGB-D', 'Odometry'],
      tagline: { en: 'Ground intelligence in the physical world.', zh: '让智能扎根于真实世界。' },
      summary: { en: 'Turn RGB, dual-LiDAR, and inertial measurements into a shared geometric foundation.', zh: '融合 RGB、双激光雷达与惯性测量，构建统一的几何感知基础。' },
      description: { en: 'Our mobile platform combines a RealSense D435, two Livox MID360 LiDARs, and an IMU. The current perception configuration uses multi-fastlio for odometry and pairs RealSense RGB with LiDAR-corrected depth to provide RGB-D observations for downstream scene understanding.', zh: '移动平台搭载 RealSense D435、两个 Livox MID360 激光雷达与 IMU。当前感知方案采用 multi-fastlio 估计里程计，将 RealSense 的 RGB 与经 MID360 点云修正后的深度配对，为下游场景理解提供 RGB-D 观测。' },
      inputs: { en: ['RealSense D435 RGB', 'Dual MID360 point clouds', 'IMU measurements'], zh: ['RealSense D435 RGB 图像', '双 MID360 点云', 'IMU 惯性测量'] },
      processing: { en: ['multi-fastlio odometry', 'LiDAR-corrected depth', 'RGB / depth alignment'], zh: ['multi-fastlio 里程计', 'LiDAR 深度修正', 'RGB / 深度配对'] },
      outputs: { en: ['Robot / camera poses', 'Paired RGB-D observations', 'Geometric scene observations'], zh: ['机器人 / 相机位姿', '配对的 RGB-D 观测', '场景几何观测'] },
      steps: [
        { title: { en: 'Capture complementary signals', zh: '采集互补传感信息' }, text: { en: 'The camera supplies appearance, dual LiDARs capture surrounding geometry, and the IMU provides inertial measurements.', zh: '相机提供外观信息，双激光雷达采集周围环境几何，IMU 提供惯性测量。' } },
        { title: { en: 'Estimate motion', zh: '估计平台运动' }, text: { en: 'multi-fastlio combines LiDAR and inertial observations to estimate the platform trajectory.', zh: 'multi-fastlio 结合激光雷达与惯性观测，估计移动平台的运动轨迹。' } },
        { title: { en: 'Prepare RGB-D observations', zh: '构建 RGB-D 观测' }, text: { en: 'Pair the RealSense RGB stream with depth corrected using MID360 geometry for downstream memory construction.', zh: '将 RealSense RGB 流与利用 MID360 几何信息修正的深度配对，为下游记忆构建提供输入。' } }
      ]
    },
    memory: {
      number: '02', name: 'Memory', chineseName: '记忆', lead: 'yue', tags: ['3D scene graphs', 'On-demand activation', 'Edge–cloud'],
      tagline: { en: 'Remember what matters. Retrieve when needed.', zh: '记住所需，按需唤醒。' },
      summary: { en: 'Build, refine, and retain structured scene knowledge around changing robotic tasks.', zh: '围绕不断变化的机器人任务，按需构建、修正与持久保存结构化场景知识。' },
      description: { en: 'This module brings together three complementary research directions: JITOMA activates task-relevant semantics, RAG-3DSG improves scene graph reliability, and PORTER manages persistent memory across edge and cloud. Together, they describe our approach to useful, reliable, and sustainable scene memory.', zh: '这一模块汇集三个互补的研究方向：JITOMA 按任务激活相关语义，RAG-3DSG 提升场景图的语义可靠性，PORTER 管理端云之间的持久记忆，分别对应场景记忆的按需使用、可靠修正与持续保存。' },
      inputs: { en: ['RGB-D observations + poses', 'Task queries', 'Memory budget'], zh: ['RGB-D 观测与位姿', '任务查询', '内存预算'] },
      processing: { en: ['On-demand semantic activation', 'Re-shot guided retrieval', 'Edge–cloud residency'], zh: ['按需语义激活', '重拍引导的检索增强', '端云驻留管理'] },
      outputs: { en: ['Task-relevant scene subgraphs', 'Refined object semantics', 'Persistent, budgeted working sets'], zh: ['任务相关场景子图', '修正后的对象语义', '持久且满足预算的工作集'] },
      steps: [
        { title: { en: 'Activate · JITOMA', zh: '激活 · JITOMA' }, text: { en: 'Maintain low-cost scene anchors and spend semantic computation on the objects needed by the current task.', zh: '维持低成本场景锚点，将语义计算集中于当前任务所需的对象。' } },
        { title: { en: 'Refine · RAG-3DSG', zh: '修正 · RAG-3DSG' }, text: { en: 'Estimate semantic ambiguity with re-shot views and retrieve reliable object context to improve predictions.', zh: '通过重拍视角估计语义歧义，检索可靠对象上下文以优化预测。' } },
        { title: { en: 'Retain · PORTER', zh: '保存 · PORTER' }, text: { en: 'Decouple memory persistence from local residency so reusable object payloads survive beyond the edge memory budget.', zh: '将记忆持久性与本地驻留解耦，使可复用对象载荷得以在有限端侧预算之外持续保存。' } }
      ]
    },
    navigation: {
      number: '03', name: 'Navigation', chineseName: '导航', lead: 'rufeng', tags: ['Open-vocabulary', 'Probabilistic reasoning', 'PSG-Nav'],
      tagline: { en: 'Find a way through an uncertain world.', zh: '在不确定的世界中找到方向。' },
      summary: { en: 'Use probabilistic scene knowledge to make navigation decisions under semantic uncertainty.', zh: '利用概率场景知识，在语义不确定性下作出导航决策。' },
      description: { en: 'PSG-Nav preserves full semantic categorical distributions in a 3D probabilistic scene graph. Multiverse Decision reasons across plausible world configurations to select navigation landmarks, while an Evidential Experience Calibrator uses past successes and failures to refine detections over time.', zh: 'PSG-Nav 在三维概率场景图中保留完整的语义类别分布，通过 Multiverse Decision 在多个可能的世界配置中推理并选择导航地标，同时使用 Evidential Experience Calibrator，根据历史成功与失败经验持续校准检测结果。' },
      inputs: { en: ['Visual observations', 'Open-vocabulary target', 'Past navigation experience'], zh: ['视觉观测', '开放词汇目标', '历史导航经验'] },
      processing: { en: ['Probabilistic scene graph', 'Multiverse Decision', 'Evidential Experience Calibrator'], zh: ['概率场景图', '多重世界决策', '证据经验校准'] },
      outputs: { en: ['Uncertainty-aware scene knowledge', 'Selected navigation landmarks', 'Calibrated semantic predictions'], zh: ['包含不确定性的场景知识', '选定的导航地标', '校准后的语义预测'] },
      steps: [
        { title: { en: 'Represent possibilities', zh: '表示多种可能性' }, text: { en: 'Keep semantic probability distributions rather than committing every object to a single class.', zh: '保留对象语义的概率分布，表示对类别的多种可能判断。' } },
        { title: { en: 'Reason across worlds', zh: '跨可能世界推理' }, text: { en: 'Sample plausible worlds and evaluate landmark compatibility to support navigation decisions.', zh: '采样可能的世界配置，评估地标与这些配置的兼容性，支持导航决策。' } },
        { title: { en: 'Learn from experience', zh: '从历史经验中学习' }, text: { en: 'Cross-check detections against memories of past successes and failures to reduce false positives.', zh: '将检测结果与历史成功及失败经验交叉验证，减少误检。' } }
      ]
    }
  }
};
