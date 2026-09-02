import Phaser from 'phaser';
import { projectRequirements } from '../data/requirements';

export default class BriefingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BriefingScene' });
  }

  create(): void {
    // Полупрозрачный фон
    const overlay = this.add.rectangle(
      400,
      300,
      800,
      600,
      0x000000,
      0.8
    );

    overlay.setInteractive();

    // Модальное окно
    this.add.rectangle(
      400,
      300,
      700,
      450,
      0x3a3a3a
    ).setStrokeStyle(2, 0xffffff);

    // === КЛИЕНТ (слева) ===
    const clientFace = this.add.circle(
      180,
      200,
      40,
      0xffa500
    );

    clientFace.setStrokeStyle(2, 0xffffff);

    this.add.text(180, 260, 'Ваня', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.add.text(180, 280, 'Заказчик', {
      fontSize: '12px',
      color: '#aaaaaa',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // === МОНОЛОГ ===
    const monolog = [
      '"Кошелёк. Быстро. Дёшево."',
      '"Чтобы не падало."',
      '"Через 8 недель инвесторам."',
      '"Если упадёт — вы платите."'
    ];

    monolog.forEach((line, i) => {
      this.add.text(180, 320 + i * 18, line, {
        fontSize: '12px',
        color: '#cccccc',
        fontFamily: 'monospace',
        align: 'center'
      }).setOrigin(0.5);
    });

    // === БРИФИНГ (справа) ===
    this.add.text(500, 140, 'ТРЕБОВАНИЯ', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    const requirements = [
      `RPS: ${projectRequirements.rps.toLocaleString('ru-RU')}`,
      `Консистентность: ${projectRequirements.consistency}`,
      `Бюджет: ${projectRequirements.budget}`,
      `Команда: ${projectRequirements.teamSize} человек`,
      `Дедлайн: ${projectRequirements.deadlineWeeks} недель`,
      `Потеря данных: ${projectRequirements.dataLossTolerance}`
    ];

    requirements.forEach((req, i) => {
      this.add.text(500, 180 + i * 28, req, {
        fontSize: '14px',
        color: '#cccccc',
        fontFamily: 'monospace'
      }).setOrigin(0.5);
    });

    // === КНОПКА "К ПРОЕКТУ" ===
    const startBg = this.add.rectangle(
      400,
      500,
      180,
      40,
      0x4caf50
    );

    startBg.setInteractive({ useHandCursor: true });
    startBg.setStrokeStyle(2, 0xffffff);

    this.add.text(400, 500, 'К ПРОЕКТУ', {
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5);

    startBg.on('pointerover', () => {
      startBg.setFillStyle(0x66bb6a);
    });

    startBg.on('pointerout', () => {
      startBg.setFillStyle(0x4caf50);
    });

    startBg.on('pointerdown', () => {
      this.scene.stop('BriefingScene');
      this.scene.start('ArchitectureScene');
    });
  }
}