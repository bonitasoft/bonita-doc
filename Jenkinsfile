node {
   stage 'Checkout'
   git branch: '7.3', url: 'git@github.com:bonitasoft/bonita-doc.git'
   
   stage 'Build'
   // Get NodeJS custom tool
   def nodejsHome = tool name: 'NodeJS_424', type: 'com.cloudbees.jenkins.plugins.customtools.CustomTool'
   echo "NodeJS home: ${nodejsHome}"

   sh """#!/bin/bash
set -e

env | sort -u

echo "##### Cleaning previous build (except index.html)"
shopt -s extglob
rm -rf build/html/!(index.html)
echo ""

echo "##### Converting .md to .html"
PATH=\$PATH:${nodejsHome}/bin
npm install
scripts/convertMdToHtml.js 7.3
scripts/taxonomy.js
echo ""

echo "##### Creating doc html archive"
archive_name=doc-html-\$BRANCH_NAME-`date +"%Y%m%d_%H%M%S"`.tar.gz
rm -rf doc-html*.tar.gz doc-html
mkdir doc-html && ln -s ../build/html doc-html/html && ln -s ../md/images doc-html/images
tar czf \$archive_name --dereference doc-html
echo ". Generated archive: \$archive_name"
echo ""

echo "Done."
"""

    stage 'Archive'
    archive '**/doc-html*.tar.gz'
}

