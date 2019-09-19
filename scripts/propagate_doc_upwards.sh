#!/bin/bash
. $(dirname $0)/functions.sh

checkError() {
    testReturnCode $1 "$2"
}

merge() {
    FROM=$1
    INTO=$2
    discrete_echo "Merging branch '${FROM}' into '${INTO}'"

    git checkout ${INTO} && git pull
    checkError $? "checking out branch ${INTO}"
    git merge --no-commit origin/${FROM}
    checkError $? "merging branch ${FROM} into ${INTO}. Please resolve conflicts manually."
    if [ "${INTO}" == "7.6" ]; then
        ensure_no_bonita_bpm_content ${FROM} ${INTO}
    fi
    # only commit if there is something to commit (otherwise the commit command exits with an error code)
    if [  ! -z "$(git status --short)" ]; then
        git commit -m "Merge branch '${FROM}' into '${INTO}'"
        checkError $? "commiting in ${INTO}"
    fi
    git push origin ${INTO}
    checkError $? "pushing remote branch ${INTO}"

}

# Avoid to propagate Bonita BPM in 7.6+ as the product has been renamed to Bonita in 7.6
ensure_no_bonita_bpm_content() {
    local FROM=$1
    local INTO=$2

    # Search for Bonita BPM in diff
    if [  ! -z "$(git diff --cached --no-color --unified=0 --raw --abbrev=0 -G"Bonita BPM")" ]; then
      checkError -1 "not authorized to merge branch ${FROM} into ${INTO}. The ${FROM} branch contains 'Bonita BPM' and the new product name is now 'Bonita'.
         Run manually 'git merge --no-commit ${FROM}', make the changes to remove 'BPM', commit and push. You can then rerun this script."
    fi
}

############################################ main code #####################################"""

prepare_directory "bonita-doc"
git_clone "bonita-doc"
pushd bonita-doc

# allow to keep our changes when merge=ours specified in .gitattributes (md/release-notes.md)
git config merge.ours.driver true


merge "7.6" "7.7"
merge "7.7" "7.8"
merge "7.8" "7.9"
merge "7.9" "7.10"

popd
