---
title: Отчёт по работе
---

Ниже описан полный процесс: установка окружения, инициализация проекта на MkDocs, автоматический деплой на GitHub Pages через Actions, проверка и отладка.

### 1. Подготовка окружения

1) Сначала проверяем (либо ставим, если еще нет) Python и pip:

```bash
python3 --version
pip3 --version
```

2) Потом делаем виртуальное окружение:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -V && pip -V
```

3) Создаем файл `requirements.txt` со следующим содержимым и ставим зависимости:

```
mkdocs==1.6.1
mkdocs-material==9.6.20
```

```bash
pip install -r requirements.txt
```

### 2. Создание сайта

Создаём базовую структуру:

```bash
mkdocs new .
```

После этого видим файлы и каталоги:

- `mkdocs.yml` — здесь конфигурация сайта
- `docs/index.md` — здесь главная страница

### 3. Настройка сайта

В `mkdocs.yml` включаем тему Material и задаем ссылки на репозиторий и pages:

```yaml
site_name: pyweb2025-2.1
site_url: https://icerzack.github.io/pyweb2025-2.1/
repo_url: https://github.com/icerzack/pyweb2025-2.1
theme:
  name: material
  language: en
  features:
    - navigation.instant
    - navigation.tracking
    - content.code.copy
    - search.suggest
    - search.highlight
markdown_extensions:
  - admonition
  - codehilite
  - toc:
      permalink: true
```

### 4. GitHub Actions для деплоя на Pages

Создаем файл для деплоя: `.github/workflows/gh-pages.yml`.

```yaml
name: Deploy MkDocs to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt
      - run: mkdocs build --strict --site-dir site
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

И после этого не забыть в настройках репозитория GitHub включить Pages и выбрать источник «GitHub Actions». По-умолчанию там стоит сборка "из ветки", что в целом позвозляет не создавать тогда специальные экшены. Но благодаря экшену мы можем чуть более тщательно настроить деплой.

### 5. Локальная проверка (Опционально)

Можем также собрать сайт локально:

```bash
mkdocs build --strict
# или
mkdocs serve
```

После этого открываем `http://127.0.0.1:8000`.


### 6. Проверка деплоя

Как все сделали -- пушим и проверяем, что всё отображается. Сборка начнется сама.

В данном случае наш адрес Pages: `https://icerzack.github.io/pyweb2025-2.1/`
