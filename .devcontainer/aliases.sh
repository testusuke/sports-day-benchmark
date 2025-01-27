# Git CLI Alias
alias -g g='git'
alias -g gpush='git push origin HEAD'
alias -g gpull='git pull'
gcheck() {
    if git rev-parse --verify "$1" >/dev/null 2>&1; then
        git checkout "$1"
    else
        git checkout -b "$1"
    fi
}
alias -g gs='git status'
alias -g gc='git commit'