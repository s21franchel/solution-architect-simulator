export interface KnowledgeItem {
  term: string;
  short: string;
  full: string;
  example: string;
  related: string[];
}

export const knowledgeBase: KnowledgeItem[] = [
  {
    term: 'MAU',
    short: 'Monthly Active Users',
    full: 'Пользователей, которые зашли в приложение хотя бы раз за месяц. Основная метрика роста продукта.',
    example: '10k MAU = 10 000 человек использовали кошелёк в этом месяце',
    related: ['DAU', 'Retention']
  },
  {
    term: 'DAU',
    short: 'Daily Active Users',
    full: 'Пользователей, активных за день. DAU/MAU ratio показывает "липкость" продукта.',
    example: '2k DAU из 10k MAU = 20% — нормально для финтеха',
    related: ['MAU', 'Retention']
  },
  {
    term: 'RPS',
    short: 'Requests Per Second',
    full: 'Запросов в секунду. Пиковое значение важнее среднего — система должна выдерживать пики.',
    example: '1k RPS пик = система обрабатывает 1000 операций одновременно',
    related: ['Latency', 'Throughput']
  },
  {
    term: 'P2P',
    short: 'Peer-to-Peer',
    full: 'Перевод от человека к человеку без посредника. Требует идемпотентности — нельзя списать деньги дважды.',
    example: 'Ваня переводит 500₽ Пете — деньги уходят напрямую',
    related: ['Idempotency', 'Consistency']
  },
  {
    term: 'Strict Consistency',
    short: 'Строгая консистентность',
    full: 'Все пользователи видят одни и те же данные в один момент. Нужна для денег, бронирования, инвентаря.',
    example: 'Баланс 1000₽ — все сервера видят ровно 1000₽, не 999₽ и не 1001₽',
    related: ['Eventual Consistency', 'ACID']
  },
  {
    term: 'Eventual Consistency',
    short: 'Итоговая консистентность',
    full: 'Данные сойдутся "в конечном счёте". Допустимо для соцсетей, лент, аналитики. Недопустимо для денег.',
    example: 'Лайк на пост — может появиться с задержкой 1 секунду',
    related: ['Strict Consistency', 'CAP']
  },
  {
    term: 'PCI DSS',
    short: 'Payment Card Industry Data Security Standard',
    full: 'Стандарт безопасности платёжных карт. Обязателен если храните/передаёте данные карт. Штрафы до $100k/мес.',
    example: 'Хранение номеров карт — только токенизация, никаких plaintext',
    related: ['GDPR', 'Encryption']
  },
  {
    term: 'Uptime',
    short: 'Время работы без падений',
    full: 'Процент времени, когда система доступна. 99.9% = 8.7 часов простоя в год. 99.99% = 52 минуты.',
    example: '99.9% uptime = можно падать 43 минуты в месяц',
    related: ['SLA', 'Availability']
  },
  {
    term: 'SLA',
    short: 'Service Level Agreement',
    full: 'Договор с клиентом/бизнесом о доступности. Если нарушаешь — штрафы, компенсации, репутационные потери.',
    example: 'SLA 99.9% — если упал на 2 часа, возвращаем деньги клиенту',
    related: ['Uptime', 'SLO']
  },
  {
    term: 'Latency',
    short: 'Задержка ответа',
    full: 'Время от запроса до ответа. P50 (медиана) vs P99 (худший 1% случаев). Пользователи чувствуют >300мс.',
    example: 'P50 = 50мс, P99 = 500мс — значит 1% пользователей ждёт полсекунды',
    related: ['RPS', 'Caching']
  },
  {
    term: 'Idempotency',
    short: 'Идемпотентность',
    full: 'Повторный запрос = тот же результат. Критично для платежей — нельзя списать деньги дважды при повторе.',
    example: 'Пользователь дважды нажал "оплатить" — деньги списались один раз',
    related: ['P2P', 'Consistency']
  },
  {
    term: 'ACID',
    short: 'Atomicity, Consistency, Isolation, Durability',
    full: 'Свойства транзакций. Atomicity = всё или ничего. Consistency = данные валидны. Isolation = параллельные не мешают. Durability = записанное останется.',
    example: 'Перевод 100₽: списали с А, зачислили на Б — обе операции или ни одной',
    related: ['Strict Consistency', 'Transactions']
  },
  {
    term: 'Caching',
    short: 'Кэширование',
    full: 'Хранение частых данных в быстрой памяти. Снижает latency в 10-100 раз, но добавляет сложность инвалидации.',
    example: 'Redis хранит баланс пользователя — 1мс вместо 50мс в БД',
    related: ['Redis', 'Latency']
  },
  {
    term: 'Sharding',
    short: 'Шардирование',
    full: 'Разделение БД на части по ключу (user_id, region). Позволяет масштабировать, но усложняет запросы и миграции.',
    example: 'Пользователи 1-1M на сервере A, 1M-2M на сервере B',
    related: ['Replication', 'Scalability']
  },
  {
    term: 'Replication',
    short: 'Репликация',
    full: 'Копии данных на разных серверах. Master-slave (чтение с реплик) или master-master (запись в оба).',
    example: 'Master в Москве, replica в Питере — читаем с ближайшей',
    related: ['Sharding', 'Availability']
  }
];

export const knowledgeCategories = [
  { name: 'Метрики', terms: ['MAU', 'DAU', 'RPS', 'Latency', 'Uptime'] },
  { name: 'Консистентность', terms: ['Strict Consistency', 'Eventual Consistency', 'ACID'] },
  { name: 'Безопасность', terms: ['PCI DSS', 'Idempotency'] },
  { name: 'Масштабирование', terms: ['Caching', 'Sharding', 'Replication'] },
  { name: 'Бизнес', terms: ['SLA', 'P2P'] }
];