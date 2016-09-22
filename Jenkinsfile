#!/usr/bin/env groovy

import groovy.json.JsonSlurper

boolean isVersionSupported(version) {
    def jsonSlurper = new JsonSlurper()
    def properties = jsonSlurper.parseText(new URL("http://documentation.bonitasoft.com/properties.json").getText())
    def result = false
    properties.supportedVersionList.find { 
        if (it.name == version) {
          result = true
          return true
        }
        return false // keep looping
    }
    return result
}


node {
    stage 'Checkout'
    checkout scm
    
    stage 'Build'
    // Get NodeJS custom tool
    def nodejsHome = tool name: 'NodeJS_424', type: 'com.cloudbees.jenkins.plugins.customtools.CustomTool'
    echo "NodeJS home: ${nodejsHome}"
    
    sh """#!/bin/bash
set -e

env | sort -u

echo "### Cleaning previous build (except index.html)"
shopt -s extglob
rm -rf build/html/!(index.html)
echo ""

echo "### Converting .md to .html"
PATH=\$PATH:${nodejsHome}/bin
npm install
scripts/convertMdToHtml.js 7.3
scripts/taxonomy.js
echo ""

echo "### Creating doc html archive"
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
    
    stage 'Push to preprod'
    build job: 'push-content-preprod', parameters: [[$class: 'StringParameterValue', name: 'ARE_YOU_SURE', value: 'Yes']]
    
    stage 'Push to prod'
    def branch_name = $env.BRANCH_NAME
    if (isVersionSupported(branch_name)) {
        println "Version <$branch_name> is supported | Pushing to production..."
        build job: 'push-content-prod', parameters: [[$class: 'StringParameterValue', name: 'ARE_YOU_SURE', value: 'Yes']]
    }
    else {
        println "Version <$branch_name> is NOT supported."
    }
}

