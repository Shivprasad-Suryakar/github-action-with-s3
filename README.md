# github-action-with-s3

# AWS S3 Static Website with GitHub Actions CI/CD Pipeline

A fully automated Continuous Integration and Continuous Deployment (CI/CD) pipeline that deploys a static portfolio website directly to **Amazon S3** using **GitHub Actions**, managed from a local environment.

## ⚙️ Quick Setup

### 1. AWS Configuration
* Create an **S3 bucket** with static website hosting enabled and uncheck block public access.
* Add a public read **Bucket Policy**:

  1. Log in to the AWS Management Console.
  2. Search for and open the S3 service dashboard.
  3. Find and click on your specific S3 bucket name from the list.
  4. Open the bucket dashboard.
  5. Click on the Permissions tab located near the top navigation bar.
  6. Scroll down to the Bucket policy section.
  7. Click the Edit button on the right side.
  8. Paste the following JSON policy into the text editor:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<YOUR-BUCKET-NAME>/*"
    }
  ]
}
```

### 2. GitHub Secrets

Add your AWS credentials under your repository **Settings > Secrets and variables > Actions**:

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`

### 3. Workflow File (.github/workflows/deploy.yml)

Create a workflow file with the following content:

```yaml
name: Deploy to S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - run: |
          aws s3 sync . s3://<YOUR-BUCKET-NAME> \
            --delete \
            --exclude ".git/*" \
            --exclude ".github/*" \
            --exclude "README.md"
```

## 💻 Usage

To deploy updates to your live website, simply commit and push your changes:

```bash
git add .
git commit -m "Update website assets"
git push origin main
```

Linked In Link: [https://www.linkedin.com/posts/shivprasad-suryakar-a90695292_automating-cloud-deployments-github-actions-ugcPost-7496410778590212097-Aj4U/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEbvqMwBWhQXtNsVN8Ai7YqQInuNS1o0Tcw]

[https://www.linkedin.com/feed/update/urn:li:ugcPost:7496410778590212097/]
The GitHub Actions workflow will automatically detect the push to the `main` branch and deploy your changes to S3.
