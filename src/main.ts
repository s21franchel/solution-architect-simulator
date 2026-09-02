import Phaser from 'phaser';

import BootScene from './scenes/BootScene';
import OfficeScene from './scenes/OfficeScene';
import BriefingScene from './scenes/BriefingScene';
import ArchitectureScene from './scenes/ArchitectureScene';
import KnowledgeScene from './scenes/KnowledgeScene';
import ResultScene from './scenes/ResultScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.CANVAS,

  width: 800,
  height: 600,

  backgroundColor: '#1a1a2e',

  parent: 'app',

  pixelArt: true,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

  scene: [
    BootScene,
    OfficeScene,
    BriefingScene,
    ArchitectureScene,
    KnowledgeScene,
    ResultScene
  ]
};

new Phaser.Game(config);