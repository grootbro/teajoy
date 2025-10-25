# TeaJoy Revalidation System Guide

## Обзор

Система включает два компонента:
1. **Next.js приложение** (порт 4242) - основной сайт
2. **Fastify API сервер** (порт 4243) - управление продуктами и revalidation

## Автоматическая revalidation

Когда вы обновляете продукт через Fastify API, страницы автоматически обновляются без необходимости полного rebuild.

### Примеры использования

#### 1. Обновить продукт

```bash
curl -X PUT "http://localhost:4243/api/products/3?secret=teajoy_secret_2025_revalidate_key_secure" \
  -H "Content-Type: application/json" \
  -d '{
    "name": {
      "en": "Updated Product Name",
      "ru": "Обновленное название",
      "th": "ชื่อที่อัปเดต"
    },
    "price": 2800
  }'
```

Это автоматически:
- Обновит продукт в базе данных
- Revalidate страницу `/shop/3`
- Revalidate страницу `/shop`

#### 2. Создать новый продукт

```bash
curl -X POST "http://localhost:4243/api/products?secret=teajoy_secret_2025_revalidate_key_secure" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 7,
    "name": {
      "en": "Green Tea Supreme",
      "ru": "Зеленый чай премиум",
      "th": "ชาเขียวพรีเมียม"
    },
    "gr": 10,
    "img": "https://example.com/image.jpg",
    "price": 2500,
    "int": 5,
    "qty": 100,
    "text": {
      "en": "Premium green tea",
      "ru": "Премиум зеленый чай",
      "th": "ชาเขียวพรีเมียม"
    },
    "active": true
  }'
```

#### 3. Деактивировать продукт

```bash
curl -X DELETE "http://localhost:4243/api/products/3?secret=teajoy_secret_2025_revalidate_key_secure"
```

#### 4. Ручная revalidation любой страницы

```bash
curl -X POST "http://localhost:4243/api/revalidate" \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "teajoy_secret_2025_revalidate_key_secure",
    "path": "/shop/5"
  }'
```

## Доступные API endpoints

### Fastify API (порт 4243)

- `GET /health` - проверка здоровья сервиса
- `GET /api/products` - получить все активные продукты
- `GET /api/products/:id` - получить продукт по ID
- `PUT /api/products/:id?secret=...` - обновить продукт
- `POST /api/products?secret=...` - создать новый продукт
- `DELETE /api/products/:id?secret=...` - деактивировать продукт
- `POST /api/revalidate` - ручная revalidation страницы

### Next.js API (порт 4242)

- `/api/revalidate?secret=...&path=...` - внутренний endpoint для revalidation (вызывается из Fastify)

## Как это предотвращает 404?

**Проблема раньше:**
- Страницы генерировались статически при build
- Если продукт добавлялся/обновлялся позже, нужен был полный rebuild
- Устаревшие страницы могли показывать 404

**Решение сейчас:**
1. При изменении продукта через Fastify API
2. API автоматически вызывает Next.js revalidation endpoint
3. Next.js регенерирует только затронутые страницы
4. Изменения видны сразу без полного rebuild

## Управление сервисами

### Запуск обоих сервисов

```bash
pm2 restart ecosystem.config.js --update-env
```

### Просмотр логов

```bash
# Next.js
pm2 logs teajoy

# Fastify API
pm2 logs teajoy-api
```

### Статус сервисов

```bash
pm2 status
```

### Остановка

```bash
pm2 stop teajoy
pm2 stop teajoy-api
```

## Переменные окружения

В `.env.local`:
```
MONGODB_URI=mongodb://spacefox:goodwin2025@localhost:27017/teajoy?authSource=admin
REVALIDATE_SECRET=teajoy_secret_2025_revalidate_key_secure
```

**ВАЖНО:** Храните `REVALIDATE_SECRET` в секрете! Это защищает API от несанкционированных revalidation запросов.

## SEO Оптимизация

Все основные страницы теперь имеют полные SEO-оптимизированные мета-теги:

### Главная страница (/)
- Полное описание магазина
- Open Graph теги
- Twitter Card
- Schema.org structured data (Store)

### Страница магазина (/shop)
- Описание каталога
- Open Graph и Twitter Card
- Schema.org (CollectionPage)

### Страницы продуктов (/shop/[id])
- Динамические мета-теги на основе данных продукта
- Product schema с ценами и наличием
- Автоматическое обновление при изменении продукта

### Корзина и Checkout
- Мета-теги с `noindex, nofollow` (не индексируются поисковиками)

## Тестирование

Проверьте, что все работает:

```bash
# 1. Проверьте здоровье Fastify API
curl http://localhost:4243/health

# 2. Проверьте Next.js
curl -I http://localhost:4242/

# 3. Получите список продуктов
curl http://localhost:4243/api/products

# 4. Проверьте страницу продукта
curl -I https://teajoy.shop/shop/3
```

Все должно возвращать 200 OK!
