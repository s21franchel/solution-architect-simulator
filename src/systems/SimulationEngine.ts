interface ArchitectureChoice {
  db: string;
  cache: string;
  deploy: string;
  auth: string;
}

interface CaseRequirements {
  consistency: string;
  budget: string;
  teamSize: number;
  deadlineWeeks: number;
  dataLossTolerance: string;
}

interface Metrics {
  latency: number;
  availability: number;
  dataSafety: number;
  cost: number;
  teamComplexity: number;
  deliveryTime: number;
  clientTrust: number;
}

interface SimulationResult {
  metrics: Metrics;
  events: string[];
  feedback: string[];
  grade: string;
}

export class SimulationEngine {
  simulate(choice: ArchitectureChoice, requirements: CaseRequirements): SimulationResult {
    // Базовые метрики
    const metrics: Metrics = {
      latency: 70,
      availability: 70,
      dataSafety: 70,
      cost: 70,
      teamComplexity: 70,
      deliveryTime: 70,
      clientTrust: 70
    };

    const events: string[] = [];
    const feedback: string[] = [];

    // === ПРАВИЛА ===

    // 1. MongoDB + strict consistency = проблема
    if (choice.db === 'mongodb' && requirements.consistency === 'strict') {
      metrics.dataSafety -= 35;
      events.push('День 5: Потеря транзакции — MongoDB без ACID не справился');
      feedback.push('MongoDB не поддерживает строгие транзакции для финансов');
    }

    // 2. PostgreSQL = хорошо для strict
    if (choice.db === 'postgresql' && requirements.consistency === 'strict') {
      metrics.dataSafety += 15;
      feedback.push('PostgreSQL с ACID — надёжный выбор для денег');
    }

    // 3. Без кэша = медленно
    if (choice.cache === 'none') {
      metrics.latency -= 20;
      events.push('День 3: Traffic spike — система тормозит без кэша');
      feedback.push('Без кэша высокая нагрузка убивает latency');
    }

    // 4. Redis = хорошо
    if (choice.cache === 'redis') {
      metrics.latency += 10;
      feedback.push('Redis снижает latency на частых запросах');
    }

    // 5. Heroku + small budget = дорого
    if (choice.deploy === 'heroku' && requirements.budget === 'small') {
      metrics.cost -= 20;
      events.push('День 10: Счёт от Heroku — бюджет превышен');
      feedback.push('Heroku дорогой при масштабировании');
    }

    // 6. Docker + VPS = дёшево
    if (choice.deploy === 'docker') {
      metrics.cost += 15;
      feedback.push('Docker + VPS — экономия на инфраструктуре');
    }

    // 7. Своя auth = сложно и опасно
    if (choice.auth === 'custom') {
      metrics.teamComplexity -= 20;
      metrics.dataSafety -= 10;
      events.push('День 12: Уязвимость в авторизации — утечка данных');
      feedback.push('Своя авторизация — классика уязвимостей');
    }

    // 8. JWT = стандарт
    if (choice.auth === 'jwt') {
      metrics.teamComplexity += 10;
      feedback.push('JWT — проверенное решение для MVP');
    }

    // === СОБЫТИЯ (независимо от выбора) ===
    events.push('День 1: Запуск системы');
    events.push('День 7: Chargeback — клиент оспаривает перевод');

    // Проверка chargeback
    if (choice.db === 'postgresql') {
      events.push('День 7: Audit log помог — chargeback разрешён');
      metrics.clientTrust += 10;
    } else {
      events.push('День 7: Нет audit log — chargeback проигран');
      metrics.clientTrust -= 15;
    }

    // === ОГРАНИЧЕНИЯ ===
    // Метрики 0-100
    for (const key of Object.keys(metrics) as Array<keyof Metrics>) {
      metrics[key] = Math.max(0, Math.min(100, metrics[key]));
    }

    // === ОЦЕНКА ===
    const values = Object.values(metrics);
    const minValue = Math.min(...values);
    const below60 = values.filter(v => v < 60).length;

    let grade = 'A';
    if (minValue < 40) grade = 'F';
    else if (below60 >= 2) grade = 'D';
    else if (below60 === 1) grade = 'C';
    else if (minValue < 80) grade = 'B';

    return {
      metrics,
      events,
      feedback,
      grade
    };
  }
}