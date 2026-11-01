# GitHub Awesome Copilot command-writer lab

This lab mirrors the split command architecture in `github/awesome-copilot`:

- a low-privilege `issue_comment` workflow uploads only a comment ID and PR number;
- a privileged `workflow_run` consumer downloads into `${{ runner.temp }}` and checks out trusted command logic without persisting credentials;
- the safe control re-reads the live comment, PR state, and commenter's repository permission before writing.

The final step is an explicitly unsafe positive control that trusts the artifact and creates a harmless PR comment. It demonstrates the impact of removing the upstream authorization revalidation; it is not an upstream vulnerability.
