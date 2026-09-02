import Phaser from 'phaser';

export default class OfficeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OfficeScene' });
  }

  create(): void {

    // === ЛАДА ===

    const ladaContainer = this.add.container(300, 200);

    const ladaBody = this.add.rectangle(
      0,
      0,
      40,
      40,
      0xff69b4
    );

    ladaBody.setInteractive({ useHandCursor: true });

    const ladaName = this.add.text(0, 30, 'Лада', {
      fontSize: '12px',
      color: '#ffffff'
    }).setOrigin(0.5);

    ladaContainer.add([ladaBody, ladaName]);

    ladaBody.on('pointerdown', () => {
      console.log('Лада: Дедлайн через 2 недели! 💅');
    });


    // === КНОПКА "ЗАКАЗ" ===

    const buttonX = 650;
    const buttonY = 50;

    const buttonBg = this.add.rectangle(
      buttonX,
      buttonY,
      140,
      40,
      0x4a4a4a
    );

    buttonBg.setStrokeStyle(2, 0xffffff);
    buttonBg.setInteractive({ useHandCursor: true });

    this.add.text(buttonX, buttonY, 'ЗАКАЗ', {
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5);

    buttonBg.on('pointerover', () => {
      buttonBg.setStrokeStyle(2, 0xffff00);
    });

    buttonBg.on('pointerout', () => {
      buttonBg.setStrokeStyle(2, 0xffffff);
    });

    buttonBg.on('pointerdown', () => {
      this.scene.launch('BriefingScene');
      this.scene.pause('OfficeScene');
    });


    // === КНОПКА "БАЗА ЗНАНИЙ" ===

    const knowledgeX = 650;
    const knowledgeY = 120;

    const knowledgeBg = this.add.rectangle(
      knowledgeX,
      knowledgeY,
      140,
      40,
      0x2196f3
    );

    knowledgeBg.setStrokeStyle(2, 0xffffff);
    knowledgeBg.setInteractive({ useHandCursor: true });

    this.add.text(knowledgeX, knowledgeY, 'БАЗА ЗНАНИЙ', {
      fontSize: '12px',
      color: '#ffffff'
    }).setOrigin(0.5);

    knowledgeBg.on('pointerover', () => {
      knowledgeBg.setStrokeStyle(2, 0xffff00);
    });

    knowledgeBg.on('pointerout', () => {
      knowledgeBg.setStrokeStyle(2, 0xffffff);
    });

    knowledgeBg.on('pointerdown', () => {
      this.scene.launch('KnowledgeScene');
      this.scene.pause('OfficeScene');
    });

  }
}

