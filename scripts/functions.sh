#!/bin/bash
#################################################################################
#                         Common utility functions
#
# WARNING : this script is used by other script in bonita-internal-tools project
#    be careful when modifying this script and do not move it
#################################################################################

# overriding pushd and popd commands to not print path when executing them
pushd() {
  command pushd $* > /dev/null
}
popd() {
  command popd $* > /dev/null
}

confirmYes() {
    trap 'echo  -- Command `basename ${0}` not confirmed. Aborting. && exit 1' SIGINT
    echo "Press y to confirm..."
    confirm=""
    while [ "$confirm" != "y" ]; do
        read confirm
    done
}
confirm() {
  trap 'echo  -- Command `basename ${0}` not confirmed. Aborting. && exit 1' SIGINT
  echo "Press Enter to confirm or Ctrl+C to abort:"
  read confirm
}
# Check a linux command is installed
# Print an error message and exit program if command is not installed
# $1 util to be installed
check_is_installed() {
  launch_command=`basename ${0}`
	command -v $1 >/dev/null 2>&1 && echo "Checking command '$1' is installed... Ok."  || {
      echo >&2 "###########################################################################################################"
      echo >&2 "ERROR: ${launch_command} requires command '${1}' to be installed."
      echo >&2 "Please install it first before running this script."
      echo >&2 "Aborting."
      echo >&2 "###########################################################################################################"
      exit 1;
  }
}

big_echo() {
    echo ""
    echo "###########################################################################################################"
    echo "#   $1"
    echo "###########################################################################################################"
}

discrete_echo() {
    echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    echo "$1"
    echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
}

medium_echo() {
    echo "___________________________________________________________________________________________________________"
    echo "$1"
}

NC='\033[0m'
echoBlue() {
    echo -e "\e[34m$1$NC";
}

echoRed() {
    echo -e "\e[31m$1$NC";
}

echoGreen() {
    echo -e "\e[32m$1$NC";
}

echoBold() {
    echo -e "\e[1m$1$NC";
}
# print absolute path of a file
# $1 path to file
absolute_path() {
    readlink -e $1
}

# Create a directory and erase it if existing
# $1 directory to be created
prepare_directory() {
    dir=$1
    if [ -d $dir ]; then
        rm -rf $dir
    fi
    mkdir -pv $dir
}

# Tests the return code of a command and termninate with error if different from 0.
# usage: testReturnCode $? "an error message"
# param 1: the return code
# param 2: error message
testReturnCode() {
    COD_RET=$1
    if [ ${COD_RET} -ne 0 ]; then
        echoRed "ERROR ${COD_RET} $2"
        exit ${COD_RET}
    fi
}

testReturnCodeAndContinue() {
    COD_RET=$1
    if [ ${COD_RET} -ne 0 ]; then
        echoRed "ERROR ${COD_RET} $2"
    fi
}

######################### GIT FUNCTIONS ############################
# perform a git push in specified folder
# $1 the folder
git_push() {
    pushd $1 > /dev/null
    git push
    popd > /dev/null
}

# perform a git fetch in specified folder
# $1 the folder
git_fetch() {
    pushd $1
    git fetch
    popd
}

# completely clean a repository and update it
# this will delete all branches (master excluded)
# $1 the folder containing the git repository
git_reset_repository() {
    pushd $1
    # abort any previous failed rebase:
    git rebase --abort 2> /dev/null

    git fetch
    git clean -f -d
    #in case of previous conflict
    git reset --hard HEAD
    # re checkout base branch
    git checkout master
    # be sure its same as remote master
    git reset --hard origin/master
    #delete all branches
    git branch | grep -v 'master$' | sed "s@  @@" | sed "s@* @@" | xargs --no-run-if-empty git branch -D
    popd
}


# Clone a bonita github project
# $1 project name
git_clone() {
    git clone "git@github.com:bonitasoft/${1}.git"
}

# Clone from internal mirror and update from real Github repo
# This fastens the clone process
# $1 repo git
git_clone_from_mirror() {
    THE_SCM_PUBLIC_URL="git@github.com:bonitasoft"
    THE_SCM_INTERNAL_URL=ci@ci-01.rd.lan:/var/www/github

    medium_echo "Git clone $1 from internal mirror"
    git clone ${THE_SCM_INTERNAL_URL}/${1}.git
    testReturnCode $? "Git clone <${THE_SCM_INTERNAL_URL}/${1}.git>"
    pushd ${1}

    medium_echo "Set remote URL to <${THE_SCM_PUBLIC_URL}/${1}.git> and pull"
    git remote set-url origin ${THE_SCM_PUBLIC_URL}/${1}.git
    git pull origin
    testReturnCode $? "Git clone $1"
    popd
}

# do a git fetch or clone project if not exists
# $1 project name
fetch_project_inplace() {
    if [ ! -d ${1} ]; then
        echo "Cloning project ${1}"
        git_clone_from_mirror ${1}
    else
        echo "Fetching and cleaning project ${1}"
        git_reset_repository ${1}
    fi
}