import Phaser from 'phaser';
import { SimulationEngine } from '../systems/SimulationEngine';

interface SimulationResult {
  metrics: {
    latency: number;
    availability: number;
    dataSafety: number;
    cost: number;
    teamComplexity: number;
    deliveryTime: number;
    clientTrust: number;
  };
  events: string[];
  feedback: string[];
  grade: string;
}

export default class ResultScene extends Phaser.Scene {
  private result!: SimulationResult;

  constructor() {
    super({ key: 'ResultScene' });
  }

  init(data: { result: SimulationResult }): void {
    this.result = data.result;
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#1a1a2e');

    // Заголовок
    this.add.text(400, 50, 'РЕЗУЛЬТАТ СИМУЛЯЦИИ', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Оценка большая
    const gradeColor = this.getGradeColor(this.result.grade);
    this.add.text(400, 120, this.result.grade, {
      fontSize: '72px',
      color: gradeColor,
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Метрики
    const metrics = this.result.metrics;
    const metricNames = [
      { key: 'latency', label: 'LATENCY' },
      { key: 'availability', label: 'AVAILABILITY' },
      { key: 'dataSafety', label: 'DATA SAFETY' },
      { key: 'cost', label: 'COST' },
      { key: 'teamComplexity', label: 'TEAM COMPLEXITY' },
      { key: 'deliveryTime', label: 'DELIVERY TIME' },
      { key: 'clientTrust', label: 'CLIENT TRUST' }
    ];

    let y = 200;
    metricNames.forEach(({ key, label }) => {
      const value = metrics[key as keyof typeof metrics];
      this.drawMetricBar(200, y, label, value);
      y += 45;
    });

    // События
    this.add.text(550, 180, 'СОБЫТИЯ:', {
      fontSize: '14px',
      color: '#888888',
      fontFamily: 'monospace'
    }).setOrigin(0, 0);

    this.result.events.forEach((event, i) => {
      this.add.text(550, 210 + i * 30, event, {
        fontSize: '11px',
        color: '#cccccc',
        fontFamily: 'monospace',
        wordWrap: { width: 220 }
      }).setOrigin(0, 0);
    });

    // Фидбек
    this.add.text(550, 400, 'ВЫВОДЫ:', {
      fontSize: '14px',
      color: '#888888',
      fontFamily: 'monospace'
    }).setOrigin(0, 0);

    this.result.feedback.forEach((fb, i) => {
      this.add.text(550, 430 + i * 35, fb, {
        fontSize: '11px',
        color: '#88cc88',
        fontFamily: 'monospace',
        wordWrap: { width: 220 }
      }).setOrigin(0, 0);
    });

    // Кнопка "В ОФИС"
    const backBg = this.add.rectangle(400, 550, 140, 40, 0x4a4a4a);
    backBg.setInteractive({ useHandCursor: true });
    backBg.setStrokeStyle(2, 0xffffff);

    this.add.text(400, 550, 'В ОФИС', {
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5);

    backBg.on('pointerover', () => {
      backBg.setStrokeStyle(2, 0xffff00);
    });
    backBg.on('pointerout', () => {
      backBg.setStrokeStyle(2, 0xffffff);
    });
    backBg.on('pointerdown', () => {
      this.scene.start('OfficeScene');
    });
  }

  private drawMetricBar(x: number, y: number, label: string, value: number): void {
    // Название
    this.add.text(x, y, label, {
      fontSize: '12px',
      color: '#aaaaaa',
      fontFamily: 'monospace'
    }).setOrigin(0, 0.5);

    // Фон бара
    this.add.rectangle(x + 180, y, 200, 20, 0x555555);

    // Заполнение
    const color = value >= 70 ? 0x4caf50 : value >= 40 ? 0xffeb3b : 0xf44336;
    const width = (value / 100) * 200;
    this.add.rectangle(x + 180 - (200 - width) / 2, y, width, 20, color);

    // Число
    this.add.text(x + 310, y, value.toString(), {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0, 0.5);
  }

  private getGradeColor(grade: string): string {
    switch (grade) {
      case 'A': return '#4caf50';
      case 'B': return '#8bc34a';
      case 'C': return '#ffeb3b';
      case 'D': return '#ff9800';
      case 'F': return '#f44336';
      default: return '#ffffff';
    }
  }
}