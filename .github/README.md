# GitHub Actions Workflows

This directory contains the automated workflows for the Cassanova Casino project.

## Available Workflows

### 🔄 CI Workflow (`ci.yml`)

**Status**: [![CI](https://github.com/GizzZmo/Cassanova/actions/workflows/ci.yml/badge.svg)](https://github.com/GizzZmo/Cassanova/actions/workflows/ci.yml)

The Continuous Integration workflow automatically builds and validates the codebase.

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**Jobs:**

#### Backend Build & Validate
- Installs backend dependencies using `npm ci`
- Compiles TypeScript code with `npm run build`
- Validates that build artifacts are created correctly
- Checks for `dist/server.js` output

#### Frontend Build & Lint
- Installs frontend dependencies using `npm ci`
- Runs ESLint to check code quality with `npm run lint`
- Builds Next.js application with `npm run build`
- Validates that `.next` build directory is created

**Configuration:**
- Node.js version: 20
- Package manager: npm
- Caching: Enabled for faster builds

---

### 🚀 Deploy Workflow (Template)

**File**: `deploy.yml.template`  
**Status**: Template only (not active)

This is a reference template for production deployment. To enable:

1. Rename `deploy.yml.template` to `deploy.yml`
2. Configure the required secrets in GitHub repository settings
3. Uncomment the deployment steps you want to use
4. Customize for your deployment target

**Available Deployment Options:**

#### Backend Deployment
- SSH deployment to self-hosted server
- Or any cloud platform of your choice

**Required Secrets for SSH Deployment:**
- `SERVER_HOST`: Your server hostname or IP
- `SERVER_USER`: SSH username
- `SSH_PRIVATE_KEY`: Private SSH key for authentication

#### Frontend Deployment

**Option 1: Vercel**
- Uses `amondnet/vercel-action@v20`
- Required secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

**Option 2: Netlify**
- Uses `nwtgck/actions-netlify@v2`
- Required secrets: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`

**Option 3: Self-hosted**
- Deploy alongside backend with PM2

---

## Adding Secrets

To configure deployment secrets:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the required secrets for your deployment method

---

## Workflow Best Practices

### For Development
- The CI workflow runs automatically on every push and PR
- Ensure all tests pass before merging to `main`
- Monitor the Actions tab for build status

### For Deployment
- Only enable the deploy workflow when you're ready for production
- Test deployment in a staging environment first
- Keep secrets secure and rotate them regularly
- Use environment-specific configurations

---

## Monitoring Workflows

View workflow runs:
- Go to the **Actions** tab in the GitHub repository
- Click on a specific workflow to see its runs
- Click on a run to see detailed logs for each job

---

## Troubleshooting

### CI Workflow Fails

**Backend build fails:**
- Check TypeScript compilation errors in the logs
- Ensure all dependencies are properly listed in `package.json`
- Verify `tsconfig.json` is correctly configured

**Frontend build fails:**
- Check for ESLint errors
- Verify Next.js configuration
- Ensure all dependencies are installed

### Cache Issues

If you encounter caching issues:
- Go to Actions → Caches
- Delete old caches
- Re-run the workflow

---

## Contributing

When modifying workflows:
1. Test changes in a separate branch
2. Verify the workflow runs successfully
3. Document any new secrets or configuration requirements
4. Update this README if needed

---

For more information about GitHub Actions, visit:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
