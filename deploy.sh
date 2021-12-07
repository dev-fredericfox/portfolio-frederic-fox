#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# add .nojekyll to bypass GitHub Page's default behavior
touch .nojekyll

# if you are deploying to a custom domain
echo 'www.frederic-fox.com' > CNAME

git init
git remote add origin https://github.com/dev-fredericfox/portfolio-frederic-fox.git
git add -A
git commit -m 'deploy'
git branch gh-pages
git checkout gh-pages
git push origin gh-pages -f


cd -