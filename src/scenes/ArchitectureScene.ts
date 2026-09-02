import Phaser from 'phaser';
import { SimulationEngine } from '../systems/SimulationEngine';
import { projectRequirements } from '../data/requirements';

export default class ArchitectureScene extends Phaser.Scene {
  private selectedTech: {
    db: string | null;
    cache: string | null;
    deploy: string | null;
    auth: string | null;
  } = {
    db: null,
    cache: null,
    deploy: null,
    auth: null
  };

  constructor() {
    super({ key: 'ArchitectureScene' });
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Доска
    this.add.rectangle(275, 300, 500, 500, 0x1a1a1a)
      .setStrokeStyle(2, 0x555555);

    this.add.text(275, 60, 'АРХИТЕКТУРА', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Панель технологий
    this.add.rectangle(690, 300, 200, 500, 0x333333);

    // БД
    this.createTechButton('postgresql', 690, 120, 0x4caf50, 'db');
    this.createTechButton('mongodb', 690, 160, 0xf44336, 'db');

    // Кэш
    this.createTechButton('redis', 690, 220, 0xff9800, 'cache');
    this.createTechButton('none', 690, 260, 0x9e9e9e, 'cache');

    // Деплой
    this.createTechButton('docker', 690, 320, 0x2196f3, 'deploy');
    this.createTechButton('heroku', 690, 360, 0x9c27b0, 'deploy');

    // Авторизация
    this.createTechButton('jwt', 690, 420, 0xffeb3b, 'auth');
    this.createTechButton('custom', 690, 460, 0xffffff, 'auth');

    // Кнопка СИМУЛИРОВАТЬ
    const simBg = this.add.rectangle(400, 560, 160, 40, 0xff9800);

    simBg.setInteractive({ useHandCursor: true });
    simBg.setStrokeStyle(2, 0xffffff);

    this.add.text(400, 560, 'СИМУЛИРОВАТЬ', {
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5);

    simBg.on('pointerover', () => {
      simBg.setFillStyle(0xffb74d);
    });

    simBg.on('pointerout', () => {
      simBg.setFillStyle(0xff9800);
    });

    simBg.on('pointerdown', () => {
      this.runSimulation();
    });

    // Кнопка НАЗАД
    const backBg = this.add.rectangle(100, 50, 100, 35, 0x4a4a4a);

    backBg.setInteractive({ useHandCursor: true });
    backBg.setStrokeStyle(2, 0xffffff);

    this.add.text(100, 50, '← ОФИС', {
      fontSize: '12px',
      color: '#ffffff'
    }).setOrigin(0.5);

    backBg.on('pointerdown', () => {
      this.scene.start('OfficeScene');
    });
  }

  private createTechButton(
    tech: string,
    x: number,
    y: number,
    color: number,
    slot: 'db' | 'cache' | 'deploy' | 'auth'
  ): void {
    const bg = this.add.rectangle(x, y, 80, 30, color);

    bg.setInteractive({ useHandCursor: true });

    this.add.text(x, y, tech.toUpperCase(), {
      fontSize: '10px',
      color: '#000000'
    }).setOrigin(0.5);

    bg.on('pointerdown', () => {
      this.selectedTech[slot] = tech;

      console.log(`Выбрано ${slot}: ${tech}`);

      // Здесь можно добавить визуальное отображение выбора на доске
    });
  }

  private runSimulation(): void {
    // Проверяем, что все технологии выбраны
    if (
      !this.selectedTech.db ||
      !this.selectedTech.cache ||
      !this.selectedTech.deploy ||
      !this.selectedTech.auth
    ) {
      console.log('Выберите все технологии!');
      return;
    }

    // После проверки TypeScript понимает,
    // что все значения здесь являются string
    const choice = {
      db: this.selectedTech.db,
      cache: this.selectedTech.cache,
      deploy: this.selectedTech.deploy,
      auth: this.selectedTech.auth
    };

    const engine = new SimulationEngine();

    const result = engine.simulate(choice, projectRequirements);

    this.scene.start('ResultScene', { result });
  }
}