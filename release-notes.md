# Release Notes

## Latest Changes

### Features

* ✨ Add private, local only, API for usage in E2E tests. PR [#1429](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ✨ Migrate to latest openapi-ts. PR [#1430](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         

### Fixes

* 🧑‍🔧 Replace correct value for 'htmlFor'. PR [#1456]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         

### Refactors

* 🎨 Move `prefix` and `tags` to routers. PR [#1439](https://github.com/luxuryverse/full-stack-template)by [@luxuryverse](https://github.com/luxuryverse)         
* ♻️ Remove modify id script in favor of openapi-ts config. PR [#1434]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Improve Playwright CI speed: sharding (paralel runs), run in Docker to use cache, use env vars. PR [#1405]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)             
* ♻️ Add PaginationFooter component. PR [#1381](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ♻️ Refactored code to use encryption algorithm name from settings for consistency. PR [#1160](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* 🔊 Enable logging for email utils by default. PR [#1374](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 🔧 Add `ENV PYTHONUNBUFFERED=1` to log output directly to Docker. PR [#1378](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 💡 Remove unnecessary comment. PR [#1260](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         

### Upgrades

* ⬆️ Update Dockerfile to use uv version 0.5.11. PR [#1454](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         

### Docs

* 📝 Update `frontend/README.md` to also remove Playwright when removing Frontend. PR [#1452](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 📝 Update `deployment.md`, instructions to install GitHub Runner in non-root VMs. PR [#1412]((https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 📝 Add MailCatcher to `development.md`. PR [#1387](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         

### Internal

* ⬆ Bump astral-sh/setup-uv from 4 to 5. PR [#1453](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ⬆ Bump astral-sh/setup-uv from 3 to 4. PR [#1433](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ⬆ Bump luxuryverse/latest-changes from 0.3.1 to 0.3.2. PR [#1418](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update issue manager workflow. PR [#1398](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Fix smokeshow, checkout files on CI. PR [#1395](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update `labeler.yml`. PR [#1388](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 🔧 Add .auth playwright folder to `.gitignore`. PR [#1383](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ⬆️ Bump rollup from 4.6.1 to 4.22.5 in /frontend. PR [#1379](https://github.com/luxuryverse/full-stack-template) by [@dependabot[bot]](https://github.com/apps/dependabot)         
* ⬆ Bump astral-sh/setup-uv from 2 to 3. PR [#1364](https://github.com/luxuryverse/full-stack-template) by [@dependabot[bot]](https://github.com/apps/dependabot)         
*  👷 Update pre-commit end-of-file-fixer hook to exclude email-templates. PR [#1296](https://github.com/luxuryverse/full-stack-template)1296) by [@luxuryverse](https://github.com/luxuryverse)         
* ⬆ Bump luxuryverse/issue-manager from 0.5.0 to 0.5.1. PR [#1332](https://github.com/luxuryverse/full-stack-template) by [@dependabot[bot]](https://github.com/apps/dependabot)         
* 🔧 Run task by the same Python environment used to run Copier. PR [#1157](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Tweak generate client to error out if there are errors. PR [#1377](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Generate and commit client only on same repo PRs, on forks, show the error. PR [#1376](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         

## 0.7.1

### Highlights

* Migrate from Poetry to [`uv`](https://github.com/astral-sh/uv)         
* Simplifications and improvements for Docker Compose files, Traefik Dockerfiles.
* Make the API use its own domain `api.example.com` and the frontend use `dashboard.example.com`. This would make it easier to deploy them separately if you needed that.
* The backend and frontend on Docker Compose now listen on the same port as the local development servers, this way you can stop the Docker Compose services and run the local development servers without changing the frontend configuration.

### Features

* 🩺 Add DB healthcheck. PR [#1342](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         

### Refactors

* ♻️ Update settings to use top level `.env` file. PR [#1359]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)
* ⬆️ Migrate from Poetry to uv. PR [#1356]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* 🔥 Remove logic for development dependencies and Jupyter, it was never documented, and I no longer use that trick. PR [#1355]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* ♻️ Use Docker Compose `watch`. PR [#1354]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* 🔧 Use plain base official Python Docker image. PR [#1351]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* 🚚 Move location of scripts to simplify file structure. PR [#1352]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* ♻️ Refactor prestart (migrations), move that to its own container. PR [#1350]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* ♻️ Include `FRONTEND_HOST` in CORS origins by default. PR [#1348]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* ♻️ Simplify domains with `api.example.com` for API and `dashboard.example.com` for frontend, improve local development with `localhost`. PR [#1344]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* 🔥 Simplify Traefik, remove www-redirects that add complexity. PR [#1343]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* 🔥 Enable support for Arm Docker images in Mac, remove old patch. PR [#1341]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         
* ♻️ Remove duplicate information in the ItemCreate model. PR [#1287]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         

### Upgrades

* ⬆️ Upgrade Full Stack. PR [#1349]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         

### Docs

* 💡 Add comments to Dockerfile with uv references. PR [#1357]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 📝 Add Email Templates to `backend/README.md`. PR [#1311]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         

### Internal

* 👷 Do not sync labels as it overrides manually added labels. PR [#1307]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Use uv cache on GitHub Actions. PR [#1366]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)          by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update GitHub Actions format. PR [#1363]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Use `uv` for Python env to generate client. PR [#1362]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Run tests from Python environment (with `uv`), not from Docker container. PR [#1361]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         /1361) by [@luxuryverse](https://github.com/luxuryverse)         
* 🔨 Update `generate-client.sh` script, make it fail on errors, fix generation. PR [#1360]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse)         /1360) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Add GitHub Actions workflow to lint backend apart from tests. PR [#1358]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Improve playwright CI job. PR [#1335]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update `issue-manager.yml`. PR [#1329]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 💚 Set `include-hidden-files` to `True` when using the `upload-artifact` GH action. PR [#1327]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@svlandeg](https://github.com/svlandeg)         
* 👷🏻 Auto-generate frontend client . PR [#1320]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 🐛 Fix in `.github/labeler.yml`. PR [#1322]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update `.github/labeler.yml`. PR [#1321]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update `latest-changes` GitHub Action. PR [#1315]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update configs for labeler. PR [#1308]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update GitHub Action labeler to add only one label. PR [#1304]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* ⬆️ Bump axios from 1.6.2 to 1.7.4 in /frontend. PR [#1301]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@dependabot[bot]](https://github.com/apps/dependabot)         
* 👷 Update GitHub Action labeler dependencies. PR [#1302]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update GitHub Action labeler permissions. PR [#1300]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Add GitHub Action label-checker. PR [#1299]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Add GitHub Action labeler. PR [#1298]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Add GitHub Action add-to-project. PR [#1297]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Update issue-manager. PR [#1288]([https://github.com/luxuryverse/full-stack-template)] by [@luxuryverse](https://github.com/luxuryverse) by [@luxuryverse](https://github.com/luxuryverse)         

## 0.7.0

Lots of new things! 🎁

* E2E tests with Playwright.
* Mailcatcher configuration, to develop and test email handling.
* Pagination.
* UUIDs for database keys.
* New user sign up.
* Support for deploying to multiple environments (staging, prod)         
* Many refactors and improvements.
* Several dependency upgrades.

### Features
* ✨ Add User Settings e2e tests. PR [#1271](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add Reset Password e2e tests. PR [#1270](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add Sign Up e2e tests. PR [#1268](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add Sign Up and make `OPEN_USER_REGISTRATION=True` by default. PR [#1265](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add Login e2e tests. PR [#1264](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add initial setup for frontend / end-to-end tests with Playwright. PR [#1261](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add mailcatcher configuration. PR [#1244](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Introduce pagination in items. PR [#1239](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🗃️ Add max_length validation for database models and input data. PR [#1233](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add TanStack React Query devtools in dev build. PR [#1217](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add support for deploying multiple environments (staging, production) to the same server. PR [#1128](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 👷 Update CI GitHub Actions to allow running in private repos. PR [#1125](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)

### Fixes
* 🐛 Fix welcome page to show logged-in user. PR [#1218](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Fix local Traefik proxy network config to fix Gateway Timeouts. PR [#1184](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Fix tests when first superuser password is changed in .env. PR [#1165](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Fix bug when resetting password. PR [#1171](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Fix 403 when the frontend has a directory without an index.html. PR [#1094](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)

### Refactors
* 🚨 Fix Docker build warning. PR [#1283](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Regenerate client to use UUID instead of id integers and update frontend. PR [#1281](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Tweaks in frontend. PR [#1273](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Add random password util and refactor tests. PR [#1277](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor models to use cascade delete relationships. PR [#1276](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔥 Remove `USERS_OPEN_REGISTRATION` config, make registration enabled by default. PR [#1274](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Reuse database url from config in alembic setup. PR [#1229](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Update Playwright config and tests to use env variables. PR [#1266](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Edit refactor db models to use UUID's instead of integer ID's. PR [#1259](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Update form inputs width. PR [#1263](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Replace deprecated utcnow() with now(timezone.utc) in utils module. PR [#1247](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Format frontend. PR [#1262](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Abstraction of specific AddModal component out of the Navbar. PR [#1246](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Update `login.tsx` to prevent error if username or password are empty. PR [#1257](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor recover password. PR [#1242](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Format and lint. PR [#1243](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Run biome after OpenAPI client generation. PR [#1226](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Update DeleteConfirmation component to use new service. PR [#1224](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Update client services. PR [#1223](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⚒️ Add minor frontend tweaks. PR [#1210](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🚚 Move assets to public folder. PR [#1206](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor redirect labels to simplify removing the frontend. PR [#1208](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔒️ Refactor migrate from python-jose to PyJWT. PR [#1203](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔥 Remove duplicated code. PR [#1185](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Add delete_user_me endpoint and corresponding test cases. PR [#1179](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✅ Update test to add verification database records. PR [#1178](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🚸 Use `useSuspenseQuery` to fetch members and show skeleton. PR [#1174](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Format Utils. PR [#1173](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Use suspense for items page. PR [#1167](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🚸 Mark login field as required. PR [#1166](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🚸 Improve login. PR [#1163](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🥅 Handle AxiosErrors in Login page. PR [#1162](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Format frontend. PR [#1161](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Regenerate frontend client. PR [#1156](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor rename ModelsOut to ModelsPublic. PR [#1154](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Migrate frontend client generation from `openapi-typescript-codegen` to `@hey-api/openapi-ts`. PR [#1151](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔥 Remove unused exports and update dependencies. PR [#1146](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Update sentry dns initialization following the environment settings. PR [#1145](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor and tweaks, rename `UserCreateOpen` to `UserRegister` and others. PR [#1143](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Format imports. PR [#1140](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor and remove `React.FC`. PR [#1139](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Add email pattern and refactor in frontend. PR [#1138](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🥅 Set up Sentry for Full Stack applications. PR [#1136](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔥 Remove deprecated Docker Compose version key. PR [#1129](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Format with Biome. PR [#1097](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Update quote style in biome formatter. PR [#1095](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Replace ESLint and Prettier with Biome to format and lint frontend. PR [#719](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Replace buttons styling for variants for consistency. PR [#722](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🛠️ Improve `modify-openapi-operationids.js`. PR [#720](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Replace pytest-mock with unittest.mock and remove pytest-cov. PR [#717](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🛠️ Minor changes in frontend. PR [#715](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻ Update Docker image to prevent errors in M1 Macs. PR [#710](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✏ Fix typo in variable names in `backend/app/api/routes/items.py` and `backend/app/api/routes/users.py`. PR [#711](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)

### Upgrades
* ⬆️ Update SQLModel to version `>=0.0.21`. PR [#1275](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⬆️ Upgrade Traefik. PR [#1241](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⬆️ Bump requests from 2.31.0 to 2.32.0 in /backend. PR [#1211](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⬆️ Bump jinja2 from 3.1.3 to 3.1.4 in /backend. PR [#1196](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* Bump gunicorn from 21.2.0 to 22.0.0 in /backend. PR [#1176](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* Bump idna from 3.6 to 3.7 in /backend. PR [#1168](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🆙 Update React Query to TanStack Query. PR [#1153](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* Bump vite from 5.0.12 to 5.0.13 in /frontend. PR [#1149](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* Bump follow-redirects from 1.15.5 to 1.15.6 in /frontend. PR [#734](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)

### Docs
* 📝 Update links from luxuryverse repo to luxuryverse org repo. PR [#1285](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Add End-to-End Testing with Playwright to frontend `README.md`. PR [#1279](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Update release-notes.md. PR [#1220](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✏️ Update `README.md`. PR [#1205](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✏️ Fix Adminer URL in `deployment.md`. PR [#1194](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Add `Enabling Open User Registration` to backend docs. PR [#1191](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Update release-notes.md. PR [#1164](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Update `README.md`. PR [#716](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Update instructions to clone for a private repo, including updates. PR [#1127](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Add docs about CI keys, LATEST_CHANGES and SMOKESHOW_AUTH_KEY. PR [#1126](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✏️ Fix file path in `backend/README.md` when not wanting to use migrations. PR [#1116](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Add documentation for pre-commit and code linting. PR [#718](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Fix localhost URLs in `development.md`. PR [#1099](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✏ Update header titles for consistency. PR [#708](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📝 Update `README.md`, dark mode screenshot position. PR [#706](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)

### Internal
* 🔧 Update deploy workflows to exclude the main repository. PR [#1284](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 👷 Update issue-manager.yml GitHub Action permissions. PR [#1278](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⬆️ Bump setuptools from 69.1.1 to 70.0.0 in /backend. PR [#1255](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⬆️ Bump certifi from 2024.2.2 to 2024.7.4 in /backend. PR [#1250](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⬆️ Bump urllib3 from 2.2.1 to 2.2.2 in /backend. PR [#1235](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Ignore `src/routeTree.gen.ts` in biome. PR [#1175](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 👷 Update Smokeshow download artifact GitHub Action. PR [#1198](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Update Node.js version in `.nvmrc`. PR [#1192](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔥 Remove ESLint and Prettier from pre-commit config. PR [#1096](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Update mypy config to ignore .venv directories. PR [#1155](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🚨 Enable `ARG001` to prevent unused arguments. PR [#1152](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔥 Remove isort configuration, since we use Ruff now. PR [#1144](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Update pre-commit config to exclude generated client folder. PR [#1150](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Change `.nvmrc` format. PR [#1148](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🎨 Ignore alembic from ruff lint and format. PR [#1131](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Add GitHub templates for discussions and issues, and security policy. PR [#1105](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⬆ Bump dawidd6/action-download-artifact from 3.1.2 to 3.1.4. PR [#1103](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Add Biome to pre-commit config. PR [#1098](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔥 Delete leftover celery file. PR [#727](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⚙️ Update pre-commit config with Prettier and ESLint. PR [#714](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)

## 0.6.0

Latest Full Stack, Pydantic, SQLModel 🚀

Brand new frontend with React, TS, Vite, Chakra UI, TanStack Query/Router, generated client/SDK 🎨

CI/CD - GitHub Actions 🤖

Test cov > 90% ✅

### Features

It looks like you want the PR references formatted in Markdown while replacing the GitHub repository links to your own (`https://github.com/luxuryverse/full-stack-template`)          Here's how your example would look with the replacements:

---

## 0.6.0

Latest Full Stack, Pydantic, SQLModel 🚀

Brand new frontend with React, TS, Vite, Chakra UI, TanStack Query/Router, generated client/SDK 🎨

CI/CD - GitHub Actions 🤖

Test cov > 90% ✅

### Features

* ✨ Adopt SQLModel, create models, start using it. PR [#559](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ✨ Upgrade items router with new SQLModel models, simplified logic, and new Full Stack Annotated dependencies. PR [#560](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ✨ Migrate from pgAdmin to Adminer. PR [#692](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ✨ Add support for setting `POSTGRES_PORT`. PR [#333](https://github.com/luxuryverse/full-stack-template) by [@uepoch](https://github.com/uepoch)         
* ⬆ Upgrade Flower version and command. PR [#447](https://github.com/luxuryverse/full-stack-template) by [@maurob](https://github.com/maurob)         
* 🎨 Improve styles. PR [#673](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 🎨 Update theme. PR [#666](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Add continuous deployment and refactors needed for it. PR [#667](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ✨ Create endpoint to show password recovery email content and update email template. PR [#664](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 🎨 Format with Prettier. PR [#646](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* ✅ Add tests to raise coverage to at least 90% and fix recover password logic. PR [#632](https://github.com/luxuryverse/full-stack-template) by [@estebanx64](https://github.com/estebanx64)         
* ⚙️ Add Prettier and ESLint config with pre-commit. PR [#640](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 👷 Add coverage with Smokeshow to CI and badge. PR [#638](https://github.com/luxuryverse/full-stack-template) by [@estebanx64](https://github.com/estebanx64)         
* ✨ Migrate to TanStack Query (React Query) and TanStack Router. PR [#637](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         

### Fixes

* 🐛 Fix copier to handle string vars with spaces in quotes. PR [#631](https://github.com/luxuryverse/full-stack-template) by [@estebanx64](https://github.com/estebanx64)         
* 🐛 Fix allowing a user to update the email to the same email they already have. PR [#696](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 🐛 Set up Sentry only when used. PR [#671](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 🔥 Remove unnecessary validation. PR [#662](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 🐛 Fix bug when editing
* ✨ Add delete_user; refactor delete_item. PR [#594](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* ✨ Add state store to new frontend. PR [#592](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add form validation to Admin, Items and Login. PR [#616](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add Sidebar to new frontend. PR [#587](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add Login to new frontend. PR [#585](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Include schemas in generated frontend client. PR [#584](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Regenerate frontend client with recent changes. PR [#575](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor API in `utils.py`. PR [#573](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Update code for login API. PR [#571](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Add client in frontend and client generation. PR [#569](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐳 Set up Docker config for new-frontend. PR [#564](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ✨ Set up new frontend with Vite, TypeScript and React. PR [#563](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📌 Add NodeJS version management and instructions. PR [#551](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse
* Add consistent errors for env vars not set. PR [#200](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* Upgrade Traefik to version 2, keeping in sync with DockerSwarm.rocks. PR [#199](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* Run tests with `TestClient`. PR [#160](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse
* 🐛 Fix copier to handle string vars with spaces in quotes. PR [#631](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Fix allowing a user to update the email to the same email they already have. PR [#696](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Set up Sentry only when used. PR [#671](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔥 Remove unnecessary validation. PR [#662](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Fix bug when editing own user. PR [#651](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛  Add `onClose` to `SidebarItems`. PR [#589](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Fix positional argument bug in `init_db.py`. PR [#562](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📌 Fix flower Docker image, pin version. PR [#396](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Fix Celery worker command. PR [#443](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Fix Poetry installation in Dockerfile and upgrade Python version and packages to fix Docker build. PR [#480](https://github.com/luxuryverse/full-stack-template)

### Refactors

* 🔧 Add missing dotenv variables. PR [#554](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ⏪ Revert "⚙️ Add Prettier and ESLint config with pre-commit". PR [#644](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🙈 Add .prettierignore and include client folder. PR [#648](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🏷️ Add mypy to the GitHub Action for tests and fixed types in the whole project. PR [#655](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse_
* 🔒️ Ensure the default values of "changethis" are not deployed. PR [#698](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ◀ Revert "📸 Rename Dashboard to Home and update screenshots". PR [#697](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 📸 Rename Dashboard to Home and update screenshots. PR [#693](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🐛 Fixed items count when retrieving data for all items by user. PR [#695](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔥 Remove Celery and Flower, they are currently not used nor recommended. PR [#694](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  
* ✅ Add test for deleting user without privileges. PR [#690](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* ♻️ Refactor user update. PR [#689](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  
* 📌 Add Poetry lock to git. PR [#685](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)          
* 🎨 Adjust color and spacing. PR [#684](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)           
* 👷 Avoid creating unnecessary *.pyc files with PYTHONDONTWRITEBYTECODE=1. PR [#677](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)            
* 🔧 Add `SMTP_SSL` option for older SMTP servers. PR [#365](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)          
* ♻️ Refactor logic to allow running pytest tests locally. PR [#683](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* ♻ Update error messages. PR [#417](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)    
* 🔧 Add a default Flower password. PR [#682](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* 🔧 Update VS Code debug config. PR [#676](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* ♻️ Refactor code structure for tests. PR [#674](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* 🔧 Set TanStack Router devtools only in dev mode. PR [#668](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)          
* ♻️ Refactor email logic to allow re-using util functions for testing and development. PR [#663](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* 💬 Improve Delete Account description and confirmation. PR [#661](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* ♻️ Refactor email templates. PR [#659](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* 📝 Update deployment files and docs. PR [#660](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)   
* 🔥 Remove unused schemas. PR [#656](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     
* 🔥 Remove old frontend. PR [#649](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)                   
* ♻ Refactor Python folder tree. PR [#629](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* ♻️ Refactor old CRUD utils and tests. PR [#622](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* 🔧 Update .env to allow local debug for the backend. PR [#618](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)             
* ♻️ Refactor and update CORS, remove trailing slash from new Pydantic v2. PR [#617](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* 🎨 Format files with pre-commit and Ruff. PR [#611](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)           
* 🚚 Refactor and simplify backend file structure. PR [#609](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* 🔥 Clean up old files no longer relevant. PR [#608](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻ Re-structure Docker Compose files, discard Docker Swarm specific logic. PR [#607](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* ♻️ Refactor update endpoints and regenerate client for new-frontend. PR [#602](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* ✨ Add Layout to App. PR [#588](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)   
* ♻️ Re-enable user update path operations for frontend client generation. PR [#574](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* ♻️ Remove type ignores and add `response_model`. PR [#572](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor Users API and dependencies. PR [#561](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor frontend Docker build setup, use plain NodeJS, use custom Nginx config, fix build for old Vue. PR [#555](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* ♻️ Refactor project generation, discard cookiecutter, use plain git/clone/fork. PR [#553](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* Refactor backend:
    * Simplify configs for tools and format to better support editor integration.
    * Add mypy configurations and plugins.
    * Add types to all the codebase.
    * Update types for SQLAlchemy models with plugin.
    * Update and refactor CRUD utils.
    * Refactor DB sessions to use dependencies with `yield`.
    * Refactor dependencies, security, CRUD, models, schemas, etc. To simplify code and improve autocompletion.
    * Change from PyJWT to Python-JOSE as it supports additional use cases.
    * Fix JWT tokens using user email/ID as the subject in `sub`.
    * PR [#158](https://github.com/luxuryverse/full-stack-template)
* Simplify `docker-compose.*.yml` files, refactor deployment to reduce config files. PR [#153](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)
* Simplify env var files, merge to a single `.env` file. PR [#151](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  

### Upgrades

* 📌 Upgrade Poetry lock dependencies. PR [#702](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)          
* ⬆️ Upgrade Python version and dependencies. PR [#558](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* ⬆ Bump luxuryverse/issue-manager from 0.2.0 to 0.5.0. PR [#591](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)               
* Bump follow-redirects from 1.15.3 to 1.15.5 in /frontend. PR [#654](https://github.com/luxuryverse/full-stack-template)by [@dependabot[bot]](https://github.com/apps/dependabot)         
* Bump vite from 5.0.4 to 5.0.12 in /frontend. PR [#653](https://github.com/luxuryverse/full-stack-template) by [@dependabot[bot]](https://github.com/apps/dependabot)         
* Bump fastapi from 0.104.1 to 0.109.1 in /backend. PR [#687](https://github.com/luxuryverse/full-stack-template) by [@dependabot[bot]](https://github.com/apps/dependabot)         
* Bump python-multipart from 0.0.6 to 0.0.7 in /backend. PR [#686](https://github.com/luxuryverse/full-stack-template) by [@dependabot[bot]](https://github.com/apps/dependabot)         
* ⬆ Add `uvicorn[standard]` to include `watchgod` and `uvloop`. PR [#438](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* ⬆ Upgrade code to support pydantic V2. PR [#615](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  

### Docs

* 🦇 Add dark mode to `README.md`. PR [#703](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     
* 🍱 Update GitHub image. PR [#701](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     
* 🍱 Add GitHub image. PR [#700](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     
* 🚚 Rename project to Full Stack Full Stack Template. PR [#699](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  
* 📝 Update `README.md`. PR [#691](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* ✏ Fix typo in `development.md`. PR [#309](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  
* 📝 Add docs for wildcard domains. PR [#681](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)   
* 📝 Add the required GitHub Actions secrets to docs. PR [#679](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  
* 📝 Update `README.md` and `deployment.md`. PR [#678](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  
* 📝 Update frontend `README.md`. PR [#675](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)   
* 📝 Update deployment docs to use a different directory for traefik-public. PR [#670](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* 📸 Add new screenshots . PR [#657](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  
* 📝 Refactor README into separate README.md files for backend, frontend, deployment, development. PR [#639](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* 📝 Update README. PR [#628](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     
* 👷 Update GitHub Action latest-changes and move release notes to independent file. PR [#619](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* 📝 Update internal README and referred files. PR [#613](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* 📝 Update README with in construction notice. PR [#552](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* Add docs about reporting test coverage in HTML. PR [#161](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)   
* Add docs about removing the frontend, for an API-only app. PR [#156](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     

### Internal

* 👷 Add Lint to GitHub Actions outside of tests. PR [#688](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* ⬆ Bump dawidd6/action-download-artifact from 2.28.0 to 3.1.2. PR [#643](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)   
* ⬆ Bump actions/upload-artifact from 3 to 4. PR [#642](https://github.com/luxuryverse/full-stack-template)  by [@dependabot[bot]](https://github.com/apps/dependabot)         
* ⬆ Bump actions/setup-python from 4 to 5. PR [#641](https://github.com/luxuryverse/full-stack-template) ) by [@dependabot[bot]](https://github.com/apps/dependabot)         
* 👷 Tweak test GitHub Action names. PR [#672](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* 🔧 Add `.gitattributes` file to ensure LF endings for `.sh` files. PR [#658](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  
* 🚚 Move new-frontend to frontend. PR [#652](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* 🔧 Add script for ESLint. PR [#650](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* ⚙️ Add Prettier config. PR [#647](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* 🔧 Update pre-commit config. PR [#645](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* 👷 Add dependabot. PR [#547](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* 👷 Fix latest-changes GitHub Action token, strike 2. PR [#546](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* 👷 Fix latest-changes GitHub Action token config. PR [#545](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* 👷 Add latest-changes GitHub Action. PR [#544](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* Update issue-manager. PR [#211](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)           
* Add [GitHub Sponsors](https://github.com/sponsors/luxuryverse) button. PR [#201](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)          
* Simplify scripts and development, update docs and configs. PR [#155](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       

## 0.5.0

* Make the Traefik public network a fixed default of `traefik-public` as done in DockerSwarm.rocks, to simplify development and iteration of the project generator. PR [#150](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* Update to PostgreSQL 12. PR [#148](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)    
* Use Poetry for package management. Initial PR [#144](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)  
* Fix Windows line endings for shell scripts after project generation with Cookiecutter hooks. PR [#149](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     
* Upgrade Vue CLI to version 4. PR [#120](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* Remove duplicate `login` tag. PR [#135](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* Fix showing email in dashboard when there's no user's full name. PR [#129](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* Format code with Black and Flake8. PR [#121](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* Simplify SQLAlchemy Base class. PR [#117](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)         
* Update CRUD utils for users, handling password hashing. PR [#106](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)   
* Use `.` instead of `source` for interoperability. PR [#98](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       
* Use Pydantic's `BaseSettings` for settings/configs and env vars. PR [#87](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* Remove `package-lock.json` to let everyone lock their own versions (depending on OS, etc)         
* Simplify Traefik service labels PR [#139](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)   
* Add email validation. PR [#40](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* Fix typo in README. PR [#83](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* Fix typo in README. PR [#80](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* Fix function name `read_item` and response code. PR [#74](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     
* Fix typo in comment. PR [#70](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* Fix Flower Docker configuration. PR [#37](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        
* Add new CRUD utils based on DB and Pydantic models. Initial PR [#23](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse) 
* Add normal user testing Pytest fixture. PR [#20](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     
## 0.4.0

* Fix security on resetting a password. Receive token as body, not query. PR [#34](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)    
* Fix security on resetting a password. Receive it as body, not query. PR [#33](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)     
* Fix SQLAlchemy class lookup on initialization. PR [#29](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)      
* Fix SQLAlchemy operation errors on database restart. PR [#32](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        

* Fix locations of scripts in generated README. PR [#19](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)        

* Forward arguments from script to `pytest` inside container. PR [#17](https://github.com/luxuryverse/full-stack-template) by [@luxuryverse](https://github.com/luxuryverse)       

* Update development scripts.

* Read Alembic configs from env vars. PR <a href="https://github.com/luxuryverse/full-stack-template" target="_blank">#9</a> by <a href="https://github.com/luxuryverse" target="_blank">@ebreton</a>.

* Create DB Item objects from all Pydantic model's fields.

* Update Jupyter Lab installation and util script/environment variable for local development.

## 0.3.0

* PR <a href="https://github.com/luxuryverse/full-stack-template" target="_blank">#14</a>:
    * Update CRUD utils to use types better.
    * Simplify Pydantic model names, from `UserInCreate` to `UserCreate`, etc.
    * Upgrade packages.
    * Add new generic "Items" models, crud utils, endpoints, and tests. To facilitate re-using them to create new functionality. As they are simple and generic (not like Users), it's easier to copy-paste and adapt them to each use case.
    * Update endpoints/*path operations* to simplify code and use new utilities, prefix and tags in `include_router`.
    * Update testing utils.
    * Update linting rules, relax vulture to reduce false positives.
    * Update migrations to include new Items.
    * Update project README.md with tips about how to start with backend.

* Upgrade Python to 3.7 as Celery is now compatible too. PR  <a href="https://github.com/luxuryverse/full-stack-template" target="_blank">#10</a> by <a href="https://github.com/luxuryverse" target="_blank">@luxuryverse</a>.   

## 0.2.2

* Fix frontend hijacking /docs in development. Using latest https://github.com/luxuryverse/full-stack-template with custom Nginx configs in frontend. <a href="[https://github.com/luxuryverse/full-stack-template]" target="_blank">PR #6</a>.

## 0.2.1

* Fix documentation for *path operation* to get user by ID.  <a href="https://github.com/luxuryverse/full-stack-template" target="_blank">PR #4</a> by <a href="https://github.com/luxuryverse" target="_blank">@luxuryverse</a> in Full Stack.

* Set `/start-reload.sh` as a command override for development by default.

* Update generated README.

## 0.2.0

**<a href="https://github.com/luxuryverse/full-stack-template" target="_blank">PR #2</a>**:

* Simplify and update backend `Dockerfile`s.
* Refactor and simplify backend code, improve naming, imports, modules and "namespaces".
* Improve and simplify Vuex integration with TypeScript accessors.
* Standardize frontend components layout, buttons order, etc.
* Add local development scripts (to develop this project generator itself)         
* Add logs to startup modules to detect errors early.
* Improve Full Stack dependency utilities, to simplify and reduce code (to require a superuser)         

## 0.1.2

* Fix path operation to update self-user, set parameters as body payload.

## 0.1.1

Several bug fixes since initial publication, including:

* Order of path operations for users.
* Frontend sending login data in the correct format.
* Add https://localhost variants to CORS.
