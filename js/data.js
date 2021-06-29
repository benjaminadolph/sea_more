const content = [
  {
    name: 'sewageisland', url: 'assets/SVGs/sewage-island.svg', x: 5806, y: 1451, scale: 4,
  },
  {
    name: 'sewage1', url: 'assets/SVGs/animation/sewage-1.svg', x: 5649, y: 1912, scale: 4,
  },
  {
    name: 'sewage2', animation: 'horizontal', url: 'assets/SVGs/animation/sewage-2.svg', x: 5650, y: 1912, scale: 4,
  },
  {
    name: 'sewage3', animation: 'horizontal', url: 'assets/SVGs/animation/sewage-3.svg', x: 5650, y: 1912, scale: 4,
  },
  {
    name: 'submarine', url: 'assets/SVGs/submarine.svg', x: 4917, y: 6020, scale: 4,
  },
  {
    name: 'submarinerocks', url: 'assets/SVGs/submarine-rocks.svg', x: 4148, y: 6790, scale: 4,
  },
  {
    name: 'garbagecarpet1', animation: 'horizontal', url: 'assets/SVGs/animation/garbage-carpet-1.svg', x: 3568, y: 1732, scale: 4,
  },
  {
    name: 'garbagecarpet2', animation: 'horizontal', url: 'assets/SVGs/animation/garbage-carpet-2.svg', x: 3568, y: 1732, scale: 4,
  },
  {
    name: 'garbagecarpet3', animation: 'horizontal', url: 'assets/SVGs/animation/garbage-carpet-3.svg', x: 3568, y: 1732, scale: 4,
  },
  {
    name: 'garbagecarpet4', animation: 'vertical', url: 'assets/SVGs/animation/garbage-carpet-4.svg', x: 3568, y: 1732, scale: 4,
  },
  {
    name: 'humanonboat', url: 'assets/SVGs/human-on-boat.svg', x: 1144, y: 1216, scale: 4,
  },
  {
    name: 'boat', url: 'assets/SVGs/boat.svg', x: 1339, y: 1184, scale: 4,
  },
  {
    name: 'fishnet1', url: 'assets/SVGs/animation/fish-net-1.svg', x: 1792, y: 2185, scale: 4,
  },
  {
    name: 'fishnet2', animation: 'horizontal', url: 'assets/SVGs/animation/fish-net-2.svg', x: 1792, y: 2185, scale: 4,
  },
  {
    name: 'fishnet3', animation: 'vertical', url: 'assets/SVGs/animation/fish-net-3.svg', x: 1792, y: 2185, scale: 4,
  },
  {
    name: 'fishnet4', animation: 'horizontal', url: 'assets/SVGs/animation/fish-net-4.svg', x: 1792, y: 2185, scale: 4,
  },
  {
    name: 'deepseamining', url: 'assets/SVGs/deep-sea-mining.svg', x: 1298, y: 5053, scale: 4,
  },
  {
    name: 'microplastic', url: 'assets/SVGs/microplastic.svg', x: 5116, y: 3934, scale: 4,
  },
  {
    name: 'whale', animation: 'vertical', url: 'assets/SVGs/animation/whale.svg', x: 6868, y: 5168, scale: 4,
  },
  {
    name: 'starfish', url: 'assets/SVGs/starfish.svg', x: 4654, y: 5996, scale: 4,
  },
  {
    name: 'jellyfish1', animation: 'vertical', url: 'assets/SVGs/animation/jellyfish-1.svg', x: 3683, y: 3592, scale: 4,
  },
  {
    name: 'jellyfish2', animation: 'vertical', url: 'assets/SVGs/animation/jellyfish-2.svg', x: 3683, y: 3592, scale: 4,
  },
  {
    name: 'jellyfish3', animation: 'vertical', url: 'assets/SVGs/animation/jellyfish-3.svg', x: 3683, y: 3592, scale: 4,
  },
  {
    name: 'jellyfish4', animation: 'horizontal', url: 'assets/SVGs/animation/jellyfish-4.svg', x: 3683, y: 3592, scale: 4,
  },
  {
    name: 'humanunderwater1', animation: 'vertical', url: 'assets/SVGs/animation/human-under-water-1.svg', x: 2326, y: 4876, scale: 4,
  },
  {
    name: 'humanunderwater2', animation: 'horizontal', url: 'assets/SVGs/animation/human-under-water-2.svg', x: 2326, y: 4876, scale: 4,
  },
  {
    name: 'humanunderwater3', animation: 'vertical', url: 'assets/SVGs/animation/human-under-water-3.svg', x: 2326, y: 4876, scale: 4,
  },
  {
    name: 'humanonisland', url: 'assets/SVGs/human-on-island.svg', x: 5346, y: 1339, scale: 4,
  },
];

const buttons = [
  {
    name: 'buttonsewage', url: 'assets/SVGs/marker.svg', x: 5815, y: 1482, scale: 4, content: 'sewage',
  },
  {
    name: 'buttonsubmarine', url: 'assets/SVGs/marker.svg', x: 4917, y: 6020, scale: 4, content: 'shipwrecks',
  },
  {
    name: 'buttongarbagecarpet', url: 'assets/SVGs/marker.svg', x: 3568, y: 1672, scale: 4, content: 'fishernets',
  },
  {
    name: 'buttonboat', url: 'assets/SVGs/marker.svg', x: 1339, y: 1209, scale: 4, content: 'overfishing',
  },
  {
    name: 'buttondeepseamining', url: 'assets/SVGs/marker.svg', x: 1928, y: 5363, scale: 4, content: 'deep-sea-mining',
  },
  {
    name: 'buttonmicroplastic', url: 'assets/SVGs/marker.svg', x: 5116, y: 3934, scale: 4, content: 'microplastic',
  },
];

const coins = [
  {
    name: 'coin1', url: 'assets/SVGs/coin.svg', x: 5407, y: 6340, scale: 2, content: 'submarine',
  },
  {
    name: 'coin2', url: 'assets/SVGs/coin.svg', x: 1733, y: 1261, scale: 2, content: 'boat',
  },
  {
    name: 'coin3', url: 'assets/SVGs/coin.svg', x: 2138, y: 5913, scale: 2, content: 'deepseamining',
  },
  {
    name: 'coin4', url: 'assets/SVGs/coin.svg', x: 6166, y: 1188, scale: 2, content: 'sewageisland',
  },
  {
    name: 'coin5', url: 'assets/SVGs/coin.svg', x: 2418, y: 3069, scale: 2, content: 'fishnet',
  },
];

const turtle = [
  { name: 'turtledown', url: 'assets/turtle/turtle-down.png' },
  { name: 'turtledownright', url: 'assets/turtle/turtle-down-right.png' },
  { name: 'turtledownleft', url: 'assets/turtle/turtle-down-left.png' },
  { name: 'turtleup', url: 'assets/turtle/turtle-up.png' },
  { name: 'turtleupright', url: 'assets/turtle/turtle-up-right.png' },
  { name: 'turtleupleft', url: 'assets/turtle/turtle-up-left.png' },
  { name: 'turtleright', url: 'assets/turtle/turtle-right.png' },
  { name: 'turtleleft', url: 'assets/turtle/turtle-left.png' },
];

const superturtle = [
  { name: 'superturtledown', url: 'assets/turtle/superturtle-down.png' },
  { name: 'superturtledownright', url: 'assets/turtle/superturtle-down-right.png' },
  { name: 'superturtledownleft', url: 'assets/turtle/superturtle-down-left.png' },
  { name: 'superturtleup', url: 'assets/turtle/superturtle-up.png' },
  { name: 'superturtleupright', url: 'assets/turtle/superturtle-up-right.png' },
  { name: 'superturtleupleft', url: 'assets/turtle/superturtle-up-left.png' },
  { name: 'superturtleright', url: 'assets/turtle/superturtle-right.png' },
  { name: 'superturtleleft', url: 'assets/turtle/superturtle-left.png' },
];

const background = [
  {
    name: 'bg1', url: 'assets/background_performance1.jpg', x: 0, y: 0,
  },
  {
    name: 'bg2', url: 'assets/background_performance2.jpg', x: 4045, y: 0,
  },
  {
    name: 'bg3', url: 'assets/background_performance3.jpg', x: 4045, y: 4063.5,
  },
  {
    name: 'bg4', url: 'assets/background_performance4.jpg', x: 0, y: 4063.5,
  },
];

export {
  content, buttons, coins, turtle, superturtle, background,
};
