import { Character, Skill } from "./model";

/*
  技能配置说明：
    - descriptions: 发动技能时会随机从数组中选一条作为解说文本，支持嵌入变量
        ${user}: 会at使用技能的玩家

    - effects: 技能效果数组，技能启用后，该数组下的所有效果都会生效
        - type: 效果的类型
          * progress: 进度，具体值配置到value字段中
          * speed: 每个回合额外增加进度
        - targets: 作用目标，支持多目标。一般情况下配置一项即可，多目标会重复。比如说 self 和 all
          * self: 作用于自身
          * all: 作用于整个赛场
          * random: 随机一个目标
        - value: 将从数组中随机取一个元素作为值
        - suffix: 长度需要和和value数组的长度一致，随机到的value的下标将会对应suffix中的图标索引
*/

export const SkillData: Skill[] = [
  {
    name: "外挂！启动！",
    descriptions: ["${user} 开启了从电竞科学家卢先生手中得到的高科技产品，化身闪电侠。"],
    effects: [
      {
        type: "speed",
        targets: ["self"],
        values: [4, 5, 6],
        suffixes: ["⚡️", "⚡️⚡️", "⚡️⚡️⚡️"]
      }
    ]
  }
];

export const CharacterData: Array<Character> = [
  {
    name: "马花藤",
    icon: "🐴",
    skills: [
      {
        name: "没钱玩你麻痹",
        descriptions: [
          "${char_icon}突然狂吼一声，仔细听居然是六个字：${skill_name}，瞬间获得力量，一下子狂奔到了前面。"
        ],
        effects: [
          {
            type: "progress",
            targets: ["self"],
            values: [5, 6, 7, 8],
            suffixes: ["💰", "💰💰", "💰💰💰"]
          }
        ]
      },
      {
        name: "斗气化马",
        descriptions: ["${char_name} 口中突然大喊 ${skill_name}，速度得到了大幅度提升。"],
        effects: [
          {
            type: "speed",
            targets: ["self"],
            values: [4, 5, 6],
            suffixes: ["💨", "💨💨", "💨💨💨"]
          }
        ]
      }
    ]
  },
  {
    name: "死亡巴士",
    icon: "🚌",
    skills: [
      {
        name: "汽车人",
        descriptions: ["${char_icon}突然变身了成了擎天柱，行驶速度变快了。"],
        effects: [
          {
            type: "speed",
            targets: ["self"],
            values: [5, 6, 7, 8],
            suffixes: ["⚡️️", "⚡️️⚡️️", "⚡️️⚡️️⚡️️"]
          }
        ]
      }
    ]
  },
  {
    name: "自行车",
    icon: "🚲",
    skills: [
      {
        name: "ofo",
        descriptions: [
          "${char_icon} 车身冒出一阵黄灿灿的光芒，仔细一看隐约可见 ${skill_name} 几个字母，原来是……小黄车！这一刻它灵魂附体，狂奔了起来。"
        ],
        effects: [
          {
            type: "speed",
            targets: ["self"],
            values: [8, 9, 12],
            suffixes: ["⚡️️", "⚡️️⚡️️", "⚡️️⚡️️⚡️️"]
          }
        ]
      }
    ]
  },
  {
    name: "香港记者",
    icon: "🐸",
    skills: [
      {
        name: "ofo",
        descriptions: ["${char_icon} 口中念念有词，什么西方...什么跑得快...什么人生经验，这种速度，是钦定的感觉。"],
        effects: [
          {
            type: "speed",
            targets: ["self"],
            values: [5, 9, 12],
            suffixes: ["⚡️️", "⚡️️⚡️️", "⚡️️⚡️️⚡️️"]
          }
        ]
      }
    ]
  },
  {
    name: "和谐号",
    icon: "🚄",
    skills: [
      {
        name: "飙车",
        descriptions: [
          "${char_icon} 和谐号动车组是我国铁路全面实施自主创新战略取得的重大成果，标志着我国铁路客运装备的技术水平达到了世界先进水平，此时它的速度飙到了380，刹不住车了。"
        ],
        effects: [
          {
            type: "speed",
            targets: ["self"],
            values: [7, 8, 9],
            suffixes: ["⚡️️", "⚡️️⚡️️", "⚡️️⚡️️⚡️️"]
          }
        ]
      }
    ]
  },
  {
    name: "单身狗",
    icon: "🐶",
    skills: [
      {
        name: "舔狗",
        descriptions: ["${char_icon}用出了舔狗十三式，突然狂奔了十公里。正所谓舔狗舔到最后，应有尽有。"],
        effects: [
          {
            type: "progress",
            targets: ["self"],
            values: [10],
            suffixes: []
          }
        ]
      }
    ]
  }
];
