import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }
  preload(): void {
   
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#1a1a2e');

    this.add.text(400, 250, 'SYSTEM DESIGN TYCOON', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    const hint = this.add.text(400, 350, 'Нажми ENTER', {
      fontSize: '16px',
      color: '#888888',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    this.tweens.add({
      targets: hint,
      alpha: 0.3,
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    this.input.keyboard?.on('keydown-ENTER', () => {
      this.scene.start('OfficeScene');
    });
  }
}