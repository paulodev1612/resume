const getUser = async (userName) => {
  // resUser pega apenas os dados do usuário no GitHub
  const resUser = await fetch(`https://api.github.com/users/${userName}`)
  const user = await resUser.json()

  // resRepos pega todos os repositórios feito pelo usuário
  const resRepos = await fetch(`https://api.github.com/users/${userName}/repos?sort=updated`)
  const originalRepos = await resRepos.json()

  // lista dos repositórios que eu não quero que entre, filtrado na função dontShowFilter
  const dontShowRepos = ['tuliofaria/mono-tulio', 'tuliofaria/testes-provedores-devpleno']

  const dontShowFilter = repo => dontShowRepos.indexOf(repo.full_name) === -1
  const isNotFork = repo => repo.fork === false
  const extractData = repo => {
    return (
      {
        id: repo.id,
        full_name: repo.full_name,
        language: repo.language,
        stargazers_count: repo.stargazers_count
      }
    )
  }

  const repos = originalRepos
    .filter(isNotFork)
    .filter(dontShowFilter)
    .map(extractData)

  return {
    user,
    repos
  }
}

export default getUser