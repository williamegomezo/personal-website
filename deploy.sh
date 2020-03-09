git branch -f gh-pages

git checkout gh-pages

git reset --hard origin/master

npm run generate

cp -r dist/* .

echo 'williamegomezo.me' > CNAME

git add -A .

git commit -a -m 'Page update'

git push origin gh-pages --force

git checkout master
