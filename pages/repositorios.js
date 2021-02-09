import React from 'react'

import getUser from '../utils/getUser'

/*-----  front-end da aplicação  -----*/
const Index = ({ repos, user }) => { // na deestruturação era pra ser o nome props. Seria(props.repos e props.user)
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl">Página dos meus repositórios</h1>
      <h2 className="font-bold text-3xl">Meus repositórios no GitHub</h2>
      <p>Github stats: public repos: {user.public_repos} | public gists: {user.public_gists} | followers: {user.followers}</p>

      {repos.map(repo => {
        return (
          <div key={repo.id} className="rounded bg-gray-200 mx-8 my-4 p-4 hover:shadow-md">
            <h3 className="font-bold">{repo.full_name}</h3>
            <p>Language: {repo.language}  |  Stars: {repo.stargazers_count} </p>
          </div>
        )
      })}
    </div>
  )
}


/*-----  back-end da aplicação  -----*/
export async function getServerSideProps(context) {
  const { repos, user } = await getUser('paulodev1612')

  return {
    props: {
      repos,
      user
    }
  }
}

export default Index
