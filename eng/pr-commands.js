module.exports = async function authorizeCommand({github, context, request}) {
  const {data: comment} = await github.rest.issues.getComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    comment_id: request.comment_id,
  })
  const {data: pr} = await github.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: request.pr_number,
  })
  const {data: permission} = await github.rest.repos.getCollaboratorPermissionLevel({
    owner: context.repo.owner,
    repo: context.repo.repo,
    username: comment.user.login,
  })
  const allowed = new Set(['admin', 'maintain', 'write'])
  return {
    authorized: pr.state === 'open' &&
      comment.body.trim() === '/lab-request-review' &&
      allowed.has(permission.permission),
    actor: comment.user.login,
    permission: permission.permission,
  }
}
