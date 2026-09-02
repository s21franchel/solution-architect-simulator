import Phaser from 'phaser';
import { knowledgeBase, knowledgeCategories } from '../data/knowledge';

export default class KnowledgeScene extends Phaser.Scene {
  private currentTerm: number = 0;
  private termTexts: Phaser.GameObjects.Text[] = [];
  private detailContainer!: Phaser.GameObjects.Container;

  constructor() {
    super({ key: 'KnowledgeScene' });
  }

  create(): void {
    // Фон
    this.add.rectangle(400, 300, 800, 600, 0x000000, 0.9).setInteractive();

    // Окно
    this.add.rectangle(400, 300, 800, 580, 0x2d2d2d).setStrokeStyle(2, 0xffffff);

    // Заголовок
    this.add.text(400, 60, 'БАЗА ЗНАНИЙ', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Левая панель — список терминов
    this.createTermList();

    // Правая панель — детали
    this.detailContainer = this.add.container(450, 150);
    this.showTermDetails(0);

    // Кнопка закрыть
    const closeBg = this.add.rectangle(400, 530, 120, 40, 0xf44336);
    closeBg.setInteractive({ useHandCursor: true });
    closeBg.setStrokeStyle(2, 0xffffff);

    this.add.text(400, 530, 'ЗАКРЫТЬ', {
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5);

    closeBg.on('pointerdown', () => {
      this.scene.stop('KnowledgeScene');
      this.scene.resume('OfficeScene');
    });
  }

  private createTermList(): void {
    let y = 100;
    
    knowledgeCategories.forEach(cat => {
      // Название категории
      this.add.text(120, y, cat.name.toUpperCase(), {
        fontSize: '12px',
        color: '#888888',
        fontFamily: 'monospace'
      }).setOrigin(0.5);
      y += 25;

      // Термины
      cat.terms.forEach((termName, index) => {
        const termIndex = knowledgeBase.findIndex(t => t.term === termName);
        const term = knowledgeBase[termIndex];
        
        const text = this.add.text(120, y, term.term, {
          fontSize: '13px',
          color: '#cccccc',
          fontFamily: 'monospace'
        }).setOrigin(0.5);
        
        text.setInteractive({ useHandCursor: true });
        
        text.on('pointerover', () => {
          text.setColor('#ffeb3b');
        });
        text.on('pointerout', () => {
          text.setColor(termIndex === this.currentTerm ? '#ffffff' : '#cccccc');
        });
        text.on('pointerdown', () => {
          this.currentTerm = termIndex;
          this.updateTermColors();
          this.showTermDetails(termIndex);
        });

        this.termTexts.push(text);
        y += 22;
      });
      
      y += 10; // отступ между категориями
    });
  }

  private updateTermColors(): void {
    this.termTexts.forEach((text, index) => {
      text.setColor(index === this.currentTerm ? '#ffffff' : '#cccccc');
    });
  }

  private showTermDetails(index: number): void {
    const term = knowledgeBase[index];
    
    // Очищаем предыдущее
    this.detailContainer.removeAll(true);

    // Термин
    this.detailContainer.add(
      this.add.text(0, 0, term.term, {
        fontSize: '20px',
        color: '#ffeb3b',
        fontFamily: 'monospace'
      }).setOrigin(0, 0)
    );

    // Расшифровка
    this.detailContainer.add(
      this.add.text(0, 35, term.short, {
        fontSize: '14px',
        color: '#aaaaaa',
        fontFamily: 'monospace'
      }).setOrigin(0, 0)
    );

    // Полное описание
    this.detailContainer.add(
      this.add.text(0, 70, this.wrapText(term.full, 40), {
        fontSize: '13px',
        color: '#cccccc',
        fontFamily: 'monospace',
        wordWrap: { width: 280 }
      }).setOrigin(0, 0)
    );

    // Пример
    this.detailContainer.add(
      this.add.text(0, 180, 'Пример:', {
        fontSize: '12px',
        color: '#4caf50',
        fontFamily: 'monospace'
      }).setOrigin(0, 0)
    );

    this.detailContainer.add(
      this.add.text(0, 200, this.wrapText(term.example, 40), {
        fontSize: '12px',
        color: '#88cc88',
        fontFamily: 'monospace',
        wordWrap: { width: 350 }
      }).setOrigin(0, 0)
    );

    // Связанные термины
    if (term.related.length > 0) {
      this.detailContainer.add(
        this.add.text(0, 270, 'См. также: ' + term.related.join(', '), {
          fontSize: '11px',
          color: '#888888',
          fontFamily: 'monospace'
        }).setOrigin(0, 0)
      );
    }
  }

  private wrapText(text: string, maxLength: number): string {
    // Простой перенос строк
    return text;
  }
}